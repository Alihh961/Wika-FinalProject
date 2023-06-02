import { Component, ElementRef, ViewChild, AfterViewInit, asNativeElements, HostListener, Input, AfterViewChecked } from '@angular/core';
import { LoggedInUserService } from '../services/logged-in-user.service';
import { loggedInUserInfo } from '../Interface/userdetails';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewChecked {

  constructor(private loggedInUserInstance: LoggedInUserService, private cookieService: CookieService,
    private authService: AuthenticationService , private router :Router) { }


  @ViewChild('header') header!: ElementRef; // getting header tag from view template

  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened: boolean = false;
  isLoggedIn: boolean = false;
  loggedInUserInfo!: loggedInUserInfo;





  ngOnInit(): void {

    this.loggedInUserInstance.getLoggedInStatus().subscribe(booleanValue => {
      this.isLoggedIn = booleanValue;
    })

    this.loggedInUserInstance.getLoggedInUserInfo().subscribe(userInfo => {
      this.loggedInUserInfo = userInfo;
    })

    this.setLoggedInValue();
    const token = this.cookieService.get("token");
    if (token) {
      this.authService.getDataOfUser(token).subscribe(data => {
        this.loggedInUserInstance.setLoggedInUserInfo(data);
        console.log(data);
      });
    }
    console.log(this.loggedInUserInstance.getLoggedInStatus());
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
  openAndCloseMenuBurger() {

    this.isOpened = !this.isOpened;

  }

  logout() {
    this.loggedInUserInstance.setLoggedInStatus(false);
    this.cookieService.delete("token");
    this.router.navigate(["/home"]);

  }

}

