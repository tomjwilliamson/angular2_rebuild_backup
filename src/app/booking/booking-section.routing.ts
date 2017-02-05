import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import components to route to
import { BookingSectionComponent } from './containers/booking-section/booking-section.component';
import { FlightRequestComponent } from './components/flight-request/flight-request.component';
import { FlightDetailsComponent } from './components/flight-details/flight-details.component';
import { CollectionLocationComponent } from './components/collection-location/collection-location.component';
import { EmailCheckComponent } from './components/email-check/email-check.component';

const bookingRoutes: Routes = [
   {
    path: 'booking',
    component: BookingSectionComponent,
    children: [
      {
        path: '',
        component: FlightRequestComponent
      },
      {
        path: 'flight-request',
        component: FlightRequestComponent
      },
      {
        path: 'flight-details',
        component: FlightDetailsComponent
      },
      {
        path: 'collection-location',
        component: CollectionLocationComponent
      },
      {
        path: 'email-check',
        component: EmailCheckComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'booking/flight-request',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(bookingRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class BookingRoutingModule {}
