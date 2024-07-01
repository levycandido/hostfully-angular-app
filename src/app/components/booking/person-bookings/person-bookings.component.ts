import {Component, OnInit} from '@angular/core';
import {catchError, switchMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {Booking} from "../../../models/Booking";
import {BookingService} from "../../../services/BookingService";
import {NotificationService} from "../../../services/NotificationService";
import {PersonService} from "../../../services/PersonService";

@Component({
  selector: 'app-person-bookings',
  templateUrl: './person-bookings.component.html',
  styleUrls: ['./person-bookings.component.scss']
})
export class PersonBookingsComponent implements OnInit {
  errorMessage: string | null = null;
  bookings: Booking[] = [];
  personId : number = 0;
  constructor(
    private bookingService: BookingService,
    private notificationService: NotificationService,
    private personService: PersonService) {
  }

  ngOnInit(): void {
    this.loadPersonIdAndBookings();
  }

  private loadPersonIdAndBookings(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.personService.findByEmail(email).pipe(
        catchError(error => {
          this.notificationService.showError('Error fetching user', error);
          return of([]);
        }),
        switchMap(persons => {
          if (Array.isArray(persons) && persons.length > 0) {
            const person = persons[0];
            if (person && person.id) {
              this.personId = +person.id;
              return this.bookingService.getBookingsByPerson(this.personId).pipe(
                catchError(error => {
                  this.notificationService.showError('Error fetching bookings', error);
                  return of([]);
                })
              );
            }
          }
          return of([]);
        })
      ).subscribe((data: Booking[]) => {
        this.bookings = data;
      });
    } else {
      this.notificationService.showError('No email found in localStorage');
    }
  }

  pay(bookingId: number): void {
    this.bookingService.payBooking(bookingId).pipe(
      catchError(error => {
        this.notificationService.showError('Error paying booking', error);
        return of(null);
      })
    ).subscribe(() => {
      this.notificationService.showSuccess('Booking paid successfully!');
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
      this.loadPersonIdAndBookings();
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
        this.loadPersonIdAndBookings();
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

  private getPersonId() {
    const email = localStorage.getItem('email');
    this.personService.findByEmail(email).pipe(
      catchError(error => {
        this.notificationService.showError('Error fetching user', error);
        return of([]);
      })
    ).subscribe(persons => {
     // if (Array.isArray(persons) && persons.length > 0) {
        const person = persons[0];
        if (person && person.id) {
          this.personId = +person.id;
        }
    //  }
    });
  }
}
