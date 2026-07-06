# cookie-consent Specification

## Purpose
Informar l'usuari sobre l'ús de cookies/emmagatzematge local i registrar-ne el consentiment (acceptar o rebutjar), recordant la decisió entre visites.

## Requirements

### Requirement: Mostrar el banner en la primera visita
El sistema SHALL mostrar un banner de consentiment de cookies quan l'usuari encara no ha registrat cap decisió.

#### Scenario: Primera visita sense decisió desada
- **WHEN** l'usuari carrega qualsevol pàgina i no hi ha cap decisió de consentiment a `localStorage`
- **THEN** el sistema mostra el banner amb un text informatiu i els botons "Acceptar" i "Rebutjar"

### Requirement: Registrar i recordar la decisió
El sistema SHALL desar la decisió de l'usuari a `localStorage` i no tornar a mostrar el banner un cop presa.

#### Scenario: L'usuari accepta
- **WHEN** l'usuari clica "Acceptar"
- **THEN** el sistema desa la decisió `"accepted"` a `localStorage` i amaga el banner

#### Scenario: L'usuari rebutja
- **WHEN** l'usuari clica "Rebutjar"
- **THEN** el sistema desa la decisió `"rejected"` a `localStorage` i amaga el banner

#### Scenario: Visita posterior amb decisió desada
- **WHEN** l'usuari carrega una pàgina i ja hi ha una decisió (`"accepted"` o `"rejected"`) a `localStorage`
- **THEN** el sistema no mostra el banner

### Requirement: No provocar desajust d'hidratació
El sistema SHALL evitar renderitzar el banner durant el render del servidor, decidint la visibilitat només al client un cop llegit `localStorage`.

#### Scenario: Render inicial abans de conèixer la decisió
- **WHEN** el component es renderitza abans d'haver llegit `localStorage` (p. ex. al servidor o al primer paint)
- **THEN** el sistema no mostra cap banner fins que, ja al client, s'ha determinat si hi ha decisió desada
