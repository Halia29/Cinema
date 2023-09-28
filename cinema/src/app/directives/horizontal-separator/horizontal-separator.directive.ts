import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[horizontal-separator]'
})
export class HorizontalSeparatorDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'border-top', '1px solid rgba(103, 58, 183, 0.8)');
    this.renderer.setStyle(this.el.nativeElement, 'margin', '10px auto');
    this.renderer.setStyle(this.el.nativeElement, 'width', '95%');
  }

}
