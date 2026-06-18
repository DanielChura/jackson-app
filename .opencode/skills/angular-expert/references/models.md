# Modelos e interfaces — regla de fuente de verdad

Las interfaces TypeScript reales del proyecto viven en
`src/app/core/models/index.ts` — esa es la única fuente de verdad para tipos
ya existentes en el código. No dupliques tipos aquí ni en otro archivo.

## Flujo a seguir

1. Antes de crear o modificar un componente/service que use una entidad del
   dominio (Product, Order, User, etc.), revisa primero
   `src/app/core/models/index.ts` para ver si el tipo ya existe.
2. Si el tipo ya existe, úsalo tal cual — no lo redefinas ni lo dupliques
   con un nombre distinto.
3. Si necesitas un tipo que no existe todavía, créalo directamente en
   `src/app/core/models/index.ts`, siguiendo exactamente la forma del
   schema correspondiente documentado en `references/api-endpoints.md`.
4. Si `api-endpoints.md` tampoco tiene esa entidad documentada todavía,
   pregunta antes de inventar el shape — no asumas campos que no se han
   confirmado contra el swagger real.

## Por qué esta regla existe

Mantener los tipos en un solo lugar (`models/index.ts`) evita que el código
y la documentación se desincronicen. `api-endpoints.md` es la referencia
para construir tipos nuevos correctamente, no una copia paralela de los
tipos que ya existen en el proyecto.
