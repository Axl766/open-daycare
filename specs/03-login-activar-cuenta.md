# SPEC 03 — Login y Activar Cuenta (UI)

**State:** Approved
**Depends on:** SPEC 01
**Date:** 2026-08-06
**Objective:** Implementar las plantillas `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` como rutas `/login` y `/activate-account`, solo interfaces, eliminando el selector "Personal/Familia" del mockup de login, sin autenticación ni base de datos.

## Alcance

**Incluye:**

- Página `/login` con layout split (hero gradient + form), inputs de email y contraseña, link "¿Olvidaste tu contraseña?" decorativo, CTA "Iniciar sesión" decorativo, link "Activá tu cuenta" funcional a `/activate-account`.
- Página `/activate-account` full-screen centrada: heading, tarjeta de previsualización del niño invitado, inputs de código/email/contraseña (prefijados de los datos de invitación), checkbox de autorización pre-checkeado, CTA "Activar mi cuenta" decorativo, link "Iniciar sesión" funcional a `/login`.
- Route group `(auth)` con layout propio (sin `<Sidebar/>`) que aplica el fondo cálido del mockup (`#FBF4EC`).
- Eliminación del selector de rol "INGRESO COMO → Personal/Familia" del login (decisión del usuario); no se renderiza y no existe estado de rol.
- Navegación cruzada funcional `/login` ↔ `/activate-account` con `next/link`.
- Reutilización de fuentes Fredoka+Nunito y tokens de paleta definidos por SPEC 01 en `app/globals.css` y `app/layout.tsx`.
- Datos estáticos de la invitación en `lib/invite.ts` (identificadores en inglés, cadenas UI en español).
- Responsive: el panel hero del login se oculta en `< md` (768px); el form queda centrado full-width. La activate-account es single-column centrada en todos los tamaños (padding ajustado en `sm`).

**No incluye:**

- Selector de rol "Personal/Familia" (eliminado por decisión del usuario).
- Autenticación, sesión, logout, recuperación/activación funcional de contraseña.
- Backend, rutas API, base de datos, persistencia.
- Validación de formularios, estados de error, loading o confirmación.
- Lógica de destino dinámico post-login (el mockup derivaba a `feed.dc.html` o `familia-feed.dc.html` según rol; sin rol, el CTA es `#`).
- Páginas destino (`/`, `/feed`, `/family-feed`) alcanzables desde estas pantallas (están fuera de alcance y se cubren en otras specs).
- Dark mode (hereda tema cálido claro de SPEC 01).

## Modelo de datos

Introducidos solo en memoria en `lib/invite.ts`. Identificadores en inglés; cadenas visibles al usuario en español del producto.

```ts
export interface AvatarStyle {
  background: string;
  foreground: string;
}

export interface InvitePreview {
  childInitial: string; // "M"
  childName: string; // "Mateo"
  childRoomLabel: string; // "Sala Soles"
  invitedToLabel: string; // "Te invitaron a seguir a"
  avatarStyle: AvatarStyle; // #A9D9E8 / #1F7A93
  invitationCode: string; // "7K4P9"
  parentEmail: string; // "lucia.fernandez@gmail.com"
  defaultPasswordLabel: string; // "contraseña" (valor prefijado del mockup)
}

export const INVITE_PREVIEW: InvitePreview;
```

Valores del mockup: child "Mateo · Sala Soles", avatar `#A9D9E8`/`#1F7A93`, código `7K4P9`, email `lucia.fernandez@gmail.com`, contraseña visible `contraseña`.

No se introducen tipos de sesión, credenciales ni usuarios: son pantallas UI-only.

## Plan de implementación

1. **Datos de invitación.** Crear `lib/invite.ts` con los tipos anteriores y `INVITE_PREVIEW` con los valores del mockup de activar-cuenta.
2. **Route group `(auth)` + layout.** Crear `app/(auth)/layout.tsx`: route group (no afecta URL) que envuelve `children` en `<div className="min-h-screen bg-[#FBF4EC]">` (fondo del mockup, ligeramente distinto del canvas `#F6ECDF` de SPEC 01). Comentario de una línea aclarando que es route group sin sidebar.
3. **Página `/login`.** Crear `app/(auth)/login/page.tsx`:
   - Contenedor `grid min-h-screen md:grid-cols-[1.05fr_1fr]`. En `< md` una sola columna.
   - Panel hero (izquierda): gradiente `linear-gradient(155deg,#F6A98E 0%,#F2937A 45%,#EC7E62 100%)`, dos círculos decorativos, logo OpenDayCare + sol, titular "El día de cada niño, compartido con su familia.", párrafo y footer "🌿 Guardería Sala Soles". `hidden md:flex` en `< md`.
   - Panel form (derecha): centrado, `max-w-[392px]`. Título "Iniciar sesión" (Fredoka 30), subtítulo "Ingresá para ver el día de hoy.". NO se renderiza el bloque "INGRESO COMO" ni los botones Personal/Familia (eliminado). Inputs email (vacío, placeholder tipo `nombre@guarderia.com`) y contraseña (vacío, placeholder `••••••••`). Link "¿Olvidaste tu contraseña?" → `#`. CTA "Iniciar sesión" → `#` (no funcional). Texto "¿Te invitó la guardería? Activá tu cuenta" con `<Link href="/activate-account">`.
4. **Página `/activate-account`.** Crear `app/(auth)/activate-account/page.tsx`:
   - Contenedor centrado `min-h-screen flex items-center justify-center`, `max-w-[440px]`.
   - Icono destacado (tile gradiente con sol svg).
   - Heading "Bienvenida a OpenDayCare" (Fredoka 32) + párrafo explicativo.
   - Tarjeta de preview desde `INVITE_PREVIEW`: avatar `M` (44px, `#A9D9E8`/`#1F7A93`), "Te invitaron a seguir a" + "{childName} · Sala Soles".
   - Inputs: "CÓDIGO DE INVITACIÓN" prefijado `7K4P9` (letter-spacing 3px, Fredoka); "EMAIL" prefijado desde `INVITE_PREVIEW.parentEmail`; "CREAR CONTRASEÑA" prefijado desde `INVITE_PREVIEW.defaultPasswordLabel` (type password).
   - Checkbox autorización pre-checkeado (estilo `#FBF1D6`, check verde `#5FB97E`), texto del mockup.
   - CTA "Activar mi cuenta" → `#` (no funcional). Texto "¿Ya tenés cuenta? Iniciar sesión" con `<Link href="/login">`.
5. **Navegación cruzada.** Confirmar que `<Link>` apunta a rutas internas reales (`/login`, `/activate-account`) para los dos enlaces de cruce. Los CTAs y "¿Olvidaste tu contraseña?" son `#`.
6. **Verificación.** `pnpm lint` y `pnpm exec tsc --noEmit` sin errores. Comparación visual con `references/pantallas/login.dc.html` y `references/pantallas/activar-cuenta.dc.html` / `references/screenshots/`.

## Criterios de aceptación

- [ ] Al abrir `/login` se ve el mockup de login en escritorio: split hero gradient (izq) + form (der).
- [ ] No aparece el bloque "INGRESO COMO" ni los botones "Personal"/"Familia" (eliminado por el usuario).
- [ ] El panel hero del login se oculta en `< md` (768px) y el form queda centrado full-width.
- [ ] Form de login: título "Iniciar sesión" (Fredoka 30), subtítulo "Ingresá para ver el día de hoy.", input email (vacío+placeholder), input contraseña (vacío+placeholder `••••••••`).
- [ ] Link "¿Olvidaste tu contraseña?" presente y decorativo (`#`), color `#C5503A`.
- [ ] CTA "Iniciar sesión" con gradiente `#F4977E`→`#EE8164` y sombra del mockup; decorativo (`#`).
- [ ] Texto "¿Te invitó la guardería? Activá tu cuenta" con "Activá tu cuenta" como `<Link href="/activate-account">` funcional.
- [ ] Al abrir `/activate-account` se ve el mockup: full-screen centrado, `max-w-[440px]`, icono destacado, heading "Bienvenida a OpenDayCare" (Fredoka 32) y párrafo del mockup.
- [ ] Tarjeta de preview muestra avatar "M" (`#A9D9E8`/`#1F7A93`, 44px), "Te invitaron a seguir a", "Mateo · Sala Soles".
- [ ] Inputs: código `7K4P9` prefijado (letter-spacing 3px, Fredoka); email `lucia.fernandez@gmail.com` prefijado; contraseña `contraseña` prefijada.
- [ ] Checkbox de autorización visible, pre-checkeado, fondo `#FBF1D6`, check `#5FB97E`, texto del mockup.
- [ ] CTA "Activar mi cuenta" con mismo estilo que CTA login; decorativo (`#`).
- [ ] Texto "¿Ya tenés cuenta? Iniciar sesión" con "Iniciar sesión" como `<Link href="/login">` funcional.
- [ ] Las rutas `/login` y `/activate-account` NO muestran el `<Sidebar/>` (viven fuera de `(app)`).
- [ ] Fuentes: titulares en Fredoka, cuerpo en Nunito (heredado de SPEC 01).
- [ ] Fondos de las páginas son `#FBF4EC` (color del mockup de auth, distinto del canvas `#F6ECDF` del feed).
- [ ] Ningún código de autenticación, sesión, rutas API ni conexión a base de datos.
- [ ] No hay estado de rol ni "Personal/Familia" en ninguna parte del código nuevo.
- [ ] `pnpm lint` pasa sin errores.
- [ ] `pnpm exec tsc --noEmit` pasa sin errores.
- [ ] No se editan `references/pantallas/login.dc.html`, `references/pantallas/activar-cuenta.dc.html` ni su `support.js`.
- [ ] Las rutas de SPEC 01 (`/`) y SPEC 02 (`/kids`, `/kids/[id]`) siguen funcionando sin cambios (no se toca `(app)`).

## Decisiones tomadas y descartadas

- **Eliminar el selector "Personal/Familia"** (decisión del usuario): no se renderiza el bloque "INGRESO COMO" ni sus botones; no hay estado de rol. Consecuencia: el email/contraseña no se prefijan (en el mockup se prefijaban vía rol) y el CTA no deriva destino — queda `#`. Coherente con scope "solo UI".
- **Rutas en inglés internamente, UI en español** (decisión del usuario): `/login` y `/activate-account`. En español solo lo que ve el usuario (textos del form), igual que en las specs previas.
- **Route group `(auth)` con layout propio** fuera del sidebar de `(app)`: las pantallas pre-auth son full-screen, sin la navegación lateral de SPEC 01/02. Reutiliza el root layout (`app/layout.tsx`) para fuentes y `<html>`/`<body>`.
- **Fondo `#FBF4EC`** aplicado por `(auth)/layout.tsx` (no por el root): el mockup de auth usa un cream más claro que el canvas `#F6ECDF` del feed; al aislarlo en el route group se evita tocar el fondo global.
- **Inputs de `/login` vacíos con placeholder**: sin rol no hay fuente de prefill; placeholder coherente con el producto. Descartado prefill hardcoded (inventaba datos sin rol).
- **Inputs de `/activate-account` prefijados desde `lib/invite.ts`**: fidelidad pixel-perfect al mockup y consistente con SPEC 02 (datos estáticos en `lib/*.ts`).
- **CTAs decorativos `#`** ("Iniciar sesión" y "Activar mi cuenta"): scope "solo UI" estricto, empareja con specs 01/02 (todo link fuera de scope fue `#`).
- **Navegación cruzada funcional** `/login`↔`/activate-account`: cuesta cero y es coherente con tener ambas páginas reales.
- **Hero oculto en `< md`** (decisión del usuario): el panel gradient pierde sentido en mobile; el form queda centrado full-width.
- **Sin validación ni estados de error/loading**: fuera de alcance; verificar comportamiento de inputs en blanco es tema de otra spec.
- **Sin dependencia de SPEC 02**: la preview del niño se hardcodea en `lib/invite.ts` (no se importa `KIDS`) para no amarrar el flujo de auth al dominio Niños.

## Riesgos identificados

- **Fondo distinto al canvas (`#FBF4EC` vs `#F6ECDF`)**: si el root layout o el `<body>` pinta el canvas global, puede chocar con el fondo auth. Mitigación: el fondo auth se aplica en el `(auth)/layout.tsx` más interno, sobreescribiendo localmente; no se toca el root.
- **Hero oculto en mobile reduce branding**: el usuario lo aceptó; mitigado dejando el logo OpenDayCare solo en desktop y un eventual mini-logo se deja fuera de este scope.
- **Fidelidad visual de estilos inline**: el mockup usa valores precisos (radios 14/15/16/18, letter-spacing 3px del código, gradientes exactos). Mitigación: `arbitrary values` de Tailwind cuando un token no alcance, comparando lado a lado con los screenshots.
- **Fuentes en build**: `next/font/google` ya configurado por SPEC 01; sin riesgo adicional.
- **Sin tests ni typecheck script dedicado**: se ejecuta `pnpm exec tsc --noEmit` directo, igual que en specs previas.
