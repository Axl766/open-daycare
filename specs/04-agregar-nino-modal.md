# SPEC 04 — Modal "Agregar niño" sobre `/kids`

**State:** Approved//spe
**Depends on:** SPEC 02
**Date:** 2026-08-06
**Objective:** Implementar el mockup `references/pantallas/agregar-nino.dc.html` como modal overlay sobre `/kids` con layout card centrado en `md+` y sheet full-screen en `< md`, dropdown de sala funcional con opciones inventadas, sin backend ni autenticación.

## Alcance

**Incluye:**

- Modal overlay sobre `/kids` con estado local de apertura (botón "Agregar niño" funcional).
- Estructura del mockup: card `max-w-[520px]` con header ("Cancelar" / "Agregar niño" / "Guardar"), inputs NOMBRE COMPLETO, FECHA DE NACIMIENTO (`dd/mm/aaaa`), SALA (dropdown funcional `Soles`/`Lunas`/`Estrellas`, default `Soles`), ALERGIAS (ETIQUETAS), NOTAS MÉDICAS (textarea).
- Dropdown de sala funcional: cambia el valor visible, sin persistencia; tres opciones inventadas: `Soles`, `Lunas`, `Estrellas`.
- Responsive: card centrada en `md+` con overlay/scrim; sheet full-screen en `< md`.
- Cierre: botón Cancelar, Guardar, click en backdrop y Escape (sin focus trap, al estilo drawer de SPEC 01).
- Reutilización de fuentes Fredoka+Nunito y tokens de paleta definidos por SPEC 01 en `app/globals.css`.
- Datos estáticos de salas en `lib/child-form.ts` (identificadores en inglés, cadenas UI en español).
- Único cambio en `/kids`: hacer funcional el botón "Agregar niño" (abrir el modal); sin tocar el listado ni las tarjetas.

**No incluye:**

- Persistencia, rutas API, base de datos, sesión.
- Validación de formularios, estados de error, "Guardado con éxito".
- Datos reales del niño (los inputs quedan vacíos/placeholder; Guardar solo cierra el modal).
- Integración con `KIDS` de SPEC 02 (no se añade a la lista; el botón "Guardar" no modifica los datos estáticos).
- Otros cambios en `/kids` fuera de habilitar el botón "Agregar niño".
- Dark mode (hereda tema cálido claro de SPEC 01).

## Modelo de datos

Introducidos solo en memoria en `lib/child-form.ts`. Identificadores en inglés; cadenas visibles al usuario en español del producto.

```ts
export type Room = "Soles" | "Lunas" | "Estrellas";
export const ROOMS: readonly Room[];

export interface ChildFormLabels {
  modalTitle: string;
  cancelLabel: string;
  saveLabel: string;
  nameFieldLabel: string;
  namePlaceholder: string;
  birthdayFieldLabel: string;
  birthdayPlaceholder: string;
  roomFieldLabel: string;
  allergiesFieldLabel: string;
  allergiesPlaceholder: string;
  notesFieldLabel: string;
  notesPlaceholder: string;
}

export const CHILD_FORM_LABELS: ChildFormLabels;
```

Valores del mockup:
- `modalTitle: "Agregar niño"`, `cancelLabel: "Cancelar"`, `saveLabel: "Guardar"`.
- `nameFieldLabel: "NOMBRE COMPLETO"`, `namePlaceholder: "Ej. Martina López"`.
- `birthdayFieldLabel: "FECHA DE NACIMIENTO"`, `birthdayPlaceholder: "dd/mm/aaaa"`.
- `roomFieldLabel: "SALA"`.
- `allergiesFieldLabel: "ALERGIAS (ETIQUETAS)"`, `allergiesPlaceholder: "Ej. Maní, Lactosa"`.
- `notesFieldLabel: "NOTAS MÉDICAS"`, `notesPlaceholder: "Indicaciones, medicación, contactos…"`.

No se introducen tipos de sesión, credenciales ni usuarios: es UI-only.

## Plan de implementación

1. **Datos del formulario.** Crear `lib/child-form.ts` con los tipos `Room`, `ROOMS`, `ChildFormLabels` y `CHILD_FORM_LABELS` con los valores del mockup.
2. **Componente `ChildFormModal`.** Crear `app/_components/child-form-modal.tsx` (client component):
   - Props `{ open: boolean, onClose: () => void }`.
   - Estado local `room` (default `"Soles"`), manejadores para cada input (nombre, fecha, alergias, notas).
   - Cierre por Escape (useEffect con listener) y click en backdrop (scrim).
   - Layout responsive: `md+` → card centrada `max-w-[520px]` con overlay; `< md` → sheet full-screen top-aligned con scroll.
   - Header: "Cancelar" (mute `#94887B`), título "Agregar niño" (Fredoka 18), "Guardar" (acento `#D9583C`); todos cierran el modal sin persistir.
   - Inputs: NOMBRE COMPLETO (placeholder `Ej. Martina López`), FECHA DE NACIMIENTO (`dd/mm/aaaa`), SALA (dropdown funcional con `Soles`/`Lunas`/`Estrellas`, default `Soles`, chevron del mockup), ALERGIAS (placeholder `Ej. Maní, Lactosa`), NOTAS MÉDICAS (textarea, placeholder `Indicaciones, medicación, contactos…`).
   - Dropdown de sala: `<select>` estilizado o botón+popover simple; al cambiar opción, se actualiza el valor visible. No se persiste.
3. **Integrar en `/kids`.** Editar `app/(app)/kids/page.tsx`:
   - Agregar estado `open` (client wrapper o convertir la página en client component si no rompe `generateStaticParams` de `/kids/[id]`). Si convertir la page rompe `generateStaticParams`, extraer el contenido del listado a un componente server y envolverlo en un wrapper client que controle el modal.
   - Botón "Agregar niño" ahora abre el modal (`setOpen(true)`) en vez de ser `href="#"`.
   - `<ChildFormModal open={open} onClose={() => setOpen(false)} />` renderizado al final de la página.
4. **Verificación.** `pnpm lint` y `pnpm exec tsc --noEmit` sin errores. Comparación visual con `references/pantallas/agregar-nino.dc.html`. Confirmar que `/kids/[id]` sigue funcionando (no se toca `generateStaticParams`).

## Criterios de aceptación

- [ ] Click en "Agregar niño" abre el modal sin navegar ni refrescar la página.
- [ ] Header del modal: "Cancelar" (color `#94887B`), título "Agregar niño" (Fredoka 18, `#3F362E`), "Guardar" (color `#D9583C`); todos cierran el modal sin efecto secundario.
- [ ] Inputs: NOMBRE COMPLETO (placeholder `Ej. Martina López`), FECHA DE NACIMIENTO (`dd/mm/aaaa`), SALA (dropdown con `Soles`/`Lunas`/`Estrellas`, default `Soles`), ALERGIAS (placeholder `Ej. Maní, Lactosa`), NOTAS MÉDICAS (textarea, placeholder `Indicaciones, medicación, contactos…`).
- [ ] Dropdown de sala: abre/cierra, seleccionar opción cambia el valor visible; no se persiste.
- [ ] `md+` (≥768px): card centrada `max-w-[520px]`, fondo `#FBF4EC`, borde `#ECE0D0`, border-radius 24px, sombra del mockup, overlay/scrim sobre `/kids`.
- [ ] `< md` (<768px): sheet full-screen top-aligned con padding `40px 24px`, scroll natural.
- [ ] Cierre funcional: Escape cierra, click en backdrop (scrim) cierra, Cancelar cierra, Guardar cierra. Sin focus trap.
- [ ] Sidebar/drawer de `/kids` sigue funcionando; el estado del modal no interfiere con el drawer.
- [ ] `/kids/[id]` sigue funcionando sin cambios (no se toca `generateStaticParams`).
- [ ] Fuentes: Fredoka (título del modal), Nunito (cuerpo e inputs).
- [ ] Paleta del modal idéntica al mockup: fondo `#FBF4EC`, borde `#ECE0D0`, inputs `#EADFD0`, fondo blanco `#fff`.
- [ ] `pnpm lint` pasa sin errores.
- [ ] `pnpm exec tsc --noEmit` pasa sin errores.
- [ ] No se edita `references/pantallas/agregar-nino.dc.html` ni su `support.js`.
- [ ] Las rutas de SPEC 01 (`/`) y SPEC 02 (`/kids`, `/kids/[id]`) siguen funcionando sin cambios.

## Decisiones tomadas y descartadas

- **Modal overlay sobre `/kids`** (decisión del usuario): no se crea ruta nueva; el modal vive como componente client sobre la página existente. Descartada ruta `/kids/new` para mantener el flujo sin navegación.
- **Dropdown de sala funcional con opciones inventadas** (`Soles`, `Lunas`, `Estrellas`, default `Soles`): el mockup muestra "Soles" fijo con chevron; se añade funcionalidad visual (cambia el valor) sin persistencia. Descartado dropdown decorativo (el usuario pidió funcional).
- **Sheet full-screen en `< md`** (decisión del usuario): en mobile el modal ocupa toda la pantalla con scroll natural. Descartada card centrada en mobile (peor UX táctil).
- **Cierre con Escape + backdrop** (decisión del usuario): consistente con el patrón del drawer de SPEC 01. Sin focus trap (mitigación de riesgo de accesibilidad, fuera de alcance).
- **Sin persistencia ni validación**: Guardar solo cierra el modal, no modifica `KIDS` ni guarda datos. Descartado añadir a la lista estática (rompería la inmutabilidad de SPEC 02 y requeriría estado global).
- **Wrapper client para `/kids`**: si convertir la page en client rompe `generateStaticParams` de `/kids/[id]`, se extrae el contenido del listado a un componente server y se envuelve en un wrapper client que controla el modal. Descartada conversión directa si rompe el prerender.
- **Sin dark mode** en este modal (hereda tema cálido claro de SPEC 01).

## Riesgos identificados

- **Convertir `/kids` en client component**: puede romper `generateStaticParams` de `/kids/[id]` (SPEC 02). Mitigación: mantener el listado como componente server y envolverlo en un wrapper client mínimo que solo controle `open` y renderice `<ChildFormModal>`.
- **Dropdown estilizado vs `<select>` nativo**: el mockup dibuja un botón tipo pill con chevron; un `<select>` nativo rompe el look. Mitigación: usar `<select>` con `appearance-none` + chevron custom SVG, o botón+popover simple si el nativo no alcanza visualmente.
- **Estado `open` al navegar**: al ir a `/kids/[id]` y volver, el modal debe estar cerrado (el estado vive en la page, no en el layout → se resetea al desmontar). Sin riesgo adicional si se respeta la jerarquía.
- **Fidelidad visual**: el mockup usa valores precisos (radios 24px del card, 14px de inputs, sombra `0 20px 50px -24px rgba(63,54,46,.35)`). Mitigación: `arbitrary values` de Tailwind cuando un token no alcance, comparando lado a lado con el screenshot.
- **Sin focus trap**: el usuario aceptó no implementar focus trap (igual al drawer de SPEC 01). Riesgo de accesibilidad menor, aceptado para este scope.
