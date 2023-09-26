import { createReducer, on } from '@ngrx/store';
import * as TicketActions from './../actions/ticket.actions';
import { initialTicketState, TicketState } from './../states/ticket.state';

const ticketReducer = createReducer(
  initialTicketState,
  on(TicketActions.setTicket, (state, { ticket }) => ({ ...state, ticket })),
  on(TicketActions.setSessionId, (state, { sessionId }) => ({ ...state, ticket: { ...state.ticket, sessionId } })),
  on(TicketActions.setCurrentUserEmail, (state, { currentUserEmail }) => ({ ...state, ticket: { ...state.ticket, currentUserEmail } })),
  on(TicketActions.setMovieTitle, (state, { title }) => ({ ...state, ticket: { ...state.ticket, title } })),
  on(TicketActions.setStartEndDate, (state, { startDate, endDate }) => ({ ...state, ticket: { ...state.ticket, startDateAndTime: startDate, endDateAndTime: endDate } })),
  on(TicketActions.setSeats, (state, { seats }) => ({ ...state, ticket: { ...state.ticket, seats } })),
);
export function reducer(state: TicketState | undefined, action: any) {
  return ticketReducer(state, action);
}
