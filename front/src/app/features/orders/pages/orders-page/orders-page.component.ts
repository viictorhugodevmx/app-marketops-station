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

  // ⚠️ pega aquí tu token manual
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWJkZTRlMjIxZGM5MzdjZjM1YTkzOWYiLCJpYXQiOjE3NzQzNzQ1MTIsImV4cCI6MTc3NDM3ODExMn0.BuPTixiXlLdpdeyFu4m0cn68AaREt9qQs2j6C4BCAfw';

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
    }, this.token).subscribe(() => {
      this.loadOrders();

      // 👇 refresco automático
      setTimeout(() => {
        this.loadOrders();
      }, 3500);

    });
  }

  loadOrders() {
    this.ordersService.getOrders(this.token).subscribe(data => {
      this.orders = data;
    });
  }
}
