import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Feature , FeatureCollection } from '../Interface/AddressResults';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  // addressResults: AddressResults[] = [];
  features: Feature[] =[] ;
  @ViewChild('suggestions') suggestions!:ElementRef ;
  @ViewChild('header') header!: ElementRef; // getting header tag from view template


  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    console.log(this.suggestions.nativeElement);

  }



  //* chaning the color of span signin and signup on click in the arrow
  @ViewChild("signinspan") signinspan !: ElementRef;
  @ViewChild("signupspan") signupspan !: ElementRef;
  @ViewChild("test") test !: ElementRef;


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

    return this.http.get<FeatureCollection>(url).subscribe(reponse => {
  
      this.features = reponse.features;

    })  
  }

  }




