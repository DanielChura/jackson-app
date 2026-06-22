import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CartResponse, CreateCartItemRequest } from '../models';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/carts`;

  /** Signal compartida con la cantidad de items del carrito del usuario autenticado. */
  readonly count = signal(0);

  /** Obtiene o crea el carrito del usuario autenticado (userId se extrae del JWT en backend). */
  getMine() {
    return this.http.get<CartResponse>(`${this.apiUrl}/mine`);
  }

  addItem(payload: CreateCartItemRequest) {
    return this.http.post<CartResponse>(`${environment.apiUrl}/cart-items`, payload);
  }

  removeItem(itemId: string) {
    return this.http.delete<void>(`${environment.apiUrl}/cart-items/${itemId}`);
  }

  updateItemQuantity(itemId: string, quantity: number) {
    return this.http.patch<CartResponse>(`${environment.apiUrl}/cart-items/${itemId}`, {
      quantity,
    });
  }

  clear(cartId: string) {
    return this.http.delete<void>(`${this.apiUrl}/${cartId}`);
  }
}
