export const initialBooking = {
  userId: '',
  bookingReference: null,
  bookingJourney: [],
  timeSlotReservation: {
    timeSlotReservationId: '',
    reservationStartTime: '',
    reservationEndTime: ''
  },
  makePaymentRequest: {},
  bookingCompletion: {
    collectionLocationDetails: false,
    collectionDateTimeDetails: false,
    deliveryLocationDetail: false,
    deliveryDateTimeDetails: false,
    passengerDetails: false,
    bookingComplete: false
  }
};

export const initialBookingJourney = {
  addOnProductType: [
    1
  ],
  journeyDirection: 1,
  bookingReference: '',
  flightData: {
    additionalFlightDataRequest: this.initialAdditionalFlightData
  },
  collectionLocation: {
    geoCoord: {}
  },
  collectionDateTimeUTC: '',
  collectionTimeSlotMinutes: '',
  deliveryDateTimeUTC: '',
  deliveryLocation: {
    locationId: '',
    type: 1,
    name: '',
    shortName: '',
    geoCoord: {
      latitude: 0,
      longitude: 0
    },
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    addressTown: '',
    addressPostCode: '',
    addressCounty: '',
    addressCountry: '',
    contactEmail: '',
    deliveryDateTimeUTC: '',
  },
  passenger: [],
  note: {
    text: '',
    priority: 'Medium'
  }
};

export const initialBookingFlightData = {
  flightInfoId: '',
  requestFlightNumber: '',
  airportCityName: '',
  flightLeg: null,
  requestDepartureDate: '',
  additionalFlightDataRequest: {
    finalAirportCityName: null,
    finalAirportCode: null,
    finalAirportName: null,
    finalAirportCountryName: null
  }
};

export const initialAdditionalFlightData = {
  finalAirportCityName: null,
  finalAirportCode: null,
  finalAirportName: null,
  finalAirportCountryName: null
};

export const initialDeliveryLocation = {
  locationId: '',
  type: 1,
  name: '',
  shortName: '',
  geoCoord: {
    latitude: 0,
    longitude: 0
  },
  phoneNumber: '',
  addressLine1: '',
  addressLine2: '',
  addressLine3: '',
  addressTown: '',
  addressPostCode: '',
  addressCounty: '',
  addressCountry: '',
  contactEmail: '',
}

