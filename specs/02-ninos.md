# SPEC 02 — Pantallas de Niños (listado y perfil)

**State:** Approved
**Depends on:** SPEC 01
**Date:** 2026-08-06
**Objective:** Implementar las plantillas `references/pantallas/ninos.dc.html` (listado) y `references/pantallas/perfil-nino.dc.html` (perfil) como rutas `/kids` y `/kids/[id]`, solo interfaces y componentes, sin autenticación ni base de datos.

## Alcance

**Incluye:**

- Página `/kids` con cabecera "GESTIÓN · Niños", botón "Agregar niño", buscador decorativo y grid de 8 tarjetas estáticas.
- Página `/kids/[id]` con cabecera de niño, panel "Alergias y notas", ficha de datos, botón "Resumen del día", panel "PADRES VINCULADOS" y "Vincular otro padre".
- Route group `(app)` con layout persistente que envuelve `<Sidebar/>` + `<main>` para todas las páginas con sidebar.
- Refactor del `Sidebar` existente para auto-detectar el item activo vía `usePathname()` (Next.js 16 patrón idiomatic).
- Datos estáticos tipados en `lib/kids.ts` para los 8 niños del mockup + los 2 padres de Mateo.
- Reutilización del drawer mobile de spec 01 (sidebar ≥ md, drawer < md).
- Rutas dinámicas con slug del nombre (`/kids/mateo-fernandez`).
- Estado vacío inline para `/kids/[id]` cuando el id no existe.

**No incluye:**

- Autenticación, logout funcional, sesión ni permisos.
- Base de datos, persistencia, APIs.
- Buscador funcional (el input "Buscar niño…" es decorativo).
- Páginas destino "Agregar niño", "Editar", "Resumen del día", "Vincular otro padre" (links `#`).
- Páginas "Avisos" y "Mi cuenta" (nav items `#`).
- Dark mode (se respeta tema cálido claro de spec 01).
- Edición real de niño ni gestión real de padres.
- Filtros/orden dinámicos sobre el listado.

## Modelo de datos

Introducidos solo en memoria en `lib/kids.ts`. Identificadores en inglés; cadenas visibles al usuario en español del producto.

```ts
export type BadgeStyle = {
  background: string;
  text: string;
};

export type FlagLabel = "MANÍ" | "LACTOSA" | "VINCULAR";

export interface ChildFlag {
  label: FlagLabel;
  style: BadgeStyle;
}

export interface AvatarStyle {
  background: string;
  foreground: string;
}

export type ParentLinkStatus = "active" | "pending";

export interface Parent {
  id: string;
  name: string;
  roleLabel: string; // "Mamá · activa" | "Papá · invitación enviada"
  statusLabel: string; // "ACTIVA" | "PENDIENTE"
  statusStyle: BadgeStyle;
  avatarInitial: string;
  avatarStyle: AvatarStyle;
  linkStatus: ParentLinkStatus;
}

export interface Child {
  id: string; // slug, ej. "mateo-fernandez"
  name: string;
  avatarInitial: string;
  avatarStyle: AvatarStyle;
  ageYearsLabel: string; // "3 años"
  parentsCountLabel: string; // "2 padres vinculados" | "sin padres vinculados"
  flags: ChildFlag[]; // [] → flecha por defecto
  roomLabel: string; // "Soles"
  birthDateLabel: string; // "12 mar 2022"
  ingresoLabel: string; // "feb 2025"
  allergiesTitle: string; // "Alergias y notas"
  allergiesBody: string;
  parents: Parent[];
}

export const FLAG_STYLES: Record<FlagLabel, BadgeStyle>;
export const KIDS: readonly Child[];
```

Valores del mockup (8 niños): Mateo (MANÍ), Sofía, Benjamín, Valentina (VINCULAR), Tomás (LACTOSA), Emma, Lucas, Olivia.

Estilos de badge (del mockup):

- `MANÍ`: background `#FBD8CC`, text `#D9684A`.
- `LACTOSA`: background `#FBD8CC`, text `#D9684A`.
- `VINCULAR`: background `#F9D2DE`, text `#C56486`.

Avatares (del mockup): Mateo `#A9D9E8`/`#1F7A93`; Sofía y Emma `#F4B8CC`/`#C44A7A`; Benjamín y Olivia `#B9DEC4`/`#3E8B62`; Valentina `#F4DC8E`/`#9A7B1E`; Tomás `#C9B6E8`/`#7B5FC0`; Lucas `#A9D9E8`/`#1F7A93`.

Padres de Mateo (perfil): Lucía Fernández (mamá · activa, badge `ACTIVA` `#CFEBD8`/`#3E9B6C`, avatar `#C9B6E8`); Diego Fernández (papá · invitación enviada, badge `PENDIENTE` `#F7E7A6`/`#9A7B1E`, avatar `#A9C7E8`).

## Plan de implementación

1. **Datos de niños.** Crear `lib/kids.ts` con los tipos anteriores y el arreglo `KIDS` (8 entradas del mockup, padres de Mateo incluidos).
2. **Route group `(app)` + layout persistente.** Crear `app/(app)/layout.tsx`: route group (no afecta URL) que renderiza `<div className="flex min-h-screen bg-canvas">` + `<Sidebar/>` + `<main className="h-screen flex-1 overflow-y-auto">{children}</main>`. El `<main>` no fija max-width (cada página lo aporta).
3. **Mover feed a `(app)`.** Mover `app/page.tsx` → `app/(app)/page.tsx`. Quitar el wrapper `<div flex>` + `<Sidebar/>` + `<main>` (ahora los provee el layout). Queda solo el contenido del feed (header `GUARDERÍA · SALA SOLES` + `<Composer/>` + divider `PUBLICADO HOY` + lista de `<PostCard/>`) envuelto en `<div className="mx-auto w-full max-w-[760px] px-5 pb-20 pt-8 sm:px-10 sm:pt-[34px]">`. Las rutas no cambian: `/` sigue siendo el feed.
4. **Refactor del Sidebar con `usePathname()`.** Editar `app/_components/sidebar.tsx`:
   - Importar `usePathname` de `next/navigation`.
   - Cambiar `navItems`: Feed → `href="/"`, Niños → `href="/kids"`, Avisos y Mi cuenta quedan `#`.
   - Reemplazar `item.active` (hardcoded en Feed) por helper `isActive(href, pathname)`: `if (href === "#") return false; if (href === "/") return pathname === "/"; return pathname === href || pathname.startsWith(href + "/");`
   - `NavList` consume `usePathname()` y aplica estilo activo (`bg-active-bg text-active-text`) al item cuyo `isActive` sea true.
   - No se toca `app/(app)/page.tsx` (sin prop `active`); el sidebar se auto-detecta.
5. **Componente KidCard.** Crear `app/_components/kid-card.tsx`: tarjeta del listado (avatar, nombre en Fredoka, "X años · N padres vinculados", badge o flecha), link a `/kids/[id]`.
6. **Componente ChildAllergies.** Crear `app/_components/child-allergies.tsx`: panel rojo `#FBDAD6` con ícono y texto de alergias.
7. **Componente LinkedParents.** Crear `app/_components/linked-parents.tsx`: panel "PADRES VINCULADOS" con lista de padres (avatar, nombre, rol, badge) y link "Vincular otro padre" `#`.
8. **Página listado `/kids`.** Crear `app/(app)/kids/page.tsx`: contenido sin Sidebar ni `<main>` (los da el layout). Wrapper `<div className="mx-auto w-full max-w-[880px] px-5 pb-20 pt-8 sm:px-10 sm:pt-[34px]">` con cabecera "GESTIÓN · Niños" + botón "Agregar niño" `#`, buscador decorativo, divider "SALA SOLES · 8 niños", grid 2 columnas mapeando `KIDS` con `<KidCard/>`.
9. **Página perfil `/kids/[id]`.** Crear `app/(app)/kids/[id]/page.tsx`:
   - `export async function generateStaticParams()` retornando los 8 slugs desde `KIDS` → pre-render estático (evita Suspense en `usePathname` dentro del Sidebar, según `use-pathname.md:74`).
   - `params` tipado como `Promise<{ id: string }>` (Next.js 16 convención).
   - Busca en `KIDS`; si no existe → estado vacío inline ("Niño no encontrado" + link a `/kids`).
   - Si existe: back link "Volver a Niños" → `/kids`, cabecera (avatar 84px, nombre, "X años · Sala Soles", botón "Editar" `#`), `<ChildAllergies/>`, ficha de datos (nacimiento/sala/ingreso), botón "Resumen del día" `#`, `<LinkedParents/>`. Wrapper `<div className="mx-auto w-full max-w-[820px] px-5 pb-20 pt-8 sm:px-10 sm:pt-[34px]">`.
10. **Limpieza.** Borrar `app/page.tsx` original (movido a `(app)`). Verificar que `/` sigue renderizando el feed. No tocar `references/pantallas/*.dc.html`.
11. **Verificación.** `pnpm lint` y `pnpm exec tsc --noEmit` sin errores. Comparación visual con mockups en `references/screenshots/` si existen.

## Criterios de aceptación

- [x] Al abrir `/kids` se ve el listado del mockup, con sidebar desktop en ≥768px y drawer hamburguesa en <768px.
- [x] El sidebar marca "Niños" como activo (`#FBE3D8`/`#D9583C`) y "Feed" como inactivo.
- [x] El drawer se abre/cierra y superpone el contenido con overlay (mismo comportamiento que spec 01).
- [x] Cabecera del listado: badge "GESTIÓN", título "Niños" (Fredoka), botón "Agregar niño" (gradiente naranja, link `#`).
- [x] Buscador "Buscar niño…" visible, con ícono lupa y placeholder; no filtra.
- [x] Divider "SALA SOLES · 8 niños" visible sobre el grid.
- [x] El listado muestra 8 tarjetas en grid de 2 columnas, en el orden del mockup: Mateo, Sofía, Benjamín, Valentina, Tomás, Emma, Lucas, Olivia.
- [x] Cada tarjeta muestra avatar con color correcto, nombre en Fredoka, "X años · N padres vinculados" y badge o flecha según corresponda.
- [x] Badges: Mateo=MANÍ (`#FBD8CC`/`#D9684A`), Tomás=LACTOSA (mismo color), Valentina=VINCULAR (`#F9D2DE`/`#C56486`); el resto muestra flecha `›`.
- [x] Click en una tarjeta navega a `/kids/[slug-del-nombre]`.
- [x] Al abrir `/kids/mateo-fernandez` se ve el perfil de Mateo completo: back link "Volver a Niños", avatar "M" (84px) con color `#A9D9E8`/`#1F7A93`, "Mateo Fernández" (Fredoka 28), "3 años · Sala Soles", botón "Editar" `#`.
- [x] Panel de alergias con background `#FBDAD6`, título "Alergias y notas" y texto del mockup.
- [x] Ficha de datos con filas: "Fecha de nacimiento · 12 mar 2022", "Sala · Soles", "Ingreso · feb 2025".
- [x] Botón "Resumen del día" (background `#3F362E`, link `#`).
- [x] Panel "PADRES VINCULADOS" con Lucía (avatar L `#C9B6E8`, "Mamá · activa", badge ACTIVA `#CFEBD8`/`#3E9B6C`) y Diego (avatar D `#A9C7E8`, "Papá · invitación enviada", badge PENDIENTE `#F7E7A6`/`#9A7B1E`).
- [x] Link "Vincular otro padre" con avatar dashed + icon +, color `#C5503A`, link `#`.
- [x] Al abrir `/kids/no-existe` se muestra un estado vacío inline (mensaje "Niño no encontrado" y link de vuelta a `/kids`).
- [x] Todos los links no-implementados (`Agregar niño`, `Editar`, `Resumen del día`, `Vincular otro padre`, `Nueva publicación`, nav items `Avisos`/`Mi cuenta`, `logout`) son `#` o rutas internas válidas (`/kids`, `/`).
- [x] No hay código de autenticación, rutas API ni conexión a base de datos.
- [x] Fuentes: titulares en Fredoka, cuerpo en Nunito (heredado de spec 01).
- [x] Paleta idéntica al mockup (fondo `#F6ECDF`, tarjetas `#FFFDF9`, bordes `#ECE0D0`, acento `#D9583C`).
- [x] `pnpm lint` pasa sin errores.
- [x] `pnpm exec tsc --noEmit` pasa sin errores.
- [x] No se editan `references/pantallas/ninos.dc.html`, `references/pantallas/perfil-nino.dc.html` ni su `support.js`.
- [x] La ruta `/` (feed) sigue funcionando exactamente como en spec 01 tras el refactor del route group.
- [x] El sidebar muestra "Feed" activo al abrir `/` y "Niños" activo al abrir `/kids`.
- [x] El estado del drawer (abierto/cerrado) persiste al navegar entre `/` y `/kids` (no se re-monta el Sidebar).

## Decisiones tomadas y descartadas

- **Una sola spec** para listado+perfil (mismo dominio Niños, perfil reached desde listado). Descartado separar en dos specs para evitar dependencias artificiales y duplicar la definición de datos.
- **Rutas en inglés `/kids` y `/kids/[id]`** (decisión del usuario) siguiendo la convención de App Router; el slug deriva del nombre (`/kids/mateo-fernandez`).
- **Datos estáticos completos en `lib/kids.ts`** (8 niños + padres de Mateo) listos para una DB futura sin rediseño.
- **Buscador decorativo**, no filtra: mantiene el alcance en interfaces y componentes sin añadir estado client.
- **Badges modeladas como `ChildFlag[]` con tipo unión `FlagLabel`** para soportar múltiples flags futuras por niño.
- **Route group `(app)` + layout persistente con `<Sidebar/>`** (Opción C, elegida por el usuario): el Sidebar no se re-monta al navegar `/` ↔ `/kids` ↔ `/kids/mateo`, el estado del drawer persiste entre rutas y el código del Sidebar vive en un solo sitio (no en cada page).
- **`usePathname()` para derivar el item activo** (patrón idiomatic de Next.js 16, ver `link.md:587` y `layout.md:572`): cero props, futuro-proof para Avisos/Mi cuenta (solo cambiar `href`).
- **`generateStaticParams` en `/kids/[id]`** no solo por SEO/sino como requisito técnico: según `use-pathname.md:74-77`, sin él el `usePathname` del Sidebar suspende el prerender de cualquier ruta bajo `(app)` con el `[id]` dinámico.
- **Mover `app/page.tsx` a `app/(app)/page.tsx`**: arquitectura más limpia. Riesgo mitigado: el feed sigue en `/`, los criterios de spec 01 siguen pasando (verificación lateral con `@spec-verify 01` si fuera necesario).
- **Descartada prop `active`** (Opción A): manual, propensa a olvidos, no idiomatic y forzaba a tocar `app/page.tsx` de spec 01 sin necesidad.
- **Descartada `usePathname()` sin route group** (Opción B): dejaría el Sidebar vivo solo en cada page, re-montando el componente y perdiendo el estado del drawer en cada navegación; menor UX que C.
- **Botones del perfil `#` decorativos** (Editar, Resumen del día, Vincular otro padre): fidelidad visual sin inventar pantallas fuera de alcance.
- **Estado vacío inline en `/kids/[id]` no encontrado** (decisión del usuario); no se usa `notFound()` de Next.js.
- **Sin dark mode** en estas páginas (hereda tema cálido de spec 01).

## Riesgos identificados

- **Route group es convención nueva en el repo**: puede confundir a lectores que no conozcan `(app)`. Mitigación: comentario de una línea en el layout explicando que es un route group (no afecta URL).
- **Spec 01 queda tocada**: mover `app/page.tsx` no rompe `/` pero toca trabajo ya verificado. Mitigación: tras implementar, abrir `/` y confirmar feed + sidebar Feed activo; si fuera necesario, correr `@spec-verify 01` otra vez.
- **`usePathname` + rutas dinámicas**: sin `generateStaticParams` suspende el prerender de todo `(app)`. Mitigación: `generateStaticParams` en `/kids/[id]` (paso 9).
- **Fidelidad visual del perfil**: paneles coloreados (alergias `#FBDAD6`, padres con `#FFFDF9`/`#ECE0D0`) pueden sufrir al traducir a Tailwind. Mitigación: tokens en `@theme inline` ya definidos por spec 01 + arbitrary values cuando un token no alcance, comparando lado a lado con el screenshot.
- **Tamaños distintos de max-width por página** (760/880/820): el layout no fija max-width; cada page lo setea en su wrapper. Conflicto mínimo pero requiere disciplina al añadir nuevas páginas.
