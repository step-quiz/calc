# CLAUDE.md — calculadora fx-82SP CW

<!-- regles-comunes:inici -->
## Regles comunes de Step Quiz

*Aquest bloc és igual a tots els repositoris de `step-quiz`. Les regles específiques d'aquest
repositori, si n'hi ha més avall, manen sobre aquestes quan diuen una altra cosa.*

- **Llengua.** Parla amb l'usuari en català. Tot el que veu l'alumnat, també en català.
- **L'usuari.** David, llicenciat en Matemàtiques i professor d'ESO i Batxillerat a Catalunya.
  Programa en C i dissenya algorismes; d'HTML, CSS, JS, Git, GitHub, Codespaces i LaTeX en sap
  el que cal per fer-los servir, no més. Quan hagi de fer alguna cosa (pull, push, commit, pujar
  un ZIP, compilar…), dona-li els passos numerats, amb les ordres o els textos per copiar i
  enganxar, i explica què fa cada pas.
- **ZIP.** Els ZIP que lliuris, l'usuari els puja a `_uploads/` (GitHub → `_uploads/` →
  *Add file* → *Upload files*), i el workflow `unzip-upload.yml` els descomprimeix a l'arrel i en
  fa commit. Per tant, les rutes de dins del ZIP comencen a l'arrel del repositori (`js/app.js`,
  no `projecte/js/app.js`): cap carpeta que ho contingui tot. El que hi hagi a `.github/` s'ignora;
  els workflows es canvien des del web de GitHub.
- **Publicació.** Els webs es publiquen amb Cloudflare Pages a cada commit de `main`. Cap missatge
  de commit pot portar `[skip ci]`, `[ci skip]` ni `[cf-pages-skip]`, tampoc els dels workflows
  que desen fitxers generats: Cloudflare no publicaria aquell commit.
- **Webs estàtiques.** HTML, CSS i JavaScript sense compilació ni servidor, si aquest repositori
  no diu el contrari. Cap dada personal de l'alumnat en un repositori públic.
- **Documentació.** Si canvies el comportament, posa al dia el README i els documents que el
  descriuen en el mateix commit. Si el codi i un document no coincideixen, el que s'ha
  d'arreglar és el document.
- **Proves.** Abans de lliurar res, passa les proves del repositori i digues-ne el resultat.
<!-- regles-comunes:fi -->

## This repository

Static site with step-by-step worked examples («fitxes») for CASIO calculators — the **fx-82SP CW** (default), the
**fx-570/991SP CW** (a sibling model that reuses the CW files), the **fx-570/991SP X II** (own keyboard, CW screen and
simulator through `variant.js` hooks; f(x) fitxes with CALC), the **fx-82/85/350SP X II** (the X II body without CALC;
f(x) fitxes with Table) and the **fx-82MS 2nd edition** — for ESO (3r–4t) and Batxillerat students. A fitxa = a shared exercise (`exercicis/`) + the keys and screens of one
calculator (`models/<id>/fitxes/`). The core (`js/nucli/`) never names a key or a menu.

**Read first:** `HANDOUT.md` (cold-start briefing), then `ARCHITECTURE.md` (the technical reference: structure, data format, authoring rules in §9, tests, open
items). `VERIFICAR.md` when you touch a screen. `CHANGELOG.md` only for history.

- **Process:** propose before implementing (title, goal, key sequence, sentences), wait for David's OK, deliver block by
  block. When David leaves many open points, put them in a review artifact (see his preferences).
- **Content:** Catalan for students; CW menu labels in Spanish as in the manual (`{{…}}`); sources are ground truth;
  realistic, short key sequences; no detours through variables; every step sentence `[mat]` or `[calc]`.
- **Code comments:** say what the code does and why, for a cold-start reader. No version numbers, dates or names; the
  history goes to `CHANGELOG.md`.
- **Versioning:** any change to a served `.js`/`.css` bumps `VERSIO` (`js/nucli/models.js`), every `?v=` in
  `index.html`/`fitxa.html` and the static footer of `index.html`. The test checks it.
- **Tests before delivering:** `KATEX=<katex 0.16.9>/dist node proves/comprova.js` → «Tot correcte»; for new fitxes or
  layout changes, `node proves/encaix.js` → «Tot hi cap». Report both results.
- **Docs:** update `CHANGELOG.md` in every delivery, and `README.md` / `ARCHITECTURE.md` when behaviour changes.
