import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Place} from "../models/Place";
import {SharedService} from "../shared.service";
import {catchError, map, tap} from "rxjs/operators";
import {of} from "rxjs";
import {Booking} from "../models/Booking";
import {Person} from "../models/Person";
import {PersonService} from "../services/PersonService";
import {BookingService} from "../services/BookingService";

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  reservationForm: FormGroup;
  selectedPlace: Place | null = null;
  person: Person = null;
  private booking: Booking = null;
  private email: string;

  constructor(
    private fb: FormBuilder,
    private sharedService: SharedService,
    private bookingService: BookingService,
    private personService: PersonService,
    private router: Router
  ) {
    this.reservationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      checkinDate: ['', Validators.required],
      checkoutDate: ['', Validators.required],
      guests: ['', [Validators.required, Validators.min(1)]],
      placeName: ['', Validators.required],
      placeStreet: ['', Validators.required]
    });
  }


  ngOnInit(): void {
    this.email = localStorage.getItem("email");
    this.sharedService.selectedPlace$.subscribe(place => {
      if (place) {
        this.selectedPlace = place;

      }
    });

    this.sharedService.selectedSearchSource$.subscribe(search => {
      if (search) {
        this.reservationForm.patchValue({
          checkinDate: search.startDate,
          checkoutDate: search.endDate,
          guests: search.guest
        });
      }
      this.createBooking();
    });
  }

  onSubmit(): void {
      this.bookingService.createBooking(this.booking)
        .pipe(
          catchError(error => {
            alert('Erro ao realizar a reserva');
            return of(null);
          })
        )
        .subscribe(response => {
          if (response) {
            alert('Reserva realizada com sucesso');
            this.router.navigateByUrl('/person-bookings');
          }
        });
  }

  createBooking(): void {
    this.personService.findByEmail(this.email).pipe(
      tap((data: Person) => {
        this.person = data[0];
        this.booking = {
          status: 'Booked',
          startDate: this.reservationForm.get('checkinDate')?.value,
          endDate: this.reservationForm.get('checkoutDate')?.value,
          guest: {
            id: this.person.id,
            type: 'guest',
          } as unknown as Person,
          place: this.selectedPlace
        } as Booking;
      }),
      catchError(error => {
        console.error(error);
        return of(undefined);
      })
    ).subscribe(() => {
      if (this.person) {
        this.reservationForm.patchValue({
          name: this.person.name,
          email: this.email,
        });
      }
    });
  }

}
