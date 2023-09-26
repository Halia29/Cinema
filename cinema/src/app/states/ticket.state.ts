import { Ticket } from '../models/ticket.model';

export interface TicketState {
  ticket: Ticket
}

export const initialTicketState: TicketState = {
  ticket: {
    title: '',
    sessionId: 0,
    currentUserEmail: '',
    startDateAndTime: '',
    endDateAndTime: '',
    seats: []
  }
};