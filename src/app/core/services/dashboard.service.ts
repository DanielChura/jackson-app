import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import type {
  DashboardSummary,
  SalesByPeriodEntry,
  TopProductEntry,
  OrdersByStatusEntry,
  RecentOrderEntry,
  DateRange,
} from '../models';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/admin/dashboard`;

  private buildParams(range?: DateRange): HttpParams {
    let params = new HttpParams();
    if (range?.desde) params = params.set('desde', range.desde);
    if (range?.hasta) params = params.set('hasta', range.hasta);
    return params;
  }

  getSummary(range?: DateRange) {
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`, {
      params: this.buildParams(range),
    });
  }

  getSalesByPeriod(range?: DateRange) {
    return this.http.get<SalesByPeriodEntry[]>(`${this.apiUrl}/sales-by-period`, {
      params: this.buildParams(range),
    });
  }

  getTopProducts(limit = 10, range?: DateRange) {
    return this.http.get<TopProductEntry[]>(`${this.apiUrl}/top-products`, {
      params: this.buildParams(range).set('limit', limit),
    });
  }

  getOrdersByStatus(range?: DateRange) {
    return this.http.get<OrdersByStatusEntry[]>(`${this.apiUrl}/orders-by-status`, {
      params: this.buildParams(range),
    });
  }

  getRecentOrders(limit = 10) {
    return this.http.get<RecentOrderEntry[]>(`${this.apiUrl}/recent-orders`, {
      params: new HttpParams().set('limit', limit),
    });
  }
}
