# Arquitectura de Vistas - Jackson Music Store

Este documento define la arquitectura y requerimientos funcionales de las vistas del frontend para asegurar la consistencia y escalabilidad del proyecto.

## Tabla 1: Storefront (Cliente)

| Vista                | Ruta                | Carpeta de Feature           | Descripción                     |
| :------------------- | :------------------ | :--------------------------- | :------------------------------ |
| **Inicio**           | `/`                 | `src/app/features/home`      | Hero, destacados, categorías.   |
| **Catálogo**         | `/products`         | `src/app/features/products`  | Filtros, búsqueda y listado.    |
| **Detalle Producto** | `/products/:id`     | `src/app/features/products`  | Información, specs, galería.    |
| **Carrito**          | `/cart`             | `src/app/features/cart`      | Resumen, gestión de cantidades. |
| **Checkout**         | `/checkout`         | `src/app/features/checkout`  | Dirección, resumen, pago.       |
| **Éxito Pago**       | `/checkout/success` | `src/app/features/checkout`  | Confirmación de compra.         |
| **Login**            | `/auth/login`       | `src/app/features/auth`      | Autenticación.                  |
| **Registro**         | `/auth/register`    | `src/app/features/auth`      | Creación de cuenta.             |
| **Mi Cuenta**        | `/account`          | `src/app/features/account`   | Perfil, gestión de direcciones. |
| **Mis Pedidos**      | `/orders`           | `src/app/features/orders`    | Historial de órdenes.           |
| **Favoritos**        | `/favorites`        | `src/app/features/favorites` | Lista de deseos.                |

## Tabla 2: Admin (Panel de Gestión)

| Vista          | Ruta                | Carpeta de Feature                  | Descripción                  |
| :------------- | :------------------ | :---------------------------------- | :--------------------------- |
| **Dashboard**  | `/admin`            | `src/app/features/admin/dashboard`  | Métricas y resumen.          |
| **Productos**  | `/admin/products`   | `src/app/features/admin/products`   | CRUD de productos.           |
| **Marcas**     | `/admin/brands`     | `src/app/features/admin/brands`     | CRUD de marcas.              |
| **Categorías** | `/admin/categories` | `src/app/features/admin/categories` | CRUD de categorías.          |
| **Órdenes**    | `/admin/orders`     | `src/app/features/admin/orders`     | Gestión y cambio de estados. |
| **Usuarios**   | `/admin/users`      | `src/app/features/admin/users`      | Gestión de cuentas.          |
| **Inventario** | `/admin/inventory`  | `src/app/features/admin/inventory`  | Control de stock.            |

## Especificaciones de Funcionalidad (Admin)

### Gestión de Productos (`/admin/products`)

- **CRUD Completo:** Crear, Editar, Eliminar, Listar.
- **Filtros Avanzados:**
  - Filtro por estado (Activo/Inactivo).
  - Búsqueda por nombre o SKU.
  - Filtro avanzado por Categoría y Marca (dropdowns cargados dinámicamente).

### Gestión de Marcas (`/admin/brands`)

- **CRUD Completo.**
- **Filtros:**
  - Búsqueda por nombre.
  - Filtro por estado (Activo/Inactivo).

### Gestión de Categorías (`/admin/categories`)

- **CRUD Completo.**
- **Funcionalidad:**
  - Vista jerárquica (Categoría padre/hijo).
  - Búsqueda por nombre.
  - Filtro por estado.

### Gestión de Órdenes (`/admin/orders`)

- **Listado y Detalle:**
  - Filtro por estado de orden (PENDING, PAID, SHIPPED, DELIVERED, CANCELLED).
  - Búsqueda por número de orden o email de usuario.
  - Cambio rápido de estado de la orden (con confirmación).

### Gestión de Usuarios (`/admin/users`)

- **Listado y Edición:**
  - Búsqueda por email o nombre.
  - Filtro por rol (CUSTOMER, ADMIN).
  - Gestión de bloqueo/activación de usuarios.
