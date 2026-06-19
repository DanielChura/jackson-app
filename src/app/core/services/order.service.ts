import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { OrderResponse, PagedResponse, UpdateOrderStatusRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/orders`;

  getAll(page = 0, size = 20) {
    return this.http.get<PagedResponse<OrderResponse>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getById(id: string) {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
  }

  updateStatus(id: string, payload: UpdateOrderStatusRequest) {
    return this.http.put<OrderResponse>(`${this.apiUrl}/${id}`, payload);
  }
}
