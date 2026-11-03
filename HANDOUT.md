# HANDOUT.md — cold-start briefing for the next Claude

Read this first, then `CLAUDE.md` (rules), `ARCHITECTURE.md` (technical reference, authoritative), `VERIFICAR.md`
(screens pending checks on real calculators). `CHANGELOG.md` is history only. When code and docs disagree, fix the docs.

## 1. What the project is

- **Repo**: `calc-main` (GitHub, owner David Arso Civil). Static site, no build, no server. Published by **Cloudflare
  Pages** on every commit to `main`.
- **Purpose**: step-by-step worked examples («fitxes») teaching Catalan secondary students (ESO 3r–4t, Batxillerat) to
  use CASIO calculators and avoid typical errors. Every fitxa = a shared exercise (`exercicis/`) + the key sequence and
  screens of one calculator (`models/<id>/fitxes/`). An animated cursor presses keys on a drawn calculator; the LCD is
  rendered by a per-model simulator after every key.
- **Owner/user**: David — maths graduate, secondary maths teacher in Catalonia, C programmer, ~4/10 on HTML/CSS/JS/Git
  (always give numbered copy-paste steps).
  Speak **Catalan** to him. Documents addressed to an AI: **English, highly technical**.
- **Stack**: vanilla JS (IIFE modules exporting globals), CSS with container queries (`cqw`), KaTeX 0.16.9 (vendored),
  self-hosted fonts (Libre Baskerville, Source Code Pro). Tests in Node + Playwright.

## 2. Calculators in the catalogue (`models/cataleg.js`, order matters: first = default; it is also the order of the
   «Escollir calculadora» grid, chosen by David: row 1 the three CW/570 ones, row 2 fx-82/85SP X II and MS)

| id | short name (`curt`) | notes |
|---|---|---|
| `fx-82sp-cw` | fx-82SP CW | reference model; owns the shared CW pantalla/guions/simulador/calcul files |
| `fx-570sp-cw` | fx-570/991SP CW | sibling, reuses CW files, only overrides via `variant.js` |
| `fx-570sp-x2` | fx-570/991SP X II | own keyboard (`tecles.js`), CW screen/simulator through `M.variant` hooks; numbered menus; f(x) fitxes use **CALC** (key id `calcula`, not `calc` — clashes with the `[calc]` text tag) |
| `fx-82sp-x2` | fx-82/85SP X II | Class A from David's CALCULATOR_PRIORITISATION.md; X II body without CALC; f(x) fitxes use **Table** (MENU 3); Barrow typed directly; Verificar = MENU 4 |
| `fx-82ms` | fx-82/85/350MS | 2nd edition; aliases fx-85MS and fx-350MS; improper fractions via SHIFT a b/c (d/c) — **no mixed numbers** anywhere (European convention) |

Offered but not done: fx-85SP CW as a free alias of fx-82SP CW. Class C (ES PLUS) judged high effort/low use; legacy
models excluded.

`M.variant` hooks (see ARCHITECTURE §4a): `escriu`, `escriuShift`, `escriuAlpha`, `plantillesShift`, `obreMenu`,
`enTriar`, `tecla(id, {shift, alpha}, estat, eines)`, `menusNumerats`, `pantalles({escapa, tr, marca, texLcd})`, `menus`,
`catala`. `eines` = `{editorBuit, insereix, pantallaCalc, tex, escriuDelMenu, canviaUnitat, canvia(estat, ind, {hist})}`.
Extra screen types from variants: `x2-apps`, `x2-rang`, `x2-taula`.

## 3. Core (`js/nucli/`) — never names a key or a menu

`models.js` (VERSIO, contract, loader, `adreca`), `preferencies.js` (localStorage: model, etapa, idioma), `tria.js`
(«Escollir/Canviar de calculadora» dialog with photo grid; hover photo on the home title), `text.js` (`$TeX$`, `[[key]]`,
`{{menu}}`, `!!error!!`, `[a]…[/a]`, `[mat]/[calc]/[nota]`), `dom.js`, `reproductor.js` (player), `motor.js` (fitxa page),
`portada.js` (home), `ux.js` (UX levers, §6).

## 4. Authoring rules you must keep (details in ARCHITECTURE §9)

- Propose before implementing (title, goal, key sequence, sentences); wait for David's OK.
- Every step sentence is `[mat]` or `[calc]`. CW menu labels in Spanish as in the manual, translated by the model.
- Exact-result rule: first exact result mentions E Mat/S Mat mode.
- Prefer **S⇔D** over SHIFT = for fraction↔decimal (kept ≈ only for periodic decimals, FIX fitxa, ≈-shortcut step).
- Realistic short key sequences; no detours through variables; sources are ground truth.
- Error-zone steps (`error: true`); if a fitxa ends in error, a closing step (`tancament`) is appended.
- Barrow «Ara tu» is **disabled** (commented block «Ara tu» DESACTIVAT in each model's `pau.js`).

## 5. Work done in recent conversations (versions 56 → 79)

- **v56–57**: fx-570/991SP X II complete (drawing from 626×1333 photo, numbered menus, CALC, Verificar app). Speed «lenta»
  slowed twice (3.01); in v74 «normal» and «lenta» were made 15 % slower (1.65 → 1.90, 3.01 → 3.46).
- **v58–59**: «Escollir calculadora» dialog with images (`proves/imatges.js` regenerates `models/<id>/imatge.png`);
  fx-82MS d/c fractions; S⇔D in X II.
- **v60**: two small home bubbles («Abans de començar», «Abans de l'examen») side by side, in ESO and Batx.
- **v61**: header redesign; hover photo; wider home (max 1600px); block titles on one line.
- **v62**: new model fx-82/85SP X II (Table-based f(x) fitxes). **v63**: MS aliases.
- **v64**: button highlight 1.5 s when no calculator chosen («Escollir» vs «Canviar de calculadora»); near-white cards;
  Catalan manual labels for Class A; S⇔D in 11 more steps; statement figures (crops + SVGs `img/eso/ll4-7-3{7,8,9}.svg`);
  attention cue before each animated step (0.3 s idle + 0.6 s pure-yellow inset border fade, speed-independent,
  `ATENCIO` in reproductor.js); fitxa header «← Fitxes» + «T<n> · <bloc>» + «<n>. <fitxa>».
- **v65**: no vertical scrollbar during animation (`.escenari{overflow:clip}`, attention border drawn inset via `::after`).
- **v66**: David's direct requests: ◀ ↻ ▶ identical (no fill, no blink — `RECORDA` reminder removed); «Fitxes de…» and
  «Et pot interessar» removed (`relacionades` data now unused); fitxa footer full for 5 s then only «© 2026 David Arso
  Civil» (`PEU_SENCER_MS`); home footer full and sticky (`.peu-flotant`). UX levers infrastructure (§6).
- **v67**: David's lever choice made default (§6); big ⚙.
- **v68**: SVG statement figures enlarge correctly in the dialog; header «← Fitxes» is a raised button; «T<n> · bloc»
  and «<n>. fitxa» are plain centred text with no box (the white pills of v67 are gone).
- **v69**: after the yellow border, keys are outlined and the rest dim (0.25 s); then 0.8 s of stillness before the
  cursor moves (`ATENCIO = {repos: 300, vora: 600, apaga: 250, fixacio: 800}`); «← Fitxes» has a much thicker bottom
  edge (6 px, sinks fully when pressed); no «›» between the two header texts, only a two-space gap (`column-gap:.5em`).
  Docs synced (this file, ARCHITECTURE §7/§8, stale paths in VERIFICAR).
- **v70**: the step list ends with a numbered «Prova-ho tu»/«Ara tu» row (`.pas-final`, D2 only; ▶ from the last step
  or a click opens it); two thin down-arrows under a finished step invite going on (`.convida`, after 1.2 s; space
  reserved by `.te-seguent`); catalogue reordered (fx-570sp-x2 before fx-82sp-x2).
- **v71**: «Color del cursor» in the ⚙ (16 swatches, `COLORS_CURSOR` in motor.js, `calc-cursor` in localStorage, CSS vars
  `--cursor-fons`/`--cursor-vora`); ⚙ panel min-width 360 px so it overlaps the calculator; removed a dead duplicate of
  the cursor SVG from reproductor.js (the real one is `CURSOR_HTML` in motor.js). First visit (no stored model, no
  `?model=`): home title «La teva calculadora, pas a pas»; «Escollir calculadora» blinks 1.5 s, then stays pure yellow
  (`.sense-triar`) until a choice is made.
- **v72**: bug fix in `tria.js`: clicking the calculator already shown (the default, on a first visit) now stores it
  and reloads the page; before, it only closed the dialog and the site kept asking for a choice.
- **v73**: Brave showed the `vigia.js` alert because Brave Shields block Cloudflare Web Analytics' injected
  `beacon.min.js`; `vigia.js` now ignores cross-origin load failures and errors (the site itself requests nothing from
  other origins).
- **v74**: «normal» (default) and «lenta» 15 % slower: speed factors 1.90 and 3.46 (`VELOCITATS` in motor.js).
- **v75**: third small bubble `simbols` «Interpretem els símbols a la pantalla» (both stages) with the fitxa
  `indicadors`, moved out of Batxillerat T1 and expanded to every symbol (ARCHITECTURE §9 «Symbols fitxa»); new files
  `exercicis/simbols.js` and `models/<id>/fitxes/simbols.js`; CW `calcul.js` checks SCI 3; `alpha` is a valid mark in
  the CW model test. David chose: move the fitxa, one 10-step fitxa, only explain R/G (no «reset» advice).
- **v76**: home page: the row of small bubbles moved above the T1… cards (`contenidor.before` in portada.js).
- **v77**: from the 10th home visit, «↓ Envia-les a baix» moves the bubbles below the cards (`posaBombolles` in
  portada.js, `calc-visites`/`calc-bombolles`); then `.fletxes-baix` invite scrolling (left margin ≥ 1720 px, else
  bottom-left corner) and «↑ Torna-les a dalt» undoes it.
- **v78**: one-line bubbles with new block titles (order: simbols, examen, eso-inici); move button first in the row,
  raised; cards as narrow as the longest block title (`ajustaAmplada`, `--ample-bloc`); PAU titles «(2024). …»; `grup`
  field → separating rule in T5/T6 (Batx).
- **v79**: separating rule pure black, 30 % more space; «Arrels quadrades, cúbiques, ...»; `grau-puntual` replaced by
  `graus-radians` «Convertir de graus a radiants» (conversion factor, error zone with the factor upside down).
- David's standing preference: ask him questions with the AskUserQuestion multiple-choice dialog, never as free text.

## 6. UX Laboratory (the big item of this session)

- **Problem stated by David**: the fitxa page overloads students (too many panes, colours, texts, the moving cursor,
  error tint, «Ara tu»); risk of hypnotic fixation on the cursor instead of reading.
- **Mechanism**: `js/nucli/ux.js`. `?ux=a1,b3,…` adds `ux-<lever>` classes on `<html>`; core asks `UX.te(p)`.
  `Models.adreca` preserves `?ux=`. Inside an iframe with `?ux=`, the page `postMessage`s `{font:'calc-ux', href, tipus,
  pas, total}` to the parent.
- **Levers**: A1 only current step · A2 fold statement · A3 header selectors in ⚙ · A4 no footer · B1 dim non-step keys ·
  B2 no order badges · B3 no cursor · B4 zoom on keys (only when keys are close) · C1 reading-time wait with progress bar
  · C2 [calc] appears when keys start · C3 icons instead of tinted backgrounds · C4 sentence under the calculator · D1
  error without page tint · D2 «Ara tu» on its own screen via ▶ · E2 three columns (sentence right of calculator) · E3
  one column.
- **David's choice (v67)**: `UX.PER_DEFECTE = ['a2','a3','b1','c3','d2']`, always on; B1 at 40 % opacity; C3 with a
  horizontal rule between consecutive [mat]/[calc]. Remaining levers stay available via `?ux=`. Long-term clean-up
  (optional, ask first): fold the defaults into plain CSS/JS and delete unused levers.
- **Artifact «Laboratori d'UX»**: https://claude.ai/artifact/NLD3b9HMfuDK99sYKefBjD (owned by David). Multi-file:
  main page = `scratchpad/lab/laboratori.html` (built from `laboratori.src.html` + `index.json` injected at
  `/*INDEX*/null`, generated by `scratchpad/lab/index.js <repo>`); the site is published under `web/<path>` from the
  repo. Republish changed site files with `files: {"web/<p>": "<p>"}`. Capability `db`:
  - `bitacola/<lever>` = `{vot: 'si'|'dubte'|'no', comentari, context:{model,fitxa,pas,palanques}, actualitzat}`;
    `bitacola/general` = `{comentari}` (general notes);
  - `combinacions/<auto>` = `{nom, palanques, model, fitxa, creat}`.
  Workflow: David answers in the artifact and says «Revisa artifact» → read with `ArtifactData list`.
- Older artifacts: «Calculadores noves» https://claude.ai/artifact/XeQzzHmcv2H4w1RUe5p4XJ, «Revisió de calc-main»
  https://claude.ai/artifact/FWxCJbjpR6jjS2SmD6SbTz.

## 7. Tests (report results every delivery)

- `KATEX=<katex 0.16.9 dist> node proves/comprova.js` → «Tot correcte» (~123 k checks, 251 fitxes, 1355 steps).
- `node proves/encaix.js` → «Tot hi cap» (~25 min; 5880 steps × 3 viewports 1366×657, 1280×559, 1280×632 touch; plus
  footers and no scroll during animation). `MODEL=`, `FITXES=`, `VP=`, `UNCOP=1` restrict.
- `node proves/ux.js` → «Palanques correctes» (~1 min, 28 runs, 4 in parallel).
- Never `pgrep -f "proves/encaix.js"` in watcher scripts (matches itself). Do not edit served files while encaix runs
  (it serves the live working tree); work in a copy if needed.

## 8. Versioning & delivery protocol

- Any served `.js`/`.css` change → bump `VERSIO` (`js/nucli/models.js`), every `?v=` in `index.html`/`fitxa.html`, and
  the «Versió N» footer of `index.html` (test enforces). Current: **79**.
- Delivery = cumulative ZIP from the base commit, repo-root paths, excluding `_uploads/`. If David uploads the repo as a
  ZIP (no `.git`), `git init` it, commit it as the base and diff from that commit instead of `076cc6c`:
  `(git diff --name-only --diff-filter=AMR 076cc6c; git ls-files --others --exclude-standard) | sort -u | grep -v '^_uploads/' | zip -@ calc-versio-NN.zip`
- David uploads it to `_uploads/` on GitHub; workflow `unzip-upload.yml` unzips at root and commits. Give him numbered
  copy-paste steps and the commit message. **Never** put «[skip ci]», «[ci skip]» or «[cf-pages-skip]» in any commit
  message (Cloudflare would skip the deploy).
- Commit locally after each version with the attribution lines from the session reminder.
- Do not remind David to delete `mostra.js`, `HANDOFF-ESO.md` or `BLOCS-PENDENTS.md` (he did; he asked not to be told again).

## 9. Open items

- **VERIFICAR.md**: rows for X II (14), fx-82/85SP X II (11) and MS aliases pending checks on real calculators (David
  doesn't have them at hand).
- **Galaxy Tab S10 Lite blank page**: waiting for David's `js/vigia.js` screenshot.
- No more ESO fitxes for now; no projector mode.
- Optional: fx-85SP CW alias; clean-up of lever code after the choice settles.
- David is token-sensitive: be efficient, avoid long test loops, deliver promptly.
