import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Person} from "../../models/Person";
import {environment} from "../../../environments/environment.prod";

const BASE_URL = environment.apiUrl + "/" ;

@Injectable({
  providedIn: 'root'
})
export class JwtService2 {

  constructor(private http: HttpClient) { }

  addPerson(signupRequest: Person): Observable<Person> {
    return this.http.post<Person>(BASE_URL + 'signup', signupRequest)
  }

  login(loginRequest: any): Observable<any> {
    return this.http.post(BASE_URL + 'login', loginRequest)
  }
}
