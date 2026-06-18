# Auth — Jackson Backend

## Endpoints

| Método | Ruta | Request | Response | Notas |
|---|---|---|---|---|
| POST | `/auth/login` | `LoginRequest` | `AuthResponse` | — |
| POST | `/auth/register` | `RegisterRequest` | `AuthResponse` | — |

## Shapes

```typescript
interface LoginRequest {
  email: string; // email, minLength 1
  password: string; // minLength 1
}

interface RegisterRequest {
  firstName: string; // minLength 1
  lastName: string; // minLength 1
  email: string; // email, minLength 1
  password: string; // minLength 6, maxLength 2147483647
  phone?: string;
  address?: string;
}

interface AuthResponse {
  token: string;
  email: string;
  role: string;
}
```

## Notas

- No existe `GET /auth/me` — decodificar JWT con `atob()` para obtener email/role/exp
- Guardar token en `localStorage` con key `'auth_token'`
- `RegisterRequest` tiene los mismos campos que `CreateUserRequest`
