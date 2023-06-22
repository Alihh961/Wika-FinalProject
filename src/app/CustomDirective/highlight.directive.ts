// here we create a directive and we use type Renderer2 instead of nativeElement for many reason(security reason for example)

import { Directive ,ElementRef , HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {

   }

   ngOnInit(){

    // this.renderer.addClass(this.element.nativeElement,"test");
    // this.renderer.setAttribute(this.element.nativeElement,"class","classTEst");
   }
   @HostListener('click') display(){
   this.renderer.setStyle(this.element.nativeElement,'opacity',"0");
   this.renderer.setStyle(this.element.nativeElement,'transition',"2s");
   this.renderer.setStyle(this.element.nativeElement,'z-index','0');

  }
  @HostListener('mouseout') displays(){
    this.renderer.setStyle(this.element.nativeElement,'opacity',"1");
    this.renderer.setStyle(this.element.nativeElement,'transition',"2s");
   }

}
