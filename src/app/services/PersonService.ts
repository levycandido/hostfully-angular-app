import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Person} from "../models/Person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl = 'http://localhost:8080/v1/persons';

  constructor(private http: HttpClient) { }

  findByEmail(email: string): Observable<Person> {
    const url = `${this.baseUrl}?email=${email}`;
    return this.http.get<Person>(url);
  }
}
