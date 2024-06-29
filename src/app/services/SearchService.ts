import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/api/search';  // URL do seu endpoint de busca

  constructor(private http: HttpClient) { }

  searchPlaces(query: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, query);
  }
}
