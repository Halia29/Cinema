import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BillComponent } from './../bill/bill.component';
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

import { PaymentComponent } from './payment.component';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';

describe('PaymentComponent', () => {
  let component: BillComponent;
  let fixture: ComponentFixture<BillComponent>;
  let storeMock: Store<{ ticket: Ticket  }>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(() => {
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
