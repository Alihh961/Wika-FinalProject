import { Component , OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  constructor(private pageTitle: Title){}

ngOnInit(){
  this.pageTitle.setTitle("Contact");
}
}
