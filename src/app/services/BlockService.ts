// src/app/services/block.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Block} from "../models/Block";

@Injectable({
  providedIn: 'root'
})
export class BlockService {
  private apiUrl = 'http://localhost:8080/api/blocks';

  constructor(private http: HttpClient) { }

  getBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(this.apiUrl);
  }

  getBlock(id: number): Observable<Block> {
    return this.http.get<Block>(`${this.apiUrl}/${id}`);
  }

  addBlock(block: Block): Observable<Block> {
    return this.http.post<Block>(this.apiUrl, block);
  }

  updateBlock(id: number, block: Block): Observable<Block> {
    return this.http.put<Block>(`${this.apiUrl}/${id}`, block);
  }

  deleteBlock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
