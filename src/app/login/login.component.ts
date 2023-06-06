import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Feature, FeatureCollection } from '../Interface/AddressResults';
import { UserInscription, loggedInUserInfo } from '../Interface/userdetails';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { InputvalidationsService } from '../services/inputvalidations.service';
import { CookieService } from 'ngx-cookie-service';
import { LoggedInUserService } from '../services/logged-in-user.service';
import { baseURL } from 'src/environment/environment';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //* Variables related to the view template 

  passwordMatch !: boolean;
  patternRespected: boolean = false;
  pattern: any = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  isLoggedIn: boolean = false;


  userinscriptiondetails: UserInscription = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordconfirmation: '',
    birthdate: null,
    street: '',
    buildingnumber: '',
    gender: ''
  };

  loggedInUserInfo !: loggedInUserInfo;

  loginFormInfo !: FormGroup;
  registrationFormGroup !: FormGroup;
  valueChangesSubscription: Subscription | undefined;


  maxDate!: string; // maxDate for the calendar to prevent under 18 from inscrire


  // * Variables related to the component class file 
  features: Feature[] = [];

  //* ViewChild variables
  @ViewChild('header') header!: ElementRef; // getting header tag from view template
  @ViewChild("signinspan") signinspan !: ElementRef;
  @ViewChild("signupspan") signupspan !: ElementRef;
  @ViewChild("suggestions") suggestions !: ElementRef;
  @ViewChild("addressResults") addressResults !: ElementRef;
  @ViewChild("input") input !: ElementRef; // input address
  @ViewChild("submitButton") submitbutton !: ElementRef;
  @ViewChild("firstFace") firstFace !: ElementRef;

  @ViewChild("secondFace") secondFace !: ElementRef;
  @ViewChild("thirdFace") thirdFace !: ElementRef;
  @ViewChild("registrationForm") regForm !: FormGroup;




  constructor(private http: HttpClient, private authService: AuthenticationService,
    private ageIsValid: InputvalidationsService, private cookieService: CookieService,
    private loggedInUserInstance: LoggedInUserService, private router: Router) {


      this.valueChangesSubscription = this.registrationFormGroup.get('thirdFaceGroup.street')?.valueChanges.subscribe((value: string) => {
        this.searchingAddress(value);
    })

  }





  ngOnInit(): void {
    this.initLogForm();
    this.initRegistrationForm();

    this.loggedInUserInstance.getLoggedInUserInfo().subscribe(value => {
      this.loggedInUserInfo = value;
    });
    this.loggedInUserInstance.getLoggedInStatus().subscribe(value => {
      this.isLoggedIn = value;
    });

  }

  //* Searching for address when a change happens
  searchingAddress(value: string): object {

    if (!value) {
      //* Display none for the previous results if the input value becomes null
      this.addressResults.nativeElement.style.display = "none";
    }

    const url = `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10`;

    return this.http.get<FeatureCollection>(url)
      .subscribe(reponse => {
        console.log(reponse);

        this.features = reponse.features;
        this.addressResults.nativeElement.style.display = "block";

      });

  }

  //* Selecting the address on click event
  selectaddress(divElement: MouseEvent): void {

    // targeting the click Div
    const address = divElement.target as HTMLDivElement;

    // asign the value of the div address to the input value 
    // this.input.nativeElement.value = address.innerHTML;
    this.userinscriptiondetails.street = address.innerHTML;


    // display none of the container after selecting the address
    this.addressResults.nativeElement.style.display = "none";

    // disable the input after adding the value 
    this.input.nativeElement.setAttribute('disabled', "");

    // display none for the container of the suggessted address
    this.suggestions.nativeElement.innerHTML = "";
  }

  //* Reset the input to set a new address
  resetInput(): void {
    // undisabled the address input to set a new address
    this.input.nativeElement.removeAttribute("disabled", "");

    // empty the value of the inputs
    this.userinscriptiondetails.street = "";
    this.userinscriptiondetails.buildingnumber = "";

    // 
    this.submitbutton.nativeElement.setAttribute('disabled', 'true');
  }

  //* Changing the color of span signin and signup on click in the arrow
  changingColorOfSpan(): void {
    if (getComputedStyle(this.signinspan.nativeElement).color == "rgb(8, 129, 120)") {
      this.signinspan.nativeElement.style.color = "rgb(196, 195, 202)";
      this.signupspan.nativeElement.style.color = "rgb(8, 129, 120)";
    } else {
      this.signinspan.nativeElement.style.color = "rgb(8, 129, 120)";
      this.signupspan.nativeElement.style.color = "rgb(196, 195, 202)";

    }


  };

  //* Submitting the form
  onRegFormSubmit(): void {

    this.http.post<string[]>(`${baseURL}/inscription.php`, this.userinscriptiondetails).subscribe(
      (response) => {
        // Handle success response
        console.log(response[0]);
        if (response[0] === "An account associated to this email!") {
          Swal.fire(
            'Ops',
            response[0],
            'error'
          )
        } else if (response[0] === "Account has been successfully registered") {
          Swal.fire(
            'Good job!',
            response[0],
            'success'
          )
        } else {
          Swal.fire({
            title: 'Error!',
            text: response[0],
            icon: 'error',
            confirmButtonText: 'Try Again'
          })
        }

      },
      (error) => {
        // Handle error response
        Swal.fire({
          title: 'Error!',
          text: error,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    );

  }

  //* Displaying only the valid date of people over than 18 years old
  ageValidator(control: FormControl): ValidationErrors | null {


    if (this.ageIsValid.ageIsValid(control)) {
      return null; // Valid age
    } else {

      return { ageInvalid: true }; // Age is less than 18
    }
  }

  //* Checking the value of address on blur
  onBlur(element: any): void {
    const input = element.target as HTMLInputElement;
    if (!input.hasAttribute("disabled") && this.regForm.invalid)
      this.submitbutton.nativeElement.setAttribute("disabled", "");

  }

  //* Switching between The Form Faces
  changingFace(click: MouseEvent): void {

    const button = click.target as HTMLDivElement;

    if (button.classList.contains("toSecondFace")) {
      if (button.classList.contains("previousArrow")) {//*From Third Face to Second Face
        this.thirdFace.nativeElement.style.right = "-90%";
        this.secondFace.nativeElement.style.right = "13%";
      } else { //* From First Face to Second Face
        this.firstFace.nativeElement.style.right = "110%";
        this.secondFace.nativeElement.style.right = "13%";

      }
    } else if (button.classList.contains("toFirstFace")) { //* From Second Face to First Face
      this.secondFace.nativeElement.style.right = "-90%";
      this.firstFace.nativeElement.style.right = "13%";

    } else { //* From Second Face to Third Face
      this.secondFace.nativeElement.style.right = "110%";
      this.thirdFace.nativeElement.style.right = "13%";
    }
  }

  //* Check the password match using ngModelChange 
  checkPasswordMatch(): void {

    if (this.userinscriptiondetails.password == this.userinscriptiondetails.passwordconfirmation) {
      console.log("Passwords are equal");
      this.passwordMatch = true;
    } else {
      console.log("Passwords are not equal");
      this.passwordMatch = false;
    }
  }
  //* Check the match of passwords
  passwordIsValid(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (this.passwordMatch && this.pattern.test(input.value)) {
      this.patternRespected == true;
    } else {
      this.patternRespected = false;

    }

  }
  //* Init login form
  initLogForm() {
    this.loginFormInfo = new FormGroup({
      logemail: new FormControl("", [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
      ]),
      logpassword: new FormControl("", [Validators.required])

    })
    // console.log(this.loginFormInfo);
  };
  get logemail() {
    return this.loginFormInfo.get("logemail");
  }
  get logPassword() {
    return this.loginFormInfo.get("logPassword");
  }
  //* Init Registeration form
  initRegistrationForm() {
    this.registrationFormGroup = new FormGroup({
      firstFaceGroup: new FormGroup({
        firstName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]+$")
        ]),
        lastName: new FormControl(null, [
          Validators.required,
          Validators.pattern("^[a-zA-Z]+( [a-zA-Z]+( [a-zA-Z]+)?)?$")
        ]),
        birthdate: new FormControl(null, [
          Validators.required,
          this.ageValidator?.bind(this)
        ])
      }),

      secondFaceGroup: new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
        ]),
        confPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")])
      }),

      thirdFaceGroup: new FormGroup({
        street: new FormControl(null, Validators.required),
        buildingNumber: new FormControl(null, Validators.required),
        gender: new FormControl(null, Validators.required)
      })
    })
  }
  get firstName() {
    return this.registrationFormGroup.get('firstFaceGroup.firstName');
  }
  get lastName() {
    return this.registrationFormGroup.get('firstFaceGroup.lastName');
  }
  get birthdate() {
    return this.registrationFormGroup.get('firstFaceGroup.birthdate');
  }
  get password() {
    return this.registrationFormGroup.get('secondFaceGroup.password');
  }
  get confPassword() {
    return this.registrationFormGroup.get('secondFaceGroup.confPassword');
  }
  get email() {
    return this.registrationFormGroup.get('secondFaceGroup.email');
  }
  get street() {
    return this.registrationFormGroup.get('thirdFaceGroup.street');
  }
  get buildingNumber() {
    return this.registrationFormGroup.get('thirdFaceGroup.buildingNumber');
  }
  get gender() {
    return this.registrationFormGroup.get('thirdFaceGroup.gender');
  }

  //* Logging in method
  loginMethod() {
    if (this.loginFormInfo.valid) {

      this.authService.login({ "logemail": `${this.loginFormInfo.value.logemail}`, "logpassword": `${this.loginFormInfo.value.logpassword}` }).subscribe(
        reponse => {


          if (reponse == "Please Check your email and password.") {
            Swal.fire({
              icon: 'error',
              title: 'Failed to connect',
              text: 'Invalid email or password!',
            })
          } else {

            this.loggedInUserInstance.setLoggedInUserInfo(reponse);
            this.loggedInUserInstance.setLoggedInStatus(true);

            if (reponse.isAdmin == 1) {
              this.loggedInUserInstance.setLoggedInUserIsAdmin(true);
              console.log("isAdmin");
            } else {
              console.log("not an admin");
            }
            // console.log(reponse);

            const token = reponse.email;
            this.cookieService.set('token', token);

            Swal.fire({
              icon: 'success',
              title: 'Welcome',
              text: `${this.loggedInUserInfo.firstname}`,
            });

            this.router.navigate(['/home']);

          }
        },
        error => {
          console.log(error);
        }
      )

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error...',
        text: 'Something went wrong, refresh the page and try again!',
      })
    }
  }

  //* Setting the isLoggedInStatus to true if token exists
  setter() {
    if (this.cookieService.check("token")) {
      this.loggedInUserInstance.setLoggedInStatus(true);
    }
  }
}