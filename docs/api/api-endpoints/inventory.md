# Inventory Movements — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/inventory-movements` | query: `pageable` | `PagedResponse<InventoryResponse>` | Solo ADMIN |
| POST | `/inventory-movements` | `CreateInventoryRequest` | `InventoryResponse` | Solo ADMIN |
| GET | `/inventory-movements/{id}` | — | `InventoryResponse` | — |
| GET | `/inventory-movements/product/{productId}` | — | `InventoryResponse[]` | Movimientos de un producto |

## Shapes

```typescript
enum MovementType {
  IN = 'IN',
  OUT = 'OUT',
  SALE = 'SALE',
  RETURN = 'RETURN',
  ADJUSTMENT = 'ADJUSTMENT',
}

interface CreateInventoryRequest {
  productId: string; // UUID
  movementType: MovementType;
  quantity: number; // int32
  reason: string; // minLength 1
}

interface InventoryResponse {
  id: string; // UUID
  productId: string; // UUID
  movementType: MovementType;
  quantity: number; // int32
  previousStock: number; // int32
  newStock: number; // int32
  reason: string;
  createdAt: string; // date-time
}
```
