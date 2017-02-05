import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
// ngrx store
import { StoreModule } from '@ngrx/store';
// custom routes
import { AppRoutingModule } from './app.routing';
// custom top level modules
import { BookingSectionModule } from './booking/booking-section.module';
// google maps
import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBtsg6itwhYRFKEGATINqDWP0W26QiTXlg',
      libraries: ['places']
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BookingSectionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
