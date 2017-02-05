// models
import { AppState } from '../models/app-state.interface';
import { FlightAPIRequest } from '../models/flight-request.interface';
// ngrx store
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export function getAppState(store: Store<AppState>): AppState {

    let state: AppState;
    store.subscribe(s => state = s);

    return state;
}
