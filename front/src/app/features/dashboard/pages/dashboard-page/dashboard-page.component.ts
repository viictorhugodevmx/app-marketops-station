import { Component, OnInit } from '@angular/core';
import { MarketService, MarketItem } from '../../../market/services/market.service';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../../../core/services/socket.service';

@Component({
  selector: 'app-dashboard-page',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss'
})
export class DashboardPageComponent implements OnInit {

  market: MarketItem[] = [];

  constructor(
    private marketService: MarketService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loadMarket();
    this.listenRealtime();
  }

  loadMarket() {
    this.marketService.getMarket().subscribe(data => {
      this.market = data;
    });
  }

  listenRealtime() {
    this.socketService.connect().subscribe((data) => {

      if (data.type === 'MARKET_UPDATE') {

        const index = this.market.findIndex(m => m.symbol === data.symbol);

        if (index !== -1) {
          this.market[index].price = data.price;
        }
      }
    });
  }
}
