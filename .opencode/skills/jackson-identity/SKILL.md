---

name: jackson-identity
description: >
Identidad de marca y sistema visual de Jackson Music Store.
Usa este skill para definir colores, tipografía, estética, reglas de UI (Tailwind)
y principios de diseño para el ecommerce Jackson. Es la referencia obligatoria
para el @ux-designer y cualquier tarea que afecte la interfaz visual.

---

# Jackson Music Store — Brand Identity & Design System

## 1. El Alma de la Marca

**Jackson Music Store** es un ecommerce de instrumentos musicales de alta gama en Perú. Su identidad busca transmitir **energía, genialidad, funcionalidad técnica y una limpieza extrema**, garantizando una experiencia de usuario de alto rendimiento.

**Filosofía visual:**

- **Funcionalidad Sharp**: Diseño técnico tipo "herramienta" (referencias: MercadoLibre, Interbank).
- **Clean & Spacious**: Diseño que "respira", estructurado por espaciado, no por ornamentos.
- **Sin ornamentos**: Cero bordes redondeados (`rounded-none`), cero sombras, cero líneas decorativas innecesarias.
- **Energía + Precisión**: El naranja de identidad aporta la energía musical; el navy aporta la estructura y confianza.

## 2. Paleta de Colores

El **Naranja** es color de **identidad de marca exclusivamente** (logo, franjas, fondos decorativos).
El **Navy** es el color de **estructura y acción** (CTAs, navbar, headers).

| Rol                     | HEX       | Uso                                                            | WCAG sobre blanco             |
| ----------------------- | --------- | -------------------------------------------------------------- | ----------------------------- |
| **Identidad (Naranja)** | `#f97316` | Logo, franjas decorativas, fondos con **texto oscuro** encima. | ⚠️ 2.8:1 (decorativo)         |
| **Fondo naranja**       | `#82320c` | Fondo de secciones de marca con **texto blanco** encima.       | ✅ 8.72:1 AAA                 |
| **Estructura y Acción** | `#023047` | CTA primario, navbar, footer, headers.                         | ✅ 13.86:1 AAA                |
| **Navy hover**          | `#001a28` | Hover de botones navy y elementos interactivos.                | ✅ ~16:1                      |
| **Info secundaria**     | `#219ebc` | Badges, iconos no interactivos, acentos visuales.              | ⚠️ 3.14:1 (solo texto grande) |
| **Texto**               | `#0f191e` | Títulos, cuerpo, descripciones, precios.                       | ✅ 17.83:1 AAA                |
| **Fondo**               | `#ffffff` | Fondo general y de componentes.                                | —                             |
| **Superficie**          | `#f1f4f7` | Fondo alterno (inputs, secciones secundarias).                 | —                             |
| **Superficie focus**    | `#e5e9ee` | Estado focus de inputs.                                        | —                             |

### Roles Taxativos

| Color     | ✅ USAR EN                                                     | ❌ NO USAR EN                                |
| --------- | -------------------------------------------------------------- | -------------------------------------------- |
| `#f97316` | Logo, franjas decorativas, fondos con texto oscuro             | CTAs, texto, links, badges interactivos      |
| `#82320c` | Fondos de sección con texto blanco                             | Elementos pequeños, texto                    |
| `#023047` | CTAs (relleno/outline), navbar, footer, headers, focus-visible | Texto de párrafo, fondos de página completos |
| `#219ebc` | Badges informativos, iconos no interactivos, acentos           | Botones, links, texto corrido                |
| `#0f191e` | Títulos, cuerpo, descripciones, precios                        | CTAs, fondos                                 |

### Eliminados de la paleta

- `#8ecae6` — 1.79:1, sin función real
- `#ffb703` — 1.75:1, ambiguo con el naranja de acción

## 3. Tipografía

- **Fuente**: **Manrope** (Google Fonts).
- **Pesos (Weights)**:
  - Máximo 500 (`medium`).
  - Títulos: `font-medium` (500).
  - Cuerpo: `font-normal` (400).
  - **Prohibido**: No usar `bold` (700+).

## 4. Reglas de UI Estrictas (Sharp & Functional)

- **Formas**: **Prohibido `border-radius`**. Todos los elementos (botones, tarjetas, inputs) deben tener bordes rectos (`rounded-none`).
- **Sombras**: **Prohibidas**. No usar sombras en ningún caso.
- **Divisores**: **Prohibidos**. La separación entre elementos se logra **exclusivamente mediante espaciado (padding/margin)** o bloques de color sólido.
- **Iconos**: Estilo técnico, sin fondos circulares ni ornamentos.
- **Espaciado**: Generoso y consistente. El espacio vacío es el elemento de organización principal.
- **Accesibilidad**: Alto contraste garantizado entre texto (`#0f191e`) y fondos (`#ffffff`).

## 5. Implementación (Tailwind v4)

Las variables están definidas en `src/styles.css` como `--color-jackson-*` y se usan como utilidades Tailwind:

```css
@theme {
  --color-jackson-orange: #f97316;
  --color-jackson-orange-bg: #82320c;
  --color-jackson-navy: #023047;
  --color-jackson-navy-hover: #001a28;
  --color-jackson-cyan: #219ebc;
  --color-jackson-text: #0f191e;
  --color-jackson-white: #ffffff;
  --color-jackson-surface: #f1f4f7;
  --color-jackson-surface-focus: #e5e9ee;
  --font-manrope: Manrope, sans-serif;
}
```

**Uso en templates:**

- Botón primario: `bg-jackson-navy text-jackson-white px-4 py-2 rounded-none transition-jackson hover:bg-jackson-navy-hover`
- Botón secundario: `border border-jackson-navy text-jackson-navy px-4 py-2 rounded-none transition-jackson hover:bg-jackson-navy hover:text-jackson-white`
- Contenedores: `bg-jackson-white p-6`
- Grillas: `display: grid; gap: 32px;`

## 6. Filosofía de Diseño

Si no es funcional, se elimina. La belleza proviene de la precisión de la alineación y la velocidad de carga visual. El usuario debe encontrar su producto en menos de 2 segundos.
