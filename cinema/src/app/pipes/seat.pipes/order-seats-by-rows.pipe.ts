import { Pipe, PipeTransform } from '@angular/core';
import { Seat } from 'src/app/models/seat.model';

@Pipe({
  name: 'orderSeatsByRows',
  pure: false
})
export class OrderSeatsByRowsPipe implements PipeTransform {

  transform(selectedSeats: Seat[]): { [row: number]: Seat[] } {
    const seatsByRow: { [row: number]: Seat[] } = {};

    selectedSeats.forEach(chosenSeat => {
      if (!seatsByRow[chosenSeat.row]) {
        seatsByRow[chosenSeat.row] = [];
      }
      seatsByRow[chosenSeat.row].push(chosenSeat);
    });

    for (const row in seatsByRow) {
      seatsByRow[row].sort((a, b) => a.seat - b.seat);
    }

    return seatsByRow;
  }

}
