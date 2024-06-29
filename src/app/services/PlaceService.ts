import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Place} from "../models/Place";

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private apiUrl: string = 'http://localhost:8080/v1/places';

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(this.apiUrl);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${this.apiUrl}/${id}`);
  }

  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(this.apiUrl, place);
  }

  updatePlace(id: number, place: Place): Observable<Place> {
    return this.http.put<Place>(`${this.apiUrl}/${id}`, place);
  }

  deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
