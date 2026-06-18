# API Endpoints — Jackson Backend

Fuente: OpenAPI real del backend (`/v3/api-docs`). Cada entidad tiene su propio archivo en `api-endpoints/`.

Base URL: `http://localhost:8080/api/v1`

---

## Índice de entidades

| Archivo | Entidad | Estado |
|---|---|---|
| `api-endpoints/auth.md` | Auth (login/register) | ✅ Documentado |
| `api-endpoints/users.md` | Users CRUD | ✅ Documentado |
| `api-endpoints/roles.md` | Roles CRUD | ✅ Documentado |
| `api-endpoints/categories.md` | Categories CRUD | ✅ Documentado |
| `api-endpoints/brands.md` | Brands CRUD | ✅ Documentado |
| `api-endpoints/products.md` | Products CRUD + bulk | ✅ Documentado |
| `api-endpoints/product-images.md` | Product Images CRUD | ✅ Documentado |
| `api-endpoints/reviews.md` | Reviews CRUD | ✅ Documentado |
| `api-endpoints/cart.md` | Carts + Cart Items | ✅ Documentado |
| `api-endpoints/orders.md` | Orders + Order Details | ✅ Documentado |
| `api-endpoints/payments.md` | Payments CRUD | ✅ Documentado |
| `api-endpoints/inventory.md` | Inventory Movements | ✅ Documentado |
| `api-endpoints/favorites.md` | Favorites CRUD | ✅ Documentado |
| `api-endpoints/pageable.md` | PagedResponse (genérico) | ✅ Documentado |

---

## Convenciones compartidas

### Paginación (Pageable)
Query params: `page` (0-indexed), `size`, `sort` (ej. `price,desc`).
Toda respuesta paginada usa `PagedResponse<T>`. Ver `api-endpoints/pageable.md`.

### Errores
El backend devuelve siempre:
```typescript
interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
  validationErrors?: Record<string, string>; // solo en 400
}
```

### Reglas de auth
- Rutas públicas: `POST /auth/**`, `GET /products/**`, `GET /brands/**`, `GET /categories/**`, `POST /webhooks/**`
- Todo lo demás requiere JWT en `Authorization: Bearer <token>`
- Roles ADMIN required para: `POST/PUT/DELETE /products/**`, `GET/DELETE /users/**`, `PUT /orders/{id}`, `GET/POST /inventory-movements/**`
