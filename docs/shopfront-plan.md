# Jackson Music Store — Shopfront Plan de Implementación

> **Contexto:** Tienda de música de alto tráfico. Angular 22 standalone + SSR + Tailwind CSS.
> Backend Jackson API con endpoints REST documentados en `docs/api/`.
> Diseño UX definido previamente con @ux-designer — este plan traduce ese diseño a implementación concreta.
> **Actualizado con feedback de UX Designer (2026-06-20):** 8 secciones del shopfront validadas, orden corregido, secciones faltantes agregadas.

---

## Principios rectores

- **Rendimiento primero:** SSR ya configurado, categorías estáticas (sin llamadas API para navegación), imágenes optimizadas, lazy loading en routes
- **Sin dependencias externas:** 0 `npm install` — solo Angular SDK + Tailwind
- **Mobile-first:** todo se diseña para móvil primero, se expande con `md:` y `lg:`
- **Strict types:** nunca `any`, modelos centralizados en `core/models/index.ts`
- **Strict modes:** Signals, `inject()`, standalone components, Reactive Forms
- **Cada componente = 4 estados:** loading, error, empty, data

---

## ⚠️ Errores del plan original (corregidos)

El plan original fue revisado por @ux-designer y se identificaron estos problemas que ya están corregidos en este documento:

| #   | Error                               | Corrección                                                                                 |
| --- | ----------------------------------- | ------------------------------------------------------------------------------------------ |
| 1   | Solo 5 secciones visuales           | Ahora son **8 secciones** (agregadas: Bestsellers, Why Jackson, Testimonials + Social CTA) |
| 2   | Trust Bar entre Categories y Brands | Movida al **final** del shopfront, como cierre de confianza                                |
| 3   | Brand Strip genérica                | Ahora con más presencia visual, hover para "Ver productos [marca]"                         |
| 4   | Hero genérico                       | Mensaje más específico para músicos                                                        |
| 5   | Sin lead capture                    | Agregado: CTA de WhatsApp + Redes Sociales al final                                        |
| 6   | Sin bestsellers                     | Agregada sección "Los más vendidos" (usa endpoint existente, 5 productos)                  |
| 7   | Sin value props                     | Agregada sección "¿Por qué Jackson?" con 4 diferenciadores                                 |
| 8   | Sin testimonials                    | Agregada sección con placeholders genéricos (mientras se acumulan reviews reales)          |

---

## Vista general del Shopfront — 8 secciones

El home del shopfront sigue esta progresión psicológica de compra, de arriba a abajo:

```
┌─ ❶ HERO ──────────────────────────────────────────┐
│  "Todo para tu música"                             │
│  Especialistas en instrumentos, equipos y audio    │
│  [Ver productos]  [Explorar categorías]             │
│  Fondo: gradiente oscuro, sin carrusel             │
├─ ❷ CATEGORY GRID ──────────────────────────────────┤
│  Guitarras | Baterías | Teclados | Audio/Mic | DJ  │
│  Grid responsivo 2→6 cols, icon + nombre + count   │
├─ ❸ NEW ARRIVALS ───────────────────────────────────┤
│  "Nuevos productos"  →  GET /products?sort=createdAt│
│  Grid 2→4 cols, badge "Nuevo", link "Ver todos"    │
├─ ❹ BESTSELLERS ────────────────────────────────────┤
│  "Los más vendidos"  →  GET /products (5 productos) │
│  Grid similar a New Arrivals, rating visible        │
│  ⚠ Temporal: endpoint propio se implementa después │
├─ ❺ BRAND STRIP ────────────────────────────────────┤
│  "Marcas que trabajamos"                           │
│  Fender · Gibson · Yamaha · Roland · Marshall · .. │
│  Scroll horizontal, hover → "Ver productos [marca]"│
├─ ❻ WHY JACKSON ────────────────────────────────────┤
│  "¿Por qué comprar en Jackson?"                    │
│  Expertos en música | Envío rápido | Garantía       │
│  extendida | Soporte especializado                  │
├─ ❼ TESTIMONIALS ───────────────────────────────────┤
│  "Lo que dicen nuestros clientes"                  │
│  Placeholders genéricos hasta tener reviews reales  │
├─ ❽ TRUST BAR + SOCIAL ─────────────────────────────┤
│  Envío rápido | Pago seguro | Dev. fácil | Soporte │
│  WhatsApp + Instagram + Facebook + YouTube + TikTok │
└─────────────────────────────────────────────────────┘
```

**Jerarquía:** Presentación → Exploración → Productos nuevos → Popularidad → Marcas aspiracionales → Diferenciación → Prueba social → Confianza + Contacto.

---

## Fase 0 — Fundamentos del Shopfront

> **Objetivo:** Reemplazar la home actual (carrusel genérico + select categorías + grid básico) por una landing de tienda de música profesional con SSR, implementando las 8 secciones completas.

### 0.1 — Iconos de tienda de música

**Archivos:** `src/app/shared/icons/icons.ts`

Agregar SVGs para la tienda de música (stroke-width="2", estilo lucide):

| Icon name        | Descripción                           |
| ---------------- | ------------------------------------- |
| `music`          | Nota musical simple                   |
| `guitar`         | Guitarra acústica/eléctrica (silueta) |
| `headphones`     | Audífonos                             |
| `mic`            | Micrófono                             |
| `disc`           | Disco/CD                              |
| `radio`          | Radio/receptor                        |
| `speaker`        | Parlante/amplificador                 |
| `vinyl`          | Toca discos/vinilo                    |
| `shipping`       | Camión de envío (para trust bar)      |
| `shield-check`   | Escudo con check (para trust bar)     |
| `credit-card`    | Tarjeta de crédito (para trust bar)   |
| `refresh-cw`     | Flecha circular (devoluciones)        |
| `star`           | Estrella rellena (outline)            |
| `star-filled`    | Estrella rellena sólida               |
| `chevron-right`  | Flecha derecha                        |
| `chevron-left`   | Flecha izquierda                      |
| `x`              | Cerrar                                |
| `plus`           | Más/añadir                            |
| `minus`          | Menos                                 |
| `trash`          | Eliminar                              |
| `map-pin`        | Ubicación                             |
| `phone`          | Teléfono                              |
| `mail`           | Email                                 |
| `instagram`      | Instagram                             |
| `facebook`       | Facebook                              |
| `youtube`        | YouTube                               |
| `tiktok`         | TikTok                                |
| `truck`          | Camión de reparto                     |
| `package-check`  | Paquete con check                     |
| `arrow-right`    | Flecha hacia la derecha               |
| `quote`          | Comillas (para testimonials)          |
| `award`          | Trofeo/medalla (para Why Jackson)     |
| `tool`           | Llave inglesa/herramienta (garantía)  |
| `message-circle` | Burbuja de chat (soporte)             |
| `zap`            | Rayo (rápido/envío exprés)            |
| `whatsapp`       | WhatsApp                              |
| `external-link`  | Link externo                          |

### 0.2 — Hero section

**Archivos nuevos:**

- `src/app/features/home/sections/hero-section/hero-section.component.ts`
- `src/app/features/home/sections/hero-section/hero-section.component.html`

**Diseño:**

- Full-width con gradiente oscuro (`bg-gradient-to-r from-gray-900 via-gray-900/95 to-gray-900/80`) como fondo
- Imagen de fondo decorativa con `object-cover` (imagen de guitarra/equipo musical, local si es posible)
- **Título:** "Todo para tu música"
- **Subtítulo:** "Especialistas en instrumentos, equipos y audio para músicos — desde principiantes hasta profesionales"
- CTA principal: "Ver productos" → `/products` (botón naranja `bg-orange-500 hover:bg-orange-600`)
- CTA secundario: "Explorar categorías" → scroll suave a category grid (botón outline blanco)
- Texto blanco sobre fondo oscuro, sin sombras
- Altura: `min-h-[400px] md:min-h-[500px]`
- Sin carrusel, sin auto-slide, sin imágenes de Facebook CDN

### 0.3 — Category Grid

**Archivos nuevos:**

- `src/app/features/home/sections/category-grid/category-grid.component.ts`
- `src/app/features/home/sections/category-grid/category-grid.component.html`
- `src/app/core/data/categories.ts` (datos estáticos)

**Diseño:**

- Título: "Categorías" (h2, gray-900, font-weight 500)
- Grid responsivo: 2 columnas móvil, 3 tablet, 6 desktop
- Cada categoría es una card clickeable que navega a `/products?category=<slug>`
- Static categories (hardcoded, 0 llamadas API):

```typescript
[
  { name: 'Guitarras', slug: 'guitarras', icon: 'guitar', count: 42 },
  { name: 'Baterías', slug: 'baterias', icon: 'music', count: 28 },
  { name: 'Teclados', slug: 'teclados', icon: 'radio', count: 35 },
  { name: 'Audio y micrófonos', slug: 'audio-microfonos', icon: 'mic', count: 56 },
  { name: 'Equipos de DJ', slug: 'equipos-dj', icon: 'disc', count: 19 },
  { name: 'Accesorios', slug: 'accesorios', icon: 'headphones', count: 73 },
];
```

- Card: `bg-white rounded-2xl border border-gray-200 p-6 text-center hover:border-orange-500 transition-colors cursor-pointer`
- Ícono grande (size 40), nombre abajo (font-weight 500), count opcional (text-gray-400)

### 0.4 — New Arrivals

**Archivos nuevos:**

- `src/app/features/home/sections/new-arrivals/new-arrivals.component.ts`
- `src/app/features/home/sections/new-arrivals/new-arrivals.component.html`

**Diseño:**

- Título "Nuevos productos" (h2) con link "Ver todos" → `/products?sort=createdAt,desc`
- Grid de productos (reusa `app-product-card`)
- Pide `GET /products?page=0&size=8&sort=createdAt,desc`
- 2 columnas móvil, 3 tablet, 4 desktop
- loading/error/empty states obligatorios

### 0.5 — Bestsellers

**Archivos nuevos:**

- `src/app/features/home/sections/bestsellers/bestsellers.component.ts`
- `src/app/features/home/sections/bestsellers/bestsellers.component.html`

**Diseño:**

- Título "Los más vendidos" (h2) con link "Ver todos" → `/products`
- Grid de productos (reusa `app-product-card`)
- **Mientras no exista endpoint específico:** llama `GET /products?page=0&size=5`
- **Futuro:** reemplazar con endpoint real de bestsellers/soldCount
- Grid: 2 columnas móvil, 3 tablet, 5 desktop
- Muestra rating con estrellas si está disponible
- loading/error/empty states

### 0.6 — Brand Strip

**Archivos nuevos:**

- `src/app/features/home/sections/brand-strip/brand-strip.component.ts`
- `src/app/features/home/sections/brand-strip/brand-strip.component.html`

**Diseño:**

- Título: "Marcas que trabajamos" (h2)
- Logos de marcas en fila horizontal (overflow-x auto en mobile, gap generoso en desktop)
- Hardcoded: Fender, Gibson, Yamaha, Roland, Marshall, Shure, AKG, Pioneer
- Cada marca es clickeable → `/products?brand=<name>`
- Visual: contenedor `rounded-2xl border border-gray-200 p-4 hover:border-orange-300 transition-colors`
- Por ahora: SVG placeholder + nombre de marca
- Desktop: hover muestra tooltip o label "Ver productos [marca]"
- Sin carrusel automático, solo scroll horizontal nativo

### 0.7 — Why Jackson (Value Propositions)

**Archivos nuevos:**

- `src/app/features/home/sections/why-jackson/why-jackson.component.ts`
- `src/app/features/home/sections/why-jackson/why-jackson.component.html`

**Diseño:**

- Título: "¿Por qué comprar en Jackson?" (h2)
- 4 tarjetas en grid: 2 columnas móvil, 4 desktop
- Cada tarjeta: ícono + título + descripción breve
- Items:

| Ícono            | Título                | Descripción                                       |
| ---------------- | --------------------- | ------------------------------------------------- |
| `award`          | Expertos en música    | Asesoría especializada por músicos para músicos   |
| `truck`          | Envío rápido          | Entregas en 24-48 hrs en Lima y provincia         |
| `tool`           | Garantía extendida    | Todos nuestros productos con garantía             |
| `message-circle` | Soporte especializado | Resolvemos tus dudas antes y después de la compra |

- Cada card: `bg-white rounded-2xl border border-gray-200 p-6`
- Ícono grande (size 36) en `text-orange-500`
- Título font-weight 500, descripción font-weight 400 text-gray-600

### 0.8 — Testimonials

**Archivos nuevos:**

- `src/app/features/home/sections/testimonials/testimonials.component.ts`
- `src/app/features/home/sections/testimonials/testimonials.component.html`

**Diseño:**

- Título: "Lo que dicen nuestros clientes" (h2)
- 3 tarjetas en grid: 1 columna móvil, 2 tablet, 3 desktop
- Cada tarjeta: rating (estrellas), texto, autor, ciudad
- **Placeholders genéricos** (hasta que haya reviews reales):

```typescript
[
  {
    rating: 5,
    text: 'Compré mi Fender Strat aquí — el precio fue el mejor que encontré en Lima. La entrega fue súper rápida.',
    author: 'Carlos M.',
    city: 'Lima',
  },
  {
    rating: 5,
    text: 'Excelente atención. Me asesoraron para elegir mi primer teclado y no pudieron haber acertado más.',
    author: 'Valeria R.',
    city: 'Arequipa',
  },
  {
    rating: 4,
    text: 'Los pedidos online llegan muy bien empacados. Ya he comprado 3 veces y todo perfecto.',
    author: 'Miguel Á.',
    city: 'Trujillo',
  },
];
```

- Cada card: `bg-white rounded-2xl border border-gray-200 p-6`
- Estrellas con `app-icon name="star" class="text-amber-500"`
- Quote decorativo con `app-icon name="quote"`

### 0.9 — Trust Bar + Social CTA

**Archivos nuevos:**

- `src/app/features/home/sections/trust-bar/trust-bar.component.ts`
- `src/app/features/home/sections/trust-bar/trust-bar.component.html`

**Diseño (Trust Bar):**

- 4 ítems de confianza en grid: 2 columnas móvil, 4 desktop
- Cada item: ícono + texto

| Ícono          | Texto            |
| -------------- | ---------------- |
| `truck`        | Envío rápido     |
| `shield-check` | Pago seguro      |
| `refresh-cw`   | Devolución fácil |
| `headphones`   | Soporte 24/7     |

- Sin borde de card individual, solo texto e ícono
- Separador visual entre items (borde derecho en desktop)

**Diseño (Social CTA):**

- Debajo de trust bar, separado por `border-t border-gray-200`
- Texto: "Síguenos en redes" + iconos de redes (Instagram, Facebook, YouTube, TikTok)
- Botón de WhatsApp: "Escríbenos por WhatsApp" → abre `https://wa.me/<numero>`
- Los iconos de redes son links externos que abren en nueva pestaña

### 0.10 — Product Card mejorado

**Archivo:** `src/app/shared/components/product-card/product-card.component.ts`

**Mejoras:**

- Mostrar imagen real del producto si existe (no ícono placeholder)
- `ProductResponse` no tiene array de imágenes (se piden con `GET /products/{id}/images`)
- Por ahora: mantener placeholder icon si no hay imágenes disponibles
- Nombre truncado a 2 líneas con `line-clamp-2`
- Precio formateado con `toLocaleString('es-PE', { style: 'currency', currency: 'PEN' })`
- Categoría como badge pequeña arriba

### 0.11 — /products route

**Archivos nuevos:**

- `src/app/features/products/product-list/product-list.component.ts`
- `src/app/features/products/product-list/product-list.component.html`
- `src/app/features/products/product-list/product-list.routes.ts`
- Agregar route en `app.routes.ts`

**Diseño:**

- Ruta: `/products`
- Header con título "Productos" + search input
- Grid de productos (reusa `app-product-card`)
- Paginación (reusa `app-paginator`)
- Sort: "Más recientes", "Menor precio", "Mayor precio"
- Query params sincronizados: `/products?category=guitarras&sort=price,asc&page=0`

### 0.12 — Navbar estática de categorías

**Archivos:** `src/app/layout/navbar/navbar.component.ts` (actualizar)

**Cambios:**

- Las categorías ya son estáticas (hardcoded en `categoryLinks`)
- Actualizar links para que apunten a `/products?category=<slug>`
- Categorías de música:

```typescript
readonly categoryLinks = [
  { label: 'Guitarras', path: '/products?category=guitarras' },
  { label: 'Baterías y percusión', path: '/products?category=baterias' },
  { label: 'Teclados y sintetizadores', path: '/products?category=teclados' },
  { label: 'Audio y micrófonos', path: '/products?category=audio-microfonos' },
  { label: 'Equipos de DJ', path: '/products?category=equipos-dj' },
  { label: 'Accesorios', path: '/products?category=accesorios' },
]
```

### 0.13 — Home component refactor

**Archivos:** `src/app/features/home/home.component.ts`, `home.component.html`

**Cambios:**

- Home pasa de ser un solo componente monolítico a orquestar las 8 secciones
- Template que renderiza secciones en orden:
  Hero → Categories → New Arrivals → Bestsellers → Brand Strip → Why Jackson → Testimonials → Trust Bar + Social
- Home component se convierte en un contenedor que importa las secciones
- Search y category filter se mueven a `/products` (ya no están en home)

---

## Fase 1 — Catálogo y Navegación

> **Objetivo:** Experiencia completa de navegación y descubrimiento de productos.

### 1.1 — Product Detail

**Ruta:** `/products/{id}` → `GET /products/{id}`
**Archivos nuevos:**

- `src/app/features/products/product-detail/product-detail.component.ts`
- `src/app/features/products/product-detail/product-detail.component.html`

**Secciones:**

- Galería de imágenes (`GET /products/{id}/images`)
- Nombre, precio, descripción
- Stock disponible
- Selector de cantidad + botón "Agregar al carrito"
- Especificaciones técnicas (si `specifications` existe)
- Sección de reviews (rating promedio + comentarios)
- Productos relacionados (por categoría, `GET /products?category=<slug>&page=0&size=4`)
- Breadcrumbs: Home > Categoría > Producto

### 1.2 — Búsqueda funcional

**Archivos:** `src/app/layout/navbar/navbar.component.ts` (actualizar)

**Cambios:**

- Input de búsqueda en navbar navega a `/products?search=<query>` al hacer Enter
- Product list page recibe `search` como query param, filtra por `GET /products?name=<query>`

### 1.3 — Filtros avanzados en catálogo

**Archivo:** `src/app/features/products/product-list/product-list.component.ts`

- Filtro por rango de precio (min/max inputs)
- Filtro por categoría (checkboxes)
- Sort: relevancia, precio ascendente, descendente, nombre A-Z
- Todos los filtros sincronizados con query params de la URL
- Mobile: filtros en modal/drawer

### 1.4 — Breadcrumbs component

**Archivo nuevo:**

- `src/app/shared/components/breadcrumbs/breadcrumbs.component.ts`
- Input: `items: { label: string; path?: string }[]`

---

## Fase 2 — Carrito y Checkout

> **Objetivo:** Flujo completo de compra.

### 2.1 — Cart page

**Ruta:** `/cart`
**Archivos nuevos:**

- `src/app/features/cart/cart.component.ts`
- `src/app/features/cart/cart.component.html`
- `src/app/core/services/cart.service.ts`

**Endpoints:**

- `GET /cart/{userId}` — obtener carrito
- `POST /cart` — crear item
- `DELETE /cart/{cartItemId}` — eliminar item
- `PUT /cart/{cartItemId}` — actualizar cantidad

**Secciones:**

- Lista de items con imagen, nombre, precio unitario, cantidad, subtotal
- Botón eliminar por item
- Resumen: subtotal, impuestos, total
- Botón "Proceder al pago" → `/checkout`
- Empty state: "Tu carrito está vacío" + link a productos
- Loading/error states

### 2.2 — Checkout flow

**Ruta:** `/checkout`
**Archivos nuevos:**

- `src/app/features/checkout/checkout.component.ts`
- `src/app/features/checkout/checkout.component.html`

**Pasos:**

1. Shipping: formulario con dirección (`shippingAddress`, `shippingReference`)
2. Resumen: revisar items, total, dirección
3. Pago: seleccionar método + Stripe Elements (transactionId)
4. Confirmación: mensaje de éxito

**Flujo (del spec de API):**

1. `POST /orders { shippingAddress, shippingReference? }` → orderId
2. `POST /order-details/order/{orderId} [ { productId, quantity }, ... ]` → agregar items
3. `POST /payments { orderId, paymentMethod: 'STRIPE', amount, transactionId }` → pagar
4. Polling `GET /orders/{id}` hasta status != PENDING

### 2.3 — Stripe integration

**Archivo:** `src/app/features/checkout/checkout.component.ts`

- Sin Stripe SDK externo (0 npm install)
- MVP: recolectar transactionId manualmente o mostrar instrucciones
- Post-MVP: Stripe.js vía CDN si es necesario

---

## Fase 3 — Cuenta y Personalización

> **Objetivo:** Funcionalidades de usuario registrado.

### 3.1 — Órdenes

**Rutas:** `/orders` (lista), `/orders/{id}` (detalle)
**Archivos nuevos:**

- `src/app/features/orders/order-list/order-list.component.ts`
- `src/app/features/orders/order-detail/order-detail.component.ts`

**Endpoints:**

- `GET /orders/user/{userId}` — historial
- `GET /orders/{orderId}` — detalle

### 3.2 — Favoritos

**Ruta:** `/favorites`
**Archivos nuevos:**

- `src/app/features/favorites/favorites.component.ts`
- `src/app/core/services/favorite.service.ts`

**Endpoints:**

- `POST /favorites { productId }` — agregar
- `DELETE /favorites/{id}` — eliminar
- `GET /favorites/user/{userId}` — listar

### 3.3 — Reviews

**Sección dentro de Product Detail**
**Archivos nuevos:**

- `src/app/features/reviews/review-list/review-list.component.ts`
- `src/app/features/reviews/review-form/review-form.component.ts`

**Endpoints:**

- `POST /reviews { productId, rating, comment? }` — crear
- `GET /reviews/product/{productId}` — listar
- `PUT /reviews/{id}` — actualizar propio
- `DELETE /reviews/{id}` — eliminar propio

---

## Orden de implementación (Fase 0)

```
Fase 0 — Las 8 secciones del shopfront:
├── 0.1  Iconos                          ← PRIMERO (dependencia de todas las secciones)
├── 0.2  Hero section
├── 0.3  Category grid + data/categories.ts
├── 0.4  New arrivals                    ← requiere product-card
├── 0.5  Bestsellers                     ← reusa product-card, endpoint temporal
├── 0.6  Brand strip
├── 0.7  Why Jackson (value props)
├── 0.8  Testimonials (placeholders)
├── 0.9  Trust bar + Social CTA          ← última sección del home
├── 0.10 Product card mejorado
├── 0.11 /products route
├── 0.12 Navbar estática actualizada
└── 0.13 Home refactor final             ← une las 8 secciones
```

## Dependencias entre fases

| Fase   | Depende de                   | Puede empezar cuando    |
| ------ | ---------------------------- | ----------------------- |
| Fase 0 | Nada                         | AHORA                   |
| Fase 1 | Fase 0 (0.3, 0.10, 0.11)     | Fase 0 completa         |
| Fase 2 | Fase 0 (0.10) + Fase 1 (1.1) | Fase 0 + product detail |
| Fase 3 | Fase 2 (2.2)                 | Checkout completo       |

---

## Modelos que pueden necesitar cambios

### ProductResponse actual:

```typescript
interface ProductResponse {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: CategoryResponse | null;
  brand: BrandResponse | null;
  specifications?: Record<string, unknown>;
}
```

**Problemas:**

1. No tiene `images: ProductImageResponse[]` — las imágenes se piden aparte
2. No tiene `createdAt` — no podemos calcular badge "Nuevo"
3. API devuelve `categoryName` / `brandName` (strings) según docs, pero modelo actual tiene objetos

### CategoryResponse actual:

```typescript
interface CategoryResponse {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}
```

**Problemas:**

1. No tiene `slug` — se genera desde `name` en el frontend

### Decisiones de modelo:

- Categorías estáticas (hardcoded), no dependen de la API
- Para `/products?category=<value>` se envía `name` como filtro (la API acepta `category` como string)

---

## Notas técnicas importantes

### SSR y toSignal

- Nunca usar `requireSync: true` — en SSR no funciona
- Pasar siempre `initialValue` en `toSignal`
- Secciones estáticas (hero, trust bar, brand strip, why jackson, testimonials, categories) no necesitan signals

### Categorías estáticas

- Viven en `src/app/core/data/categories.ts` como constante tipada
- Zero llamadas API para navegación principal
- Si en futuro se necesitan dinámicas, el cambio es mínimo

### Imágenes de productos

- `ProductResponse` no tiene array de imágenes
- Grid de catálogo: placeholder icon; imágenes solo en product detail

### Estados de cada componente

```html
@if (loading()) { <app-spinner /> } @else if (error()) {
<div>Error: {{ error() }}</div>
} @else if (items().length === 0) { <empty-state /> } @else { <contenido /> }
```

### Bestsellers — temporal

- Usa `GET /products?page=0&size=5` hasta que exista endpoint real
- Cuando backend implemente `GET /products?sort=soldCount,desc`, se reemplaza

### Sin refresh token

- 401 → `authService.logout()` → `/login`
- El `jwt.interceptor.ts` ya debe manejar esto

---

## Próximos pasos

Orden de entrega:

1. **0.1** — Iconos (`icons.ts`) ← +34 iconos
2. **0.2** — Hero section
3. **0.3** — Category grid + `data/categories.ts`
4. **0.4** — New arrivals
5. **0.5** — Bestsellers
6. **0.6** — Brand strip
7. **0.7** — Why Jackson
8. **0.8** — Testimonials
9. **0.9** — Trust bar + Social CTA
10. **0.10** — Product card mejorado
11. **0.11** — /products route
12. **0.12** — Navbar actualizada
13. **0.13** — Home refactor final
