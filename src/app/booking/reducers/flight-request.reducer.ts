import { ActionReducer, Action } from '@ngrx/store';
import { FlightAPIResponse } from '../models/flight-response.interface';

export const FLIGHT_REQUEST = 'FLIGHT_REQUEST';

export const flightRequestReducer = (state = [], action: Action) => {

  switch (action.type) {
    case 'FLIGHT_REQUEST':
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }

};
