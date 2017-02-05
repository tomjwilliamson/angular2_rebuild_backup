import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// store
import { Store } from '@ngrx/store';
// models
import { AppState } from '../models/app-state.interface';
import { AirportLocationsModel } from '../models/airports.interface';
import { SaveGoogleRequest, SaveGoogleLocationObject } from '../models/save-google-request.interface';
// init models
import { initialBooking, initialBookingJourney, initialBookingFlightData } from '../models/booking-init.model';
// reducers
import { UPDATE_BOOKING_OBJECT } from '../reducers/booking.reducer';
// globals
import { API_PATH, GET_ALL_AIRPORTS } from '../../shared/globals';

@Injectable()
export class BookingService {

  public currentBooking = initialBooking;
  private _airportDataResponse;

  constructor(
    private _appStore: Store<AppState>,
    private _http: Http
  ) {}

  getAirportData() {
    return this._http
      .get(API_PATH + GET_ALL_AIRPORTS)
      .subscribe( res => {
        this._airportDataResponse = <AirportLocationsModel>res.json();
      });
  }

  // create init booking object
  createBookingInit() {
    this.currentBooking.bookingJourney.push(initialBookingJourney);
    this.currentBooking.bookingJourney[0].flightData = initialBookingFlightData;

    // get airport data from api
    this.getAirportData();

    return this.currentBooking;
  }

  updateBookingFlight(objFlight: Object, objAdditional?: Object) {
    this.currentBooking.bookingJourney[0].flightData = objFlight;
    if (objAdditional) {
      this.currentBooking.bookingJourney[0].flightData.additionalFlightDataRequest = objAdditional;
    }
    this.updateBookingObject(this.currentBooking);
  }

  updateDeliveryTime(value: String) {
    this.currentBooking.bookingJourney[0].deliveryDateTimeUTC = value;
  }

  updateDeliveryLocation(code: String, terminal?: String) {

    let direction = '';

    if (terminal === null) { terminal = ''; }
    if ( code === 'LHR' ) { direction = '(Dep)'; }

    function filterByCode(obj) {
      if (obj.shortName.indexOf(code) !== -1 && obj.shortName.indexOf(terminal) !== -1 && obj.shortName.indexOf(direction) !== -1) {
        return obj;
      }
    }

    const filteredList = this._airportDataResponse.locations.filter(filterByCode);
    const airportDetaiils = filteredList[0];

    this.currentBooking.bookingJourney[0].deliveryLocation.locationId = airportDetaiils;

  }

  updateAirportDetails(value: String) {

    let airportDetails;

    if (value === 'LHR') {
      airportDetails = {
        line1: 'Greater London',
        postcode: 'TW6 1AP',
        name: 'Heathrow',
        type: 1,
        value: 1,
        code: 'LHR'
      };
    } else if (value === 'LCY') {
      airportDetails = {
        line1: 'Hartmann Rd',
        postcode: 'E16 2PX',
        name: 'London City',
        type: 1,
        value: 3,
        code: 'LCY'
      };
    } else if (value === 'LGW') {
      airportDetails = {
        line1: 'West Sussex',
        postcode: 'RH6 0NP',
        name: 'Gatwick',
        type: 1,
        value: 2,
        code: 'LGW'
      };
    }

    // return airportDetails;
  }

  updateCollectionLocation(obj: SaveGoogleRequest) {
    this.currentBooking.bookingJourney[0].collectionLocation = obj;
  }

  updateBookingFlags(
    booking?,
    collectionLocationDetails?,
    collectionDateTimeDetails?,
    deliveryDateTimeDetails?,
    deliveryLocationDetail?,
    passengerDetails?
  ) {
    if (booking) { this.currentBooking.bookingCompletion.bookingComplete = true; } else {
                   this.currentBooking.bookingCompletion.bookingComplete = false;  }

    if (collectionLocationDetails) { this.currentBooking.bookingCompletion.collectionLocationDetails = true; } else {
                   this.currentBooking.bookingCompletion.collectionLocationDetails = false;  }

    if (collectionDateTimeDetails) { this.currentBooking.bookingCompletion.collectionDateTimeDetails = true; } else {
                   this.currentBooking.bookingCompletion.collectionDateTimeDetails = false;  }

    if (deliveryDateTimeDetails) { this.currentBooking.bookingCompletion.deliveryDateTimeDetails = true; } else {
                   this.currentBooking.bookingCompletion.deliveryDateTimeDetails = false;  }

    if (deliveryLocationDetail) { this.currentBooking.bookingCompletion.deliveryLocationDetail = true; } else {
                   this.currentBooking.bookingCompletion.deliveryLocationDetail = false;  }

    if (passengerDetails) { this.currentBooking.bookingCompletion.passengerDetails = true; } else {
                   this.currentBooking.bookingCompletion.passengerDetails = false;  }

    this.updateBookingObject(this.currentBooking);

  }

  updateBookingObject(obj: Object) {
    console.log(obj);
    this._appStore.dispatch({ type: 'UPDATE_BOOKING_OBJECT', payload: obj });
  }


};

