import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import {
  OrderResponse,
  PagedResponse,
  UpdateOrderStatusRequest,
  CreateOrderRequest,
  CreateOrderDetailRequest,
} from '../models';

@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/orders`;

  getAll(page = 0, size = 10) {
    return this.http.get<PagedResponse<OrderResponse>>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  getMyOrders(page = 0, size = 5) {
    return this.http.get<PagedResponse<OrderResponse>>(
      `${this.apiUrl}/me?page=${page}&size=${size}`,
    );
  }

  getByUser(userId: string, page = 0, size = 10) {
    return this.http.get<PagedResponse<OrderResponse>>(
      `${this.apiUrl}/user/${userId}?page=${page}&size=${size}`,
    );
  }

  getById(id: string) {
    return this.http.get<OrderResponse>(`${this.apiUrl}/${id}`);
  }

  create(payload: CreateOrderRequest) {
    return this.http.post<OrderResponse>(this.apiUrl, payload);
  }

  addDetail(orderId: string, payload: CreateOrderDetailRequest) {
    return this.http.post<OrderResponse>(`${this.apiUrl}/${orderId}/details`, payload);
  }

  updateStatus(id: string, payload: UpdateOrderStatusRequest) {
    return this.http.put<OrderResponse>(`${this.apiUrl}/${id}`, payload);
  }
}
