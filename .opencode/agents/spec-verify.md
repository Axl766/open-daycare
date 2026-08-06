---
description: Verifica y marca los criterios de aceptación de un spec. Corrige el código cuando un criterio falla. Usa Playwright MCP para pantallas y Context7 para validar convenciones de Next.js 16.
mode: all
model: opencode/qwen3.6-plus
temperature: 0
color: "#7DD3FC"
prompt: "{file:.opencode/agents/prompts/spec-verify.md}"
permission:
  read: allow
  glob: allow
  grep: allow
  list: allow
  edit: allow
  webfetch: allow
  bash:
    "*": deny
    "pnpm lint": allow
    "pnpm exec tsc --noEmit": allow
    "git diff*": allow
    "git log*": allow
    "git status*": allow
  task: allow
  skill: deny
  todowrite: deny
---
