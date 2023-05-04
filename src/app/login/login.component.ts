import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AddressResults } from '../Interface/AddressResults';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  addressResults: any = [];

  constructor(private fetchingAddress: HttpClient) {

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

    return this.fetchingAddress.get(url).subscribe(reponse => {
      this.addressResults = reponse;
      const container: any = document.querySelectorAll(".suggestions");
      container.innerHTML = "";
      console.log(typeof this.addressResults);
      // console.log((Object.keys(addressResults)).length);

      // for (let i = 0; i < 10; i++) {
      //   container.nativeElement.innerHTML += `<div class="suggestions" onclick="addingsuggestion(this)">${(this.addressResults.features[i].properties.name)},${(this.addressResults.features[i].properties.postcode)},${(this.addressResults.features[i].properties.city)},${(this.addressResults.features[i].properties.context)}.</div>`;
      //   console.log(this.addressResults.features[0].properties.city);
      // }
    })

    // console.log(url);
  }




}
