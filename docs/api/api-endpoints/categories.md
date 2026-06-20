# Categories — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/categories` | query: `pageable` | `PagedResponse<CategoryResponse>` | — |
| POST | `/categories` | `CreateCategoryRequest` | `CategoryResponse` | — |
| GET | `/categories/{id}` | — | `CategoryResponse` | — |
| PUT | `/categories/{id}` | `CreateCategoryRequest` | `CategoryResponse` | Reemplazo completo |
| DELETE | `/categories/{id}` | — | `object` vacío | — |

## Shapes

```typescript
interface CreateCategoryRequest {
  name: string; // minLength 1
  description?: string;
  imageUrl?: string;
}

interface CategoryResponse {
  id: string; // UUID
  name: string;
  description?: string;
  imageUrl?: string;
}
```
