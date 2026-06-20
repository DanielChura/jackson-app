# Plan de diseño UX/UI — Secciones post-catálogo

> **Proyecto:** Jackson Music — Ecommerce de instrumentos musicales (Perú)
> **Fecha:** Junio 2026
> **Contexto:** Definición de secciones posteriores al catálogo de productos (brands, bestsellers, etc.) para homepage de alto nivel.

---

## 1. Estado actual del flujo

```
Hero → Categories → New Arrivals → Bestsellers → Brand Strip → Why Jackson → Testimonials → Trust Bar → Footer (1 línea)
```

### Análisis crítico (secciones desde Brand Strip en adelante)

#### Brand Strip — ✅ Conservar

Sólida. Logos reales de marcas aspiracionales (Fender, Gibson, Yamaha...) que funcionan como prueba social implícita. Scroll horizontal correcto.

#### Why Jackson — ❌ Problemas

**Tres fallos:**

| Problema               | Detalle                                                                                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Duplicación**        | "Envío rápido" ya aparece en Trust Bar con el mismo icono (`truck`)                                                                                            |
| **Orden invertido**    | Está ANTES de Testimonials. La pirámide de persuasión dice: primero prueba social (otros confían), luego auto-promoción (por qué nosotros)                     |
| **Contenido genérico** | Las 4 props son intercambiables con cualquier ecommerce. Nada específico de música, nada que diferencie a Jackson de Falabella o Ripley vendiendo instrumentos |

**Veredicto:** No eliminarlo, pero **rediseñar contenido + moverlo después de Testimonials**.

#### Testimonials — ⚠️ Buen contenido, mala posición

El microcopy es bueno — ciudades peruanas específicas (Lima, Arequipa, Trujillo, Cusco, Chiclayo, Huancayo) que generan identificación regional.

**Problema:** Están sepultados después de Why Jackson. El testimonial debe aparecer ANTES de que la marca empiece a decir "somos buenos", no después.

**Veredicto:** Moverlo ANTES de Why Jackson, después de Brand Strip.

#### Trust Bar — ⚠️ Híbrido confuso

Tiene dos partes que deberían estar separadas:

1. Trust items (truck, shield-check, refresh-cw, headphones) — redundantes con Why Jackson
2. Redes sociales + WhatsApp — deberían estar en el footer

**Veredicto:** Separar. Trust items → fusionar con Why Jackson redesign. Redes + WhatsApp → mover al footer rediseñado.

#### Footer — ❌ Críticamente insuficiente

Una línea "© 2025 Jackson" es un desperdicio del espacio más infravalorado del ecommerce. Un footer vacío:

- No ayuda a SEO (sin links internos)
- No reduce ansiedad pre-compra (sin políticas visibles)
- No captura leads (sin newsletter)
- No informa (sin links de ayuda)

**Veredicto:** Rediseño completo obligatorio.

---

## 2. Propuesta de flujo completo (orden ideal)

```
ANTES (actual)                           DESPUÉS (propuesto)
──────────────────                       ─────────────────────
1. Hero Section                          1. Hero Section
2. Category Grid                         2. Category Grid
3. New Arrivals                          3. New Arrivals
4. Bestsellers                           4. Bestsellers
5. Brand Strip                           5. Brand Strip
6. Why Jackson   ← MAL                  6. Secondary Promo Banner    🆕
7. Testimonials  ← DEBERÍA IR ANTES     7. Testimonials              ← MOVIDO
8. Trust Bar     ← HÍBRIDO              8. UGC / Instagram Gallery   🆕
9. Footer (1 línea)                      9. Why Jackson               ← REDISEÑADO + MOVIDO
                                         10. Stats / Counters         🆕
                                         11. Brand Story / About      🆕
                                         12. Blog / Resources Preview 🆕
                                         13. Newsletter / Email       🆕
                                         14. Trust Bar                ← SIMPLIFICADO
                                         15. Footer                   ← REDISEÑADO
```

### Principios de ordenamiento aplicados

| Principio                                 | Aplicación                                                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Social proof antes que auto-promoción** | Testimonios (7) y UGC (8) van ANTES de Why Jackson (9)                                            |
| **Progresión de compromiso**              | Las secciones aumentan en "costo": ver productos (bajo) → leer reseñas (medio) → dar email (alto) |
| **Reciprocidad**                          | Dar valor educativo (Blog) ANTES de pedir el email                                                |
| **Última impresión**                      | Footer rediseñado con newsletter, links y políticas deja sensación de solidez                     |
| **Evitar fatiga de patrón**               | Alternar: productos → texto → imágenes → social → números                                         |

---

## 3. Nuevas secciones propuestas

### Sección 6 — Secondary Promo Banner 🆕

| Atributo             | Detalle                                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Propósito**        | Romper secuencia de grids con un CTA visual. Segundo chance de conversión para quienes no clicaron en el hero |
| **Layout**           | Full-width. Desktop: imagen 65% + texto 35%. Mobile: stack vertical                                           |
| **Contenido**        | Headline corto ("¿EMPEZÁS EN LA MÚSICA?"), subhead 1 línea, CTA "Ver colección"                               |
| **Estilo**           | Sin fondo de color sólido — imagen + texto sobre blanco/gray-50. CTA outline button borde naranja             |
| **Mobile**           | Flex-col, imagen arriba, texto abajo                                                                          |
| **Justificación UX** | Ley de Hick — después de productos y marcas, el usuario necesita una decisión simple                          |

---

### Sección 8 — UGC / Instagram Gallery 🆕

| Atributo             | Detalle                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Propósito**        | Prueba social visual. Nada convence más a un músico que ver a otros músicos reales usando equipo comprado en Jackson                               |
| **Título**           | "Clientes reales, equipo real" o "Visto en Instagram"                                                                                              |
| **Layout**           | Grid 4-6 fotos 1:1. Desktop: 3x2 o 4x2. Mobile: 2x3                                                                                                |
| **Interacción**      | Hover overlay sutil con @usuario. Cada foto linkea al perfil de Instagram                                                                          |
| **CTA final**        | "Seguínos en @jacksonmusic" con icono Instagram                                                                                                    |
| **Estilo**           | object-cover, sin bordes ni sombras                                                                                                                |
| **Justificación UX** | Efecto de Jakob + Prueba social. En Perú la desconfianza en ecommerce es alta — ver clientes reales peruanos usando el producto reduce esa barrera |

---

### Sección 10 — Stats / Social Proof Counters 🆕

| Atributo             | Detalle                                                                                                                     |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Propósito**        | Reforzar credibilidad con números concretos                                                                                 |
| **Layout**           | 3-4 stats en fila centrada. Desktop: flex row. Mobile: grid 2x2                                                             |
| **Estilo**           | Número grande en naranja (text-4xl/text-5xl), label debajo gray-500 text-sm. Sin íconos                                     |
| **Stats sugeridos**  | "10,000+ clientes", "500+ marcas", "50+ ciudades", "4.8 ★ promedio"                                                         |
| **Fondo**            | gray-50 para diferenciación sutil                                                                                           |
| **Justificación UX** | Prueba social cuantificada. Números concretos > adjetivos. Clave en mercados emergentes donde la confianza es la barrera #1 |

---

### Sección 11 — Brand Story / About 🆕

| Atributo             | Detalle                                                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Propósito**        | Conectar emocionalmente. Explicar por qué Jackson existe, desde músicos para músicos                                                                         |
| **Layout**           | Split: texto izquierda + imagen derecha (o viceversa)                                                                                                        |
| **Título**           | "Hecho por músicos, para músicos"                                                                                                                            |
| **Contenido**        | 2-3 párrafos breves (max 100 palabras). Foto auténtica del equipo/local/evento                                                                               |
| **CTA opcional**     | "Conocé nuestra historia" → /about                                                                                                                           |
| **Justificación UX** | Un ecommerce de instrumentos compite por expertise y pasión, no por precio. Saber que "son músicos como yo" genera confianza inmediata en el público peruano |

---

### Sección 12 — Blog / Resources Preview 🆕

| Atributo               | Detalle                                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------ |
| **Propósito**          | Educar (reciprocidad) + posicionar a Jackson como autoridad + mejorar SEO                                          |
| **Título**             | "Guías y recursos" o "Aprendé más"                                                                                 |
| **Layout**             | 3 cards. Desktop: 3 columnas. Mobile: scroll horizontal snap                                                       |
| **Contenido sugerido** | "¿Guitarra acústica o electroacústica?", "5 micrófonos esenciales para grabar en casa", "Cómo mantener tu batería" |
| **CTA**                | "Ver todas las guías" → /blog                                                                                      |
| **Justificación UX**   | Principio de reciprocidad: das valor sin pedir nada. Posiciona a Jackson como "la tienda que sabe"                 |

---

### Sección 13 — Newsletter / Email Signup 🆕

| Atributo             | Detalle                                                                                                                                             |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Propósito**        | Captura de leads. El email es el canal de mayor ROI en ecommerce                                                                                    |
| **Layout**           | Centrado, minimalista. Desktop: input + botón inline. Mobile: stack vertical                                                                        |
| **Headline**         | "Enterate primero" u "Ofertas, lanzamientos y eventos"                                                                                              |
| **Input**            | border gray-200, placeholder "tu@email.com"                                                                                                         |
| **Botón**            | bg-orange-500 text-white "Suscribirme"                                                                                                              |
| **Legal**            | Texto pequeño: "Sin spam. Podés cancelar cuando quieras."                                                                                           |
| **Fondo**            | gray-50 (para diferenciarse del footer blanco que sigue)                                                                                            |
| **Justificación UX** | Un usuario que scrolleó hasta acá está interesado. Si no compró ahora, el newsletter es el único canal para traerlo de vuelta. ROI: $42 por cada $1 |

---

## 4. Footer rediseñado

### Estructura de 4 columnas

```
┌──────────────────────────────────────────────────────────────────┐
│  [LOGO]                                                          │
│  Jackson Music — Tu tienda de instrumentos en Perú              │
│                                                                  │
│  ┌──────────┬──────────┬──────────────┬────────────────────────┐ │
│  │ PRODUCTOS│  AYUDA   │  NOSOTROS    │  SEGUINOS              │ │
│  │          │          │              │                        │ │
│  │ Guitarras│  Envíos  │  Sobre       │  [IG] [FB] [YT] [TT]  │ │
│  │ Baterías │  Pagos   │  Jackson     │                        │ │
│  │ Teclados │  Cambios │  Tiendas     │  [WhatsApp]            │ │
│  │ Audio    │  FAQ     │  Trabajá     │                        │ │
│  │ DJ       │  Contacto│  con nos.    │                        │ │
│  │ Accesor. │          │              │                        │ │
│  └──────────┴──────────┴──────────────┴────────────────────────┘ │
│                                                                  │
│  Pago seguro: [Visa] [MC] [Plin] [Yape] [Transferencia]         │
│                                                                  │
│  © 2026 Jackson Music. Todos los derechos reservados.           │
│  Términos · Privacidad · Libro de reclamaciones                 │
└──────────────────────────────────────────────────────────────────┘
```

### Contenido detallado

| Columna       | Links                                                                           |
| ------------- | ------------------------------------------------------------------------------- |
| **Productos** | Guitarras, Baterías, Teclados, Audio Profesional, DJ, Accesorios                |
| **Ayuda**     | Envíos y entregas, Métodos de pago, Cambios y devoluciones, FAQ, Contacto       |
| **Nosotros**  | Sobre Jackson Music, Nuestras tiendas, Trabajá con nosotros, Blog               |
| **Seguinos**  | Instagram, Facebook, YouTube, TikTok (íconos circulares). Abajo: botón WhatsApp |

**Línea de pagos:** Visa, MasterCard, Plin, Yape, Transferencia bancaria — específico para Perú, genera confianza.

**Línea legal:** Copyright + Términos y condiciones · Política de privacidad · Libro de Reclamaciones (obligatorio en Perú para ecommerce).

---

## 5. Sobre Why Jackson — Recomendación específica

**¿Eliminarlo o mantenerlo?**

**Mantenerlo, pero transformado.** Después de ver testimonios y UGC, el usuario necesita una razón racional para elegir Jackson. Las reseñas dan el "por qué emocional", Why Jackson da el "por qué racional". Ambas son necesarias.

**Qué cambiar:**

1. **Contenido**: Props específicas de música y del mercado peruano
2. **Posición**: Después de testimonios y UGC (no antes)
3. **Tono**: De "por qué comprar en Jackson" (defensivo) a "esto nos hace diferentes" (seguro)

**Props sugeridas para el rediseño:**

| Icono    | Título                       | Descripción                                                |
| -------- | ---------------------------- | ---------------------------------------------------------- |
| `guitar` | +2000 instrumentos en stock  | Desde guitarras para empezar hasta equipo profesional      |
| `truck`  | Envío a todo Perú            | Llegamos a Lima en 24hs y a provincia en 48-72hs           |
| `tool`   | Garantía extendida + service | 3 años en seleccionados y taller propio en Lima            |
| `mic`    | Asesoría de músicos          | Todos en nuestro equipo tocamos. Te ayudamos a elegir bien |

Esto elimina redundancia con Trust Bar, introduce un stat concreto (+2000), y usa `mic` (específico de música).

---

## 6. Prioridades de implementación

| Prioridad      | Sección                | Esfuerzo | Impacto | Dependencias                             |
| -------------- | ---------------------- | -------- | ------- | ---------------------------------------- |
| 🔴 **Crítica** | Footer rediseñado      | Bajo     | Alto    | Ninguna                                  |
| 🔴 **Crítica** | Newsletter             | Bajo     | Alto    | Ninguna                                  |
| 🟡 **Alta**    | Reordenar secciones    | Mínimo   | Medio   | Ninguno (solo cambiar orden en template) |
| 🟡 **Alta**    | Rediseñar Why Jackson  | Bajo     | Medio   | Nueva data de props                      |
| 🟢 **Media**   | Secondary Promo Banner | Medio    | Medio   | Imagen promocional                       |
| 🟢 **Media**   | UGC Gallery            | Medio    | Medio   | Contenido de Instagram                   |
| 🔵 **Baja**    | Blog Preview           | Medio    | Bajo    | Contenido editorial                      |
| 🔵 **Baja**    | Brand Story            | Medio    | Bajo    | Fotos reales + copy                      |
| 🔵 **Baja**    | Stats Counters         | Bajo     | Bajo    | Datos reales                             |

### Tests A/B recomendados

1. Footer con newsletter vs sin newsletter → medir tasa de suscripción
2. Testimonios antes vs después de Why Jackson → medir scroll depth y clics en productos
3. UGC gallery en posición 8 → medir tiempo en página

---

## 7. Lo que NO debe cambiar

- **Sin sombras, sin carruseles automáticos, sin fondos de color distintos de white/gray-50**
- **Mobile-first**: todas las secciones propuestas funcionan en mobile antes que en desktop
- **Espaciado generoso**: mantener `py-12 md:py-20`
- **Tipografía Manrope + acento naranja #f97316**

---

## Apéndice: Diff del home component template

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
+ <app-why-jackson />           <!-- REDISEÑADO + MOVIDO después de UGC -->
+ <app-stats-counters />        <!-- NUEVO -->
+ <app-brand-story />           <!-- NUEVO -->
+ <app-blog-preview />          <!-- NUEVO -->
+ <app-newsletter />            <!-- NUEVO -->
+ <app-trust-bar />             <!-- SIMPLIFICADO (solo trust items, redes en footer) -->
```

El footer se rediseña independientemente con estructura de 4 columnas + pagos + legal.
