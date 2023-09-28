import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BillComponent } from './bill.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store } from '@ngrx/store';
import { API_URL } from 'src/app/constants/settings.constants';
import { Ticket } from 'src/app/models/ticket.model';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { DateTimeFormatPipe } from 'src/app/pipes/date-time.pipes/date-time-format.pipe';
import { OrderSeatsByRowsPipe } from 'src/app/pipes/seat.pipes/order-seats-by-rows.pipe';
import { SeatListComponent } from '../seat-list/seat-list.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovieService } from 'src/app/services/movie/movie.service';
import { Seat } from 'src/app/models/seat.model';

describe('BillComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;
  let storeMock: Store<{ ticket: Ticket  }>;
  let routerMock: jasmine.SpyObj<Router>;
  let mockTicket: Ticket;
  let movieService: MovieService;

  beforeEach(() => {
    mockTicket = {
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

    storeMock = {
      select: jasmine.createSpy().and.returnValue(of({ ticket: {} })),
    } as any;

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [BillComponent, DateTimeFormatPipe, SeatListComponent, OrderSeatsByRowsPipe],
      imports: [ReactiveFormsModule, HttpClientTestingModule, MatCardModule, MatFormFieldModule],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: Router, useValue: routerMock },
        { provide: API_URL, useValue: API_URL },
        {
          provide: MovieService,
          useValue: jasmine.createSpyObj('MovieService', ['updateMovieSession']),
        }
      ],
    });

    fixture = TestBed.createComponent(BillComponent);
    component = fixture.componentInstance;
    movieService = TestBed.inject(MovieService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize the form controls', () => {
    expect(component.enteredSum).toBeDefined();
    expect(component.sumForm).toBeDefined();
  });

  it('should calculate total price correctly', () => {
    component.ticket = mockTicket;
    const totalPrice = component.calculateTotal();
    expect(totalPrice).toEqual('850.00');
  });

  it('should submit the form and navigate on valid input', () => {
    component.enteredSum.setValue('850.00');
    component.totalPrice = 850;
    component.onSubmit();
    expect(movieService.updateMovieSession).toHaveBeenCalledWith(component.ticket);
    expect(routerMock.navigate).toHaveBeenCalledWith(['./transaction-result', 0]);
  });
  
  it('should not submit the form on invalid input', () => {
    component.enteredSum.setValue('blah');
    component.onSubmit();
    expect(movieService.updateMovieSession).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should return null for a valid value', () => {
    component.enteredSum.setValue('123.45');
    const result = component.sumValueValidator(component.enteredSum);
    expect(result).toBeNull();
  });

  it('should return an error object for an invalid value', () => {
    component.enteredSum.setValue('invalid_value');
    const result = component.sumValueValidator(component.enteredSum);
    expect(result).toEqual({ invalidValue: true });
  });

  it('should return null for an empty value', () => {
    component.enteredSum.setValue('');
    const result = component.sumValueValidator(component.enteredSum);
    expect(result).toBeNull();
  });
  
  it('should return null for a valid sum', () => {
    component.totalPrice = 100;
    component.enteredSum.setValue(100);
    const result = component.sumValidator(component.enteredSum);
    expect(result).toBeNull();
  });

  it('should return an error object for an invalid sum', () => {
    component.totalPrice = 100;
    component.enteredSum.setValue(50);
    const result = component.sumValidator(component.enteredSum);
    expect(result).toEqual({ invalidSum: true });
  });

  it('should return null when value is null', () => {
    component.totalPrice = 100;
    component.enteredSum.setValue(null);
    const result = component.sumValidator(component.enteredSum);
    expect(result).toBeNull();
  });
});
