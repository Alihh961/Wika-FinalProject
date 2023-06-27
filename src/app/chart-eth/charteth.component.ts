import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import * as JSC from "jscharting";

@Component({
  selector: 'app-charteth',
  templateUrl: './charteth.component.html',
  styleUrls: ['./charteth.component.scss']
})
export class ChartethComponent implements AfterViewInit {



  @ViewChild("chartContainer") chartContainer!: ElementRef;
  @ViewChild("chartLabel") chartLabel!: ElementRef;
  chartInstance !: JSC.Chart;


  constructor() { }

  ngAfterViewInit(): void {

    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const days = [];

    for(let i=0 ; i < 7 ; i++){

      const Today = new Date();
      Today.setDate(Today.getDate() - i);
      const Day = Today.getDate();
      const Month = Today.getMonth() + 1;
      const Year = Today.getFullYear();
      const StringFormat = Day.toString() +"-"+ monthNames[Month-1] +"-"+ Year.toString();
      
      days.push(StringFormat) ;
    };

    this.chartInstance = new JSC.Chart(this.chartContainer.nativeElement, {
      type: "line",
      series: [{
        points: [{ x: days[0]+" (Today)", y: 550 }, { x: days[1], y: 558 }, { x: days[2], y: 565 }, { x: days[3], y: 555 }, { x: days[4], y: 550 }, { x: days[5], y: 548 }, { x: days[6], y: 540 }]
      }]
    });
    // JSC.label(this.chartLabel.nativeElement , "");
  }

  ngOnDistroy() {
    if (this.chartInstance) {
      this.chartInstance.destroy();
    }
  }

}

