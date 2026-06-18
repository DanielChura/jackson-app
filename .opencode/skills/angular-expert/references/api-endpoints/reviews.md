# Reviews — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/reviews` | query: `pageable` | `PagedResponse<ReviewResponse>` | — |
| POST | `/reviews` | `CreateReviewRequest` | `ReviewResponse` | — |
| GET | `/reviews/{id}` | — | `ReviewResponse` | — |
| PUT | `/reviews/{id}` | `UpdateReviewRequest` | `ReviewResponse` | Actualización parcial |
| DELETE | `/reviews/{id}` | — | `void` | — |
| GET | `/reviews/user/{userId}` | — | `ReviewResponse[]` | Por usuario |
| GET | `/reviews/product/{productId}` | — | `ReviewResponse[]` | Por producto |

## Shapes

```typescript
interface CreateReviewRequest {
  productId: string; // UUID
  rating: number; // int32, min 1, max 5
  comment?: string;
}

interface UpdateReviewRequest {
  rating?: number; // int32, min 1, max 5
  comment?: string;
}

interface ReviewResponse {
  id: string; // UUID
  userId: string; // UUID
  productId: string; // UUID
  userName: string;
  rating: number; // int32
  comment?: string;
  createdAt: string; // date-time
}
```
