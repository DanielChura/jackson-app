# Jackson — Workflow de trabajo

## Inicio de sesión

Cuando digas *"lee las instrucciones"* o similar al iniciar un chat, yo debo:
1. Leer este AGENTS.md
2. Cargar el skill correspondiente (angular-expert)
3. Confirmar que los leí y preguntar qué necesitas

## Flujo (5 pasos)

1. **Spec simple** — tú dices qué necesitas, ej: *"CRUD de categories: listar, crear, editar, eliminar"*
2. **Plan** — yo propongo el approach por escrito antes de codificar. Tú lo apruebas o lo ajustamos.
3. **Yo pregunto si falta contexto** — si algo es ambiguo, pregunto antes de codificar
4. **Implementación por slices** — cada entrega es ≤200 líneas, 1 responsabilidad por prompt. **Nunca implementar todo de golpe.**
5. **Tú revisas** — yo entrego código, tú dices si está bien o qué cambiar

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

## Lecciones aprendidas (no repetir)

- **Planificar antes de codificar** — siempre propongo el plan primero para que apruebes.
- **No implementar todo de golpe** — un cambio por entrega, tú revisás antes de seguir.
- **Preguntar por la versión más simple** — antes de implementar, pregunto "cuál es la versión más simple de esto?"
- **Tono neutro siempre** — sin voseo, sin modismos regionales a que las pidas.
- **Re-leer estas reglas antes de cada paso** — para no desviarme.
- **`toSignal` con SSR** — nunca usar `requireSync: true`. En SSR, `toObservable` no emite sincrónicamente porque depende de `effect`. Siempre pasar `initialValue` para que el signal arranque con estado definido.
- **Revisar consistencia entre componentes antes de entregar** — verificar que todos los templates sigan el mismo patrón (loading/error/empty/data), estilos coincidan, y no haya componentes olvidados.
- **Ser proactivo** — si veo algo mejorable (layout, patrón, redundancia), lo señalo antes de que el usuario lo pida.
- **Verificar en runtime** — typecheck no alcanza. Errores como `requireSync` en SSR solo aparecen al ejecutar.
- **Commits: antes de dar el mensaje, ejecutar `git status` + `git diff` y revisar TODOS los archivos cambiados, no solo los últimos.** El mensaje debe cubrir el conjunto completo de cambios, no solo los de la sesión actual.
- **Formato commit: máximo 2 líneas. Primera línea tipo(scope): descripción concreta del cambio principal. Segunda línea opcional con detalles adicionales separados por guiones.** Ej: `refactor(dashboard): migrate to shared range service and extract Chart.js to config files` `- Split models into per-domain files, add SSR guards, move dashboard service to core/`. Sin demoras.

## Convenciones

- **`*.models.ts`** en `core/models/` para tipos que reflejan el contrato API (request/response)
- **`*.types.ts`** dentro del feature para tipos UI, helpers, constantes de presentación (LoadState, colores, mapeos)
- **Template de componentes con data async**: siempre estructura unificada:
  ```
  @if (loading()) { spinner }
  @else if (error()) { mensaje }
  @else if (data()) { contenido }
  @else { vacio }
  ```
- **Sin sombras**, font-weight máx 500, Manrope, padding p-6 base, rounded-2xl cards

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
