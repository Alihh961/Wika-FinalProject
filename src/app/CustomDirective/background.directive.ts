// Creating a custom directive 
import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[backgroundColorDirective]'
})

export class backgroundColorDirective implements OnInit{



    constructor(private element: ElementRef){
  
    }
    
    ngOnInit(){
        this.element.nativeElement.style.backgroundColor="red";

    }

   

}