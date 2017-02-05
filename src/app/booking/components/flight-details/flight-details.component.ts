import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// services
import { EventsService } from '../../services/events.service';
import { BookingService } from '../../services/booking.service';
// ngrx store
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// reducers
import { getAppState } from '../../reducers/state.reducer';
// import { UPDATE_USER_ID } from '../../reducers/booking.reducer';
// import { UPDATE_BOOKING_FLIGHT } from '../../reducers/booking.reducer';
// models
import { AppState } from '../../models/app-state.interface';

import { BookingFlightData } from '../../models/booking.interface';
import { AdditionalFlight } from '../../models/additional-flight-info.interface';

import { initialBooking, initialBookingJourney, initialBookingFlightData, initialAdditionalFlightData } from '../../models/booking-init.model';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.sass']
})
export class FlightDetailsComponent implements OnInit {

  public flightData;
  public dataLength;
  public flightCount;
  public flightStops;
  public selectedDestinationIndex: Number;
  public showFlightLoader: Boolean = true;
  public showFlightErrorText: Boolean = false;
  public showDestinationSelection: Boolean = false;

  constructor(
    private _appStore: Store<AppState>,
    private _router: Router,
    private _eventsService: EventsService,
    private _bookingService: BookingService
  ) {
    _appStore.select('flightResponseReducer')
      .distinctUntilChanged()
      .subscribe(apiResponse => {

        // if no data - return to first panel
        if (Object.keys(apiResponse).length === 0) {
          this._router.navigate([this._eventsService.GetURLPath(1)]);
          return;
        }

        this.flightData = apiResponse;
        this.dataLength = (this.flightData.length - 1);
        this.flightStops = this.flightData[this.dataLength].flightStatusDetails;
        this.flightCount = (this.flightData[this.dataLength].flightStatusDetails.length - 1);
        this.showFlightLoader = false;

      });
  }

  ngOnInit() {
    console.log(this.getState(this._appStore));
  }

  // get store state
  getState(store: Store<AppState>): AppState {
    let state: AppState;
    store.take(1).subscribe(s => state = s);
    return state;
  }

  confirmFlightDestination(event) {
    this.selectedDestinationIndex = parseInt(event, 10);
  }

  goBack(e) {
    console.log(e);
    this._router.navigate([this._eventsService.GetURLPath(1)]);
  }

  goForward() {

    const flightBookingData = {
      flightInfoId: this.flightData[this.dataLength].flightInfo.id,
      requestFlightNumber: this.flightData[this.dataLength].flightInfo.requestFlightNumber,
      airportCityName: this.flightData[this.dataLength].flightStatusDetails[0].departureAirport.airportCityName,
      flightLeg: typeof this.selectedDestinationIndex !== 'undefined' ? this.selectedDestinationIndex : 0,
      requestDepartureDate: this.flightData[this.dataLength].flightStatusDetails[0].departureDateTimeDetails.scheduledDateTimeUTC
    };

    // SET FINAL DESTINATION...

    console.log(this.flightData[this.dataLength].flightStatusDetails[0]);

    this._bookingService.updateBookingFlight(
      flightBookingData
    );
    this._bookingService.updateDeliveryTime(
      this.flightData[this.dataLength].flightStatusDetails[0].departureDateTimeDetails.scheduledDateTimeLocal
    );
    this._bookingService.updateAirportDetails(
      this.flightData[this.dataLength].flightStatusDetails[0].departureAirport.airportCode
    );
    this._bookingService.updateDeliveryLocation(
      this.flightData[this.dataLength].flightStatusDetails[0].departureAirport.airportCode,
      this.flightData[this.dataLength].flightStatusDetails[0].departureAirport.airportTerminal
    );

    this._bookingService.updateBookingFlags(false, false, false, true, true, false);

    this._router.navigate([this._eventsService.GetURLPath(3)]);

  }

}
