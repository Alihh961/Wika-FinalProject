import { Component, Output ,Renderer2 } from '@angular/core';

@Component({
  selector: 'app-cookies-notification',
  templateUrl: './cookies-notification.component.html',
  styleUrls: ['./cookies-notification.component.scss']
})
export class CookiesNotificationComponent {

  constructor( private renderer :Renderer2 ){}
  
  cookiesAccepted:boolean =false;

  notificationAccepted() {
    this.cookiesAccepted = true;
    this.renderer.setStyle(document.body, 'overflow', 'auto');
    console.log("Cookies was Accepted!");
  }

  

}
