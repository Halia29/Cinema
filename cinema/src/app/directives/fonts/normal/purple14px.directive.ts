import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[normalPurple14px]'
})
export class Purple14pxDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'font-size', '14px');
    this.renderer.setStyle(this.el.nativeElement, 'color', '#654597');
    this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'normal');
  }

}
