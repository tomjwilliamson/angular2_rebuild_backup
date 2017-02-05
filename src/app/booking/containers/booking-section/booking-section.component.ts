import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';

// ngrx store
import { Store } from '@ngrx/store';
// get slices of store
// import { getFlightState } from '../../reducers/state.reducer';
// store reducers
import { FLIGHT_REQUEST } from '../../reducers/flight-request.reducer';
import { FLIGHT_RESPONSE } from '../../reducers/flight-response.reducer';
import { PANEL_INCREMENT, PANEL_DECREMENT, PANEL_RESET } from '../../reducers/panel.reducer';

// services
import { AppStateService } from '../../services/app-state.service';
import { FlightRequestService } from '../../services/flight-request.service';
import { EventsService } from '../../services/events.service';
import { BookingService } from '../../services/booking.service';
import { CollectionService } from '../../services/collection.service';
import { LoginService } from '../../services/login.service';
// models
import { AppState } from '../../models/app-state.interface';
import { FlightAPIRequest } from '../../models/flight-request.interface';
import { FlightAPIResponse } from '../../models/flight-response.interface';

// reducers
import { getAppState } from '../../reducers/state.reducer';

@Component({
  selector: 'app-booking-section',
  templateUrl: './booking-section.component.html',
  styleUrls: ['./booking-section.component.sass'],
  providers: [AppStateService, FlightRequestService, EventsService, BookingService, CollectionService, LoginService]
})
export class BookingSectionComponent implements OnInit, OnDestroy {

  private _flightReq: FlightAPIRequest;
  private _flightRes: FlightAPIResponse;
  private _flightRequestSubscription: Subscription;
  private _currentFlightRequest: Object;
  private _currentPanelNumber;

  constructor(
    private _appStateService: AppStateService,
    private _flightRequestService: FlightRequestService,
    private _eventsService: EventsService,
    private _bookingService: BookingService,
    private _appStore: Store<AppState>,
    private _router: Router
  ) {}

  ngOnInit() {

    this._appStateService.setAppState();

    // flight request observable
    // subscribe to request models
    // call method to post to api if not empty
    this._flightRequestService.flightRequestSource$.subscribe(r => {
      this._flightReq = r;
      if (typeof this._flightReq.flightNumber !== 'undefined') { this.onFlightRequest(); }
    });

  }

  // call flight stats service
  onFlightRequest() {
    // save flight request in store
    this._appStore.dispatch({ type: 'FLIGHT_REQUEST', payload: this._flightReq });
    // post data and dispatch to store
    this._flightRequestService
      .postData(this._flightReq)
      .subscribe((response) => {
        this._appStore.dispatch({ type: 'FLIGHT_RESPONSE', payload: response });
      });
  }

  ngOnDestroy() {
    this._flightRequestSubscription.unsubscribe();
  }

  flightRequest(event: any) {
    console.log('in parent', event);
  }

}
