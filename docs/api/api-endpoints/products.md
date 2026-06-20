# Products — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/products` | query: `name?`, `category?`, `brand?`, `pageable` | `PagedResponse<ProductResponse>` | Filtros combinables |
| POST | `/products` | `multipart/form-data` — field `product` (JSON) + field `files` (imágenes) | `ProductResponse` | Crea producto + sube imágenes a Cloudinary |
| POST | `/products/bulk` | `CreateProductRequest[]` | `ProductResponse[]` | Carga masiva (solo JSON) |
| GET | `/products/{id}` | — | `ProductResponse` | 404 si no existe |
| PUT | `/products/{id}` | `CreateProductRequest` (JSON) | `ProductResponse` | Reemplazo completo, solo datos |
| DELETE | `/products/{id}` | — | `object` vacío | — |
| GET | `/products/{id}/images` | — | `ProductImageResponse[]` | Lista imágenes del producto |
| DELETE | `/products/{id}/images/{imageId}` | — | `object` vacío | Elimina una imagen específica |

## Shapes

```typescript
// JSON dentro del field "product" en POST /products
interface CreateProductPayload {
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
  categoryName: string;
  brandName: string;
  specifications?: Record<string, unknown>;
}

interface ProductImageResponse {
  id: string;
  url: string;
  displayOrder: number;
}
```

## Notas

- `POST /products` es **multipart/form-data**: field `product` (string JSON) + field `files` (archivos, múltiple). Las imágenes se suben a Cloudinary en la misma llamada.
- `PUT /products/{id}` sigue siendo JSON normal (solo datos, sin imágenes).
- `POST /upload` (opcional) permite subir un archivo suelto y devuelve URL de Cloudinary.
- `CreateProductRequest` usa `categoryId` / `brandId` (UUIDs), pero `ProductResponse` devuelve `categoryName` / `brandName` (strings resueltos). No son simétricos.
- `GET /products` admite filtros opcionales `name`, `category`, `brand` como query params.
