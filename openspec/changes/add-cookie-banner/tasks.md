## 1. Capa de consentiment

- [ ] 1.1 Crear un ajudant de consentiment (p. ex. `app/src/lib/cookie-consent.ts`) amb funcions per llegir i desar la decisió a `localStorage` sota la clau `cookie-consent` (valors `"accepted"` | `"rejected"`)
- [ ] 1.2 Gestionar el cas que `localStorage` no estigui disponible sense que peti (retornar decisió desconeguda)

## 2. Component del banner

- [ ] 2.1 Crear `app/src/components/cookie-banner.tsx` com a component client (`"use client"`)
- [ ] 2.2 Estat inicial "desconegut": no renderitzar res fins que un `useEffect` hagi llegit la decisió (evitar desajust d'hidratació)
- [ ] 2.3 Si no hi ha decisió, mostrar una barra fixa a la part inferior amb text informatiu i botons "Acceptar" / "Rebutjar" usant el component `Button` de `ui/`
- [ ] 2.4 En clicar, desar la decisió amb l'ajudant i amagar el banner
- [ ] 2.5 Aplicar la paleta vermellosa de la guia d'estils actual

## 3. Muntatge global

- [ ] 3.1 Muntar `<CookieBanner />` al layout arrel (`app/src/app/layout.tsx`) perquè aparegui a totes les rutes

## 4. Verificació

- [ ] 4.1 Comprovar al navegador: primera visita mostra el banner; acceptar/rebutjar l'amaga i no reapareix en recarregar
- [ ] 4.2 Executar `cd app && npm run lint` i deixar-lo en verd
