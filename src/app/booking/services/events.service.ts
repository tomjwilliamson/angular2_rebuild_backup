import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

// store
import { Store } from '@ngrx/store';
import { PANEL_INCREMENT, PANEL_DECREMENT, PANEL_RESET } from '../reducers/panel.reducer';

// models
import { AppState } from '../models/app-state.interface';

const defaultRoute = 'booking/';

@Injectable()
export class EventsService {

  private _panelSource$ = new BehaviorSubject<Object>({});
  private _panelNumber;

  constructor(
    private _appStore: Store<AppState>,
    private _router: Router
  ) {}

  goToPanel(value: String) {
    if (value === 'next') {
      this._appStore.dispatch({ type: PANEL_INCREMENT });
    } else if (value === 'prev') {
      this._appStore.dispatch({ type: PANEL_INCREMENT });
    }

    this._appStore.select('updatePanelReducer').subscribe(v => {
      this._panelNumber = v;
      console.log(this._panelNumber);
      this._router.navigate([this.GetURLPath(this._panelNumber)]);
    });
  }

  GetURLPath(value: Number = 1) {

    console.log(value);

    switch (value) {
      case value = 1:
        return defaultRoute + 'flight-request';

      case value = 2:
        return defaultRoute + 'flight-details';

      case value = 3:
        return defaultRoute + 'collection-location';

      case value = 4:
        return defaultRoute + 'email-check';

      default:
        return defaultRoute + 'flight-request';
    }
  }


}
