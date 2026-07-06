# Resum de la feina — Taller de Claude Code

**Autor:** Pedro Bonilla
**Branca:** `PedroBonillaActivitat1`
**Repositori:** https://github.com/lobandolerpi/claude_workshop_ensenyament

Aquest document resumeix el treball fet durant el taller sobre l'app de
**Reserva de Sessions de Treball** (Next.js + TypeScript + Tailwind + Postgres).

---

## Activitats

### 1 · Fonaments de Claude Code
- Exploració de comandes (`/model`, `/cost`, `/clear`, mode pla) i del sistema de permisos.
- Comprovació de com el fitxer `CLAUDE.md` canvia el comportament de Claude.
- Primera feature: **filtre per professor** a la llista de reserves del dashboard.

### 2 · Backend real
- Integració (via merge) de la migració de dades mock a **NextAuth + API routes + Postgres**.
- Afegit el professor **Pedro Bonilla** al seed de la BD (`bd/03_seed.sql`).

### 3 · MCP — connectar Claude amb el món
- **Chrome DevTools MCP:** diagnòstic i correcció d'un problema de rendiment a la
  landing (un SVG de 760 KB amb 9000 cercles). Substituït per CSS.
  **LCP 1148 ms → 471 ms** (−58 %).
- **Postgres MCP:** consulta de reserves reals i verificació de la regla de
  l'índex únic (cap professor amb dues reserves confirmades a la mateixa franja).
  Comprovat també el rol de mínims privilegis (escriptura rebutjada).

### 4 · Skills, Hooks i Agents
- **Hook `pre-push`** (`.githooks/pre-push`) que valida lint + tests + build abans de pujar.
- Ampliació dels **tests** del component `SiteHeader` (casos límit de `initialsOf`).
- Instal·lació de skills externes de [skills.sh](https://www.skills.sh/): `seo-audit` i `remotion-best-practices`.
- **Vídeo promocional** amb Remotion a `video/` (`npm run render` → `out/promo.mp4`).

### 5 · Landing
- Reescriptura de la home com a **landing completa** (hero, com funciona, professors,
  avantatges, CTA) amb la **guia d'estils actualitzada a una paleta vermellosa**.
- Fons decoratiu de cercles fet amb CSS (`radial-gradient`), sense imatges pesades.

### 6 · De la issue a la PR
- Creació d'un **fork propi** a GitHub i pujada de la branca de treball.

### SDD · OpenSpec (desenvolupament dirigit per especificació)
- Cicle complet sobre un **banner de consentiment de cookies**:
  proposta → disseny → tasques → spec → **implementació** → verificació → arxiu.
- Artefactes a `openspec/changes/archive/2026-07-06-add-cookie-banner/` i spec
  publicada a `openspec/specs/cookie-consent/`.

---

## Com executar

```bash
# App
cd app
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run test

# Vídeo promocional (Remotion)
cd video
npm install
npm run dev      # Remotion Studio
npm run render   # → out/promo.mp4
```

> **Nota:** el hook `pre-push` executa un `build`. No facis `npm run build`
> (ni push) amb `npm run dev` en marxa: comparteixen `.next` i es corrompen.
> Activa el hook amb `git config core.hooksPath .githooks`.
