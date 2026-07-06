## Why

L'aplicació no informa l'usuari sobre l'ús de cookies/emmagatzematge local ni li demana consentiment. Encara que la persistència actual és un mock a `localStorage`, mostrar un avís de consentiment és una expectativa habitual d'una app web pública i deixa el projecte preparat per quan s'hi afegeixin cookies reals o analítica.

## What Changes

- Afegir la capacitat `cookie-consent`: un banner que es mostra la primera vegada que l'usuari visita el lloc, amb opcions d'**acceptar** o **rebutjar**.
- Persistir la decisió a `localStorage` (coherent amb la resta de l'app) i **no tornar a mostrar** el banner un cop presa.
- Muntar el banner de manera global (a totes les rutes) seguint la guia d'estils actual (paleta vermellosa) i reutilitzant els components de `ui/`.

## Capabilities

### New Capabilities
- `cookie-consent`: informació i registre del consentiment de cookies de l'usuari, amb persistència local de la decisió.

### Modified Capabilities

## Impact

- Nou component client `app/src/components/cookie-banner.tsx` i un petit ajudant de consentiment.
- Muntatge del banner al layout arrel (`app/src/app/layout.tsx`).
- Nova clau a `localStorage` (`cookie-consent`).
- Cap canvi a la capa de dades ni al backend.
