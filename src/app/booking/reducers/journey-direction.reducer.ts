import { ActionReducer, Action } from '@ngrx/store';
import { BookingState } from '../models/booking.interface';

export const GET_JOURNEY_DIRECTION = 'GET_JOURNEY_DIRECTION';
export const UPDATE_JOURNEY_DIRECTION = 'UPDATE_JOURNEY_DIRECTION';

export const journeyDirectionReducer = (state = [], action: Action) => {

  switch (action.type) {

    case GET_JOURNEY_DIRECTION:
      return state;

    case UPDATE_JOURNEY_DIRECTION:
      return state = action.payload;

    default:
      return state;
  }

};
