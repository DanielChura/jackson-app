# Roles — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/roles` | query: `pageable` | `PagedResponse<RoleResponse>` | — |
| POST | `/roles` | `CreateRoleRequest` | `RoleResponse` | — |
| GET | `/roles/{id}` | — | `RoleResponse` | — |
| PATCH | `/roles/{id}` | `CreateRoleRequest` | `RoleResponse` | Parcial |

## Shapes

```typescript
interface CreateRoleRequest {
  name: string; // minLength 1
  description?: string;
}

interface RoleResponse {
  id: string; // UUID
  name: string;
  description?: string;
  createdAt: string; // date-time
}
```
