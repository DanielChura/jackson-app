# Product Images — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/product-images/product/{id}` | — | `ProductImageResponse[]` | Todas las de un producto |
| POST | `/product-images/product/{id}` | `CreateProductImageRequest` | `ProductImageResponse` | — |
| GET | `/product-images` | query: `pageable` | `PagedResponse<ProductImageResponse>` | Listado paginado |
| DELETE | `/product-images/{id}` | — | `object` vacío | — |

## Shapes

```typescript
interface CreateProductImageRequest {
  url: string; // minLength 1
  displayOrder: number; // int32
}

interface ProductImageResponse {
  id: string; // UUID
  productId: string; // UUID
  url: string;
  displayOrder: number; // int32
}
```

## Notas

- Las rutas son `/product-images/product/{productId}`, **NO** `/products/{id}/images`.
