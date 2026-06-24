# JacksonApi - Project Context

## Stack

- Frontend: Angular 18
- Backend: Spring Boot
- DB: PostgreSQL

## Business

Ecommerce B2C de equipos musicales, Lima, Perú.

## Design Constraints (CRITICAL)

- UX: High conversion → NO Awwwards animations
- Brand: #f97316 (naranja), #023047 (navy CTA)
- Performance: Core Web Vitals green
- A11y: WCAG AA minimum

## Methodology

Spec-Driven Development (SDD)
Subagents: @ux-designer para UI/UX

# Reglas de escalado responsive — JacksonApi

## Dispositivos de referencia

- Mobile: iPhone 14 Pro / Pixel 7 Pro (~412px)
- Tablet: iPad Air 5 (~820px) → breakpoint `md` (768px)
- Desktop: MacBook Air (~1440px) → breakpoint `lg` (1024px)

## Regla general

Tablet (`md`) usa un tamaño MENOR que mobile y desktop.
Mobile y desktop normalmente comparten el mismo token o uno cercano.
Patrón: `text-X` → `md:text-(X-1 o X-2)` → `lg:text-X`

## Tabla de texto

| Uso                   | Mobile    | Tablet (md) | Desktop (lg) |
| --------------------- | --------- | ----------- | ------------ |
| Hero / H1             | text-3xl  | text-2xl    | text-3xl     |
| H2 sección            | text-2xl  | text-xl     | text-2xl     |
| Texto destacado/quote | text-2xl  | text-lg     | text-2xl     |
| Subtítulo / H3        | text-base | text-sm     | text-base    |
| Cuerpo                | text-sm   | text-xs     | text-sm      |
| Caption / meta        | text-xs   | text-xs     | text-xs      |

## Tabla de spacing (gap/padding)

| Uso             | Mobile    | Tablet (md) | Desktop (lg) |
| --------------- | --------- | ----------- | ------------ |
| Gap entre cards | gap-4     | gap-4       | gap-4        |
| Padding card    | p-4       | p-4         | p-4          |
| Padding sección | (definir) |

## Tabla de iconos (size prop)

| Contexto         | Mobile | Tablet | Desktop |
| ---------------- | ------ | ------ | ------- |
| Icono trust bar  | 24     | 24     | 28      |
| Icono decorativo | 100    | 140    | 180     |

## Excepciones conocidas

- Trust bar: además del texto, el WIDTH de card necesitó ajuste manual (`md:w-[calc(33%-1rem)]` en vez de 25%) porque a 4 cards por fila en tablet se veía muy angosto. Revisar ancho de card, no solo texto, en cualquier carousel/grid horizontal.
