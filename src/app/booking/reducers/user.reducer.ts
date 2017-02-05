import { ActionReducer, Action } from '@ngrx/store';

export const UPDATE_TOKEN = 'UPDATE_TOKEN';
export const UPDATE_USER = 'UPDATE_USER';

const initState = {
  userDetails: {
    userLoggedIn: false,
    userHasPassword: false,
    currentUser: {},
    userToken: {}
  }
};

export const userReducer = (state = initState, action: Action) => {

  console.log(state);

 switch (action.type) {

    case 'UPDATE_TOKEN':
      state.userDetails.userToken = Object.assign({}, { token: action.payload });
      return state;

    // case 'GET_JOURNEY_LEG':
    //   return state.bookingDeatils.journeyLegDetails;

    case 'UPDATE_USER':
      state.userDetails.currentUser = Object.assign({}, action.payload);
      return state;

     default:
      return state;
  }

};
