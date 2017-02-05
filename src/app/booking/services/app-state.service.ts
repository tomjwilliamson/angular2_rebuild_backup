import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
// store
import { Store } from '@ngrx/store';
// services
import { BookingService } from './booking.service';
// models
import { AppState } from '../models/app-state.interface';
import { AirportLocationsModel } from '../models/airports.interface';
// reducers
import { UPDATE_JOURNEY_LEG } from '../reducers/journey-type.reducer';
import { GET_JOURNEY_DIRECTION, UPDATE_JOURNEY_DIRECTION } from '../reducers/journey-direction.reducer';

@Injectable()
export class AppStateService {

  private _bookingState;

  constructor(
    private _appStore: Store<AppState>,
    private _bookingService: BookingService,
  ) {}

  setAppState() {

    // check if incomplete guid exists
    // getBookingIncompleteState();
    // else set init booking
    this._bookingState = this._bookingService.createBookingInit();
    this._bookingService.updateBookingObject(this._bookingState);

    // check url has session query
    // parseSession(); - remove query string
    // set values in booking object

    this.setJourneyDetails();
  }

  // HTTP CALL TO GET INCOMPLETE - hydrate store with returned data
  // getBookingIncompleteState (){}

  // PARSE FUNCTION IF HAS SESSION
  // parseSession (){}

  // set journey type and journey direction
  setJourneyDetails() {
    this._appStore.dispatch({ type: 'UPDATE_JOURNEY_LEG', payload: { journeyId: 1, journeyType: 1, journeyDirection: 1  } });
    // this._appStore.dispatch({ type: UPDATE_JOURNEY_DIRECTION, payload: 1 });
  };



};
