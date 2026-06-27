import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreateInventoryRequest, InventoryResponse, PagedResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class InventoryService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/inventory-movements`;

  getAll(page = 0, size = 10) {
    return this.http.get<PagedResponse<InventoryResponse>>(
      `${this.apiUrl}?page=${page}&size=${size}`,
    );
  }

  getByProduct(productId: string) {
    return this.http.get<InventoryResponse[]>(`${this.apiUrl}/product/${productId}`);
  }

  create(payload: CreateInventoryRequest) {
    return this.http.post<InventoryResponse>(this.apiUrl, payload);
  }
}
