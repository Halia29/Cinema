import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { API_URL } from 'src/app/constants/settings.constants';
import { Movie } from 'src/app/models/movie.model';
import { Seat } from 'src/app/models/seat.model';
import { Ticket } from 'src/app/models/ticket.model';


@Injectable({
  providedIn: 'root'
})
export class MovieService {
  apiUrl: string;
  movies: Movie[];

  constructor(private http: HttpClient, @Inject(API_URL) apiUrl: string) {
    this.apiUrl = apiUrl;
  }

  getMovies(): Observable<Movie[]> {
    const url = `${this.apiUrl}/Movie/GetMovies`;

    return this.http.get<Movie[]>(url).pipe(
      catchError((error) => {
        console.error('GetMovies() error:', error);
        return of([]);
      })
    );
  }

  getMovie(title: string): Observable<Movie> {
    const url = `${this.apiUrl}/Movie/GetMovie/${title}`;

    return this.http.get<Movie>(url).pipe(
      catchError((error) => {
        console.error('GetMovie() error:', error);
        return of();
      })
    );
  }

  updateMovieSession(ticket: Ticket): void {
      const url = `${this.apiUrl}/Movie/UpdateMovie`;

      this.http.post(url, ticket)
      .subscribe(response => {
        console.log('Session updated successfully', response);
      }, error => {
        console.error('Error updating session', error);
      });
  }  

  getUsersTickets(currentUserEmail: string): Observable<Ticket[]> {    
    const url = `${this.apiUrl}/Movie/GetUsersMovies/${currentUserEmail}`;

    return this.http.get<Ticket[]>(url).pipe(
      catchError((error) => {
        console.error('GetUsersMovies() error:', error);
        return of();
      })
    );
  }
}
