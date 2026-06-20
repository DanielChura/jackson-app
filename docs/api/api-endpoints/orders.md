# Orders + Order Details — Jackson Backend

## Order endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/orders` | query: `pageable` | `PagedResponse<OrderResponse>` | — |
| POST | `/orders` | `CreateOrderRequest` | `OrderResponse` | Crea orden sin items |
| GET | `/orders/{id}` | — | `OrderResponse` | — |
| PUT | `/orders/{id}` | `UpdateOrderStatusRequest` | `OrderResponse` | Cambia estado |
| GET | `/orders/user/{id}` | — | `OrderResponse[]` | Órdenes de un usuario |

## Order Detail endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/order-details` | query: `pageable` | `PagedResponse<OrderDetailResponse>` | — |
| GET | `/order-details/{id}` | — | `OrderDetailResponse` | — |
| POST | `/order-details/order/{id}` | `CreateOrderDetailRequest[]` | `OrderResponse` | Agrega items a orden |
| DELETE | `/order-details/{id}` | — | `object` vacío | Elimina item |

## Shapes

```typescript
interface CreateOrderRequest {
  shippingAddress: string; // minLength 1
  shippingReference?: string;
}

interface UpdateOrderStatusRequest {
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
}

interface CreateOrderDetailRequest {
  productId: string; // UUID
  quantity: number; // int32
}

interface OrderDetailResponse {
  id: string; // UUID
  orderId: string; // UUID
  productId: string; // UUID
  productName: string;
  quantity: number; // int32
  unitPrice: number;
  subtotal: number;
}

interface OrderResponse {
  id: string; // UUID
  userId: string; // UUID
  orderNumber: string;
  subtotal: number;
  taxes: number;
  total: number;
  shippingAddress: string;
  shippingReference?: string;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  orderedAt: string; // date-time
  items: OrderDetailResponse[];
}
```

## Flujo típico

1. `POST /orders` → crear orden con dirección → `OrderResponse`
2. `POST /order-details/order/{id}` → agregar productos → `OrderResponse` actualizado
3. `POST /payments` → crear pago (ver `payments.md`)
