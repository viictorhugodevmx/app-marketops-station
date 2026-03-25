import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrdersService } from '../../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.scss'
})
export class OrdersPageComponent {

  symbol = 'BTC';
  type: 'buy' | 'sell' = 'buy';
  amount = 1000;

  orders: any[] = [];


  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  createOrder() {
    console.log('AMOUNT:', this.amount);
    this.ordersService.createOrder({
      symbol: this.symbol,
      type: this.type,
      amount: this.amount
    }).subscribe(() => {
      this.loadOrders();

      setTimeout(() => {
        this.loadOrders();
      }, 3500);
    });
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }
}
