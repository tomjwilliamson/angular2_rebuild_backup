export interface FlightAPIResponse {
  description: null;
  flightInfo: Object;
  flightStatusDetails: Array<FlightStatusObject>;
  responseStatus: Number;
  validationErrorMessages: null;
  validationErrors: Array<Object>;
}

export interface FlightStatusObject {
  airlineCode: String;
  airlineCodeShare: Array<Object>;
  airlineName: String;
  arrivalAirport: Object;
  arrivalDateTimeDetails: Object;
  departureAirport: Object;
  departureDateTimeDetails: Object;
  flightLeg: Number;
  flightNumber: String;
  isCodeShare: Boolean;
  isFinalDestination: null;
  isWetLease: Boolean;
}
