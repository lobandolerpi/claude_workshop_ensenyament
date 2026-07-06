## Context

La persistència de l'app és un mock a `localStorage` (no hi ha BD per a preferències d'usuari anònim). El consentiment de cookies encaixa de forma natural amb aquest patró: és una decisió del navegador, no de l'usuari autenticat. La guia d'estils actual usa una paleta vermellosa (variables `--primary`, `--accent`) i el component `Button` de `ui/`.

## Goals / Non-Goals

**Goals:**
- Mostrar el banner només fins que l'usuari prengui una decisió (acceptar o rebutjar).
- Recordar la decisió entre visites i sessions (persistència a `localStorage`).
- Ser coherent visualment amb la landing (paleta vermellosa) i accessible (rols i etiquetes).

**Non-Goals:**
- No implementar categories de cookies ni un gestor de preferències granular.
- No connectar el rebuig amb cap analítica o script real (encara no n'hi ha); el rebuig només registra la decisió.
- No afegir cap backend ni persistència a la BD.

## Decisions

### Decisió 1: Persistir a `localStorage` amb una clau dedicada

La decisió es desa a `localStorage` sota la clau `cookie-consent` amb valor `"accepted"` o `"rejected"`. És coherent amb la resta de l'app (que ja usa `localStorage` com a mock) i no requereix backend.

### Decisió 2: Muntar el banner al layout arrel, renderitzant només al client

El banner es munta a `app/src/app/layout.tsx` perquè aparegui a totes les rutes. Com que `localStorage` només existeix al client, el component no renderitza res fins que, després del muntatge, ha llegit la decisió desada. Això evita desajustos d'hidratació (SSR) i el "flash" del banner quan ja hi ha decisió.

### Decisió 3: Banner no bloquejant a la part inferior

En lloc d'un overlay modal que bloquegi l'app, el banner és una barra fixa a la part inferior. L'usuari pot seguir navegant; el consentiment és informatiu, no una porta d'accés.

## Risks / Trade-offs

- **Risc**: desajust d'hidratació si es llegeix `localStorage` durant el render del servidor → **Mitigació**: el component només decideix què mostrar dins d'un `useEffect` (client), amb estat inicial "desconegut" que no pinta res.
- **Trade-off**: en la primera càrrega hi ha un instant sense banner fins que el client llegeix `localStorage`. És acceptable per a un avís no bloquejant.
- **Trade-off**: rebutjar no té cap efecte funcional encara (no hi ha scripts a desactivar); es documenta la intenció perquè quan s'afegeixin cookies reals el punt de decisió ja existeixi.
