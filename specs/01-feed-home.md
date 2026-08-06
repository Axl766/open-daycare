# SPEC 01 — Página de inicio: Feed

**State:** Implemented
**Depends on:** (ninguna)
**Date:** 2026-08-05
**Objective:** Implementar la plantilla `references/pantallas/feed.dc.html` como página de inicio (`/`) replicando su estilo de forma pixel-perfect en escritorio y agregando un layout responsive con drawer para mobile, sin autenticación ni base de datos.

## Alcance

**Incluye:**

- Reescritura de `app/page.tsx` como feed (saludo, composer, lista de 3 posts estáticos).
- Sidebar de escritorio (248px) con logo, botón "Nueva publicación", navegación (Feed activo, Niños, Avisos, Mi cuenta) y tarjeta de usuario "Caro Giménez".
- Composer "Compartí un momento…" visible arriba de la lista de posts.
- 3 post cards estáticos (LOGRO, ACTIVIDAD con placeholder de foto, ANUNCIO) con avatares, timestamp, badge de tipo, "Para:", texto, footer de hearts/comentarios/Editar.
- Layout responsive: sidebar de escritorio ≥ `md` (768px); drawer con hamburguesa < `md`; ajustes de padding/centrado en `sm` (640px).
- Tipografías Fredoka (titulares) + Nunito (cuerpo) vía `next/font/google`.
- Tokens de diseño (paleta cálida del mockup) definidos en `app/globals.css` vía `@theme inline`.
- Datos de posts en un arreglo tipado estático en `lib/feed-posts.ts`.

**No incluye:**

- Autenticación, login, cierre de sesión funcional (el ícono de logout es decorativo).
- Base de datos, persistencia ni APIs.
- Páginas destino de la navegación (Niños, Avisos, Mi cuenta, crear-publicación, detalle-publicación, foto). Los links son `#` no-funcionales.
- Interactividad de hearts/comentarios (solo conteos estáticos; hover en links editable).
- Subida real de fotos en el composer/post de actividad (placeholder visual).
- Edición real de posts (el botón "Editar" es link `#`).
- Modo oscuro (se respeta el tema cálido claro del mockup; el dark mode existente se retira de esta página).

## Modelo de datos

Introducidos solo en memoria, en `lib/feed-posts.ts`. Todos los identificadores en inglés; las cadenas que se muestran al usuario conservan el español del producto.

```ts
export type PostType = "achievement" | "activity" | "announcement";

export type PostAudience =
  | { kind: "family"; childName: string }
  | { kind: "all"; label: string };

export interface BadgeStyle {
  background: string;
  dot: string;
  text: string;
}

export interface AuthorStyle {
  background: string;
  foreground: string;
}

export interface PhotoPlaceholder {
  label: string;
}

export interface FeedPost {
  id: string;
  authorInitial: string;
  authorStyle: AuthorStyle;
  authorIsIcon?: boolean;
  authorName: string;
  timeLabel: string; // "14:20"
  publishedBySelfHint: string; // "publicado por vos"
  type: PostType;
  audience: PostAudience;
  body: string;
  photo?: PhotoPlaceholder;
  hearts: number;
  comments: number;
}

export interface PostTypeBadge extends BadgeStyle {
  label: string;
}

export const POST_TYPE_BADGES: Record<PostType, PostTypeBadge>;
export const FEED_POSTS: readonly FeedPost[];
```

Valores del mockup (3 posts): Mateo · achievement · "familia de Mateo" · orinal; Mateo · activity · "familia de Mateo" · pintura con témperas (foto placeholder); Anuncio general · announcement · "toda la sala" · parque.

Colores de tipo → badge (UI labels en mayúsculas):

- `achievement`: background `#CFEBD8`, dot `#3E9B6C`, label `LOGRO`.
- `activity`: background `#C7E7F1`, dot `#2E89A6`, label `ACTIVIDAD`.
- `announcement`: avatar con ícono svg, background `#CCD8F4`, dot `#4E72C8`, label `ANUNCIO`.

## Plan de implementación

1. **Tokens de diseño y fuentes.** Editar `app/globals.css`: definir en `@theme inline` la paleta del mockup (canvas `#F6ECDF`, card `#FFFDF9`, border `#ECE0D0`, accent `#D9583C`, `#E0654A`, `#C5503A`, mute `#A89A8B`, `#94887B`, `#6E6359`, `#4A4038`, `#3F362E`) y variables de fuente Fredoka/Nunito. Quitar el dark mode de este tema.
2. **Layout root.** Editar `app/layout.tsx`: reemplazar Geist/Geist_Mono por `Fredoka` (pesos 400–700) y `Nunito` (pesos 400–800 + italic) vía `next/font/google`, exponer variables `--font-fredoka` y `--font-nunito`; actualizar `metadata` (título "OpenDayCare · Feed", descripción coherente); `<html lang="es">`; `<body>` con clase de fondo cálido y `font-sans` apuntando a Nunito.
3. **Datos de posts.** Crear `lib/feed-posts.ts` con los tipos anteriores y el arreglo `FEED_POSTS` (3 entradas del mockup).
4. **Componente Sidebar.** Crear `app/_components/sidebar.tsx`: estructura del aside desktop (`hidden md:flex`), y un drawer mobile (`<md`) con botón hamburguesa que abre un overlay lateral con el mismo contenido. Logo "OpenDayCare · Sala Soles", botón "Nueva publicación" (link `#`), nav con Feed activo (estilo `#FBE3D8`/`#D9583C`) y los demás items en gris, y tarjeta de usuario "Caro Giménez" con avatar "C" e ícono logout decorativo (`#`). Todos los items son `href="#"`.
5. **Componente Composer.** Crear `app/_components/composer.tsx`: caja "Compartí un momento…" con avatar "C", texto placeholder e ícono cámara. Link `#`. Visible en todos los tamaños (padding se ajusta en `sm`).
6. **Componente PostCard.** Crear `app/_components/post-card.tsx`: header (avatar, nombre, "HH:MM · publicado por vos", badge de tipo), "Para: …", párrafo (`body`), placeholder de foto opcional (`photo`, caja punteada con svg), footer (hearts svg + n, comentarios link `#` + n, "Editar" link `#`). Tipografías Fredoka en nombre, Nunito en cuerpo.
7. **Página Home.** Reescribir `app/page.tsx`: layout `flex` con `<Sidebar/>` + `<main>` scrollable; ancho máximo 760px del contenido (padding `34px 40px 80px` desktop, reducido en `sm`); saludo "GUARDERÍA · SALA SOLES" / "Buenas, Caro" / "12 niños · martes 17 jun"; divider "PUBLICADO HOY"; lista de `<PostCard/>` mapeando `FEED_POSTS` con `gap-16px`.
8. **Limpieza.** Quitar imports/uso de `next.svg`/`vercel.svg` en `page.tsx` (no borrar archivos de `public/`).
9. **Verificación.** `pnpm lint` y `pnpm exec tsc --noEmit` deben pasar sin errores. Comparación visual con `references/pantallas/feed.dc.html` / `references/screenshots/`.

## Criterios de aceptación

- [x] Al abrir `/` se ve el feed del mockup, con sidebar desktop en ≥768px y drawer hamburguesa en <768px.
- [x] El drawer se abre/cierra y superpone el contenido con overlay.
- [x] Fuentes: los titulares usan Fredoka y el cuerpo Nunito (no Geist).
- [x] Paleta: `#F6ECDF` de fondo, tarjetas `#FFFDF9`, bordes `#ECE0D0`, acento `#D9583C`, idénticos al mockup.
- [x] Sidebar: logo "OpenDayCare · Sala Soles", botón "Nueva publicación", nav con Feed activo y 3 items inactivos, usuario "Caro Giménez" con logout decorativo.
- [x] Saludo: "GUARDERÍA · SALA SOLES", "Buenas, Caro", "12 niños · martes 17 jun".
- [x] Composer "Compartí un momento…" con avatar "C", placeholder e ícono cámara; visible desktop y mobile.
- [x] Lista de 3 PostCards en el orden: LOGRO (Mateo, orinal, 3 hearts/1 comment), ACTIVIDAD (Mateo, témperas, placeholder foto, 5 hearts/2 comments), ANUNCIO (Anuncio general, parque, 8 hearts/0 comments).
- [x] Cada PostCard muestra avatar, nombre (Fredoka), "HH:MM · publicado por vos", badge con color correcto, "Para: …", texto, footer con hearts svg y número, comentarios link y "Editar" link.
- [x] Todos los links (nav, botón Nueva publicación, composer, comentarios, Editar, logout) son `#` no-funcionales.
- [x] No hay código de autenticación, rutas API, ni conexión a base de datos.
- [x] `pnpm lint` pasa sin errores.
- [x] `pnpm exec tsc --noEmit` pasa sin errores.
- [x] No se editan `references/pantallas/feed.dc.html` ni su `support.js`.

## Decisiones tomadas y descartadas

- **Datos estáticos tipados** (`lib/feed-posts.ts`) en vez de JSX hardcoded: estructura lista para una DB futura sin amarrarse a una ahora.
- **Links muertos `#`** para Niños/Avisos/Mi cuenta/Nueva publicación/Editar/Comentarios/Logout: fidelidad visual sin inventar pantallas fuera de alcance.
- **Fuentes Fredoka+Nunito vía `next/font/google`**: reemplazan Geist para coincidir con el mockup; variables CSS expuestas para uso en Tailwind.
- **Tokens en `@theme inline`** en `globals.css`: paleta mantenible y semántica en vez de hex arbitrarios en línea.
- **Responsive con drawer + hamburguesa** en `<md` (elegido por el usuario, no recomendado): el sidebar desktop se oculta y se reemplaza por un drawer lateral con el mismo contenido.
- **Dos breakpoints** (`sm`=640px, `md`=768px): `md` conmuta sidebar↔drawer; `sm` ajusta padding/centrado del contenido y del composer.
- **Sin interactividad de hearts**: solo conteos estáticos (la opción de toggle hearts se descartó como scope separado).
- **Sin dark mode** en esta página: el mockup es claro; el dark mode actual se retira aquí (queda para revisión global en otro spec).

## Riesgos identificados

- **Fidelidad visual**: el mockup usa estilos inline con valores precisos (radios, sombras, gaps específicos); al traducirlos a Tailwind pueden surgir diferencias sutiles. Mitigación: usar `arbitrary values` solo cuando un token no alcance y comparar lado a lado con el screenshot.
- **Drawer mobile sin librería de UI**: implementar el overlay/animación a mano puede introducir bugs de accesibilidad y foco. Mitigación: drawer mínimo (estado booleano local), cerrar con clic en overlay y tecla Escape; no se exige trap de foco en este spec.
- **Fuentes de Google en build**: `next/font/google` descarga en build; si falla la red, el build se rompe. Mitigación: ya es el patrón del proyecto (Geist se carga igualmente).
