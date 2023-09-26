import { createAction, props } from '@ngrx/store';
import { Ticket } from 'src/app/models/ticket.model';
import { Seat } from 'src/app/models/seat.model';

export const setTicket = createAction('[Ticket] Set Ticket', props<{ ticket: Ticket }>());
export const setMovieTitle = createAction('[Ticket] Set Movie Title', props<{ title: string }>());
export const setStartEndDate = createAction('[Ticket] Set Start and End Date', props<{ startDate: string, endDate: string }>());
export const setSessionId = createAction('[Ticket] Set Session Id', props<{ sessionId: number }>());
export const setCurrentUserEmail = createAction('[Ticket] Set Current User Email', props<{ currentUserEmail: string }>());
export const setSeats = createAction('[Ticket] Set Seats', props<{ seats: Seat[] }>());
