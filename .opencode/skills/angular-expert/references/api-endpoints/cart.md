# Cart + Cart Items — Jackson Backend

## Cart endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/carts` | query: `pageable` | `PagedResponse<CartResponse>` | — |
| POST | `/carts` | — | `CartResponse` | Sin body, crea carrito vacío |
| GET | `/carts/{id}` | — | `CartResponse` | — |
| GET | `/carts/user/{id}` | — | `CartResponse` | Carrito por usuario |

## Cart Item endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| POST | `/cart-items` | `CreateCartItemRequest` | `CartItemResponse` | Agrega item al carrito |
| PUT | `/cart-items/{id}` | `CreateCartItemRequest` | `CartItemResponse` | Actualiza cantidad |
| DELETE | `/cart-items/{id}` | — | `object` vacío | Elimina item |
| GET | `/cart-items/cart/{cartId}` | — | `CartItemResponse[]` | Items de un carrito |
| DELETE | `/cart-items/cart/{cartId}` | — | `object` vacío | Limpia carrito |

## Shapes

```typescript
interface CreateCartItemRequest {
  cartId: string; // UUID
  productId: string; // UUID
  quantity: number; // int32
}

interface CartItemResponse {
  id: string; // UUID
  productId: string; // UUID
  quantity: number; // int32
  unitPrice: number;
  subtotal: number;
}

interface CartResponse {
  id: string; // UUID
  userId: string; // UUID
  total: number;
  items: CartItemResponse[];
}
```

## Flujo típico

1. `POST /carts` → crear carrito vacío → `CartResponse`
2. `POST /cart-items` → agregar producto → `CartItemResponse`
3. `GET /carts/{id}` → obtener carrito con items y total
