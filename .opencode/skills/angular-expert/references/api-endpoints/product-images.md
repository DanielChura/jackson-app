# Product Images — Jackson Backend

## Estado: Deprecado — Endpoints fusionados en Products

El controlador independiente `ProductImageController` fue eliminado.
Las imágenes ahora se manejan únicamente desde el endpoint de creación de productos.

## Endpoints activos

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| POST | `/products` | `multipart/form-data` (field `files`) | `ProductResponse` | Las imágenes se suben junto con el producto a Cloudinary |
| GET | `/products/{id}/images` | — | `ProductImageResponse[]` | Lista imágenes de un producto |
| DELETE | `/products/{id}/images/{imageId}` | — | `object` vacío | Elimina una imagen específica |

## Shape

```typescript
interface ProductImageResponse {
  id: string;
  url: string;
  displayOrder: number;
}
```

## Notas

- `CreateProductImageRequest` fue eliminado — ya no existe.
- Para subir una imagen suelta (fuera de creación de producto), usar `POST /upload`.
