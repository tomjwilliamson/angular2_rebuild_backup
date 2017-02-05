import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

// path globals
import { API_PATH, VERIFY_USER, TOKEN, LOGIN } from '../../shared/globals';

// store
import { Store } from '@ngrx/store';
import { UPDATE_TOKEN, UPDATE_USER } from '../reducers/user.reducer';

// models
import { AppState } from '../models/app-state.interface';

interface CheckEmailRequest {
  emailAddress: String;
}

@Injectable()
export class LoginService {

  private _token: String;

  public verifyUserSubject$: ReplaySubject<any> = new ReplaySubject(1);
  public userSubject$: ReplaySubject<any> = new ReplaySubject(1);

  constructor (
    private _http: Http,
    private _appStore: Store<AppState>
  ) {

  };

  createAuthorizationHeader(headers: Headers) {
    headers.append('Authorization', 'bearer ' + this._token);
  }

  checkEmail(email: String) {

    const request: CheckEmailRequest = { emailAddress: email };
    this._http
      .post(API_PATH + VERIFY_USER, request)
      .subscribe(res => {
        console.log(res);
        this.verifyUserSubject$.next(res.json());
      });

  }

  getToken(params: String) {
    this._http
      .post(API_PATH + TOKEN, params)
      .subscribe(res => {
        this._token = res.json().access_token;
        this._appStore.dispatch({ type: 'UPDATE_TOKEN', payload: this._token });
        this.loginUser();
      });
  }

  loginUser() {

    const headers = new Headers();
    this.createAuthorizationHeader(headers);
    this._http
      .get(API_PATH + LOGIN, {headers: headers})
      .subscribe(res => {
        console.log(res);
        this.userSubject$.next(res.json());
        this._appStore.dispatch({ type: 'UPDATE_USER', payload: res.json().user });
      });

  }

};
