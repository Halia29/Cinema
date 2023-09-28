import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SeatsChartComponent } from './seats-chart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { Seat } from 'src/app/models/seat.model';
import { FilterBySeatPipe } from 'src/app/pipes/seat.pipes/filter-by-seat.pipe';
import { Session } from 'src/app/models/session.model';
import { of } from 'rxjs';
import { Ticket } from 'src/app/models/ticket.model';
import * as TicketActions from './../../actions/ticket.actions';
import { Router } from '@angular/router';

describe('SeatsChartComponent', () => {
  let component: SeatsChartComponent;
  let fixture: ComponentFixture<SeatsChartComponent>;
  let authService: AuthService;
  let router: jasmine.SpyObj<Router>;
  let store: jasmine.SpyObj<Store>;
  let mockSeat1: Seat;
  let mockSeat2: Seat;
  let mockSeat3: Seat;

  beforeEach(() => {    
    mockSeat1 = new Seat(1, 1, 250, false, true, '', false);
    mockSeat2 = new Seat(1, 2, 250, false, true, '', false);
    mockSeat3 = new Seat(10, 2, 350, true, true, '', false);
    router = jasmine.createSpyObj('Router', ['navigate']);
    store = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    TestBed.configureTestingModule({
      declarations: [SeatsChartComponent, FilterBySeatPipe],
      imports: [HttpClientTestingModule, ReactiveFormsModule, MatGridListModule],
      providers: [
        { provide: AuthService, useValue: {} },
        { provide: Router, useValue: router },
        { provide: Store, useValue: store },
      ],
    });
    fixture = TestBed.createComponent(SeatsChartComponent);
    component = fixture.componentInstance;
    
    authService = TestBed.inject(AuthService);
    component.session = {
      id: 1, 
      startTime: '09:00', 
      endTime: '11:00',
      seats: [mockSeat1, mockSeat2]
    }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add and remove seats from selectedSeats', () => {
    const row = 1;
    const seat = 2;
    fixture.detectChanges();

    component.hasChosenSeat(row, seat);
    expect(component.selectedSeats).toEqual([mockSeat2]);

    component.hasChosenSeat(row, seat);
    expect(component.selectedSeats).not.toContain(mockSeat2);
  });

  it('should clear selectedSeats when unselectAllSeats is called', () => {
    component.selectedSeats = [mockSeat1, mockSeat2, mockSeat3 ];
    component.unselectAllSeats();
    expect(component.selectedSeats).toEqual([]);
  });

  it('should buy tickets and navigate to pay page', () => {
    const mockSeat1 = new Seat(1, 1, 250, false, true, '', false);
    const mockSeat2 = new Seat(1, 2, 250, false, true, '', false);
    const mockSeat3 = new Seat(10, 2, 350, true, true, '', false);

    const mockSession = new Session(1, '09:00', '11:00', [mockSeat1, mockSeat2, mockSeat3]);

    component.session = mockSession;
    component.selectedSeats = [mockSeat3];

    const mockTicket = { currentUserEmail: 'email@example.com' };
    store.select.and.returnValue(of({ ticket: mockTicket }));
    store.dispatch.and.callThrough();
    component.buyTickets();
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketActions.setSeats({ seats: [mockSeat3] })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketActions.setStartEndDate({
        startDate: mockSession.startTime,
        endDate: mockSession.endTime,
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      TicketActions.setSessionId({ sessionId: mockSession.id })
    );
    expect(router.navigate).toHaveBeenCalled();
  });
});
