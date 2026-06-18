# Jackson — Workflow de trabajo

## Flujo (4 pasos)

1. **Spec simple** — tú dices qué necesitas, ej: *"CRUD de categories: listar, crear, editar, eliminar"*
2. **Yo pregunto si falta contexto** — si algo es ambiguo, pregunto antes de codificar
3. **Implementación por slices** — cada entrega es ≤200 líneas, 1 responsabilidad por prompt
4. **Tú revisas** — yo entrego código, tú dices si está bien o qué cambiar

## Cómo promptearme

- Sé directo: *"Crea el service de auth con login y register"* — con eso arranco
- No necesitas darme specs formales — si veo ambigüedad, pregunto antes de implementar
- Si quieres que cambie algo, solo dímelo y lo ajusto

## Lo que entrego

- Código completo, listo para pegar, con la ruta del archivo como comentario al inicio
- Sin comentarios ni explicaciones a menos que las pidas
- Si algo no se puede hacer limpio con las reglas actuales, lo advierto antes de implementar

## Lo que espero de ti

- Revisas cada entrega y me dices si sigue o cambia algo
- Decides sobre approaches cuando te propongo opciones

## Reglas que no negocio

- **Sin `npm install`** — no agrego dependencias externas
- **Sin `any`** — tipos estrictos siempre
- **Standalone components + `inject()`** — sin NgModules ni constructor injection
- **Signals + services** — sin NgRx ni BehaviorSubject innecesarios
- **≤200 líneas por entrega** — si un archivo excede, lo parto y pido confirmación
- **Sin `ng build` ni `npm run build`** — usas `ng serve` en vivo, yo solo verifico con `ng typecheck` o `tsc --noEmit` si es necesario

## Diseño — reglas establecidas

- **Sin sombras** — nunca `shadow-sm` ni `shadow-*`
- **Font weights**: máx 500. Usar `style="font-weight:500"` en vez de `font-bold` o `font-semibold`. Para secundario `style="font-weight:400"`.
- **Inputs**: fondo blanco, sin `bg-gray-50`, sin iconos inline dentro del input
- **Iconos**: usar componente `<app-icon>` desde `src/app/shared/icons/` con `name`, `size`, y `class` para color. Sin contenedores decorativos alrededor. `stroke-width="2"`.
- **Tipografía**: Manrope desde Google Fonts
- **Naranja**: `#f97316` / `orange-500` como acento principal
- **Padding consistente**: `p-6` como base en paneles
- **Border radius**: `rounded-2xl` para contenedores grandes, `rounded-lg` para inputs/botones
- **Texto alineado a la izquierda** salvo que se indique lo contrario

> Stack técnico completo, diseño visual y API en `.opencode/skills/angular-expert/SKILL.md`
