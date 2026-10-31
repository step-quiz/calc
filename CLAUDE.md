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

Static site with step-by-step demos ("fitxes") for the **CASIO fx-82SP CW** calculator, for Batxillerat students. Read `ARCHITECTURE.md` (technical reference) and `VERIFICAR.md` (screens inferred, not drawn in the manual).

- Model scope: fx-82SP CW only (Calcular, Estadística, Tabla, Math Box). No solver, matrices, derivatives, integrals or distributions on this model.
- Student-facing text in Catalan; calculator menu labels in Spanish, exactly as in the manual.
- Fitxes are data in `js/fitxes.js`; recurring screens live in `js/guions.js`; the calculator geometry lives in `js/tecles.js` (measured, keys are circles; never stretch it).
- Layout: two columns only (left = statement, player, step list with the current step expanded, collapsed list of other fitxes; right = calculator only). David rejected a 3-column layout, a «Per recordar» box and a title in the header as too noisy.
- PAU exercise fitxes: show the calculator the way a student would really use it in an exam, quickly and directly (e.g. check a solution by typing each left-hand side with the numbers and comparing with the right-hand side). No detours such as storing values in variables.
- Target devices: laptops (Chromebook / Lenovo, 1280×640 to 1920×1080 viewports, touch and mouse). Every step of every fitxa must fit the viewport without scrolling at 1366×657.
- Cache busting: every change to a `.js`/`.css` file must bump `VERSIO` in `js/motor.js` AND every `?v=` in `index.html` and `fitxa.html` (the test enforces they match; the footer shows the version). `_headers` sets `Cache-Control: no-cache` on Cloudflare Pages. David once saw an old `motor.js` on his phone.
- Tests: `node proves/comprova.js` must end with «Tot correcte» (with `KATEX=<katex 0.16.9>/dist` to also check every formula).
