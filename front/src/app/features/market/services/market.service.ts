import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MarketItem {
  symbol: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private api = 'http://localhost:3000/api/market';

  constructor(private http: HttpClient) {}

  getMarket(): Observable<MarketItem[]> {
    return this.http.get<MarketItem[]>(this.api);
  }
}
