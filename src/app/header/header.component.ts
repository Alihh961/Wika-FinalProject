import { Component, ElementRef, ViewChild, AfterViewInit, asNativeElements, HostListener, Input, AfterViewChecked } from '@angular/core';
import { LoginBooleanService } from '../services/login-boolean.service';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';


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
  isLoggedIn !:boolean;

  ngOnInit():void{
    this.loginServiceInstance.getValue().subscribe(
      (data=>{
        this.isLoggedIn = data;
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

  logOut():void{
    this.loginServiceInstance.setValue(false);
  }



}

