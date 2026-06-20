# Homepage UI Design — Especificación visual v2

> **Proyecto:** Jackson Music — Ecommerce de instrumentos musicales (Perú)
> **Fecha:** Junio 2026
> **Contexto:** Iteración de diseño UI sobre el plan post-catálogo. Cliente pidió reducir secciones a lo esencial, eliminar Blog y Brand Story, y diseñar visualmente cada sección restante con especificaciones concretas de layout, espaciado, breakpoints, colores y tipografía. El UX strategy ya fue definida en el plan anterior; acá se implementa visualmente.

---

## Resumen de cambios respecto al plan anterior

| Cambio                    | Detalle                                                                                                                            |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Secciones eliminadas**  | ❌ Blog Preview (sin contenido), ❌ Brand Story / About (postergado)                                                               |
| **Secciones agregadas**   | 🆕 Secondary Promo Banner, 🆕 UGC Gallery, 🆕 Newsletter, 🆕 Stats (opcional), 🆕 Footer rediseñado                                |
| **Secciones rediseñadas** | 🔄 Why Jackson (nuevas props musicales), 🔄 Trust Bar (eliminado — sus props ahora integradas en Why Jackson y Footer)             |
| **Secciones validadas**   | ✅ Hero, ✅ Category Grid, ✅ New Arrivals, ✅ Bestsellers, ✅ Brand Strip, ✅ Testimonials                                        |
| **Paso de UX → UI**       | El plan anterior definía estrategia y orden. Este plan define layouts exactos, clases Tailwind, breakpoints, colores y espaciados. |

---

## Template final — Orden compacto

```
Hero → Categories → New Arrivals → Bestsellers → Brand Strip →
Promo Banner → Testimonials → UGC Gallery → Why Jackson →
Stats → Newsletter → Footer
```

**Solo 3 secciones nuevas** (Promo Banner, UGC Gallery, Newsletter) + 1 opcional (Stats) + Footer rediseñado.
Trust Bar fue eliminado: `truck` y `tool` ahora están en Why Jackson con props más específicas; `shield-check`, `refresh-cw` y `headphones` se absorben en el footer como texto inline.

---

## 1. Hero Section ✅ — Validación + mejora puntual

### Diseño actual

```html
<!-- Hero actual: banner imagen full-width linkeable -->
<a routerLink="/products">
  <img src="..." alt="Promociones Jackson Music" class="w-full h-auto object-contain" />
</a>
```

### ✅ Lo que está bien

- Es simple, sin decoración, sin sombras, sin carrusel
- Ocupa el ancho completo sin fondo de color extra
- Imagen como único elemento: cero fricción

### ⚠️ Problema detectado

La imagen actual (`audiomusicacl.vtexassets.com/...`) es un banner genérico de promoción, **no un producto real de Jackson**. Viola la regla de "imágenes reales de producto, 0 stock photos".

### Mejora puntual (una sola, no rediseño completo)

1. **Reemplazar la imagen** por una composición de producto real de Jackson (ej: guitarra Fender + accesorios sobre fondo blanco/gray-50)
2. **Opcional:** agregar headline superpuesto si la imagen es un producto sin texto:
   ```html
   <div class="relative">
     <img ... class="w-full h-auto object-contain" />
     <div class="absolute inset-0 flex items-center justify-center">
       <h1 class="text-4xl text-gray-900 md:text-5xl" style="font-weight:500">Equipá tu sonido</h1>
     </div>
   </div>
   ```
   Solo si hay presupuesto de copy. Si no, la imagen sola funciona.

---

## 2. Category Grid ✅ — Validación

### Diseño actual

- Scroll horizontal con flechas. Cards `aspect-[3/4]`, `object-cover`.
- Título "Categorías" en text-2xl/text-3xl gray-900.
- Flechas de navegación con border y hover.

### ✅ Veredicto

El diseño es correcto para la función que cumple: navegación rápida a categorías. No necesita cambios.

### Consistencia

- ✅ Sin sombras
- ✅ Sin carrusel automático
- ✅ Fondo white (hereda de bg-white en section)
- ✅ Espaciado py-12 md:py-20

---

## 3. New Arrivals ✅ — Validación

### Diseño actual

- Grid sm:grid-cols-2 lg:grid-cols-4
- Product card reutilizable
- "Ver todos" link a /products
- Título "Nuevos productos"

### ✅ Veredicto

Correcto. Sin cambios necesarios.

### Consistencia

- ✅ Sin sombras
- ✅ Sin carrusel
- ✅ ProductCard maneja imágenes de producto real

---

## 4. Bestsellers ✅ — Validación

### Diseño actual

- Grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5
- Product card reutilizable
- Título "Los más vendidos"

### ✅ Veredicto

Correcto. Sin cambios necesarios.

---

## 5. Brand Strip ✅ — Validación

### Diseño actual

- Scroll horizontal con imágenes de marcas. Flechas de navegación.
- Título "Marcas"

### ⚠️ Problema detectado

- **Todas las marcas usan la misma imagen placeholder** (encrypted-tbn0.gstatic.com...). Si esto es real, viola "imágenes reales de producto". Si es mock data para desarrollo, está bien — pero al pasar a producción deben ser logos reales de cada marca.
- **El título "Marcas" es genérico.** Podría ser "Marcas que nos acompañan" o simplemente "Marcas" (que es más limpio). El minimalismo de "Marcas" está bien para el estilo ultra clean.

### ✅ Veredicto

El layout y comportamiento son correctos. Pendiente: reemplazar imágenes placeholder con logos reales en producción.

---

## 6. Secondary Promo Banner 🆕 — Diseño UI completo

### Layout desktop (lg+)

```
┌──────────────────────────────────────────────────────────┐
│  ┌─────────────────────────────┬────────────────────────┐ │
│  │                             │  ¿EMPEZÁS EN           │ │
│  │        IMAGEN               │  LA MÚSICA?            │ │
│  │        (60%)                │                        │ │
│  │                             │  Encontrá tu primer    │ │
│  │                             │  instrumento en        │ │
│  │                             │  Jackson               │ │
│  │                             │                        │ │
│  │                             │  [Ver colección]       │ │
│  └─────────────────────────────┴────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

### Especificaciones visuales

| Atributo            | Valor                                          |
| ------------------- | ---------------------------------------------- |
| **Container**       | `mx-auto w-full max-w-[1600px]`                |
| **Fondo**           | `bg-white`                                     |
| **Espaciado**       | `py-12 md:py-20 px-6`                          |
| **Grid**            | `grid md:grid-cols-5 gap-8 md:gap-12`          |
| **Imagen col-span** | `md:col-span-3`                                |
| **Texto col-span**  | `md:col-span-2`                                |
| **Altura imagen**   | `max-h-[400px] w-full object-cover` en desktop |
| **Mobile**          | stack vertical: imagen arriba, texto abajo     |

### Imagen

- **Producto real** de Jackson — ej: guitarra, batería o kit de inicio sobre fondo neutro
- **Sin overlay de color**, sin gradientes, sin textura
- `aspect-[4/3] md:aspect-auto` para que ocupe altura completa
- `object-cover` para que llene el contenedor

### Texto (columna derecha en desktop, debajo en mobile)

| Elemento        | Clase                                                                                                                                                                    |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Headline**    | `text-3xl md:text-4xl lg:text-5xl text-gray-900` con `style="font-weight:500"`                                                                                           |
| **Subheadline** | `text-base md:text-lg text-gray-600 mt-4` con `style="font-weight:400"`                                                                                                  |
| **Botón CTA**   | `inline-flex items-center gap-2 border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg mt-6 hover:bg-orange-50 transition-colors` con `style="font-weight:500"` |

### Responsive

| Breakpoint | Layout                                                                   |
| ---------- | ------------------------------------------------------------------------ |
| **lg+**    | 2 columnas (60/40). Imagen a izquierda, texto a derecha.                 |
| **md**     | Mismas 2 columnas. Imagen `max-h-[300px]`. Texto centrado verticalmente. |
| **sm**     | Stack vertical. Imagen `max-h-[250px]`. Texto centrado.                  |

### CTA copy

- "Ver colección" — link a /products?promo=inicio
- Botón outline (no filled) para mantener el estilo clean
- Hover: `bg-orange-50` (muy sutil)

### Microcopy

```html
<h2 class="text-3xl md:text-4xl lg:text-5xl text-gray-900" style="font-weight:500">
  ¿Empezás en la música?
</h2>
<p class="text-base md:text-lg text-gray-600 mt-4" style="font-weight:400">
  Encontrá tu primer instrumento en Jackson. Guitarras, teclados, baterías y más para dar el primer
  paso.
</p>
```

---

## 7. Testimonials ✅ — Validación + micro-ajustes

### Diseño actual

```html
<!-- Cards con border, star rating, autor + ciudad -->
<div
  class="flex w-[85vw] shrink-0 snap-start flex-col justify-between border border-gray-200 bg-white p-6 md:w-[30vw] lg:w-[22vw]"
>
  <app-icon name="star" size="18" class="text-amber-400" />
  <p class="mt-4 leading-relaxed text-gray-600" style="font-weight:400">"{{ t.text }}"</p>
  <div class="mt-6 border-t border-gray-100 pt-4">
    <p class="text-sm text-gray-900" style="font-weight:500">{{ t.author }}</p>
    <p class="text-sm text-gray-400" style="font-weight:400">{{ t.city }}</p>
  </div>
</div>
```

### ✅ Veredelto

El diseño es sólido. Cards con borde, rating con estrellas, autor y ciudad específica, scroll horizontal con flechas. Es correcto y se ve bien.

### Micro-ajustes sugeridos (opcionales, no blocking)

1. **Padding de cards**: actualmente `p-6`. Evaluar `p-8` en desktop para más aire.
2. **Ancho de cards**: actualmente `w-[85vw] md:w-[30vw] lg:w-[22vw]`. Consistente.
3. **Alineación de texto**: las comillas dobles `"{{ t.text }}"` están bien. No cambiar a itálicas.
4. **Fondo de cards**: `bg-white`. Correcto.
5. **Altura de cards**: `min-h-[200px]` para evitar cards muy dispares si un texto es corto.

### Consistencia

- ✅ Sin sombras
- ✅ Sin carrusel automático (scroll manual con flechas)
- ✅ Sin stock photos (es solo texto + íconos)
- ✅ Espaciado py-12 md:py-20

---

## 8. UGC / Instagram Gallery 🆕 — Diseño UI completo

### Layout desktop (lg)

```
┌──────────────────────────────────────────────────────────┐
│              Clientes reales, equipo real                 │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  [foto]  │  │  [foto]  │  │  [foto]  │              │
│  │  @user1  │  │  @user2  │  │  @user3  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  [foto]  │  │  [foto]  │  │  [foto]  │              │
│  │  @user4  │  │  @user5  │  │  @user6  │              │
│  └──────────┘  └──────────┘  └──────────┘              │
│                                                          │
│  [Instagram icon] Seguínos en @jacksonmusic             │
└──────────────────────────────────────────────────────────┘
```

### Especificaciones visuales

| Atributo           | Valor                                                                               |
| ------------------ | ----------------------------------------------------------------------------------- |
| **Container**      | `mx-auto w-full max-w-[1600px] px-6 py-12 md:py-20`                                 |
| **Fondo**          | `bg-white`                                                                          |
| **Título**         | `text-2xl md:text-3xl text-gray-900 mb-8 text-center` con `style="font-weight:500"` |
| **Grid**           | `grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4`                                    |
| **Fotos**          | `aspect-square object-cover w-full h-full`                                          |
| **Bordes/sombras** | Ninguno. `rounded-none`                                                             |
| **Hover overlay**  | Solo en desktop (`lg:`). `group` con overlay `opacity-0 group-hover:opacity-100`    |

### Imágenes

- 6 fotos cuadradas reales de clientes con productos Jackson (o mock data con fotos de productos en uso)
- 1:1 aspect ratio (`aspect-square`)
- `object-cover` para llenar el cuadrado
- Sin bordes, sin sombras, sin esquinas redondeadas

### Hover overlay (solo desktop)

```html
<div class="relative group">
  <img ... class="aspect-square object-cover w-full h-full" />
  <!-- Overlay sutil en hover -->
  <div
    class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity 
              flex items-end p-4 pointer-events-none max-lg:hidden"
  >
    <span class="text-white text-sm" style="font-weight:500">@usuario</span>
  </div>
</div>
```

- Overlay solo en desktop (clase `max-lg:hidden`)
- Opacidad inicial 0, hover 100% con transición suave
- Fondo negro al 30%, solo en la zona de la imagen
- Nombre de usuario en blanco, abajo a la izquierda

### Tablet (md)

- `grid-cols-2` — mismas 6 fotos, 3 filas de 2
- Sin hover overlay (solo desktop)

### Mobile (sm)

- `grid-cols-2` — 3 filas de 2 fotos
- Sin hover overlay

### CTA final

```html
<div class="mt-10 text-center">
  <a
    href="https://instagram.com/jacksonmusic"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 text-gray-700 hover:text-orange-500 transition-colors"
    style="font-weight:500"
  >
    <app-icon name="instagram" size="20" />
    Seguínos en @jacksonmusic
  </a>
</div>
```

- Texto gray-700, hover orange-500
- Icono Instagram a la izquierda
- Sin border, sin botón — solo link limpio

### Consideración de contenido real

- Si no hay 6 fotos UGC reales todavía, usar fotos de productos Jackson en contexto (ej: una guitarra apoyada en un sofá, un teclado en un escritorio) simulando "cliente real"
- No usar imágenes de banco de fotos
- Ideal: pedir permiso a clientes en redes sociales y etiquetarlos

---

## 9. Why Jackson 🔄 — Rediseño de contenido

### Layout (se mantiene igual que ahora)

```html
<section class="mx-auto w-full max-w-[1600px] px-6 py-12 md:py-20">
  <h2 class="text-2xl md:text-3xl text-gray-900" style="font-weight:500">¿Por qué Jackson?</h2>
  <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
    <!-- 4 cards -->
  </div>
</section>
```

### Cards — cada una

```html
<div class="bg-white p-6">
  <app-icon name="guitar" size="36" class="text-gray-400" />
  <h3 class="mt-4 text-gray-900" style="font-weight:500">+2000 instrumentos en stock</h3>
  <p class="mt-2 text-gray-600" style="font-weight:400">
    Desde guitarras para empezar hasta equipo profesional
  </p>
</div>
```

| Atributo         | Valor                                      |
| ---------------- | ------------------------------------------ |
| **Icono**        | `text-gray-400`, size `36`                 |
| **Título**       | `text-gray-900`, `style="font-weight:500"` |
| **Descripción**  | `text-gray-600`, `style="font-weight:400"` |
| **Card padding** | `p-6`                                      |
| **Gap**          | `gap-6`                                    |

### Props nuevas (reemplazan las actuales)

| Icono    | Título                      | Descripción                                           |
| -------- | --------------------------- | ----------------------------------------------------- |
| `guitar` | +2000 instrumentos en stock | Desde guitarras para empezar hasta equipo profesional |
| `truck`  | Envío a todo Perú           | Llegamos a Lima en 24hs y a provincia en 48-72hs      |
| `tool`   | Garantía y service propio   | 3 años en productos seleccionados + taller en Lima    |
| `mic`    | Asesoría de músicos         | Todos tocamos. Te ayudamos a elegir bien.             |

### Lo que cambia respecto al componente actual

1. **Iconos**: `award` → `guitar`, `truck` se mantiene, `message-circle` → `mic` (nuevo)
2. **Títulos**: más específicos y cuantificados ("+2000 instrumentos", "3 años", "24hs")
3. **Descripciones**: concreto, no genérico
4. **Sección**: se mueve de la posición 6 a la posición 9 (después de UGC)
5. **Background**: hereda bg-white de la sección

### ¿Por qué funciona este rediseño?

- **Props medibles** (+2000, 24hs, 3 años) → más creíbles que adjetivos
- **Específicas de música** (guitar, mic) → no intercambiables con cualquier ecommerce
- **Tono seguro** ("todos tocamos") → no defensivo
- **Cubre trust items** (truck, tool) eliminando redundancia con Trust Bar

---

## 10. Stats Counters 🆕 — Diseño UI (opcional, solo si hay datos)

### Layout desktop

```
┌──────────────────────────────────────────────────────────┐
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │
│  │ 10,000+ │  │  500+   │  │  50+    │  │  4.8    │    │
│  │ clientes│  │  marcas │  │ciudades │  │★promedio│    │
│  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │
└──────────────────────────────────────────────────────────┘
```

### Especificaciones visuales

| Atributo      | Valor                                                                |
| ------------- | -------------------------------------------------------------------- |
| **Container** | `mx-auto w-full max-w-[1600px] px-6 py-12 md:py-20`                  |
| **Fondo**     | `bg-gray-50` (para contrastar con la sección white anterior)         |
| **Desktop**   | `flex justify-center gap-12` — row centrada                          |
| **Mobile**    | `grid grid-cols-2 gap-8` — 2 columnas                                |
| **Número**    | `text-4xl md:text-5xl text-orange-500` con `style="font-weight:500"` |
| **Label**     | `text-sm text-gray-500 mt-1` con `style="font-weight:400"`           |

### Cada stat

```html
<div class="text-center">
  <p class="text-4xl md:text-5xl text-orange-500" style="font-weight:500">10,000+</p>
  <p class="text-sm text-gray-500 mt-1" style="font-weight:400">clientes</p>
</div>
```

### Stats sugeridos (usar solo si hay datos reales)

| Stat             | Contexto                          |
| ---------------- | --------------------------------- |
| 10,000+ clientes | Si tienen +10k registrados        |
| 500+ marcas      | Número real de marcas en catálogo |
| 50+ ciudades     | Ciudades a las que envían en Perú |
| 4.8 ★ promedio   | Rating promedio real de reseñas   |

### Si no hay datos

Esta sección se omite completamente. No inventar stats. Es preferible no tenerla a tener stats falsos.

---

## 11. Newsletter 🆕 — Diseño UI completo

### Layout desktop (lg+)

```
┌──────────────────────────────────────────────────────────┐
│                                                          │
│              Enterate primero                            │
│     Ofertas, lanzamientos y eventos. Sin spam.           │
│                                                          │
│     ┌─────────────────────────────────┬─────────────┐   │
│     │  tu@email.com                   │ [Suscribirme] │   │
│     └─────────────────────────────────┴─────────────┘   │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### Especificaciones visuales

| Atributo         | Valor                                                                                                                                                                      |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Container**    | `mx-auto w-full max-w-[1600px] px-6 py-12 md:py-20`                                                                                                                        |
| **Fondo**        | `bg-gray-50`                                                                                                                                                               |
| **Ancho máximo** | `max-w-lg mx-auto` para el contenido                                                                                                                                       |
| **Título**       | `text-2xl md:text-3xl text-gray-900 text-center` con `style="font-weight:500"`                                                                                             |
| **Subtítulo**    | `text-base text-gray-600 text-center mt-3` con `style="font-weight:400"`                                                                                                   |
| **Form**         | Desktop: `flex gap-3 mt-8`. Mobile: `flex flex-col gap-3`                                                                                                                  |
| **Input**        | `flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500` |
| **Botón**        | `px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors whitespace-nowrap` con `style="font-weight:500"`                                      |
| **Disclaimer**   | `text-xs text-gray-400 text-center mt-4` con `style="font-weight:400"`                                                                                                     |

### HTML template propuesto

```html
<section class="bg-gray-50 py-12 md:py-20">
  <div class="mx-auto w-full max-w-[1600px] px-6">
    <div class="max-w-lg mx-auto text-center">
      <h2 class="text-2xl md:text-3xl text-gray-900" style="font-weight:500">Enterate primero</h2>
      <p class="text-base text-gray-600 mt-3" style="font-weight:400">
        Ofertas, lanzamientos y eventos. Sin spam.
      </p>

      <form class="flex flex-col sm:flex-row gap-3 mt-8">
        <input
          type="email"
          placeholder="tu@email.com"
          class="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-gray-900 
                 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 
                 focus:ring-1 focus:ring-orange-500"
        />
        <button
          type="submit"
          class="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg 
                 transition-colors whitespace-nowrap"
          style="font-weight:500"
        >
          Suscribirme
        </button>
      </form>

      <p class="text-xs text-gray-400 mt-4" style="font-weight:400">
        Podés cancelar cuando quieras. Sin compromiso.
      </p>
    </div>
  </div>
</section>
```

### Comportamiento

- Input con `type="email"` para validación nativa del browser
- Botón type="submit" — manejar con (ngSubmit) en Angular
- Estado focus: borde y ring en orange-500
- Estado hover del botón: bg-orange-600
- Mobile: el form pasa a stack vertical (`flex-col` en sm, `flex-row` desde sm)
- Sin loading state por ahora (se agrega en implementación)

---

## 12. Footer 🔄 — Rediseño completo

### Layout desktop (lg+)

```
┌─────────────────────────────────────────────────────────────────────┐
│                                                                     │
│  ┌──────────────┬──────────────┬────────────────┬─────────────────┐ │
│  │  PRODUCTOS   │    AYUDA     │   NOSOTROS     │   SEGUINOS       │ │
│  │              │              │                │                   │ │
│  │  Guitarras   │  Envíos      │  Sobre Jackson │  [IG][FB][YT][TT]│ │
│  │  Baterías    │  Pagos       │  Tiendas       │                   │ │
│  │  Teclados    │  Cambios     │  Trabajá con   │  [WhatsApp]      │ │
│  │  Audio       │  FAQ         │  nosotros      │                   │ │
│  │  DJ          │  Contacto    │                │                   │ │
│  │  Accesorios  │              │                │                   │ │
│  └──────────────┴──────────────┴────────────────┴─────────────────┘ │
│                                                                     │
│  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
│  Pago seguro: [Visa] [MC] [Plin] [Yape]                            │
│                                                                     │
│  © 2026 Jackson Music. Todos los derechos reservados.              │
│  Términos · Privacidad · Libro de Reclamaciones                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Especificaciones visuales

| Atributo              | Valor                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------- |
| **Container**         | `mx-auto w-full max-w-[1600px] px-6 py-12`                                                  |
| **Fondo**             | `bg-white`                                                                                  |
| **Border superior**   | `border-t border-gray-200`                                                                  |
| **Grid**              | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12`                            |
| **Título de columna** | `text-sm text-gray-900 mb-4 uppercase tracking-wider` con `style="font-weight:500"`         |
| **Links**             | `text-sm text-gray-500 hover:text-gray-900 transition-colors` con `style="font-weight:400"` |
| **Iconos redes**      | `text-gray-400 hover:text-orange-500 transition-colors`                                     |

### Columnas

#### Columna 1 — Productos

```html
<div>
  <p class="text-sm text-gray-900 mb-4 uppercase tracking-wider" style="font-weight:500">
    Productos
  </p>
  <ul class="space-y-3">
    <li>
      <a
        routerLink="/products"
        [queryParams]="{category:'guitarras'}"
        class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        style="font-weight:400"
        >Guitarras</a
      >
    </li>
    <li>
      <a
        routerLink="/products"
        [queryParams]="{category:'baterias'}"
        class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        style="font-weight:400"
        >Baterías</a
      >
    </li>
    <li>
      <a
        routerLink="/products"
        [queryParams]="{category:'teclados'}"
        class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        style="font-weight:400"
        >Teclados</a
      >
    </li>
    <li>
      <a
        routerLink="/products"
        [queryParams]="{category:'audio'}"
        class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        style="font-weight:400"
        >Audio</a
      >
    </li>
    <li>
      <a
        routerLink="/products"
        [queryParams]="{category:'dj'}"
        class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        style="font-weight:400"
        >DJ</a
      >
    </li>
    <li>
      <a
        routerLink="/products"
        [queryParams]="{category:'accesorios'}"
        class="text-sm text-gray-500 hover:text-gray-900 transition-colors"
        style="font-weight:400"
        >Accesorios</a
      >
    </li>
  </ul>
</div>
```

#### Columna 2 — Ayuda

- Envíos, Pagos, Cambios, FAQ, Contacto
- Links a páginas estáticas o modales

#### Columna 3 — Nosotros

- Sobre Jackson → /about (futuro)
- Tiendas → /stores (futuro)
- Trabajá con nosotros → /careers (futuro)

#### Columna 4 — Redes sociales

```html
<div>
  <p class="text-sm text-gray-900 mb-4 uppercase tracking-wider" style="font-weight:500">
    Seguinos
  </p>
  <div class="flex gap-4">
    <a
      href="https://instagram.com/jacksonmusic"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Instagram"
      class="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <app-icon name="instagram" size="22" />
    </a>
    <a
      href="https://facebook.com/jacksonmusic"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Facebook"
      class="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <app-icon name="facebook" size="22" />
    </a>
    <a
      href="https://youtube.com/@jacksonmusic"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="YouTube"
      class="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <app-icon name="youtube" size="22" />
    </a>
    <a
      href="https://tiktok.com/@jacksonmusic"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="TikTok"
      class="text-gray-400 hover:text-orange-500 transition-colors"
    >
      <app-icon name="tiktok" size="22" />
    </a>
  </div>
  <!-- WhatsApp -->
  <a
    href="https://wa.me/51999999999"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-2 mt-6 text-sm text-green-600 hover:text-green-700 transition-colors"
    style="font-weight:500"
  >
    <app-icon name="whatsapp" size="18" />
    Escríbenos por WhatsApp
  </a>
</div>
```

### Línea de pagos

```html
<div class="mt-10 pt-8 border-t border-gray-100">
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
    <div class="flex items-center gap-4 text-gray-400">
      <span class="text-sm text-gray-500" style="font-weight:400">Pago seguro:</span>
      <!-- Payment icons - using simple text or SVG placeholders -->
      <span class="text-xs text-gray-400" style="font-weight:500">Visa</span>
      <span class="text-xs text-gray-400" style="font-weight:500">MC</span>
      <span class="text-xs text-gray-400" style="font-weight:500">Plin</span>
      <span class="text-xs text-gray-400" style="font-weight:500">Yape</span>
    </div>
  </div>
</div>
```

- Ideal: usar SVG inline de los medios de pago (Visa, MC, Plin, Yape)
- Si no hay SVGs, usar texto en gray-400 text-xs con font-weight:500
- Color: text-gray-400 o text-gray-500

### Línea legal

```html
<div class="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
  <p class="text-xs text-gray-400" style="font-weight:400">
    © 2026 Jackson Music. Todos los derechos reservados.
  </p>
  <div class="flex gap-4">
    <a
      href="/terminos"
      class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
      style="font-weight:400"
      >Términos</a
    >
    <a
      href="/privacidad"
      class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
      style="font-weight:400"
      >Privacidad</a
    >
    <a
      href="/libro-reclamaciones"
      class="text-xs text-gray-400 hover:text-gray-600 transition-colors"
      style="font-weight:400"
      >Libro de Reclamaciones</a
    >
  </div>
</div>
```

### Responsive

| Breakpoint      | Layout                                            |
| --------------- | ------------------------------------------------- |
| **lg+**         | 4 columnas de links                               |
| **md**          | 2 columnas (cada columna ocupa 2)                 |
| **sm**          | 1 columna (stack vertical)                        |
| **Línea pagos** | Stack vertical en mobile (`flex-col sm:flex-row`) |
| **Línea legal** | Stack vertical en mobile (`flex-col sm:flex-row`) |

### Nota sobre accesibilidad

- Todos los iconos de redes tienen `aria-label`
- Links tienen texto visible (no solo icono)
- Contraste: gray-500 sobre white cumple WCAG AA (aprox 5.7:1 para texto 14px)

---

## Apéndice A: Diff del home component template

```diff
<app-hero-section />
<app-category-grid />
<app-new-arrivals />
<app-bestsellers />
<app-brand-strip />
- <app-why-jackson />
- <app-testimonials />
- <app-trust-bar />
+ <app-promo-banner />          <!-- NUEVO -->
+ <app-testimonials />          <!-- MOVIDO aquí (antes después de Why Jackson) -->
+ <app-ugc-gallery />           <!-- NUEVO -->
+ <app-why-jackson />           <!-- REDISEÑADO (nuevas props) + MOVIDO después de UGC -->
+ <app-stats-counters />        <!-- NUEVO (opcional) -->
+ <app-newsletter />            <!-- NUEVO -->
```

El footer se rediseña independientemente manteniendo `<app-footer />` en el layout principal.

---

## Apéndice B: Checklist de consistencia visual

Aplicar a cada sección de la homepage:

- [ ] **Sin sombras** — no usar `shadow-*` en ninguna cardinal. Si necesitás separación visual, usá `border border-gray-200`.
- [ ] **Sin carruseles automáticos** — todo scroll horizontal requiere interacción manual (flechas o drag). No hay autoplay.
- [ ] **Font-weight máximo 500** — no usar bold (700). Todo título y label usa `style="font-weight:500"`. Texto de párrafo usa 400.
- [ ] **Tipografía Manrope** — ya configurada en index.html via Google Fonts. No usar otras fuentes.
- [ ] **Acento naranja** — `#f97316` (orange-500 en Tailwind). Usar solo para CTAs, links y stats. No usar para fondos grandes ni borders decorativos.
- [ ] **Fondos** — solo `bg-white` o `bg-gray-50`. Nada de colores de fondo (ni naranja, ni negro, ni azul).
- [ ] **Imágenes reales de producto** — cero stock photos. Cada imagen debe ser un producto real de Jackson o un cliente real.
- [ ] **Espaciado generoso** — `py-12 md:py-20` en cada sección. No apretar.
- [ ] **Mobile-first** — diseñar primero para `sm`, luego `md`, luego `lg`. Verificar que cada sección se vea bien en mobile sin horizontal scroll forzado.

---

## Apéndice C: Estado de componentes actuales vs plan

| Componente               | Estado    | Acción                                                         |
| ------------------------ | --------- | -------------------------------------------------------------- |
| `HeroSectionComponent`   | Existe    | Validar imagen (no stock photo). Mejora opcional con headline. |
| `CategoryGridComponent`  | Existe    | ✅ Sin cambios                                                 |
| `NewArrivalsComponent`   | Existe    | ✅ Sin cambios                                                 |
| `BestsellersComponent`   | Existe    | ✅ Sin cambios                                                 |
| `BrandStripComponent`    | Existe    | ✅ Sin cambios (reemplazar placeholder images en prod)         |
| `PromoBannerComponent`   | **NUEVO** | Crear desde cero con especificaciones de sección 6             |
| `TestimonialsComponent`  | Existe    | ✅ Sin cambios. Micro-ajustes opcionales.                      |
| `UgcGalleryComponent`    | **NUEVO** | Crear desde cero con especificaciones de sección 8             |
| `WhyJacksonComponent`    | Existe    | 🔄 Rediseñar props (datos en sección 9). Layout se mantiene.   |
| `StatsCountersComponent` | **NUEVO** | Crear solo si hay datos reales (sección 10)                    |
| `NewsletterComponent`    | **NUEVO** | Crear desde cero con especificaciones de sección 11            |
| `FooterComponent`        | Existe    | 🔄 Rediseñar completamente (sección 12)                        |

---

## Apéndice D: Datos mock sugeridos para UGC Gallery

Si no hay contenido real de Instagram, usar estos mock data con imágenes de productos Jackson en contexto:

```typescript
interface UgcItem {
  image: string; // URL de imagen real de producto
  username: string;
}

const ugcItems: UgcItem[] = [
  { image: '...guitarra-en-estudio.jpg', username: '@musicoperuano' },
  { image: '...bateria-en-sala.jpg', username: '@drummer.pe' },
  { image: '...teclado-en-home.jpg', username: '@keyslover_pe' },
  { image: '...audio-setup.jpg', username: '@productor.pe' },
  { image: '...dj-cabina.jpg', username: '@djperu' },
  { image: '...accesorios-mesa.jpg', username: '@musicastore.pe' },
];
```

Las imágenes deben ser reales de productos Jackson (fotografiadas en contexto de uso), no imágenes de catálogo con fondo blanco.

---

> **Próximo paso:** Implementación de componentes Angular. Cada sección nueva/rediseñada se construye como componente standalone siguiendo las especificaciones de layout, clases Tailwind y breakpoints detallados en este documento.
