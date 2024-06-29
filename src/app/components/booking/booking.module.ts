import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { EditBookingComponent } from './edit-booking/edit-booking.component';
import { ViewBookingComponent } from './view-booking/view-booking.component';

@NgModule({
  declarations: [
    CreateBookingComponent,
    EditBookingComponent,
    ViewBookingComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule
  ]
})
export class BookingModule { }
