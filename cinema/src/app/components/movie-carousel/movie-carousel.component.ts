import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Movie } from 'src/app/models/movie.model';
import { Router } from '@angular/router';
import * as TicketActions from './../../actions/ticket.actions';
import { Store } from '@ngrx/store';
import { TicketState } from 'src/app/states/ticket.state';

@Component({
  selector: 'movie-carousel',
  templateUrl: './movie-carousel.component.html',
  styleUrls: ['./movie-carousel.component.css']
})
export class MovieCarouselComponent implements OnInit{
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
