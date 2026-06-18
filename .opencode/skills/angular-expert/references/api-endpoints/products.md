# Products — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/products` | query: `name?`, `category?`, `brand?`, `pageable` | `PagedResponse<ProductResponse>` | Filtros combinables |
| POST | `/products` | `CreateProductRequest` | `ProductResponse` | — |
| POST | `/products/bulk` | `CreateProductRequest[]` | `ProductResponse[]` | Carga masiva |
| GET | `/products/{id}` | — | `ProductResponse` | 404 si no existe |
| PUT | `/products/{id}` | `CreateProductRequest` | `ProductResponse` | Reemplazo completo |
| DELETE | `/products/{id}` | — | `object` vacío | — |

## Shapes

```typescript
interface CreateProductRequest {
  name: string; // minLength 6, maxLength 250
  description: string; // minLength 1
  price: number;
  stock: number; // int32
  categoryId: string; // UUID
  brandId: string; // UUID
  specifications?: Record<string, unknown>;
}

interface ProductResponse {
  id: string; // UUID
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number; // int32
  categoryName: string; // resuelto, no es categoryId
  brandName: string; // resuelto, no es brandId
  specifications?: Record<string, unknown>;
}
```

## Notas

- `CreateProductRequest` usa `categoryId` / `brandId` (UUIDs), pero `ProductResponse` devuelve `categoryName` / `brandName` (strings resueltos). No son simétricos.
- `GET /products` admite filtros opcionales `name`, `category`, `brand` como query params.
