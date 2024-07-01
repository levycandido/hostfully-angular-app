import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Booking} from "../models/Booking";
import {environment} from "../../environments/environment.prod";

const BASE_URL = environment.apiUrl + '/v1/bookings';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {}

  getBookingsByPerson(personId: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${BASE_URL}/person/${personId}`);
  }

  payBooking(bookingId: number): Observable<void> {
    return this.http.post<void>(`${BASE_URL}/pay/${bookingId}`, {});
  }

  cancelBooking(bookingId: number): Observable<void> {
    return this.http.put<void>(`${BASE_URL}/${bookingId}/cancel`, {});

  }
  // >BASE_URL   = 'http://localhost:8080/v1/bookings';
  rebookBooking(bookingId: number): Observable<Booking> {
   return this.http.put<Booking>(`${BASE_URL}/${bookingId}/rebook`, {});
  }

  createBooking(booking: Booking) {
    return this.http.post<Booking>(`${BASE_URL}`, booking);
  }
}
