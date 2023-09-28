import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material/tabs';
import { MovieSessionsComponent } from './movie-sessions.component';
import { Seat } from 'src/app/models/seat.model';
import { Session } from 'src/app/models/session.model';
import { Movie } from 'src/app/models/movie.model';
import { SeatsChartComponent } from '../seats-chart/seats-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatGridListModule } from '@angular/material/grid-list';
import { Store } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';
import { of } from 'rxjs';
import { API_URL } from 'src/app/constants/settings.constants';
import { FilterBySeatPipe } from 'src/app/pipes/seat.pipes/filter-by-seat.pipe';
import { TimeFormatPipe } from 'src/app/pipes/date-time.pipes/time-format.pipe';
import { DateFormatPipe } from 'src/app/pipes/date-time.pipes/date-format.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MovieSessionsComponent', () => {
  let component: MovieSessionsComponent;
  let fixture: ComponentFixture<MovieSessionsComponent>;
  let mockMovie1, mockMovie2: Movie;
  let mockSession1, mockSession2: Session;
  let mockSeat1, mockSeat2, mockSeat3: Seat;
  let storeMock: Store<{ ticket: Ticket  }>;

  beforeEach(() => {
    mockSeat1 = new Seat(1, 1, 250, false, true, '', false);
    mockSeat2 = new Seat(1, 2, 250, false, true, '', false);
    mockSeat3 = new Seat(10, 2, 350, true, true, '', false);

    mockSession1 = new Session(1, '09:00', '11:00', [mockSeat1, mockSeat2]);
    mockSession2 = new Session(2, '14:00', '17:00', [mockSeat3]);

    mockMovie1 = new Movie('horizontal_image_url', 
    'vertical_image_url', 
    'Movie', 
    'Description', 
    new Date('2023-10-01'),  
    new Date('2023-10-31'), 
    120, {
      '2023-10-01': [mockSession1],
      '2023-10-02': [mockSession2],
    });
    
    storeMock = {
      select: jasmine.createSpy().and.returnValue(of({ ticket: {} })),
    } as any;

    TestBed.configureTestingModule({
      declarations: [MovieSessionsComponent, SeatsChartComponent, FilterBySeatPipe, TimeFormatPipe, DateFormatPipe],
      imports: [MatTabsModule, HttpClientTestingModule, MatGridListModule, BrowserAnimationsModule],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: API_URL, useValue: API_URL },
      ]
    });
    fixture = TestBed.createComponent(MovieSessionsComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie1;
    fixture.detectChanges();
  });

  it('should create', () => {  
    expect(component).toBeTruthy();
  });

  
  it('getSessionDates method should return an array of session dates', () => {

    const dates = component.getSessionDates(component.movie.sessions);

    expect(Array.isArray(dates)).toBe(true);
    expect(dates).toEqual(['2023-10-01', '2023-10-02']);
  });
});
