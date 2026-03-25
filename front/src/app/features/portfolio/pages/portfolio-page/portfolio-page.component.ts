import { Component, OnInit } from '@angular/core';
import { PortfolioService, Portfolio } from '../../services/portfolio.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portfolio-page.component.html',
  styleUrl: './portfolio-page.component.scss'
})
export class PortfolioPageComponent implements OnInit {

  portfolio!: Portfolio;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.portfolioService.getPortfolio().subscribe(data => {
      this.portfolio = data;
    });
  }
}
