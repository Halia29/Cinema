import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[goHome]'
})
export class GoHomeDirective {

  constructor(private router: Router) {}

  @HostListener('click') onClick(): void {
    this.router.navigate(['./home']);
  }

}
