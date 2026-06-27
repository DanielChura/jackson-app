# Jackson Music Store — Project Context

## Stack

- Frontend: Angular 22 (standalone, signals, new control flow)
- Backend: Spring Boot
- DB: PostgreSQL

## Business

Ecommerce B2C de equipos musicales, Lima, Perú.
Personalidad de marca: **energética, cool, clean**.
Filosofía: **"White space is a feature"** — el layout respira, sin elementos decorativos innecesarios.

---

## Brand Identity & Visual System

### Design Tokens (definidos en `src/styles.css`)

| Token                     | Value     | Uso                                                                                                           |
| ------------------------- | --------- | ------------------------------------------------------------------------------------------------------------- |
| `jackson-orange`          | `#ff4300` | **Ultra-restricted.** Solo logo y botones ultra-principales (call to action únicos). NO usar para decoración. |
| `jackson-orange-hover`    | `#e03b00` | Hover del orange                                                                                              |
| `jackson-orange-disabled` | `#ff9873` | Estado disabled del orange                                                                                    |
| `jackson-navy`            | `#023047` | **Color principal.** CTAs, headers, texto destacado, fondos de botones primarios.                             |
| `jackson-navy-hover`      | `#01202f` | Hover del navy                                                                                                |
| `jackson-charcoal`        | `#243037` | **Color base de texto.** Cuerpo, párrafos, labels.                                                            |
| `jackson-text-secondary`  | `#5c6670` | Texto secundario, meta, captions, placeholders.                                                               |
| `jackson-white`           | `#ffffff` | Fondo principal de la app                                                                                     |

Tipografía: **Manrope** (`--font-manrope`), sans-serif.

### Border System

| Regla                    | Aplica a                      |
| ------------------------ | ----------------------------- |
| `rounded-md`             | Cards, inputs, botones        |
| `rounded-2xl`            | Containers grandes, secciones |
| `rounded-full`           | Badges, pills de estado       |
| `border border-gray-100` | Cards y contenedores          |
| `hover:border-gray-200`  | Hover en cards interactivas   |
| Sin `shadow-*`           | NO usar sombras               |
| Sin bordes de colores    | Solo `gray-100` / `gray-200`  |

### Button System

| Tipo           | Clases                                                                                                                                                                        | Uso                                               |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| Primary (navy) | `bg-jackson-navy text-jackson-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-jackson-navy-hover transition-colors disabled:opacity-60 disabled:cursor-not-allowed` | **Casi todos los botones.** CTAs, forms, carrito. |
| Ultra-primary  | `bg-jackson-orange text-white px-6 py-2.5 text-sm font-medium rounded-md hover:bg-jackson-orange-hover transition-colors`                                                     | Solo para acciones críticas y el logo.            |
| Secondary      | `border border-gray-200 text-jackson-charcoal px-6 py-2.5 text-sm font-medium rounded-md hover:border-gray-300 transition-colors`                                             | Acciones secundarias.                             |
| Ghost          | `text-jackson-navy hover:bg-gray-50 px-4 py-2 text-sm rounded-md transition-colors`                                                                                           | Acciones de baja jerarquía.                       |

### Typography — Escalado Responsive

| Uso                   | Mobile    | Tablet (md) | Desktop (lg) |
| --------------------- | --------- | ----------- | ------------ |
| Hero / H1             | text-3xl  | text-2xl    | text-3xl     |
| H2 sección            | text-2xl  | text-xl     | text-2xl     |
| Texto destacado/quote | text-2xl  | text-lg     | text-2xl     |
| Subtítulo / H3        | text-base | text-sm     | text-base    |
| Cuerpo                | text-sm   | text-xs     | text-sm      |
| Caption / meta        | text-xs   | text-xs     | text-xs      |

**Regla general:** Tablet (`md`) usa un token MENOR que mobile y desktop. Mobile y desktop normalmente comparten el mismo token.
Patrón: `text-X` → `md:text-(X-1 o X-2)` → `lg:text-X`.

### Icon System

Uso de Lucide icons via `<app-icon name="..." size="..." />`.

| Contexto   | Mobile | Tablet | Desktop |
| ---------- | ------ | ------ | ------- |
| Trust bar  | 24     | 24     | 28      |
| Decorativo | 100    | 140    | 180     |

---

## Layout System

- **Grid**: `grid md:grid-cols-12 gap-4` — siempre `gap-4`.
- **Cards**: `rounded-md border border-gray-100 bg-white p-6 hover:border-gray-200 transition-colors`.
- **Containers grandes**: `rounded-2xl border border-gray-200 bg-white p-6`.
- **Padding sección**: `px-4 md:px-6 lg:px-8`, `py-8 md:py-12 lg:py-16`.
- **Max width contenedor**: `max-w-[1280px] mx-auto`.
- **Form inputs**: usar utility class `.form-input` o `.form-select` (definidas en `styles.css`).

---

## DASHBOARD_ORDER_STATUS_MAP — Patrón

Definición en `src/app/core/models/dashboard.models.ts`:

```ts
interface DashboardOrderStatusInfo {
  label: string;
  color: string; // Tailwind classes: bg-* text-*
}

export const DASHBOARD_ORDER_STATUS_MAP: Record<OrderStatus, DashboardOrderStatusInfo> = {
  PENDING: { label: 'Pendiente', color: 'text-amber-600 bg-amber-50' },
  PAID: { label: 'Pagado', color: 'text-green-600 bg-green-50' },
  SHIPPED: { label: 'Enviado', color: 'text-blue-600 bg-blue-50' },
  DELIVERED: { label: 'Entregado', color: 'text-purple-600 bg-purple-50' },
  CANCELLED: { label: 'Cancelado', color: 'text-red-600 bg-red-50' },
};
```

**Uso en template** — aplicar con `[class]`, no `[style]`:

```html
<span
  class="px-3 py-1 text-xs font-bold rounded-full uppercase"
  [class]="getOrderStatusInfo(order.status).color"
>
  {{ getOrderStatusInfo(order.status).label }}
</span>
```

**Helper en TS:**

```ts
getOrderStatusInfo(status: string) {
  return DASHBOARD_ORDER_STATUS_MAP[status as keyof typeof DASHBOARD_ORDER_STATUS_MAP];
}
```

---

## Angular Technical Best Practices (Angular 22)

### Standalone

- Todos los componentes son **standalone** (`standalone: true`, sin NgModules).
- Usar `imports` en el decorador `@Component`.

### Control Flow (new syntax)

- Usar SIEMPRE `@if` / `@else` / `@for` / `@switch` — **prohibido** `*ngIf`, `*ngFor`, `*ngSwitch`, `ng-template`.
- `@for` siempre con `track` para rendimiento.

```html
@if (loading()) { ... } @else { ... } @for (item of items(); track item.id) { ... } @empty {
<p>Sin resultados</p>
}
```

### Signals

- Preferir `signal()`, `computed()`, `effect()` sobre propiedades mutables.
- NO hacer `.subscribe()` directo en componentes. Usar `toSignal()` de `@angular/core/rxjs-interop`.
- Patrón recomendado con RxJS:

```ts
private readonly state$ = this.service.getData().pipe(
  map(data => ({ loading: false, data, error: null })),
  catchError(err => of({ loading: false, data: null, error: err.message })),
  startWith({ loading: true, data: null, error: null }),
);

private readonly state = toSignal(this.state$, { initialValue: { loading: true, data: null, error: null } });

readonly data = computed(() => this.state().data ?? []);
readonly loading = computed(() => this.state().loading);
readonly error = computed(() => this.state().error);
```

### Dependency Injection

- Usar `inject()` — **prohibido** constructor DI.

```ts
private readonly service = inject(DataService);
```

### Change Detection

- Todos los componentes con `ChangeDetectionStrategy.OnPush` (implícito con standalone + signals).
- NO usar `ChangeDetectorRef.detectChanges()` — signals manejan la detección.

### Modelos

- Usar `interface` para DTOs y `type` para uniones.
- Los modelos se centralizan en `src/app/core/models/`.

### Formularios

- Usar Reactive Forms (`FormGroup`, `FormControl`, `FormBuilder`).
- NO usar template-driven forms.
- Utility classes: `.form-input`, `.form-select` para inputs.

---

## Excepciones conocidas

- **Trust bar**: además del texto, el WIDTH de card necesitó ajuste manual (`md:w-[calc(33%-1rem)]` en vez de 25%) porque a 4 cards por fila en tablet se veía muy angosto. Revisar ancho de card, no solo texto, en cualquier carousel/grid horizontal.

---

## Methodology

Spec-Driven Development (SDD).
Subagents:

- `@ux-designer` para UI/UX
- `@senior-frontend` para implementación Angular
- `@senior-backend` para API y persistencia
- `@software-architect` para decisiones estructurales
