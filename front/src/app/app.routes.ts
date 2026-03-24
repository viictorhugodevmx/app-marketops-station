import { Routes } from '@angular/router';
import { LayoutComponent } from './core/layout/layout.component';
import { DashboardPageComponent } from './features/dashboard/pages/dashboard-page/dashboard-page.component';
import { OrdersPageComponent } from './features/orders/pages/orders-page/orders-page.component';
import { PortfolioPageComponent } from './features/portfolio/pages/portfolio-page/portfolio-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardPageComponent },
      { path: 'orders', component: OrdersPageComponent },
      { path: 'portfolio', component: PortfolioPageComponent }
    ]
  }
];
