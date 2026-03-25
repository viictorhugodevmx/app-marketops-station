import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CreateOrderDto {
  symbol: string;
  type: 'buy' | 'sell';
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private api = 'http://localhost:3000/api/orders';

  constructor(private http: HttpClient) {}

  createOrder(order: CreateOrderDto): Observable<any> {
    return this.http.post(this.api, order);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }
}
