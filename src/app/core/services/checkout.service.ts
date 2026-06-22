import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { StripeSessionResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class CheckoutService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/checkout`;

  createSession(orderId: string) {
    return this.http.post<StripeSessionResponse>(`${this.apiUrl}/session`, { orderId });
  }
}
