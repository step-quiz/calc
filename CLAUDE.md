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

Static site with step-by-step demos ("fitxes") for CASIO calculators, for Batxillerat students and, since v36, ESO students (3r–4t; a stage axis, `ARCHITECTURE.md` §3b: `bloc.etapes`, `?etapa=eso`, the «Etapa» selector on the home page, Batxillerat by default): the **fx-82SP CW** (default) and, since v34, the **fx-82MS 2nd edition** (27 fitxes, the CW ones minus those that need f(x) or Verificar; plan in `ARCHITECTURE.md` §3a). The student picks the calculator («La teva calculadora»); `?model=` in the address. The site is a core (`js/nucli/`) plus one folder per calculator (`models/<id>/`); the core never names a key or a menu. Read `ARCHITECTURE.md` (technical reference) and `VERIFICAR.md` (screens inferred, not drawn in the manual) and `BLOCS-PENDENTS.md` (work order for empty blocks)

- Model scope: fx-82SP CW (Calcular, Estadística, Tabla, Math Box; no solver, matrices, derivatives, integrals or distributions) and, from phase 4, fx-82MS 2nd edition only. Content scope on both: only what is useful for PAU questions and basic ESO/Batxillerat work (David, 1/11/2026), with the same topics and the same fitxa ids on both calculators.
- Student-facing text in Catalan; fx-82SP CW menu labels in Spanish, exactly as in the manual (Catalan translation in `models/fx-82sp-cw/guions.js`); fx-82MS labels as on the device (COMP, Deg, Fix…; no languages). On the fx-82MS the negative sign is the (−) key (`neg`), never `menys`.
- Fitxes are data in `models/<id>/fitxes/<bloc>.js`; recurring screens live in `models/<id>/guions.js`; the calculator geometry lives in `models/<id>/tecles.js` (measured; CW keys are circles; never stretch it).
- Layout: two columns only (left = statement, player, step list with the current step expanded, collapsed list of other fitxes; right = calculator only; width split 15 % / 40 % / 30 % / 15 %). David rejected a 3-column layout, a «Per recordar» box and a title in the header as too noisy.
- PAU exercise fitxes: show the calculator the way a student would really use it in an exam, quickly and directly (e.g. check a solution by typing each left-hand side with the numbers and comparing with the right-hand side). No detours such as storing values in variables.
- Target devices: laptops (Chromebook / Lenovo, 1280×640 to 1920×1080 viewports, touch and mouse). Every step of every fitxa must fit the viewport without scrolling at 1366×657.
- Cache busting: every change to a served `.js`/`.css` file (not the Node-only files in `proves/`) must bump `VERSIO` in `js/nucli/models.js` AND every `?v=` in `index.html` and `fitxa.html` (the test enforces they match; the footer shows the version). `_headers` sets `Cache-Control: no-cache` on Cloudflare Pages. David once saw an old `motor.js` on his phone.
- Tests: `node proves/comprova.js` must end with «Tot correcte» (with `KATEX=<katex 0.16.9>/dist` to also check every formula); for layout changes or new fitxes, `node proves/encaix.js` (Playwright) must end with «Tot hi cap».
- Current project: the ESO stage, same site and same two calculators; read `HANDOFF-ESO.md` first (phase E1, the stage axis, done in v36). ESO fitxes: own blocks (`etapes: ['eso']`, files in `models/<id>/fitxes/eso/`), no «Ara tu», no Estadística app / SD mode; examples from the competència bàsica tests of `step-quiz/cb` (official key = ground truth).
