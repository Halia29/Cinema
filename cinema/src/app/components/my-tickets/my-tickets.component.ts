import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Seat } from 'src/app/models/seat.model';
import { Ticket } from 'src/app/models/ticket.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TicketState } from 'src/app/states/ticket.state';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit{
  currentUserEmail: string;
  tickets: Ticket[] = [];

  constructor(private store: Store<{ ticket: TicketState }>, private movieService: MovieService){}

  ngOnInit(){
    this.store.select(state => state.ticket.ticket).subscribe(ticket => {
      this.currentUserEmail = ticket.currentUserEmail;
    });
    
    this.movieService.getUsersTickets(this.currentUserEmail).subscribe((tickets: Ticket[]) => {
      this.tickets = tickets;
    });
  }
}
