# spec-verify — Verificador de criterios de aceptación

## Contexto de sesión

Specs disponibles:
!`ls specs/ 2>/dev/null || echo "The specs/ folder does not exist"`

Rama actual:
!`git branch --show-current`

Estado del working tree:
!`git status --short`

---

## Instrucciones

Sigue estas cuatro fases en orden estricto. **No avances a la siguiente fase si la anterior no se completó correctamente.**

**Importante:** Responde en el mismo idioma en que está escrito el spec (castellano en este repositorio).

---

### Fase 1 — Localizar el spec

El argumento recibido es: `$ARGUMENTS`

Si `$ARGUMENTS` está vacío:

- Lista los archivos disponibles en `specs/` (ya los tienes en el contexto de sesión).
- Pide al usuario que especifique el nombre del spec.
- Detente y espera respuesta. No continúes.

Si `$ARGUMENTS` tiene valor:

- Busca el archivo en `specs/`. El usuario puede haber escrito el nombre completo (`01-mvp-arkanoid`), solo el número (`01`), o solo el slug (`mvp-arkanoid`). Intenta encontrar el archivo correcto en cualquiera de esos casos.
- Si no encuentras el archivo, muestra los specs disponibles y pide que corrija el nombre.
- Si lo encuentras, continúa a la Fase 2.

---

### Fase 2 — Cargar y mostrar criterios

Lee el archivo spec localizado en la Fase 1.

Localiza la sección de criterios de aceptación. El encabezado puede ser `## Acceptance criteria`, `## Criterios de aceptación`, o equivalente en cualquier idioma.

Extrae cada ítem de la lista de verificación (formato `- [ ] ...`).

Muestra al usuario:
1. El nombre del spec y su estado actual.
2. La lista numerada de todos los criterios de aceptación encontrados.
3. Para cada criterio, anuncia brevemente qué estrategia de verificación usarás (ver tabla abajo).

**Estrategia de verificación por tipo de criterio:**

| Tipo de criterio | Herramientas |
|---|---|
| Pantallas / UI / visual | MCP Playwright: navegar a `localhost:3000`, tomar screenshot con `playwright_browser_take_screenshot` (guardar en `.playwright-mcp/`), comparar visualmente con mockups en `references/screenshots/` usando la visión del modelo |
| Convenciones Next.js 16 | Context7: `context7_resolve-library-id` ("Next.js") → `context7_query-docs` con el topic específico. **Nunca** asumir comportamiento pre-16; consulta primero la documentación. |
| Tipos / TypeScript | `read`/`grep`/`glob` sobre el repo + `pnpm exec tsc --noEmit` (bash) |
| Lint / estilo | `pnpm lint` (bash) |
| Estructura de archivos / código | `read`/`grep`/`glob` |
| Otro booleano verificable | Lectura directa del código + herramientas disponibles |

---

### Fase 3 — Verificar uno por uno

Para cada criterio de aceptación, ejecuta la verificación correspondiente.

**Regla de intentos:** Máximo 2 intentos de corrección por criterio. Si tras 2 intentos el criterio sigue fallando, déjalo sin marcar `[ ]`, reporta la razón brevemente y continúa con el siguiente.

**Si el criterio Pasa:**
- Usa Edit para cambiar `[ ]` → `[x]` en el archivo spec (reemplazo único que coincida exactamente con ese ítem).
- Anuncia al usuario que pasó.

**Si el criterio Falla:**
1. Reporta qué falló con referencia `archivo:linea`.
2. Edita el código necesario (Edit/Write) para corregir el fallo, respetando el scope del spec.
3. Re-verifica el criterio con la misma estrategia.
4. Si ahora pasa → marca `[x]`. Si sigue fallando → segundo intento. Si tras el segundo intento sigue fallando → deja `[ ]`, agrega una nota explicativa y continúa.

**Reglas durante correcciones:**
- Solo modifica archivos que estén dentro del scope del spec.
- No cambies el `Status` del spec.
- No hagas commits.
- Respeta las convenciones del proyecto (Tailwind v4, Next.js 16 App Router, TypeScript strict, etc.).
- Antes de asumir cualquier API o comportamiento de Next.js 16, consulta Context7 primero.

**Para criterios de pantallas/UI:**
- El dev server debe estar corriendo en `localhost:3000` (asumir que el humano lo tiene activo).
- Usa `playwright_browser_navigate` para ir a la ruta correspondiente.
- Usa `playwright_browser_take_screenshot` con `filename` relativo a `.playwright-mcp/`.
- Compara el screenshot con los mockups de referencia en `references/screenshots/` usando la visión del modelo.
- Si hay discrepancias visuales, describe qué difiere y corrige el código CSS/Tailwind correspondiente.

**Para criterios de Next.js:**
- Usa `context7_resolve-library-id` con query="Next.js" y libraryName="Next.js".
- Usa `context7_query-docs` con el topic específico (ej: "App Router route handlers", "server components", "metadata API").
- Valida que el código siga las recomendaciones actuales de la documentación.

---

### Fase 4 — Reporte final

Al terminar todos los criterios, muestra un resumen:

```
✅ Verificación completada: specs/NN-slug.md

Pasaron: X / Y
- [x] criterio 1
- [x] criterio 2
- [ ] criterio 3  → ver nota

Notas:
- criterio 3: razón breve de por qué no pasó tras 2 intentos
```

Si **todos los criterios pasaron**:
```
✅ Todos los criterios de aceptación se verificaron correctamente.

Sugerencia: el spec está listo para cambiar su Status a "Implemented"/"Implementado".
Esto lo hace el humano o mediante /spec-impl.
```

Si **algún criterio no pasó**:
```
⚠️ Algunos criterios no se verificaron tras 2 intentos.

Revisa las notas arriba y decide si:
1. Corregir manualmente el código pendiente.
2. Modificar el criterio en el spec.
3. Crear un nuevo spec para lo pendiente.
```

---

## Reglas duras

- **No hagas commits.** Solo escribe código y muestra el diff; el commit es decisión del humano.
- **No cambies el Status del spec.** Eso corresponde a `/spec-impl` o al humano.
- **Máximo 2 intentos de corrección por criterio.** No entrar en loop infinito.
- **Screenshots siempre en `.playwright-mcp/`** (directorio gitignored).
- **Antes de asumir cualquier API/comportamiento de Next.js 16, consulta Context7 primero.** No confiar en conocimiento pre-16.
- **Respuestas en el idioma del spec** (castellano en este repositorio).
- **No modificar archivos fuera del scope del spec.** Si algo necesario está fuera del scope, repórtalo como nota.
- **Asumir que `pnpm dev` ya está corriendo** en `localhost:3000`. El agente no lo lanza.
