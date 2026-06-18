# Favorites — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/favorites` | query: `pageable` | `PagedResponse<FavoriteResponse>` | — |
| POST | `/favorites` | `CreateFavoriteRequest` | `FavoriteResponse` | Agrega favorito |
| DELETE | `/favorites/{id}` | — | `object` vacío | Elimina favorito |
| GET | `/favorites/user/{id}` | — | `FavoriteResponse[]` | Favoritos de un usuario |

## Shapes

```typescript
interface CreateFavoriteRequest {
  productId: string; // UUID
}

interface FavoriteResponse {
  id: string; // UUID
  userId: string; // UUID
  productId: string; // UUID
}
```
