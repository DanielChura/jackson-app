import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CartResponse, CreateCartItemRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/cart`;

  getByUser(userId: string) {
    return this.http.get<CartResponse>(`${this.apiUrl}/user/${userId}`);
  }

  addItem(payload: CreateCartItemRequest) {
    return this.http.post<CartResponse>(`${this.apiUrl}/items`, payload);
  }

  removeItem(itemId: string) {
    return this.http.delete<void>(`${this.apiUrl}/items/${itemId}`);
  }

  updateItemQuantity(itemId: string, quantity: number) {
    return this.http.patch<CartResponse>(`${this.apiUrl}/items/${itemId}`, { quantity });
  }

  clear(cartId: string) {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}`);
  }
}
