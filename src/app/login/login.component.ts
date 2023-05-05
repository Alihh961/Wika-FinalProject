import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Feature, FeatureCollection } from '../Interface/AddressResults';
import { catchError } from 'rxjs/operators';
import { EMPTY, throwError } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  //* variables related to the view tempalte 

  inputValue: string = "";


  // * variables related to the component class file 
  features: Feature[] = [];

  //* ViewChild variables
  @ViewChild('header') header!: ElementRef; // getting header tag from view template
  @ViewChild("signinspan") signinspan !: ElementRef;
  @ViewChild("signupspan") signupspan !: ElementRef;
  @ViewChild("suggestions") suggestions !: ElementRef;
  @ViewChild("addressResults") addressResults !: ElementRef;
  @ViewChild("input") input !: ElementRef;



  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
  }


  searchingAddress(value: string) {

    const url = `https://api-adresse.data.gouv.fr/search/?q=${value}&limit=10`;

    return this.http.get<FeatureCollection>(url)
      .subscribe(reponse => {

        this.features = reponse.features;
        this.addressResults.nativeElement.style.display = "block";

      });

  }

  selectaddress(divElement: MouseEvent): void { // selecting the address on click event

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


// Reset the input to set a new address
  resetInput(): void {
    // undisabled the input to set a new address
    this.input.nativeElement.removeAttribute("disabled", "");

    // empty the value of the input 
    this.input.nativeElement.value = "";
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




}






