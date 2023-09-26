import { Component, Input } from '@angular/core';
import { Seat } from 'src/app/models/seat.model';

@Component({
  selector: 'seat-list',
  templateUrl: './seat-list.component.html',
  styleUrls: ['./seat-list.component.css']
})
export class SeatListComponent {
  @Input() seatsByRow: { [row: number]: Seat[] };

  formatSeats(row: string, seats: Seat[]): string {
    const seatNumbers = seats.map(seat => seat.seat).join(', ');
    return `Row ${row} / Seats: ${seatNumbers}`;
  }
  calculateTotalPriceForOneRowSeats(seats: Seat[]): string {
    const totalPrice = seats.reduce((total, seat) => total + seat.price, 0);
    return totalPrice.toFixed(2);
  }
  
}
