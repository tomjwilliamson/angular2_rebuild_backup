import { AdditionalFlight } from './additional-flight-info.interface';

export interface BookingState {
  userId: String;
  bookingReference: String;
  bookingJourney: Array<BookingJourneyItem>;
  timeSlotReservation: TimeSlotReseravtionItem;
  makePaymentRequest: Object;
  bookingCompletion: BookingCompleteItems;
};

export interface BookingJourneyItem {
  addOnProductType: Array<Number>;
  journeyDirection: Number;
  bookingReference: String;
  flightData: BookingFlightData;
  collectionLocation: Object;
  collectionDateTimeUTC: String;
  collectionTimeSlotMinutes: String;
  deliveryLocation: Object;
  deliveryDateTimeUTC: String;
  passenger: Array<Object>;
  note: NoteItem;
};

export interface BookingFlightData {
  flightInfoId: String;
  requestFlightNumber: String;
  requestDepartureDate: String;
  airportCityName: String;
  flightLeg: Number;
  additionalFlightDataRequest: AdditionalFlight;
}

export interface TimeSlotReseravtionItem {
  timeSlotReservationId: String;
  reservationStartTime: String;
  reservationEndTime: String;
}

export interface NoteItem {
  text: String;
  priority: String;
}

export interface BookingCompleteItems {
  collectionLocationDetails: Boolean;
  collectionDateTimeDetails: Boolean;
  deliveryLocationDetail: Boolean;
  deliveryDateTimeDetails: Boolean;
  passengerDetails: Boolean;
  bookingComplete: Boolean;
}

