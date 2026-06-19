import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import type {
  DashboardSummary,
  SalesByPeriodEntry,
  TopProductEntry,
  OrdersByStatusEntry,
  RecentOrderEntry,
  Granularity,
  DateRange,
} from './dashboard.types';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/admin/dashboard`;

  getSummary(range?: DateRange): Observable<DashboardSummary> {
    let params = new HttpParams();
    if (range?.desde) params = params.set('desde', range.desde);
    if (range?.hasta) params = params.set('hasta', range.hasta);
    return this.http.get<DashboardSummary>(`${this.apiUrl}/summary`, { params });
  }

  getSalesByPeriod(
    granularity: Granularity,
    range?: DateRange,
  ): Observable<SalesByPeriodEntry[]> {
    let params = new HttpParams().set('granularity', granularity);
    if (range?.desde) params = params.set('desde', range.desde);
    if (range?.hasta) params = params.set('hasta', range.hasta);
    return this.http.get<SalesByPeriodEntry[]>(`${this.apiUrl}/sales-by-period`, { params });
  }

  getTopProducts(limit = 10, range?: DateRange): Observable<TopProductEntry[]> {
    let params = new HttpParams().set('limit', limit);
    if (range?.desde) params = params.set('desde', range.desde);
    if (range?.hasta) params = params.set('hasta', range.hasta);
    return this.http.get<TopProductEntry[]>(`${this.apiUrl}/top-products`, { params });
  }

  getOrdersByStatus(range?: DateRange): Observable<OrdersByStatusEntry[]> {
    let params = new HttpParams();
    if (range?.desde) params = params.set('desde', range.desde);
    if (range?.hasta) params = params.set('hasta', range.hasta);
    return this.http.get<OrdersByStatusEntry[]>(`${this.apiUrl}/orders-by-status`, { params });
  }

  getRecentOrders(limit = 10): Observable<RecentOrderEntry[]> {
    const params = new HttpParams().set('limit', limit);
    return this.http.get<RecentOrderEntry[]>(`${this.apiUrl}/recent-orders`, { params });
  }
}
