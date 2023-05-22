import { Component, ElementRef, ViewChild, AfterViewInit, asNativeElements, HostListener, Input, AfterViewChecked } from '@angular/core';
import { LoginBooleanService } from '../services/login-boolean.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewChecked {

  constructor(private loginServiceInstance :LoginBooleanService) { }


  @ViewChild('header') header!: ElementRef; // getting header tag from view template

  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened: boolean = false;
  receivedLoginStatus !:boolean;

  ngOnInit(){
    this.loginServiceInstance.getValue().subscribe(
      (data=>{
        this.receivedLoginStatus = data;
        console.log(data+"header component loginstatus");
      })
    )
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

