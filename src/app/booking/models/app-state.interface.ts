import { FlightAPIRequest } from './flight-request.interface';

import { BookingState } from './booking.interface';
import { UserToken } from './user-token.interface';


export interface AppState {

  flightDetails: {
    flightRequest: FlightAPIRequest;
    flightResponse: Object;
    flightFinalDestination: String;
  };
  bookingDeatils: {
    bookingType: String;
    bookingReference: String;
    journeyLegDetails: Array<JourneyLegDetails>;
    journeyIncompleteId: String;
    currentBooking: BookingState;
  };
  userDetails: {
    userLoggedIn: Boolean;
    userHasPassword: Boolean;
    currentUser: Object;
    userToken: UserToken;
  };
  appDetails: {
    appVersion: String;
    visiblePanel: Number;
  };

}

export interface JourneyLegDetails {
  journeyId: Number;
  journeyType: Number;
  journeyDirection: Number;
}
