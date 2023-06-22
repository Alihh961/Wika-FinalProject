import { Component , OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

constructor(private pageTitle: Title){}

ngOnInit(){
  this.pageTitle.setTitle("Page Not Found");
}

}
