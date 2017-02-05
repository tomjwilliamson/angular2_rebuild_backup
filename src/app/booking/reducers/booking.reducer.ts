import { ActionReducer, Action } from '@ngrx/store';

export const UPDATE_BOOKING_OBJECT = 'UPDATE_BOOKING_OBJECT';
export const GET_JOURNEY_LEG = 'GET_JOURNEY_LEG';
export const UPDATE_JOURNEY_LEG = 'UPDATE_JOURNEY_LEG';

const initState = {
  bookingDeatils: {
    bookingType: '',
    bookingReference: '',
    journeyLegDetails: [],
    journeyIncompleteId: '',
    currentBooking: {}
  }
};

export const bookingReducer = (state = initState, action: Action) => {

  console.log(state);

 switch (action.type) {

    case 'UPDATE_BOOKING_OBJECT':
      state.bookingDeatils.currentBooking = Object.assign({}, action.payload);
      return state;

    // case 'GET_JOURNEY_LEG':
    //   return state.bookingDeatils.journeyLegDetails;

    case 'UPDATE_JOURNEY_LEG':
      state.bookingDeatils.journeyLegDetails = Object.assign({}, action.payload);
      return state;

     default:
      return state;
  }

};
