# Brands — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/brands` | query: `pageable` | `PagedResponse<BrandResponse>` | — |
| POST | `/brands` | `CreateBrandRequest` | `BrandResponse` | — |
| GET | `/brands/{id}` | — | `BrandResponse` | — |
| PUT | `/brands/{id}` | `CreateBrandRequest` | `BrandResponse` | Reemplazo completo |
| DELETE | `/brands/{id}` | — | `object` vacío | — |

## Shapes

```typescript
interface CreateBrandRequest {
  name: string; // minLength 1
  description?: string;
  logoUrl?: string;
}

interface BrandResponse {
  id: string; // UUID
  name: string;
  description?: string;
  logoUrl?: string;
}
```
