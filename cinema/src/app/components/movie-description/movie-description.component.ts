import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie/movie.service';
import * as TicketActions from './../../actions/ticket.actions';
import { Store } from '@ngrx/store';
import { TicketState } from 'src/app/states/ticket.state';

@Component({
  selector: 'movie-description',
  templateUrl: './movie-description.component.html',
  styleUrls: ['./movie-description.component.css']
})
export class MovieDescriptionComponent implements OnInit{
  movies: Movie[];

  constructor(private movieService: MovieService, 
    private router: Router, 
    private store: Store<{ ticket: TicketState }>){}

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }  
}
