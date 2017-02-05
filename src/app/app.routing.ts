import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookingSectionComponent } from './booking/containers/booking-section/booking-section.component';
import { FlightRequestComponent } from './booking/components/flight-request/flight-request.component';

const appRoutes: Routes = [
  {
    path: 'booking',
    component: BookingSectionComponent,
  },
  {
    path: '',
    redirectTo: 'booking/flight-request',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {};
