import { Seat } from "./seat.model";

export class Ticket {
    title: string;
    sessionId: number;
    currentUserEmail: string;
    startDateAndTime: string;
    endDateAndTime: string;
    seats: Seat[];
}