import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import { TicketState } from 'src/app/states/ticket.state';

@Component({
  selector: 'app-full-movie-info',
  templateUrl: './full-movie-info.component.html',
  styleUrls: ['./full-movie-info.component.css']
})
export class FullMovieInfoComponent implements OnInit{
  movie: Movie;

  constructor(private movieService: MovieService,  
    private store: Store<{ ticket: TicketState }>){}

  ngOnInit(): void {
    this.store.select(state => state.ticket.ticket).subscribe(ticket => {
      this.movieService.getMovie(ticket.title).subscribe((movie: Movie) => {
        this.movie = movie;
      });      
    });
  }
}
