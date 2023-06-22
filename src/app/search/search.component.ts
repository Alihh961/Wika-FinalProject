import { Component, EventEmitter,Output } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

searchInputValue: any = "";

// search input value event
@Output()
searchInputValueEvent: EventEmitter<any> = new EventEmitter<any>();

onSearchValueChange(){
  this.searchInputValueEvent.emit(this.searchInputValue);
}

}
