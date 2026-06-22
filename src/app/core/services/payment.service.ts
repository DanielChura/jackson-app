import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CreatePaymentRequest, PaymentResponse } from '../models';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/payments`;

  create(payload: CreatePaymentRequest) {
    return this.http.post<PaymentResponse>(this.apiUrl, payload);
  }

  getByOrder(orderId: string) {
    return this.http.get<PaymentResponse[]>(`${this.apiUrl}/order/${orderId}`);
  }
}
