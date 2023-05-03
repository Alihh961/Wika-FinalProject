import { Component, ElementRef, ViewChild, AfterViewInit, asNativeElements, HostListener } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],

})
export class HeaderComponent implements AfterViewInit {

  constructor() { }
  // @ViewChild('menuburgericon', { static: false }) menuburgericon: ElementRef | undefined;
  // @ViewChild('menuList', { static: false }) menuList: ElementRef | undefined;

  @ViewChild('header') header!: ElementRef; // getting header tag from view template

  logoSource: string = './assets/imgs/WIKA_Logo.png';
  isOpened: boolean = false;

  ngAfterViewInit(): void {
    
  }

  ngOnInit() {}

  @HostListener('window:scroll')// listen to the scroll event;

  onWindowScroll() {
    const headerElement = this.header.nativeElement;
    if (window.scrollY !== 0) {

      headerElement.classList.add("onScroll");

    } else{
      headerElement.classList.remove("onScroll");
    }
  }
  openAndCloseMenuBurger() {

    this.isOpened = !this.isOpened;

  }




}

