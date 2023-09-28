import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatListComponent } from './seat-list.component';
import { Seat } from 'src/app/models/seat.model';

describe('SeatListComponent', () => {
  let component: SeatListComponent;
  let fixture: ComponentFixture<SeatListComponent>;
  let mockSeats: Seat[];

  beforeEach(() => {
    
    const mockSeat1 = new Seat(1, 1, 250, false, true, '', false);
    const mockSeat2 = new Seat(1, 2, 250, false, true, '', false);
    mockSeats = [mockSeat1, mockSeat2];
    TestBed.configureTestingModule({
      declarations: [SeatListComponent]
    });
    fixture = TestBed.createComponent(SeatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format seats correctly', () => {
    const formattedSeats = component.formatSeats('1', mockSeats);
    expect(formattedSeats).toBe('Row 1 / Seats: 1, 2');
  });

  it('should calculate total price for one row of seats correctly', () => {
    const totalPrice = component.calculateTotalPriceForOneRowSeats(mockSeats);
    expect(totalPrice).toBe('500.00');
  });
});
