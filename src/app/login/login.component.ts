import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Feature, FeatureCollection } from '../Interface/AddressResults';
import { UserInscription, UserInscriptionAddress, loggedInUserInfo } from '../Interface/userdetails';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { InputvalidationsService } from '../../validators/inputvalidations.service';
import { CookieService } from 'ngx-cookie-service';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { baseURL } from 'src/environment/environment';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { passwordDoesntMatch } from 'src/validators/passwordmatch.validator';
import { __values } from 'tslib';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //* Variables related to the view template 

  passwordMatch !: boolean;
  patternRespected: boolean = false;
  // pattern: any = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  isLoggedIn: boolean = false;
  displaySuggestions: boolean = false;
  showStreetInput: boolean = false;

  userInscriptionDetails!: UserInscription;

  userInscriptionAddress: UserInscriptionAddress = {
    buildingNumber: "",
    street: "",
    municipality: "",
    postCode: "",
    departement: "",
    region: ""
  }


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
    private ageValidationInstance: InputvalidationsService, private cookieService: CookieService,
    private loggedInUserInstance: LoggedInUserService, private router: Router, private fb: FormBuilder) { }





  ngOnInit(): void {


    this.initLogForm();
    this.initRegistrationForm();


    this.loggedInUserInstance.getLoggedInUserInfo().subscribe(value => {
      this.loggedInUserInfo = value;
    });
    this.loggedInUserInstance.getLoggedInStatus().subscribe(value => {
      this.isLoggedIn = value;
    });
    this.onAddressInputChanges();
    this.onPostCodeChange();

  }

  //* Get the value of street input and execute the search method
  onAddressInputChanges() {

    this.registrationFormGroup.get("thirdFaceGroup.street")?.valueChanges.subscribe(value => {
      this.searchingAddress(value, this.registrationFormGroup.get(['thirdFaceGroup', "postCode"])?.value)
    });
  };

  //* Hide the suggestions if the postCode is changed
  onPostCodeChange() {

    this.registrationFormGroup.get("thirdFaceGroup.postCode")?.valueChanges.pipe(
      tap(() => {

        this.displaySuggestions = false;
        this.features = [];

      })
    ).subscribe();


  }

  //* Searching for address when a change happens
  searchingAddress(value: string, postCode: string): object {

    if (!value) {
      //* Display none for the previous results if the input value becomes null
      this.displaySuggestions = false;

    }

    const url = `https://api-adresse.data.gouv.fr/search/?q=${value}&postcode=${postCode}&limit=10`;

    return this.http.get<FeatureCollection>(url)
      .subscribe(reponse => {

        this.displaySuggestions = true;
        this.features = reponse.features;

      })
  };

  //* Selecting the address on click event
  selectaddress(divElement: MouseEvent): void {

    // targeting the click Div
    const address = divElement.target as HTMLDivElement;
    // Splitting the innerText of the div 
    const addressArray = address.innerText.split(",");
    const street = addressArray[0];
    const municipality = addressArray[1];
    const postCode = addressArray[2];
    const departement = addressArray[4];
    const region = addressArray[5];

    // asign the value of the div address to userinscriptionAddress
    //! We dont add a value for the buildingNumber here because we dont let the user to add the buildingNumber int he input, if the buildingNumber isinvalid then the API will send the name of the street without a building number

    this.userInscriptionAddress.street = street.trim();
    this.userInscriptionAddress.municipality = municipality.trim();
    this.userInscriptionAddress.postCode = postCode.trim();
    this.userInscriptionAddress.departement = departement.trim();
    this.userInscriptionAddress.region = region.trim();
    this.userInscriptionAddress.buildingNumber = this.registrationFormGroup.get('thirdFaceGroup.buildingNumber')?.value.trim();

    // hide the suggestions and clear features array 
    this.displaySuggestions = false;
    this.features = [];
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

  //* Init login form
  initLogForm() {
    this.loginFormInfo = new FormGroup({
      logemail: new FormControl("", [
        Validators.required,
        // Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")
      ]),
      logpassword: new FormControl("", [Validators.required])

    })
  };
  get logemail() {
    return this.loginFormInfo.get("logemail");
  }
  get logPassword() {
    return this.loginFormInfo.get("logPassword");
  }

  //* Init Registeration form
  initRegistrationForm() {
    this.registrationFormGroup = this.fb.group({
      firstFaceGroup: this.fb.group({
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
          this.ageValidationInstance.ageIsValid?.bind(this.ageValidationInstance)
        ])
      }),

      secondFaceGroup: this.fb.group({
        email: new FormControl(null, [
          Validators.required,
          Validators.pattern('[^@ \\t\\r\\n]+@[^@ \\t\\r\\n]+\\.[^@ \\t\\r\\n]+')
        ]),

        // passwordGroup: new FormGroup ({

        password: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
        ]),
        confPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$")
        ]),
      },
        {
          validators: passwordDoesntMatch
          // })
        }),



      thirdFaceGroup: this.fb.group({
        postCode: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[0-9]{5}$/)

        ]),
        street: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[A-Za-z\s]+$/)
        ]),
        buildingNumber: new FormControl(null,
          [
            Validators.pattern("^[0-9].*"),
            Validators.required
          ]),
        gender: new FormControl(null, Validators.required)
      })
    })
  };

  //* Submitting the form
  onRegFormSubmit(): void {

    if (this.registrationFormGroup.valid) {

      this.userInscriptionDetails = this.combineFaces();
      this.http.post<string[]>(`${baseURL}inscription.php`, {userDetails : this.userInscriptionDetails , userAddress : this.userInscriptionAddress }).subscribe(
       
        (response) => {

          console.log(this.userInscriptionAddress);
          console.log(this.userInscriptionDetails);
          console.log(response);

          // Handle success response
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
          console.log(error);
          // Handle error response
          Swal.fire({
            title: 'Error!',
            text: error[0],
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      );
    } else {
      //* Refresh the page , Invalid inputs
      Swal.fire({
        title: 'Error!',
        text: "Invalid Inputs, refresh the page and try again!",
        icon: 'error',
        confirmButtonText: "Refresh"
      }).then(() => {

        this.refresh();
      })
    }

  }

  //* Refresh the page 
  refresh() {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.navigate(['/login'])]);
    });
  }

  //* Combine the values of the three faces into one object
  combineFaces(): UserInscription {

    // using this.firstName to define the new object give an error 

    const firstName: string = this.firstFaceGroup?.get(['firstName'])?.value;
    const lastName: string = this.firstFaceGroup?.get(['lastName'])?.value;
    const birthdate: Date = this.firstFaceGroup?.get(['birthdate'])?.value;
    const email: string = this.secondFaceGroup?.get(['email'])?.value;
    const password: string = this.secondFaceGroup?.get(['password'])?.value;
    const confPassword: string = this.secondFaceGroup?.get(['confPassword'])?.value;
    const gender: string = this.thirdFaceGroup?.get(['gender'])?.value;

    return { firstName, lastName, birthdate, email, password, confPassword, gender };

  }

  // get the controls of the form groups  
  get firstFaceGroup() {
    return this.registrationFormGroup.get('firstFaceGroup');
  }
  get secondFaceGroup() {
    return this.registrationFormGroup.get('secondFaceGroup');
  }
  get thirdFaceGroup() {
    return this.registrationFormGroup.get('thirdFaceGroup');
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
  get postCode() {
    return this.registrationFormGroup.get("thirdFaceGroup.postCode");
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