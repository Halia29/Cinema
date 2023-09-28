import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MovieDescriptionComponent } from './movie-description.component';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Seat } from 'src/app/models/seat.model';
import { Session } from 'src/app/models/session.model';

describe('MovieDescriptionComponent', () => {
  let component: MovieDescriptionComponent;
  let fixture: ComponentFixture<MovieDescriptionComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let store: jasmine.SpyObj<Store>;
  const mockSeat1 = new Seat(1, 1, 250, false, true, '', false);
  const mockSeat2 = new Seat(1, 2, 250, false, true, '', false);
  const mockSeat3 = new Seat(10, 2, 350, true, true, '', false);

  const mockSession1 = new Session(1, '09:00', '11:00', [mockSeat1, mockSeat2]);
  const mockSession2 = new Session(2, '14:00', '17:00', [mockSeat3]);

  const mockMovie1 = new Movie('horizontal_image_url', 
  'vertical_image_url', 
  'Movie', 
  'Description', 
  new Date('2023-10-01'),  
  new Date('2023-10-31'), 
  120, {
    '2023-10-01': [mockSession1],
    '2023-10-02': [mockSession2],
  });

  const mockMovie2 = new Movie('horizontal_image_url_2', 
  'vertical_image_url_2', 
  'Movie2', 
  'Description2', 
  new Date('2023-08-01'),  
  new Date('2023-08-31'), 
  120, {
    '2023-08-02': [mockSession2],
    '2023-08-03': [mockSession1]
  });
  const mockMovies: Movie[] = [
    mockMovie1,
    mockMovie2,
  ];

  beforeEach(() => {
    movieService = jasmine.createSpyObj('MovieService', ['getMovies']);
    store = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      declarations: [MovieDescriptionComponent],
      imports: [RouterTestingModule], 
      providers: [
        { provide: MovieService, useValue: movieService },
        { provide: Store, useValue: store },
      ],
    });

    fixture = TestBed.createComponent(MovieDescriptionComponent);
    component = fixture.componentInstance;
  });

  it('should create the MovieDescriptionComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display movies on initialization', () => {
    movieService.getMovies.and.returnValue(of(mockMovies));
    component.ngOnInit();

    expect(movieService.getMovies).toHaveBeenCalled();
    expect(component.movies).toEqual(mockMovies);
  });
});