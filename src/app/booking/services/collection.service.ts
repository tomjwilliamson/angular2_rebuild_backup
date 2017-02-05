import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { SaveGoogleRequest } from '../models/save-google-request.interface';

import { API_PATH, GET_ALL_POSTCODES, GET_GOOGLE_LOCATION, SAVE_GOOGLE_LOCATION } from '../../shared/globals';

interface GetGoogleRequest {
  userId: null;
  googlePlaceId: String;
}

@Injectable()
export class CollectionService {

  public getLocationRequest: GetGoogleRequest = { userId: null, googlePlaceId: '' };
  // public saveLocationRequest: SaveGoogleRequest = { location: {}, userId: null, googlePlaceId: '' };
  public postcodes;
  public postcodeSubject$: ReplaySubject<any> = new ReplaySubject(1);
  public locationSubject$: ReplaySubject<any> = new ReplaySubject(1);
  public locationSaveSubject$: ReplaySubject<any> = new ReplaySubject(1);
  public locationDetails: Object;

  constructor(
    private _http: Http
  ) {}

  getPostCodes() {
    this.postcodes = this._http.get(API_PATH + GET_ALL_POSTCODES).subscribe(res => this.postcodeSubject$.next(res));
    return this.postcodes;
  };

  getLocation(placeId) {
    this.getLocationRequest.googlePlaceId = placeId;
    this.locationDetails = this._http.post(API_PATH + GET_GOOGLE_LOCATION, this.getLocationRequest)
      .subscribe(res => this.locationSubject$.next(res));
    return this.locationDetails;
  };

  saveLocation(locationObj) {
    this._http.post(API_PATH + SAVE_GOOGLE_LOCATION, locationObj)
      .subscribe(res => this.locationSaveSubject$.next(res));
  }

}
