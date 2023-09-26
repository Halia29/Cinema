import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[purpleShadow]'
})
export class PurpleShadowDirective  implements OnInit {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', '4px 4px 6px 4px rgba(103, 58, 183, 0.2)');
  }
}
