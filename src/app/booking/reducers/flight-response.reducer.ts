import { ActionReducer, Action } from '@ngrx/store';
import { FlightAPIResponse } from '../models/flight-response.interface';

export const FLIGHT_RESPONSE = 'FLIGHT_RESPONSE';
export const GET_CURRENT_FLIGHT = 'GET_CURRENT_FLIGHT';

export const flightResponseReducer = (state = [], action: Action) => {

  switch (action.type) {
    case 'FLIGHT_RESPONSE':
      return [
        ...state,
        action.payload
      ];
    case 'GET_CURRENT_FLIGHT':
      return action.payload;
    default:
      return state;
  }

};
