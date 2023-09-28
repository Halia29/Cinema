import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FullMovieInfoComponent } from './full-movie-info.component';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { Seat } from 'src/app/models/seat.model';
import { Session } from 'src/app/models/session.model';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { API_URL } from 'src/app/constants/settings.constants';
import { MovieSessionsComponent } from '../movie-sessions/movie-sessions.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { SeatsChartComponent } from '../seats-chart/seats-chart.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TimeFormatPipe } from 'src/app/pipes/date-time.pipes/time-format.pipe';
import { DateTimeFormatPipe } from 'src/app/pipes/date-time.pipes/date-time-format.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-time.pipes/date-format.pipe';
import { FilterBySeatPipe } from 'src/app/pipes/seat.pipes/filter-by-seat.pipe';

describe('FullMovieInfoComponent', () => {
  let component: FullMovieInfoComponent;
  let fixture: ComponentFixture<FullMovieInfoComponent>;
  let movieService: jasmine.SpyObj<MovieService>;
  let store: jasmine.SpyObj<Store>;

  beforeEach(() => {
    movieService = jasmine.createSpyObj('MovieService', ['getMovie']);
    store = jasmine.createSpyObj('Store', ['select']);

    TestBed.configureTestingModule({
      declarations: [FullMovieInfoComponent, 
        NavigationBarComponent, 
        MovieSessionsComponent, 
        SeatsChartComponent,
        TimeFormatPipe, 
        DateTimeFormatPipe, 
        DateFormatPipe, 
        FilterBySeatPipe],
      imports: [HttpClientTestingModule, 
        MatToolbarModule, 
        MatIconModule, 
        MatMenuModule, 
        MatTabsModule, 
        MatGridListModule, 
        BrowserAnimationsModule],
      providers: [
        { provide: MovieService, useValue: movieService },
        { provide: Store, useValue: store },
        { provide: API_URL, useValue: API_URL}
      ],
    });

    fixture = TestBed.createComponent(FullMovieInfoComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movie information on ngOnInit', () => {
    const mockTicketTitle = 'Movie';
    const mockTicket = {
      title: 'Movie',
      sessionId: 0,
      currentUserEmail: '',
      startDateAndTime: '',
      endDateAndTime: '',
      seats: [
        new Seat (1, 1, 250, false, true, '', false),        
        new Seat (1, 2, 250, false, true, '', false),        
        new Seat (10, 2, 350, true, true, '', false)
      ]
    }

    const mockSeat1 = new Seat(1, 1, 250, false, true, '', false);
    const mockSeat2 = new Seat(1, 2, 250, false, true, '', false);
    const mockSeat3 = new Seat(10, 2, 350, true, true, '', false);

    const mockSession1 = new Session(1, '09:00', '11:00', [mockSeat1, mockSeat2]);
    const mockSession2 = new Session(2, '14:00', '17:00', [mockSeat3]);

    const mockMovie = new Movie('horizontal_image_url', 
    'vertical_image_url', 
    'Movie', 
    'Description', 
    new Date('2023-10-01'),  
    new Date('2023-10-31'), 
    120, {
      '2023-10-01': [mockSession1],
      '2023-10-02': [mockSession2],
    });
    store.select.and.returnValue(of({ title: mockTicketTitle }));
    movieService.getMovie.and.returnValue(of(mockMovie));

    fixture.detectChanges(); 
    expect(component.movie).toEqual(mockMovie);
    expect(movieService.getMovie).toHaveBeenCalledWith(mockTicketTitle);
  });
});
