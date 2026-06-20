export type PaymentMethod =
  | 'PAYPAL' | 'STRIPE' | 'CASH' | 'YAPE'
  | 'PLIN' | 'BANK_TRANSFER' | 'DEBIT_CARD' | 'CREDIT_CARD';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface CreatePaymentRequest {
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  transactionId: string;
}

export interface UpdatePaymentStatusRequest {
  status: PaymentStatus;
}

export interface PaymentResponse {
  id: string;
  orderId: string;
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string;
}
