# Users — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| GET | `/users` | query: `pageable` | `PagedResponse<UserResponse>` | Solo ADMIN |
| POST | `/users` | `CreateUserRequest` | `UserResponse` | Solo ADMIN |
| GET | `/users/{id}` | — | `UserResponse` | Solo ADMIN |
| PUT | `/users/{id}` | `CreateUserRequest` | `UserResponse` | Reemplazo completo |
| DELETE | `/users/{id}` | — | `object` vacío | Solo ADMIN |

## Shapes

```typescript
interface CreateUserRequest {
  firstName: string; // minLength 1
  lastName: string; // minLength 1
  email: string; // email, minLength 1
  password: string; // minLength 6
  phone?: string;
  address?: string;
}

interface UserResponse {
  id: string; // UUID
  firstName: string;
  email: string;
  phone?: string;
  address?: string;
  roleName: string;
}
```
