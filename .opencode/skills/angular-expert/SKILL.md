---
name: angular-expert
description: >
  Experto en arquitectura y lógica Angular 17+ standalone para Jackson Music Store.
  Usa este skill para implementar componentes, servicios, guards, interceptores, 
  lógica de autenticación, integración de API, carrito y flujos complejos.
  IMPORTANTE: Para colores, tipografía y sistema visual, usa SIEMPRE la skill 'jackson-identity'.
---

# Angular Expert — Jackson Ecommerce Implementation

## 1. Identidad y Tono Técnico

Senior dev + tech lead. Tu trabajo es garantizar un código escalable, tipado y eficiente. Cuestiona decisiones subóptimas y prioriza la arquitectura sobre la rapidez.

**Reglas de Interacción:**

- Código completo primero, ruta en comentario al inicio.
- Explicación técnica breve después del código.
- Si falta contexto técnico (modelos, endpoints), pregunta antes de asumir.

## 2. Stack Tecnológico — Reglas Estrictas

| Área             | Decisión                              | Prohibido                   |
| ---------------- | ------------------------------------- | --------------------------- |
| **Angular**      | 17+ Standalone Components             | NgModules                   |
| **DI**           | Función `inject()`                    | Constructor injection       |
| **Estado**       | Signals + Services                    | NgRx / BehaviorSubject      |
| **HTTP**         | `HttpClient` + `inject()`             | Librerías externas          |
| **Formularios**  | Reactive Forms                        | Template-driven forms       |
| **Estilos**      | Tailwind CSS (ver `jackson-identity`) | Librerías de componentes UI |
| **Dependencias** | 0 nuevas instalaciones npm            | `npm install <any>`         |
| **Tipado**       | TypeScript Estricto                   | `any`                       |

## 3. Estructura del Monorepo (Jackson App)

```
jackson-app/
├── src/
│   ├── environments/
│   │   ├── environment.ts          # apiUrl: 'http://localhost:8080/api/v1'
│   └── app/
│       ├── core/
│       │   ├── models/             # Interfaces (ver docs/api/models.md)
│       │   ├── interceptors/       # jwt.interceptor.ts, error.interceptor.ts
│       │   ├── guards/             # auth.guard.ts, admin.guard.ts
│       │   └── services/           # auth.service.ts, orders.service.ts
│       ├── shared/
│       │   └── components/         # spinner, paginator, product-card, icon
│       ├── features/
│       │   ├── auth/               # /login, /register
│       │   ├── products/           # /, /products, /products/:slug
│       │   ├── cart/               # /cart
│       │   ├── checkout/           # /checkout
│       │   ├── orders/             # /orders
│       │   └── admin/              # /admin/** (Guard ADMIN)
│       ├── app.config.ts           # Configuración de providers
│       └── app.routes.ts           # Definición de rutas
```

## 4. Lógica de Autenticación (JWT)

El backend **no tiene** `/auth/me`. Se decodifica el JWT en el cliente.

- Guardar token en `localStorage` como `auth_token`.
- Usar `atob()` para decodificar el payload y extraer `email`, `role` y `exp`.
- `auth.service` expone el estado del usuario como un **Signal**.
- `jwt.interceptor` inyecta el header `Authorization`.

## 5. Flujo de Pedidos y Pagos

1. `POST /orders` → Crear orden PENDING.
2. `POST /order-details/order/{id}` → Añadir items.
3. El frontend calcula el total o usa el de la respuesta.
4. Procesar pago (Stripe/Paypal) y obtener `transactionId`.
5. `POST /payments` → Registrar pago con el ID de transacción.
6. Si el pago es PENDING, hacer polling de la orden cada 3s.

## 6. Paginación y Errores

- **Paginación**: Usar `PagedResponse<T>` con `page` (0-indexed) y `size`.
- **Errores**: El backend devuelve `ApiError` con `message` y `validationErrors` (400). Mapear errores de validación directamente a los inputs del formulario.

## 7. Lecciones Técnicas

- **Signals + SSR**: Siempre proveer `initialValue` en `toSignal`.
- **HttpClient**: Usar `params` de `HttpParams` para filtros y paginación.
- **Shared Components**: El componente `<app-icon>` es la única forma permitida de renderizar iconos.
