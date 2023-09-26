import { Seat } from "./seat.model";

export class Session{
    id: number;
    startTime: string; 
    endTime: string; 
    seats: Seat[];
  
    constructor(id: number, startTime: string, endTime: string, seats: Seat[]) {
      this.id = id;
      this.startTime = startTime;
      this.endTime = endTime;
      this.seats = seats;
    }
}
  