import { Component, ElementRef, ViewChild, AfterViewInit, asNativeElements, HostListener, Input, AfterViewChecked } from '@angular/core';
import { LoggedInUserService } from '../../services/logged-in-user.service';
import { loggedInUserInfo } from '../Interface/userdetails';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewChecked {

  constructor(private loggedInUserInstance: LoggedInUserService, private cookieService: CookieService,
    private authService: AuthenticationService, private router: Router) { }


  @ViewChild('header') header!: ElementRef; // getting header tag from view template
  @ViewChild('dropDownMenu') dropDownMenu!: ElementRef;


  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened: boolean = false;
  isLoggedIn: boolean = false;
  loggedInUserInfo!: loggedInUserInfo;
  dropDownMenuStatus: boolean = false;
  dropDownMenuStatusIsAdmin: boolean = false;
  arrowDown: boolean = false;
  isAdmin!: boolean;






  ngOnInit(): void {

    this.loggedInUserInstance.getLoggedInStatus().subscribe(booleanValue => {
      this.isLoggedIn = booleanValue;
    });
    // this.loggedInUserInstance.getLoggedInUserInfo().subscribe(value=>{
    //   console.log(value);
    // });

    this.loggedInUserInstance.getLoggedInUserInfo().subscribe(userInfo => {
      this.loggedInUserInfo = userInfo;
    });

    this.setLoggedInValue();

    this.checkToken();

  }

  //* Check token 
  checkToken(){

      const token = this.cookieService.get("token");
    if (token) {
      this.authService.getDataOfUser(token).subscribe(data => {
        this.loggedInUserInstance.setLoggedInUserInfo(data);
      });
      console.log("Token");

    }else{
      console.log("no Token");
    }
  }


  //* Setting the isLoggedInStatus to true if token exists
  setLoggedInValue(): void {
    if (this.cookieService.check("token")) {
      this.loggedInUserInstance.setLoggedInStatus(true);
    }
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
  //toggle menuburger
  openAndCloseMenuBurger() {

    this.isOpened = !this.isOpened;

  }

  //toggle dropdown menu
  toggleDropMenu() {
    if (this.isAdmin == false) {
      this.dropDownMenuStatus = !this.dropDownMenuStatus; // if the user is not an admin(specify class with height)
    }
    else {
      this.dropDownMenuStatusIsAdmin = !this.dropDownMenuStatusIsAdmin;// if the user is a admin(specify class with diffrent height)
    }
    this.arrowDown = !this.arrowDown;
  }


  //logging out process 
  logout() {
    this.loggedInUserInstance.setLoggedInStatus(false);
    this.cookieService.delete("token");
    this.router.navigate(["/home"]);
    this.dropDownMenuStatus = false;
    this.dropDownMenuStatusIsAdmin = false;
    this.arrowDown = false;
  }

}

