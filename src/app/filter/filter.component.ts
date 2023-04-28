import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {


  // inputting the value of the filter from gallery component to filter Component(two way binding)
  @Input() all: number = 0;
  @Input() transferable: number = 0;
  @Input() non_transferable: number = 0;

  //  radio button all is checked by default
  filterRadioSelectedValue: string = "all";

  //  create an event to send the value to parent component(gallery) when the radio input is changed
  @Output()
  filterSelectionChangedEvent: EventEmitter<string> = new EventEmitter<string>();


  onFilterSelectionChanged() {

    this.filterSelectionChangedEvent.emit(this.filterRadioSelectedValue);

  }
}
