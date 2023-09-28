/*import { ComponentFixture, TestBed} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MyTicketsComponent } from './my-tickets.component';
import { Store, StoreModule } from '@ngrx/store';
import { TicketState } from 'src/app/states/ticket.state';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Ticket } from 'src/app/models/ticket.model';
import { Seat } from 'src/app/models/seat.model';
import { RouterTestingModule } from '@angular/router/testing';
import { API_URL } from 'src/app/constants/settings.constants';
import { BehaviorSubject, of } from 'rxjs';
import { DateFormatPipe } from 'src/app/pipes/date-time.pipes/date-format.pipe';
import { TimeFormatPipe } from 'src/app/pipes/date-time.pipes/time-format.pipe';
import { DateTimeFormatPipe } from 'src/app/pipes/date-time.pipes/date-time-format.pipe';
import { SeatListComponent } from '../seat-list/seat-list.component';
import { OrderSeatsByRowsPipe } from 'src/app/pipes/seat.pipes/order-seats-by-rows.pipe';

describe('MyTicketsComponent', () => {
  let component: MyTicketsComponent;
  let fixture: ComponentFixture<MyTicketsComponent>;
  let store: jasmine.SpyObj<Store>;
  let movieService: jasmine.SpyObj<MovieService>;
  let mockTicket1, mockTicket2: Ticket;
  let mockTickets: Ticket[];

  beforeEach( () => {
    store = jasmine.createSpyObj('Store', ['select']);
    movieService = jasmine.createSpyObj('MovieService', ['getUsersTickets']);
    mockTicket1 = {
      title: 'Movie1',
      sessionId: 0,
      currentUserEmail: 'current@user.mail',
      startDateAndTime: '',
      endDateAndTime: '',
      seats: [
        new Seat (1, 1, 250, false, true, '', false),        
        new Seat (1, 2, 250, false, true, '', false),        
        new Seat (10, 2, 350, true, true, '', false)
      ]
    }
    
    mockTicket2 = {
      title: 'Movie2',
      sessionId: 1,
      currentUserEmail: 'current@user.mail',
      startDateAndTime: '',
      endDateAndTime: '',
      seats: [
        new Seat (1, 1, 250, false, true, '', false),        
        new Seat (1, 2, 250, false, true, '', false),        
        new Seat (10, 2, 350, true, true, '', false)
      ]
    }
    mockTickets = [mockTicket1, mockTicket2];

    TestBed.configureTestingModule({
      declarations: [MyTicketsComponent, 
        NavigationBarComponent, DateFormatPipe, TimeFormatPipe, DateTimeFormatPipe,SeatListComponent, OrderSeatsByRowsPipe],
      imports: [RouterTestingModule, 
        HttpClientTestingModule, 
        MatToolbarModule,
        MatIconModule, 
        MatMenuModule, 
        MatCardModule],
      providers: [
        { provide: Store, useValue: store },
        { provide: MovieService, useValue: movieService },
        { provide: API_URL, useValue: API_URL }]
    });
    fixture = TestBed.createComponent(MyTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    store.select.and.returnValue(of({currentUserEmail: 'test@email.com'}));
    expect(component).toBeTruthy();
  });
  
});
*/

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTicketsComponent } from './my-tickets.component';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Ticket } from 'src/app/models/ticket.model';
import { TicketState } from 'src/app/states/ticket.state';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { API_URL } from 'src/app/constants/settings.constants';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Seat } from 'src/app/models/seat.model';

describe('MyTicketsComponent', () => {
  let component: MyTicketsComponent;
  let fixture: ComponentFixture<MyTicketsComponent>;
  let mockStore: jasmine.SpyObj<Store>;
  let mockMovieService: jasmine.SpyObj<MovieService>;

  beforeEach(() => {
    mockStore = jasmine.createSpyObj('Store', ['select']);
    mockMovieService = jasmine.createSpyObj('MovieService', ['getUsersTickets']);

    TestBed.configureTestingModule({
      declarations: [MyTicketsComponent, NavigationBarComponent],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: MovieService, useValue: mockMovieService },
        { provide: API_URL, useValue: API_URL}
      ],
      imports: [ HttpClientTestingModule, 
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MyTicketsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set currentUserEmail and tickets on ngOnInit', () => {
    const currentUserEmail = 'email@example.com';
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
    const mockTickets: Ticket[] = [mockTicket];
    mockStore.select.and.returnValue(of({ currentUserEmail }));
    mockMovieService.getUsersTickets.and.returnValue(of(mockTickets));

    component.ngOnInit();

    expect(component.currentUserEmail).toBe(currentUserEmail);
    expect(component.tickets).toBe(mockTickets);
  });
});
