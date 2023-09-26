import { Component, Input } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Session } from 'src/app/models/session.model';

@Component({
  selector: 'movie-sessions',
  templateUrl: './movie-sessions.component.html',
  styleUrls: ['./movie-sessions.component.css']
})
export class MovieSessionsComponent {
  @Input() movie: Movie;

  constructor(){ 
  }

  getSessionDates(sessions: { [date: string]: Session[] }): string[] {
    return Object.keys(sessions);
  }
}
