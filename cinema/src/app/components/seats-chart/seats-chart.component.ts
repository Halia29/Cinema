import { Component, Input, OnInit} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Seat } from 'src/app/models/seat.model';
import { Session } from 'src/app/models/session.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import * as TicketActions from './../../actions/ticket.actions';
import { Store } from '@ngrx/store';
import { TicketState } from 'src/app/states/ticket.state';
import { first, forkJoin, map } from 'rxjs';

@Component({
  selector: 'seats-chart',
  templateUrl: './seats-chart.component.html',
  styleUrls: ['./seats-chart.component.css']
})
export class SeatsChartComponent implements OnInit {
  @Input() session: Session;
  seats: number[] = [];
  selectedSeats: Seat[] = [];
  putTicketsInBasketForm: FormGroup;

  constructor(private authService:  AuthService,
    private router: Router,
    private store: Store<{ ticket: TicketState }>){ }

  ngOnInit(){
    this.seats = Array.from(new Set(this.session.seats.map(seat => seat.seat))); 
  }

  hasChosenSeat(row: number, seat: number): void{
    const isSeatChosen = this.selectedSeats.some(chosenSeat => chosenSeat.row === row && chosenSeat.seat === seat);
    const chosenSeat = this.session.seats.find(chosenSeat => chosenSeat.row === row && chosenSeat.seat === seat);
    const isSeatAvailable = chosenSeat && chosenSeat.isAvailable;
    if (!isSeatChosen && isSeatAvailable) {
      this.selectedSeats.push(chosenSeat);
    }
    if(isSeatChosen){
      this.selectedSeats = this.selectedSeats.filter(seat => seat !== chosenSeat);
    }
  }

  unselectAllSeats(){
    this.selectedSeats = [];
  }

  buyTickets(){
    const observables = this.selectedSeats.map((seat, i) =>
      this.store.select(state => state.ticket.ticket).pipe(
        first(), map(ticket => {
          seat.customerEmail = ticket.currentUserEmail;
          return seat;
        })
      )
    );
    forkJoin(observables).subscribe(updatedSeats => {
      this.selectedSeats = updatedSeats;
    });
    this.store.dispatch(TicketActions.setSeats({seats: this.selectedSeats}));
    this.store.dispatch(TicketActions.setStartEndDate({startDate: this.session.startTime, endDate: this.session.endTime}));
    this.store.dispatch(TicketActions.setSessionId({sessionId: this.session.id}));
    this.router.navigate(['./pay']);
  }
  
}
