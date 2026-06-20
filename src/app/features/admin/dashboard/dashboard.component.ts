import { Component } from '@angular/core';
import { KpiCardsComponent } from './components/kpi-cards/kpi-cards.component';
import { DateRangePickerComponent } from './components/date-range-picker/date-range-picker.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { OrdersByStatusComponent } from './components/orders-by-status/orders-by-status.component';
import { RecentOrdersComponent } from './components/recent-orders/recent-orders.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    KpiCardsComponent,
    DateRangePickerComponent,
    SalesChartComponent,
    TopProductsComponent,
    OrdersByStatusComponent,
    RecentOrdersComponent,
  ],
  templateUrl: './dashboard.component.html',
})
export class AdminDashboardComponent {}
