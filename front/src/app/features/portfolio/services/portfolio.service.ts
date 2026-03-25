import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Portfolio {
  balance: number;
  totalValue: number;
  pnl: number;
  positions: {
    symbol: string;
    quantity: number;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  private api = 'http://localhost:3000/api/portfolio';

  constructor(private http: HttpClient) {}

  getPortfolio(): Observable<Portfolio> {
    return this.http.get<Portfolio>(this.api);
  }
}
