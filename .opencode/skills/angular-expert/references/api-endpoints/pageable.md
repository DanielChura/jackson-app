# Pageable / PagedResponse — genérico

Usado por todos los endpoints de listado. No se repite en cada archivo de entidad.

Query params: `page` (0-indexed), `size`, `sort` (ej. `price,desc`).

```typescript
interface Pageable {
  page: number; // int32, min 0
  size: number; // int32, min 1
  sort?: string[];
}

interface PagedResponse<T> {
  content: T[];
  page: number; // int32
  size: number; // int32
  totalElements: number; // int64
  totalPages: number; // int32
}
```
