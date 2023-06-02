import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(private pageTitle: Title, private cookieService :CookieService){ }

    ngOnInit(): void {
      this.pageTitle.setTitle('Home');
      
      
    }
 

    // banner: string ='./assets/imgs/imageHomePage.jpg'; // Slider Image

  

}
