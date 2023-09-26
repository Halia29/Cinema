import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Seat } from 'src/app/models/seat.model';
import { Ticket } from 'src/app/models/ticket.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TicketState } from 'src/app/states/ticket.state';

@Component({
  selector: 'bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent {
  ticket: Ticket;
  totalPrice: number;
  enteredSum: FormControl;
  sumForm: FormGroup;
  wasSubmitted: boolean;

  constructor(private store: Store<{ ticket: TicketState }>,
     private formBuilder: FormBuilder,
     private movieService: MovieService,
     private router: Router) {
    this.enteredSum = new FormControl('', [Validators.required, this.sumValueValidator, this.sumValidator.bind(this)]); 
    this.sumForm = formBuilder.group({
      enteredSum: this.enteredSum
    });
    this.wasSubmitted = false;
    this.store.select(state => state.ticket.ticket).subscribe(ticket => {
      this.ticket = ticket;
    });
  }

  calculateTotal() {
    this.totalPrice = this.ticket.seats.reduce((total, seat) => total + seat.price, 0);
    return this.totalPrice.toFixed(2);
  }

  onSubmit(){
    this.wasSubmitted = true;
    if(this.sumForm.valid){
      this.movieService.updateMovieSession(this.ticket);
      this.router.navigate(['./transaction-result', this.enteredSum.value - this.totalPrice]);
    }
  }

  sumValueValidator(control: FormControl) : { [s: string]: boolean } | null {
    const value = control.value;
    const pattern = /^(\d+([.]\d{1,2})?)?$/;

    if (!pattern.test(value)) {
      return { invalidValue: true }; 
    }

    return null; 
  }

  sumValidator(control: FormControl) : { [s: string]: boolean } | null {
    const value = control.value;

    if (this.totalPrice > value && value) {
      return { invalidSum: true }; 
    }

    return null; 
  }

}
