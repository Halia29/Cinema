import { Pipe, PipeTransform } from '@angular/core';
import { Seat } from '../../models/seat.model';

@Pipe({
  name: 'filterBySeat'
})
export class FilterBySeatPipe implements PipeTransform {
  transform(seats: Seat[], seatNum: number): Seat[] {
    return seats.filter(seat => seat.seat === seatNum);
  }
}
