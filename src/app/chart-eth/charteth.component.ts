import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, Renderer2 } from '@angular/core';
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


  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.displayNoneBrandingLogo();
  }


  displayNoneBrandingLogo(): void {
    const style = '#brandingLogo { display: none; }';
    const styleElement = this.renderer.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(this.renderer.createText(style));
    this.renderer.appendChild(document.head, styleElement);
  }


  
  //!  We add methods in ngAfterViewInit to ensures that the view is fully initialized and the necessary DOM elements, like chartContainer, are accessible. It allows us to perform chart-related operations after the view has been set up correctly.
  ngAfterViewInit(): void {

    this.addingETHChart();

  }
  addingETHChart() {
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const days = [];

    for (let i = 0; i < 7; i++) {

      const Today = new Date();
      Today.setDate(Today.getDate() - i);
      const Day = Today.getDate();
      const Month = Today.getMonth() + 1;
      const Year = Today.getFullYear();
      const StringFormat = Day.toString() + "-" + monthNames[Month - 1] + "-" + Year.toString();

      days.push(StringFormat);
    };

    this.chartInstance = new JSC.Chart(this.chartContainer.nativeElement, {
      type: "line",
      series: [{
        points: [{ x: days[0] + " (Today)", y: 550 }, { x: days[1], y: 558 }, { x: days[2], y: 565 }, { x: days[3], y: 555 }, { x: days[4], y: 550 }, { x: days[5], y: 548 }, { x: days[6], y: 540 }]
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

