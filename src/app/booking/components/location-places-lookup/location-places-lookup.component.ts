import { Component, OnInit, Output, ElementRef, ViewChild, NgZone, EventEmitter } from '@angular/core';
import { MapsAPILoader } from 'angular2-google-maps/core';

@Component({
  selector: 'app-location-places-lookup',
  templateUrl: './location-places-lookup.component.html',
  styleUrls: ['./location-places-lookup.component.scss']
})
export class LocationPlacesLookupComponent implements OnInit {

  public locationModel;
  private _autocomplete;

  @ViewChild('locationElement') ele: ElementRef;

  @Output()
  locationSet: EventEmitter<any> = new EventEmitter();

  constructor(
    private _mapsAPILoader: MapsAPILoader,
    private _ngZone: NgZone
  ) { }

  ngOnInit() {


    this._mapsAPILoader.load().then(() => {

      this._autocomplete = new google.maps.places.Autocomplete(
        this.ele.nativeElement, {
          componentRestrictions: {country: 'uk'}
        }
      );

       this._autocomplete.addListener('place_changed', () => {

         this._ngZone.run(() => {

           // Get the place details from the autocomplete object.
          const place: google.maps.places.PlaceResult = this._autocomplete.getPlace();

          if (typeof place.place_id === 'undefined') {
            // return error...
            return;
          }

          // send place obj back to parent
          this.locationSet.emit(place);
         });

      });
    });


  }

}
