import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {Booking} from "../models/Booking";
import {BookingService} from "../services/BookingService";
import {ActivatedRoute} from "@angular/router";
import {NotificationService} from "../services/NotificationService";

@Component({
  selector: 'app-person-bookings',
  templateUrl: './person-bookings.component.html',
  styleUrls: ['./person-bookings.component.scss']
})
export class PersonBookingsComponent implements OnInit {
  errorMessage: string | null = null;
  bookings: Booking[] = [];

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private notificationService: NotificationService) {

       // this.personId = this.route.snapshot.params['personId'];
  }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
//    this.bookingService.getBookingsByPerson(this.personId).pipe( levy
    this.bookingService.getBookingsByPerson(1).pipe(
      catchError(error => {
        this.notificationService.showError('Error fetching bookings', error);
        return of([]);
      })
    ).subscribe((data: Booking[]) => {
      this.bookings = data;
    });
  }

  pay(bookingId: number): void {
    this.bookingService.payBooking(bookingId).pipe(
      catchError(error => {
        this.notificationService.showError('Error paying booking', error);
        return of(null);
      })
    ).subscribe(() => {
      alert('Booking paid successfully!');
      this.loadBookings();
    });
  }

  cancel(booking: Booking): void {
    this.bookingService.cancelBooking(booking.id).pipe(
      catchError(error => {
        this.notificationService.showError('Error cancelling booking', error);
        return of(null);
      })
    ).subscribe(() => {
      this.notificationService.showSuccess('Booking cancelled successfully!');
      this.loadBookings();
    });
  }

  rebook(booking: Booking): void {
    this.bookingService.rebookBooking(booking.id).pipe(
      catchError(error => {
        this.errorMessage = error.error ? error.error.message : 'An unexpected error occurred';
        this.notificationService.showSuccess(this.errorMessage);

        this.notificationService.showError('Error rebooking booking', error);
        return of(null);
      })
    ).subscribe((newBooking: Booking | null) => {
      if (newBooking) {
        this.notificationService.showSuccess('Booking rebooked successfully!');
        this.loadBookings();
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Canceled':
        return 'status-canceled';
      case 'Booked':
        return 'status-booked';
      default:
        return '';
    }
  }
}
