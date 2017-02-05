import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
// ngrx store
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
// models
import { AppState } from '../../models/app-state.interface';
import { SaveGoogleRequest, SaveGoogleLocationObject } from '../../models/save-google-request.interface';
// service
import { BookingService } from '../../services/booking.service';
import { CollectionService } from '../../services/collection.service';
import { EventsService } from '../../services/events.service';

interface ViewLocationEdit {
  collectionAddressLine1: String;
  collectionAddressLine2: String;
  collectionAddressName: String;
  collectionAddressPostcode: String;
  collectionAddressTown: String;
  collectionType: Number;
}

@Component({
  selector: 'app-collection-location',
  templateUrl: './collection-location.component.html',
  styleUrls: ['./collection-location.component.scss']
})
export class CollectionLocationComponent implements OnInit {

  public showManualLocation: Boolean = false;
  public postcodeInZone: Boolean = true;
  public postcodeEntered: Boolean = true;
  public postcodesLoaded: Boolean = false;
  public locationLoaded: Boolean = false;
  public showLocationLoader: Boolean = false;
  public addressFound: Boolean = true;
  public showUserIdError: Boolean = false;
  public selectedLocationId: String;

  public saveLocationRequest: SaveGoogleRequest;

  public dataLength;
  public postcodeData;
  public locationData;
  public collectionAddressName;

  constructor(
    private _appStore: Store<AppState>,
    private _router: Router,
    private _collectionService: CollectionService,
    private _bookingService: BookingService,
    private _eventsService: EventsService
  ) {
    _appStore.select('bookingReducer')
      .distinctUntilChanged()
      .subscribe(currentBooking => {
        this.dataLength = (Object.keys(currentBooking).length - 1);
      });
   }

  ngOnInit() {
    // subscribe to postcode http get
    this._collectionService.getPostCodes();
    this._collectionService.postcodeSubject$.subscribe(pc => {
      this.postcodeData = pc.json();
      console.log(this.postcodeData);
      this.postcodesLoaded = true;
    });

    // subscribe to location data sent from google places
    this._collectionService.locationSubject$.distinctUntilChanged().subscribe(loc => {
      this.locationData = loc.json();
      this.showManualLocation = true;
      this.showLocationLoader = false;
    });

    // subscribe to save location
    this._collectionService.locationSaveSubject$.distinctUntilChanged().subscribe(res => {
      this.showLocationLoader = false;
      // store in booking
      this._bookingService.updateCollectionLocation(this.saveLocationRequest);
      this._bookingService.updateBookingFlags(false, true, false, true, true, false);
      // go to next panel...
      this._router.navigate([this._eventsService.GetURLPath(4)]);
    });
  }

  getChildLocation(event) {
    this.locationLoaded = true;
    this.selectedLocationId = event.place_id;
    console.log(this.selectedLocationId);
  }

  // initial location selection submit
  handleSubmit(e) {
    e.preventDefault();
    this.showLocationLoader = true;
    this._collectionService.getLocation(this.selectedLocationId);
  }

  handleSubmitLocationManual(value: ViewLocationEdit, valid, e) {
    e.preventDefault();
    this.showLocationLoader = true;

    console.log(value, valid);
    this.setSaveRequestObject(value);

  }

  setSaveRequestObject(v: ViewLocationEdit) {

    this.saveLocationRequest = {
      location: this.locationData.location,
      userId: null,
      googlePlaceId: this.selectedLocationId
    };

    this.saveLocationRequest.location.name = v.collectionAddressName;
    this.saveLocationRequest.location.addressLine1 = v.collectionAddressLine1;
    this.saveLocationRequest.location.addressLine2 = v.collectionAddressLine2;
    this.saveLocationRequest.location.addressLine3 = this.selectedLocationId;
    this.saveLocationRequest.location.addressTown = v.collectionAddressTown;
    this.saveLocationRequest.location.addressPostCode = v.collectionAddressPostcode;
    this.saveLocationRequest.location.type = v.collectionType;

    this._collectionService.saveLocation(this.saveLocationRequest);

  }

}
