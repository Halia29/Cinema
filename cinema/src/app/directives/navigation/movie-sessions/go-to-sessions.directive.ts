import { Directive, HostListener, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as TicketActions from './../../../actions/ticket.actions';

@Directive({
  selector: '[goToSessions]'
})
export class GoToSessionsDirective {
  @Input('goToSessions') title: string; 

  constructor(private store: Store, private router: Router) {}

  @HostListener('click') onClick(): void {
    if (this.title) {
      this.store.dispatch(TicketActions.setMovieTitle({ title: this.title }));
      this.router.navigate(['/movie']);
    }
  }

}
