import { Component, ElementRef, ViewChild, AfterViewInit, asNativeElements, HostListener, Input, AfterViewChecked } from '@angular/core';
import { LoggedInUserService } from '../services/logged-in-user.service';
import { loggedInUserInfo } from '../Interface/userdetails';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewChecked {

  constructor(private loggedInUserInstance: LoggedInUserService) { }


  @ViewChild('header') header!: ElementRef; // getting header tag from view template

  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened: boolean = false;
  isLoggedIn !: boolean;
  loggedInUserInfo: loggedInUserInfo = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    birthdate : null,
    street: "",
    buildingnumber: "",
    gender: "",
  }

  ngOnInit(): void {


    this.loggedInUserInstance.loggedin$.subscribe((value: boolean):void => {
      this.isLoggedIn = value;
    })

    this.loggedInUserInstance.loggedInUserInfo$.subscribe((data :loggedInUserInfo | null):void =>{
      if(data){
        console.log(data.firstname);
      }

    })

  }


  ngAfterViewChecked() {

  }

  @HostListener('window:scroll')// listen to the scroll event;

  onWindowScroll() {
    const headerElement = this.header.nativeElement;
    if (window.scrollY !== 0) {

      headerElement.classList.add("onScroll");

    } else {
      headerElement.classList.remove("onScroll");
    }
  }
  openAndCloseMenuBurger() {

    this.isOpened = !this.isOpened;

  }





}

