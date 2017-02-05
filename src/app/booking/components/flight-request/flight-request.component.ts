import { Component, Input, Output, OnInit, OnChanges, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
// services
import { FlightRequestService } from '../../services/flight-request.service';
import { EventsService } from '../../services/events.service';
// shared functions
import Shared from '../../shared/shared';
// ngrx store
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';
// models
import { AppState } from '../../models/app-state.interface';
import { FlightAPIRequest } from '../../models/flight-request.interface';
import { FlightAPIResponse } from '../../models/flight-response.interface';
// reducers
import { getAppState } from '../../reducers/state.reducer';

import { PANEL_SET } from '../../reducers/panel.reducer';

import { Router } from '@angular/router';



@Component({
  selector: 'app-flight-request',
  templateUrl: './flight-request.component.html',
  styleUrls: ['./flight-request.component.sass']
})
export class FlightRequestComponent implements OnInit, OnDestroy {

  public flightData;
  public dataLength;
  public isLoading: Boolean = false;

  private _subscription: Subscription;

  constructor(
    private _flightRequestService: FlightRequestService,
    private _eventsService: EventsService,
    private _appStore: Store<AppState>,
    private _router: Router
  ) {

    _appStore.select('flightResponseReducer')
      .distinctUntilChanged()
      .subscribe(apiResponse => {

        this.flightData = apiResponse;
        this.dataLength = (this.flightData.length - 1);
        console.log('changed', this.getState(this._appStore));

        console.log(this.dataLength);
        if (this.dataLength >= 0) {
          this._router.navigate([this._eventsService.GetURLPath(2)]);
        }

      });

  }

  ngOnInit() {

    // this._appStore.select('flightResponseReducer').subscribe(state => {
    //   this.flightData = state;
    //   this.dataLength = (this.flightData.length - 1);

    //   console.log(this.flightData);

    //    if (this.dataLength >= 0) {
    //     this.isLoading = false;
    //     this._eventsService.goToPanel('next');
    //   }

    // });
  }

  // get store state
  getState(store: Store<AppState>): AppState {
    let state: AppState;
    store.take(1).subscribe(s => state = s);
    return state;
  }

  handleSubmit(data: any, isValid: boolean, event: Event) {

    event.preventDefault();

    this.isLoading = true;

    const request: FlightAPIRequest = {
      flightNumber: data.FlightNumber,
      departureDate: Shared.multiDateFormat(data.DepartureDate, data.DepartureMonth, data.DepartureYear),
      overwriteEntry: false
    };

    this._flightRequestService.flightRequestSource = request;
  }

  ngOnDestroy() {
    this.isLoading = false;
  }

}
