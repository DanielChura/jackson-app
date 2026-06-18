# Payments — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/payments` | query: `pageable` | `PagedResponse<PaymentResponse>` | — |
| POST | `/payments` | `CreatePaymentRequest` | `PaymentResponse` | Procesa pago |
| GET | `/payments/{id}` | — | `PaymentResponse` | — |
| GET | `/payments/order/{orderId}` | — | `PaymentResponse[]` | Pagos de una orden |
| PATCH | `/payments/{id}/status` | `UpdatePaymentStatusRequest` | `PaymentResponse` | Cambia estado |

## Shapes

```typescript
enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  STRIPE = 'STRIPE',
  CASH = 'CASH',
  YAPE = 'YAPE',
  PLIN = 'PLIN',
  BANK_TRANSFER = 'BANK_TRANSFER',
  DEBIT_CARD = 'DEBIT_CARD',
  CREDIT_CARD = 'CREDIT_CARD',
}

enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

interface CreatePaymentRequest {
  orderId: string; // UUID
  paymentMethod: PaymentMethod;
  amount: number;
  transactionId: string;
}

interface UpdatePaymentStatusRequest {
  status: PaymentStatus;
}

interface PaymentResponse {
  id: string; // UUID
  orderId: string; // UUID
  paymentMethod: PaymentMethod;
  amount: number;
  status: PaymentStatus;
  transactionId?: string;
  paidAt?: string; // date-time
}
```

## Notas

- No existe endpoint `/checkout/session`. El frontend debe recolectar `transactionId` vía Stripe Elements y enviarlo a `POST /payments`.
- `PATCH /payments/{id}/status` es solo para admin.
