import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AddressResults } from '../Interface/AddressResults';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  addressResults: AddressResults[] = [];


  constructor(private http: HttpClient) {

  }
  ngOnInit() {

  }



  //* chaning the color of span signin and signup on click in the arrow
  @ViewChild("signinspan") signinspan !: ElementRef;
  @ViewChild("signupspan") signupspan !: ElementRef;

  changingColorOfSpan() {
    if (getComputedStyle(this.signinspan.nativeElement).color == "rgb(8, 129, 120)") {
      this.signinspan.nativeElement.style.color = "rgb(196, 195, 202)";
      this.signupspan.nativeElement.style.color = "rgb(8, 129, 120)";
    } else {
      this.signinspan.nativeElement.style.color = "rgb(8, 129, 120)";
      this.signupspan.nativeElement.style.color = "rgb(196, 195, 202)";

    }


  };



  searchingAddress(event: KeyboardEvent) {

    const input = event.target as HTMLInputElement;
    const url = `https://api-adresse.data.gouv.fr/search/?q=${input.value}&limit=10`;

    return this.http.get<AddressResults>(url).subscribe(reponse => {
      //  console.log(reponse.features[0].properties);
      //  console.log(this.addressResults[0].features);
      this.addingAddressToPage(reponse);
    })

  }

  addingAddressToPage(data: AddressResults) {
    for (const key in data ) {

      this.addressResults = [];
      this.addressResults.push(data);
    }

  }




}
