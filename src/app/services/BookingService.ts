import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Booking} from "../models/Booking";

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private apiUrl = 'http://localhost:8080/v1/bookings';

  constructor(private http: HttpClient) {}

  getBookingsByPerson(personId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.apiUrl}/person/${personId}`);
  }

  payBooking(bookingId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/pay/${bookingId}`, {});
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${bookingId}/cancel`, {});

  }
  // >this.apiUrl   = 'http://localhost:8080/v1/bookings';
  rebookBooking(bookingId: number): Observable<Booking> {
   return this.http.put<Booking>(`${this.apiUrl}/${bookingId}/rebook`, {});
  }

  createBooking(booking: Booking) {
    return this.http.post<Booking>(`${this.apiUrl}`, booking);
  }
}
