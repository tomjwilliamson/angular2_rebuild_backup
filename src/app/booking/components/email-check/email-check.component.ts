import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

// services
import { EventsService } from '../../services/events.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-email-check',
  templateUrl: './email-check.component.html',
  styleUrls: ['./email-check.component.scss']
})
export class EmailCheckComponent implements OnInit {

  public isUser: Boolean = false;
  public visibleSection: String = 'login';
  public showEmailLoader: Boolean = false;
  public userEmail: String;

  constructor(
    private _loginService: LoginService,
    private _eventsService: EventsService,
    private _router: Router
  ) { }

  ngOnInit() {

    this._loginService.verifyUserSubject$.subscribe(res => {
      console.log(res);
      // if user has password go to login panel
      // else get token and login as guest
      if (res.verifyCustomerStatus === 1) {
        this._router.navigate([this._eventsService.GetURLPath(5)]);
      } else {
        const loginParams = 'grant_type=password&username=' + this.userEmail;
        this._loginService.getToken(loginParams);
      }
    });

    this._loginService.userSubject$.subscribe(user => {
      console.log(user);
      this._router.navigate([this._eventsService.GetURLPath(5)]);
    });

  }

  handleSubmitEmailCheck(value, e) {
    e.preventDefault();

    this.showEmailLoader = true;
    this.userEmail = value.email;
    this._loginService.checkEmail(this.userEmail);
  }

}
