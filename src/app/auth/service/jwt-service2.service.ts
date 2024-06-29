import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Person} from "../../models/Person";
import {Place} from "../../models/Place";

const BASE_URL = ["http://localhost:8080/"]

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

  hello(): Observable<any> {
    return this.http.get(BASE_URL + 'api/hello', {
      headers: this.createAuhtorizationHeader()
    })
  }

  private createAuhtorizationHeader() {
    const jwtToken = localStorage.getItem('jwt');
    if (jwtToken) {
      console.log("JWT token found in local storage", jwtToken);
      return new HttpHeaders().set(
        "Authorization", "Bearer " + jwtToken
      )
    } else {
      console.log("JWT token not found in local storage");
    }
    return null;
  }

}
