import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Place} from "../models/Place";
import {environment} from "../../environments/environment.prod";

const BASE_URL = environment.apiUrl + '/v1/places';


@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) { }

  getPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(BASE_URL);
  }

  getPlace(id: number): Observable<Place> {
    return this.http.get<Place>(`${BASE_URL}/${id}`);
  }

  addPlace(place: Place): Observable<Place> {
    return this.http.post<Place>(BASE_URL, place);
  }

  updatePlace(id: number, place: Place): Observable<Place> {
    return this.http.put<Place>(`${BASE_URL}/${id}`, place);
  }

  deletePlace(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
