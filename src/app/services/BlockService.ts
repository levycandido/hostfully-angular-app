// src/app/services/block.service.ts
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Block} from "../models/Block";
import {environment} from "../../environments/environment.prod";

const BASE_URL = environment.apiUrl + '/v1/blocks';

@Injectable({
  providedIn: 'root'
})
export class BlockService {

  constructor(private http: HttpClient) { }

  getBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(BASE_URL);
  }

  getBlock(id: number): Observable<Block> {
    return this.http.get<Block>(`${BASE_URL}/${id}`);
  }

  addBlock(block: Block): Observable<Block> {
    return this.http.post<Block>(BASE_URL, block);
  }

  updateBlock(id: number, block: Block): Observable<Block> {
    return this.http.put<Block>(`${BASE_URL}/${id}`, block);
  }

  deleteBlock(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/${id}`);
  }
}
