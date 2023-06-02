import { Component, ElementRef, ViewChild, AfterViewInit, asNativeElements, HostListener, Input, AfterViewChecked } from '@angular/core';
import { LoggedInUserService } from '../services/logged-in-user.service';
import { loggedInUserInfo } from '../Interface/userdetails';
import { CookieServiceService } from '../services/cookie-service.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewChecked {

  constructor(private loggedInUserInstance: LoggedInUserService , private cookieService: CookieServiceService) { }


  @ViewChild('header') header!: ElementRef; // getting header tag from view template

  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened: boolean = false;
  isLoggedIn : boolean = false;
  loggedInUserInfo!: loggedInUserInfo;
  ngOnInit(): void {


    this.loggedInUserInstance.getLoggedInStatus().subscribe(booleanValue =>{
      this.isLoggedIn = booleanValue;
    })
    
    this.loggedInUserInstance.getLoggedInUserInfo().subscribe(userInfo =>{
      this.loggedInUserInfo = userInfo;
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

  logout(){
    this.loggedInUserInstance.setLoggedInStatus(false);
    this.cookieService.deleteValue("token");

  }

  lolheader(){
    console.log("the value of loggedin staus in header com is " + this.isLoggedIn);
    console.log("the value of userinfo in header component is " , this.loggedInUserInfo);
  }


}

