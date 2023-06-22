import { Component, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() { }
  logState:boolean = false;

  loggedIn(value :boolean){

    this.logState = true;
  }

  }
