import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, Input, InputDecorator, ViewChild } from '@angular/core';
import { Feature, FeatureCollection } from '../Interface/AddressResults';
import { User } from '../Interface/userdetails';
import { FormGroup, NgForm } from '@angular/forms';
import { connect } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //* variables related to the view tempalte 

  inputValue: string = "";

  userinscriptiondetails: User = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    passwordconfirmation: '',
    dateofbirth: null,
    street: '',
    bldingnumber: '',
    gender: ''
  };

  maxDate!: string; // maxDate for the calendar to prevent under 18 from inscrire


  // * variables related to the component class file 
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


  constructor(private http: HttpClient) {

  }



  ngOnInit(): void {

    this.autorizedAgeOfNewUsers();
  }

  //* searching for address when a change happens
  searchingAddress(value: string): object {

    if (!value) {
      //* idsplay none for the previous results if the input value becomes null
      this.addressResults.nativeElement.style.display = "none";
    }

    const url = `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10`;

    return this.http.get<FeatureCollection>(url)
      .subscribe(reponse => {

        this.features = reponse.features;
        this.addressResults.nativeElement.style.display = "block";

      });

  }

  //* selecting the address on click event
  selectaddress(divElement: MouseEvent): void {

    // targeting the click Div
    const address = divElement.target as HTMLDivElement;

    // asign the value of the div address to the input value 
    this.input.nativeElement.value = address.innerHTML;

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

    // empty the value of the input 
    this.input.nativeElement.value = "";

    // 
    this.submitbutton.nativeElement.setAttribute('disabled', 'true');
  }

  //* changing the color of span signin and signup on click in the arrow
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
  onRegFormSubmit(form: NgForm):void {

    console.log(form.value);

  }

  //* displaying only the valid date of people over than 18 years old
  autorizedAgeOfNewUsers(): void {
    const currentDate: Date = new Date();

    const currentYear: number = currentDate.getFullYear();
    const currentMonth: number = currentDate.getMonth();
    const currentDay: number = currentDate.getDate();

    const max = new Date(currentYear - 18, currentMonth, currentDay);
    this.maxDate = max.toISOString().slice(0, 10); // get "YYYY-MM-DD" format


  }

  //* checking the value of address on blur
  onBlur(element: any):void {
    const input = element.target as HTMLInputElement;
    if (!input.hasAttribute("disabled") && this.regForm.invalid)
      this.submitbutton.nativeElement.setAttribute("disabled", "");

  }

  //* Switching between The Form Faces
  chaningFace(click: MouseEvent):void {

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

}



