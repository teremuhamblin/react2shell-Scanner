# Architecture Technique

## 1. Vue d'ensemble
Le projet est composé d’un **scanner HTTP** minimal et d’un **pack CI GitHub**.

## 2. Modules
- **scanner.js**  
  - Envoie une requête HTTP ciblée  
  - Analyse la réponse pour détecter un comportement anormal lié à React2Shell  
  - Log basique en console

- **GitHub Actions**
  - `ci.yml` — tests + build  
  - `security.yml` — analyse de dépendances  
  - `lint.yml` — vérification du code

## 3. Flux
```text
[scanner.js] → [endpoint cible] → [analyse] → [logs]
```
