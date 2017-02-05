import { ActionReducer, Action } from '@ngrx/store';
import { BookingState } from '../models/booking.interface';

import { AppState } from '../models/app-state.interface';

export const GET_JOURNEY_LEG = 'GET_JOURNEY_LEG';
export const UPDATE_JOURNEY_LEG = 'UPDATE_JOURNEY_LEG';
// export const GET_JOURNEY_DIRECTION = 'GET_JOURNEY_DIRECTION';
// export const UPDATE_JOURNEY_DIRECTION = 'UPDATE_JOURNEY_DIRECTION';

// NOTE
// SDS = []
// ABC = 1

const initState = {
  bookingDeatils: {
    bookingType: '',
    bookingReference: '',
    journeyLegDetails: [],
    journeyIncompleteId: '',
    currentBooking: {}
  }
};

export const journeyLegDetailsReducer = (state = initState, action: Action) => {

  switch (action.type) {

    case GET_JOURNEY_LEG:
      return state;

    case UPDATE_JOURNEY_LEG:
      return state.bookingDeatils.journeyLegDetails = Object.assign({}, action.payload);

    default:
      return state;
  }

};
