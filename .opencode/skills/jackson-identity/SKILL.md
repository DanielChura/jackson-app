---

name: jackson-identity
description: >
Identidad de marca y sistema visual de Jackson Music Store.
Usa este skill para conocer colores, tipografía, border-radius tokens,
reglas de UI (Tailwind) y principios de diseño del ecommerce Jackson.
Es la referencia obligatoria para el @ux-designer y cualquier tarea
que afecte la interfaz visual. Los colores y fuentes se definen
ÚNICAMENTE en src/styles.css — este skill documenta su uso pero
NO redefine valores.

---

# Jackson Music Store — Brand Identity & Design System

> **Fuente única de verdad para colores y tipografía:**
> `src/styles.css` (bloque `@theme`). Cualquier cambio de color o
> tipografía se hace exclusivamente ahí. Este skill describe CÓMO
> usarlos, no los valores exactos.

## 1. El Alma de la Marca

**Jackson Music Store** es un ecommerce de instrumentos musicales
de alta gama en Perú, Lima. Su identidad busca transmitir **energía,
precisión técnica y limpieza visual**, garantizando una experiencia
de usuario de alto rendimiento.

**Filosofía visual:**

- **Funcionalidad Sharp**: Diseño técnico tipo "herramienta".
- **Clean & Spacious**: Diseño que "respira", estructura basada en
  espaciado, no en ornamentos.
- **Energía + Confianza**: El naranja (#ff4300) aporta energía
  musical; el navy (#023047) aporta estructura y confianza.
- **Sin sombras ni divisores**: La separación se logra con padding
  y bloques de color sólido.

## 2. Paleta de Colores

Los valores exactos están en `src/styles.css` → bloque `@theme`.
Aquí se documentan los roles de uso:

| Variable CSS                     | Rol                                               |
| -------------------------------- | ------------------------------------------------- |
| `--color-jackson-white`          | Fondo general y de componentes                    |
| `--color-jackson-orange`         | Identidad: fondos decorativos, secciones de marca |
| `--color-jackson-navy`           | Estructura y acción: CTAs, navbar, footer         |
| `--color-jackson-charcoal`       | Texto principal: títulos, cuerpo, descripciones   |
| `--color-jackson-text-secondary` | Texto secundario, placeholders                    |
| `--color-jackson-surface`        | Fondo alterno: inputs, secciones secundarias      |

### Roles Taxativos

| Variable                 | ✅ USAR EN                                     | ❌ NO USAR EN                      |
| ------------------------ | ---------------------------------------------- | ---------------------------------- |
| `jackson-orange`         | Fondos decorativos, secciones con texto blanco | CTAs, texto, links                 |
| `jackson-orange-hover`   | Hover de fondos naranja                        | Texto, CTAs                        |
| `jackson-navy`           | CTAs (relleno), navbar, footer, headers        | Texto de párrafo, fondos de página |
| `jackson-navy-hover`     | Hover de CTAs navy                             | Texto                              |
| `jackson-charcoal`       | Títulos, cuerpo, descripciones, precios        | CTAs, fondos                       |
| `jackson-text-secondary` | Texto secundario, placeholders, metadatos      | Títulos, CTAs                      |
| `jackson-surface`        | Fondos alternos, inputs, cards secundarias     | Fondos de página principal         |

## 3. Tipografía

- **Fuente**: Manrope (Google Fonts) — definida en `styles.css`
- **Pesos**:
  - Títulos: `font-medium` (500)
  - Cuerpo: `font-normal` (400)
  - **Prohibido**: `font-bold` (700+) y `font-semibold` (600)

## 4. Border Radius Tokens

Definidos exclusivamente en este skill (no en `styles.css`).
Se usan como clases Tailwind directas.

| Token         | Clase Tailwind | Uso                                               |
| ------------- | -------------- | ------------------------------------------------- |
| **radius-sm** | `rounded-md`   | Inputs, botones pequeños, cards, componentes      |
| **radius-lg** | `rounded-2xl`  | Banners, secciones destacadas, containers grandes |

### Reglas de aplicación

- **radius-sm** (`rounded-md`): Inputs, botones, cards de producto,
  componentes de UI estándar.
- **radius-lg** (`rounded-2xl`): Banners promocionales, callouts,
  secciones de marca destacadas (como el callout-signup).
- **Prohibido**: Usar border-radius en elementos que deban ser
  visualmente "duros" (tablas, barras de progreso, footers).
- **Prohibido**: Mezclar radius-sm y radius-lg en un mismo
  componente sin separación visual clara.

## 5. Reglas de UI

- **Sombras**: **Prohibidas** en todos los casos.
- **Divisores**: **Prohibidos**. Separar con espaciado o bloques
  de color sólido.
- **Iconos**: Estilo técnico (Tabler), sin fondos circulares ni
  ornamentos. Definidos en `src/app/shared/icons/`.
- **Espaciado**: Generoso y consistente. El espacio vacío es el
  principal elemento de organización.
- **Accesibilidad**: WCAG AA mínimo. Alto contraste entre texto
  (`jackson-charcoal`) y fondos (`jackson-white`).

## 6. Implementación (Tailwind v4)

Variables de color y fuente en `src/styles.css` → `@theme`.
Usar como utilidades Tailwind directamente:

- Botón primario: `bg-jackson-navy text-jackson-white px-4 py-2 rounded-md transition-jackson hover:bg-jackson-navy-hover`
- Botón secundario: `border border-jackson-navy text-jackson-navy px-4 py-2 rounded-md transition-jackson hover:bg-jackson-navy hover:text-jackson-white`
- Banner/callout: `bg-jackson-orange rounded-2xl px-6 py-16`
- Input: `bg-jackson-white border-0 rounded-md px-4 py-3 text-jackson-charcoal`
- Contenedor superficie: `bg-jackson-surface p-6`
- Grillas: `display: grid; gap: 32px;`
- Título sección: `text-jackson-charcoal text-2xl md:text-3xl font-medium`

## 7. Filosofía de Diseño

Si no es funcional, se elimina. La belleza proviene de la precisión
de la alineación, el espaciado generoso y la velocidad de carga
visual. El usuario debe encontrar su producto en menos de 2 segundos.
