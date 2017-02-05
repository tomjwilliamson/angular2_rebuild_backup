import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// ngrx store
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// reducers
import { flightRequestReducer } from './reducers/flight-request.reducer';
import { flightResponseReducer } from './reducers/flight-response.reducer';
import { bookingReducer } from './reducers/booking.reducer';
import { userReducer } from './reducers/user.reducer';
import { updatePanelReducer } from './reducers/panel.reducer';
// containers
import { BookingSectionComponent } from './containers/booking-section/booking-section.component';
// components
import { FlightRequestComponent } from './components/flight-request/flight-request.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';

import { BookingRoutingModule } from './booking-section.routing';
import { CollectionLocationComponent } from './components/collection-location/collection-location.component';
import { LocationPlacesLookupComponent } from './components/location-places-lookup/location-places-lookup.component';
import { EmailCheckComponent } from './components/email-check/email-check.component';

@NgModule({
  imports: [
    CommonModule,
    BookingRoutingModule,
    FormsModule,
    StoreModule.provideStore({
      flightRequestReducer,
      flightResponseReducer,
      bookingReducer,
      userReducer,
      updatePanelReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  declarations: [
    BookingSectionComponent,
    FlightRequestComponent,
    FlightDetailsComponent,
    CollectionLocationComponent,
    LocationPlacesLookupComponent,
    EmailCheckComponent
  ]
})
export class BookingSectionModule { }
