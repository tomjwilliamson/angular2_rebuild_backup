// import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { FlightAPIRequest } from '../models/flight-request.interface';
import { FlightAPIResponse } from '../models/flight-response.interface';

const FLIGHT_API = 'http://devapi.portr.com/api/FlightStatus/GetFlightStatus';

@Injectable()
export class FlightRequestService {

  private _apiRequest;
  // observable event source
  private _flightRequestSource$ = new BehaviorSubject<Object>({});
  // // observable stream
  // flightRequestItem$ = this._flightRequestSource.asObservable();

  constructor(private _http: Http) {}

  set flightRequestSource(value: Object){
    this._flightRequestSource$.next(value);
  }
  get flightRequestSource$(): Observable<FlightAPIRequest>{
    return this._flightRequestSource$.asObservable();
  }

  postData(request: FlightAPIRequest): Observable<FlightAPIRequest> {
    return this._http
      .post(FLIGHT_API, request)
      .map(this._extractData);
  }

  private _extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

}
