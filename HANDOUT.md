# HANDOUT.md — cold-start briefing for the next Claude

Read this first, then `CLAUDE.md` (rules), `ARCHITECTURE.md` (technical reference, authoritative: §7 player, §8 layout,
§9 authoring rules), `VERIFICAR.md` (screens pending checks on real calculators). `CHANGELOG.md` is history only. When
code and docs disagree, fix the docs. §5 below is a version log (what changed and why); for how things work *now*, read
§1a and ARCHITECTURE.

## 0. How to work with David (read before anything else)

- Speak **Catalan** to him; documents for an AI in **English**. He is a maths teacher, ~4/10 on web/Git: every action
  he must do (upload a ZIP, check Cloudflare…) as numbered copy-paste steps.
- **Questions**: always with the multiple-choice dialog (AskUserQuestion), 2–4 options, recommended one first with
  «(Recomanat)»; never as free text he must type.
- **Propose before implementing** new fitxes (title, goal, key sequence, sentences) and wait for his OK. Small UI
  requests: just do them, then report.
- **UI rule (always)**: every clickable control reacts on hover with a thick pure-black border and a light-grey
  background, without layout shift (1–1.5 px `box-shadow` over the border).
- He is time- and token-sensitive: no long test loops when a targeted run suffices; deliver promptly; say what you
  did not test.
- Every delivery: bump the version, run the tests, update CHANGELOG/HANDOUT (+README/ARCHITECTURE if behaviour
  changed), commit locally, send the ZIP with the upload steps and the commit message (§8).

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

## 1a. The site as it is now (v93), in one screen

- **Home** (`index.html`, `portada.js`): header (title «La calculadora <model>, pas a pas» — «La teva calculadora…»
  until one is chosen —, «Escollir/Canviar de calculadora», Etapa, Calculadora en). A row of three one-line bubbles
  (small blocks `simbols`, `examen`, `eso-inici`), then cards T1…T6 as narrow as the longest block title; a black rule
  separates topics (`grup`) inside the PAU cards. A card with more than 8 fitxes (T6 now) scrolls inside, no taller than the tallest other card. From the 10th visit a button can send the bubbles below the cards.
- **Fitxa** (`fitxa.html`, `motor.js` + `reproductor.js`): header «← Fitxes» · «T<n> · bloc  <n>. fitxa» · ⚙ (calculator,
  language, cursor colour). Left column: statement (always whole; the student folds it with the button on its left or
  by clicking it; capped at 34vh on desktop), ◀ ↻ ▶ + speed, step list ending with «Prova-ho tu»/«Ara tu». Right: the
  drawn calculator. Step 0 shows only the statement: steps hidden, calculator at 30 % opacity, no LCD cursor.
- **A step**: attention cue (0.3 s, yellow border 0.6 s), step keys outlined and others dimmed to 40 %, 0.8 s still,
  then the cursor presses the keys (speed factor 1.90 normal); when it ends, two arrows under the step invite going on
  (in yellow circles for a few seconds on the first five visits).
- **Tools for David**: the «Editor d'enunciats» artifact (§6b) to edit texts; the old «Laboratori d'UX» artifact (§6).

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

`models.js` (VERSIO, contract, loader, `adreca`), `preferencies.js` (localStorage: model, etapa, idioma, cursor colour,
visits — one per browser session —, bubbles up/down), `tria.js`
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

## 5. Work done in recent conversations (versions 56 → 93)

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
  cursor moves (`ATENCIO = {repos: 300, vora: 1200, apaga: 250, fixacio: 800}`); «← Fitxes» has a much thicker bottom
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
- **v80**: invitation arrows strong (opacity 1, scale 1.4) for 4 s, then 55 %; home list hover = soft tint of the block
  colour + thick black border (`box-shadow` 1.5 px, no layout shift); `proves/editor/` tooling (§6b).
- **v81**: arrows first inside yellow circles for 4/3.5/2.5/1.5/0.5 s on visits 1–5, none from the 6th
  (`posaConvitFort` in motor.js); visits = one per browser session (`Preferencies.visita()`, replaces `sumaVisita`).
- **v82**: first batch from the statement editor applied (41 fitxes, 61 fields) with a script that matches each original
  string literal inside the fitxa's object and rewrites it; `combinatoria` re-done for p = 1/3 (result 20/243) on every
  model. Title typo/`$` fixed and a missing `[/mat]` added, with David's OK.
- **v83**: step 0 = statement only: other steps hidden, calculator at 30 % opacity (`body.pagina-fitxa:not(.en-marxa)`).
- **v84**: statement fold animated as a 0.9 s curtain (`--alt-enunciat` measured in motor.js, `@property --plec-fos`).
- **v85**: player buttons hover = thicker border + light grey; ▶ in the step-0 sentence inside a circle (`.boto-inline`).
- **v86**: statement never auto-folds (highlighted parts must stay visible); the student folds/unfolds it by clicking;
  on desktop it is capped at 34vh with internal scroll (reproductor.js scrolls the active `[a]` part into view);
  `pau-geo-25s-q4b-c` last step split in two (CW/X II).
- **v87**: fold button left of the statement, in the page margin: the column widens 46 px to the left (`margin-left:-46px;
  padding-left:46px`) so the statement keeps its width (David: never narrow the statement); `.enunciat-caixa`,
  `.plega-enunciat`, compress/expand icons; ≥ 1000 px only.
- **v88**: column widened 52 px (6 px spare for the hover outline); no blinking LCD text cursor at step 0 (model
  stylesheets: `body.pagina-fitxa:not(.en-marxa) .lcd-cursor/.cursor-tex/.ms-cursor`).
- **v89**: one-line statements cannot fold (`.enunciat-curt`: button `visibility:hidden`, click ignored); lines counted
  from the text's client rects (`linies()` in motor.js), re-checked by a ResizeObserver (deferred to rAF).
- **v90**: from the proposals artifact «calc · Propostes d'activitats per a 2n de Batxillerat»
  (https://claude.ai/artifact/DEQecumDg77JTy8Km4hzXe, slug `630ce82a-a990-45fb-ae73-5fa6469dd2e5`; db `respostes/<id>`
  = David's decision/comment, `claude/<id>` = Claude's reply): four new T6 fitxes (grup Anàlisi) `pau-ana-23s-q4`,
  `pau-ana-26j-q4a`, `pau-pro-26j2-q3`, `pau-ana-26s-q1` on every model (not 26s-q1 on the MS); rule f = function,
  g = derivative; T6 internal scroll (`limitaLlistes`); CW simulator: ALPHA inside `definicio`; fx-82SP X II: MENU from
  the table. David's decisions there: no new blocks (techniques go to T4), no «Ara tu» on new fitxes, no fx-570 extras
  block, no time-budget rules.
- **v91**: T4 fitxes `producte-escalar-vectorial` (all models) and `taula-bolzano` (fx-82SP CW only: file
  `models/fx-82sp-cw/fitxes/taula.js`, listed only in the CW `model.js`, not in the fx-570 CW one). CW simulator: the
  Tabla app (`estat.app = 'taula'`, `estat.taula.rang`): HOME grid navigation (3 columns), OK on Tabla → `G.taula()`
  (empty), FUNCTION → Definir f(x) → EXE back to the table, TOOLS → `taula-tools` → «Rango tabla» (`G.rangTaula`, rows
  Inic./Final/Paso/Ejecutar; EXE stores and moves down; EXE on Ejecutar → the table, given by the fitxa), arrows move
  the cell. Screen types `taula` and `rang-taula` in the CW `pantalla.js`; `calcul.js` checks every f/g cell (an
  undefined function's column is ''). Screens deduced from the manual's text (images could not be fetched):
  VERIFICAR.md rows 32–35.
- **v92** (in parallel with v90–91, which only touched Batxillerat): 17 new ESO fitxes chosen by David in the review artifact «calc · Propostes d'activitats per a 3r i 4t d'ESO»
  (https://claude.ai/artifact/3JPSwrp28ufYddg3VZKfNm, slug `129fc14c-aa28-4671-983d-7d1fcf094c96`; db `respostes/<id>`
  = David's {decisio, comentari}, `claude/<id>` = {text}, Claude's replies). Theme: the calculator computes correctly a
  wrongly posed problem. New block `eso-proporcionalitat` «Proporcionalitat» (groups: directa / inversa / «Quan no és
  proporcional»; `cb4-23-q26` moved there); `eso-percentatges` renamed «Percentatges» (+ IVA, chained discounts,
  +50 % −50 %); geometry (`ll4a-4-34` ladder, `ll4a-4-8` tower shadow), mitjanes (`ll4a-8-56` weighted mean), pantalla
  (`ll4-1-exemple2` √50 = 5√2); error zone + `tancament` added to `eso-notacio-cientifica`. New authoring rules
  (ARCHITECTURE §9 «Calculator with judgement»). Rejected by David: «Prova-ho tu» with a trap, a «check backwards»
  final step, more error zones than needed.
- **v93**: home grid always 3 columns from 1000 px (`repeat(3, minmax(0,1fr))`, titles may wrap); bubbles sent
  below fill the empty cells of the last card row (`.bombolles.al-forat`, `colocaABaix` in portada.js), else go below.
- **v94**: no order badges on keys, ever (`marcaTeclat`; they used to appear only on 2–6-key steps, which looked random).
- **v95**: uniform cursor speed: `TEMPS.cursor` = 700 ms per calculator width travelled (`cursor.distancia`); no
  faster digits (`RAPIDESA_XIFRES` removed). Comparison v89 → v94 done for David: no other player change.
- **v96**: progress marks (`calc-progres` = {id: 'vista'|'feta'}, Preferencies.progres/estatFitxa/marcaVista/marcaFeta/
  esborraMarca/esborraProgres; per fitxa id, not per model): vista on opening, feta once every step has been the current
  finished step (reproductor `opcions.enPas`, `creaProgres` in motor.js); header chip `.on-som-marca`, ⚙ section `.progres`;
  home `.marca-progres` (portada.js `posaMarques`, also on pageshow). Home card width from the Batxillerat titles in both
  stages (same margins, David); `.bloc h2` wraps.
- **v97**: browser tab title always «Simulador de calculadores» (`TITOL_WEB` in motor.js, portada.js, both HTML
  `<title>`); never the model or the fitxa (David).
- **v98**: attention border = `--marca-vora` (step-key orange), inset 3.2cqw, 1.2 s (`ATENCIO.vora` 1200).
- **v99**: ⚙ progress buttons: «Treu la marca 'vista'|'feta' d'aquesta activitat» and «Treu les marques 'vista' i 'feta'
  de totes les activitats»; no heading/state lines.
- **v100**: the fitxa ⚙ (`details.ux-ajustos`) also closes with Esc and with a pointerdown outside it (not inside a
  `<dialog>`).
- **v101**: «↓ Envia-les a baix» always shown (`VISITES_PER_MOURE` = 1; it used to need 10 visits per browser).
- **v102**: ⚙ switch «Mostrar errors típics» (`calc-errors`, default off = `senseErrorsFinals` in motor.js drops the trailing
  error steps and so the tancament). Leading-error fitxes (`frac-prioritat`, `error-angles`, `eso-posa-graus`) keep
  their leading error steps (later steps continue from that screen).
- **v103**: wording rules (ARCHITECTURE §9 «Wording rules (v103)») applied to T3 (10 fitxes, all models); next batches: rest of ESO, then Batxillerat, each shown in the Editor first.
  `ERRORS=1` option in encaix.js.
- **v104**: progress marks without words: ✓ = vista, ✓✓ on light green = feta (home and fitxa header).
- **v105**: T3 second pass from David's `cb4-22-q26` (ARCHITECTURE §9, new bullets: present-tense questions with a subject,
  no «en», exact result in two lines with «sortiria» + ≃ decimal).
- **v106**: inverse proportion by constant product with $x$ (`ll4a-3-13`, `recu-f6-102`), from David's rewrite.
- **v107**: `**bold**` in text.js (and in the editor, icon B; also icon €); money «$3{,}50$ €»; taxi statement by David.
- **v108**: David's edits of `cb4-25-q8`, `cb4-26-q8`, `ll4a-3-14` (estimation step removed, keys 3.5+10×1.2), `recu-f6-102`, `cb4-23-q26`; new §9 bullet.
- **v109**: T3 finished (David's `cb4-26-q25` with empty bag, keys `(2410-30)÷Ans`; `ll4a-3-26`); T4 rewritten with the T3 rules (generator `/home/claude/eines/t4.py`, like `t3.py`); review pending in the Editor.
- **Editor de textos** (artifact, not served): https://claude.ai/artifact/GMvQzEgtdG3NSTdgX8QcrX (slug
  `7c64df61-5de7-42fb-a13f-f197f125daac`, owner David). One self-contained page built by
  `node proves/editor-textos/construeix.js <out.html>` (= `plantilla.html` + `extreu.js` data: every text of every fitxa of
  every model, key HTML, menu texts); imitates the home and the fitxa left column; right = one textarea per text.
  KaTeX from cdnjs with `output:'mathml'` (no CSS needed); fonts from Google Fonts. Capability `db`, rules
  `[{path:"", read:"view", write:"owner"}]`. Docs `canvis/<fitxa id>` = {id, titol, model, camps: {clau: new text},
  originals: {clau: original}, comentari, actualitzat}; keys `titol`, `enunciat`, `tancament`, `provaTu.enunciat`,
  `provaTu.solucio`, `araTu.enunciat`, `pas.<n>@<model>` (steps belong to one model: apply the same change to the
  equivalent step of the other models). Workflow: David says «Aplica els canvis de l'editor de textos» → `db_list canvis`,
  apply (common fields → `exercicis/`, unless a model overrides them; steps → `models/<id>/fitxes/`), run the tests,
  deliver, then rebuild + republish the editor (publish_files, same slug) and mark the applied docs with `{aplicat: true}` (db_write update; the editor ignores them; never delete David's docs). The older
  «Editor d'enunciats» (§6b) is superseded by this one. Bug fixed on 4/11 (David lost most edits of `cb2-26-q5`): the
  snapshot listener replaced `docs[id]` with a fresh object while the page kept editing the old one, and `desa` wrote the
  fresh one; now `desa(id, doc)` writes the page's doc and the open fitxa (`obert`, once `tocat`) is never overwritten by
  snapshots. Test any change by editing many fields in a row with a mock db that echoes every write back.
  Toolbar (4/11): →, •, ⇒, ⇔ copy to the clipboard (fallback: typed into the last field); $$ wraps the selection of the
  last focused field in $…$; ≃ writes \\simeq (wrapped in $…$ if the cursor is outside a formula). The Prova-ho tu preview
  puts a line break after «Solució:».
- David's standing UI rule: every clickable control reacts on hover with a thick pure-black border and a light-grey
  background (prefer a 1–1.5 px `box-shadow` on top of the border, so nothing moves).
- David's standing preference: ask him questions with the AskUserQuestion multiple-choice dialog, never as free text.

## 6. UX Laboratory (v66–v67; the levers are still in the code)

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
  horizontal rule between consecutive [mat]/[calc]. A2 has since changed meaning (v86): the statement no longer folds
  by itself; it is the student's fold/unfold control. Remaining levers stay available via `?ux=`. Long-term clean-up
  (optional, ask first): fold the defaults into plain CSS/JS and delete unused levers.
- **Artifact «Laboratori d'UX»**: https://claude.ai/artifact/NLD3b9HMfuDK99sYKefBjD (owned by David). Multi-file:
  main page = `scratchpad/lab/laboratori.html` (built from `laboratori.src.html` + `index.json` injected at
  `/*INDEX*/null`, generated by `scratchpad/lab/index.js <repo>`); the site is published under `web/<path>` from the
  repo. Republish changed site files with `files: {"web/<p>": "<p>"}`. **The `scratchpad/lab/` sources are not in the
  repository** (they lived in an earlier session's scratchpad): to change the lab, read the published artifact first.
  Capability `db`:
  - `bitacola/<lever>` = `{vot: 'si'|'dubte'|'no', comentari, context:{model,fitxa,pas,palanques}, actualitzat}`;
    `bitacola/general` = `{comentari}` (general notes);
  - `combinacions/<auto>` = `{nom, palanques, model, fitxa, creat}`.
  Workflow: David answers in the artifact and says «Revisa artifact» → read with `ArtifactData list`.
- Older artifacts: «Calculadores noves» https://claude.ai/artifact/XeQzzHmcv2H4w1RUe5p4XJ, «Revisió de calc-main»
  https://claude.ai/artifact/FWxCJbjpR6jjS2SmD6SbTz.

## 6b. «Editor d'enunciats» artifact (for David)

- https://claude.ai/artifact/VzPYJxLHm7KbkkhjGGiJWf (slug `eac32b03-d4f9-46df-b39b-e8151b0aaa54`, owner David). David
  edits titles, statements, `tancament`, «Prova-ho tu» and per-model text overrides with a live KaTeX preview.
- Built from `proves/editor/plantilla.html` + `node proves/editor/extreu.js . > dades.json` injected at `/*DADES*/`, plus
  `vendor/katex` and `vendor/lletres` copied as `katex/…` and `lletres/…`; published with publish_files; capability
  `db` with rules `[{path:"", read:"view", write:"owner"}]`.
- Edits live in `canvis/<exercise id>` = `{id, camps: {key: new text}, actualitzat, versio}`; keys: `titol`,
  `enunciat`, `tancament`, `provaTu.enunciat`, `provaTu.solucio`, `variants.<model>[+<model>].<camp>` (a per-model
  override; the model list says which `models/<id>/fitxes/` file holds it; `fx-570sp-cw` shares the CW files). Values are
  runtime strings: re-escape for single-quoted JS (`\\`, `\'`, real newline → `\n`).
- Workflow: David says «Aplica els canvis de l'editor d'enunciats» → `db_list canvis`, apply to `exercicis/*.js` /
  model files, run the tests, deliver, then rebuild + republish the editor (new `versio`) and delete the applied docs.
  Fallback: the page's «Copia tots els canvis» JSON, pasted in chat.

## 7. Tests (report results every delivery)

- `KATEX=<katex 0.16.9 dist> node proves/comprova.js` → «Tot correcte» (~168 k checks, 356 fitxes, 1986 steps). KaTeX:
  `npm install katex@0.16.9` in any folder outside the repo.
- `node proves/encaix.js` → «Tot hi cap» (~28 min; ~2 300 steps per viewport × 3 viewports 1366×657, 1280×559, 1280×632
  touch; plus footers and no scroll during animation). `MODEL=`, `FITXES=a,b`, `VP='[[1280,559]]'`, `UNCOP=1` restrict;
  one viewport takes ~8 min (1280×559 is the tightest). Changes to the statement or step list → run it on all fitxes
  at least at 1280×559.
- `node proves/ux.js` → «Palanques correctes» (~1 min, 28 runs, 4 in parallel).
- Never `pgrep -f "proves/encaix.js"` in watcher scripts (matches itself). Do not edit served files while encaix runs
  (it serves the live working tree); work in a copy if needed.

## 8. Versioning & delivery protocol

- Any served `.js`/`.css` change → bump `VERSIO` (`js/nucli/models.js`), every `?v=` in `index.html`/`fitxa.html`, and
  the «Versió N» footer of `index.html` (test enforces). Current: **109**.
- Delivery = a ZIP with the files changed since the version David already has, repo-root paths, excluding `_uploads/`:
  commit the version locally, then `git diff --name-only --diff-filter=AMR HEAD~1 HEAD | zip -@ calc-versio-NN.zip`
  (use `HEAD~2` etc. if several local commits make up one delivery). The repo usually arrives as a ZIP without `.git`:
  `git init`, commit it as the base, work on top. Deleted files cannot travel in a ZIP: give David the steps to delete
  them on GitHub.
- After he uploads, Cloudflare Pages publishes in 1–2 min. If the footer still shows the old version (v87 once stayed
  unpublished), the repo is fine: send him to dash.cloudflare.com → Workers & Pages → the project → Deployments, and
  «Retry deployment» on a failed/missing one. To check what is live: WebFetch `https://calc.step-quiz.net/js/nucli/models.js`
  and read `VERSIO` (cached 15 min).
- Cloudflare Web Analytics is not enabled on the Pages project, but a zone-level setting may inject
  `static.cloudflareinsights.com/beacon.min.js`; `vigia.js` ignores its failures (Brave blocks it).
- David uploads it to `_uploads/` on GitHub; workflow `unzip-upload.yml` unzips at root and commits. Give him numbered
  copy-paste steps and the commit message. **Never** put «[skip ci]», «[ci skip]» or «[cf-pages-skip]» in any commit
  message (Cloudflare would skip the deploy).
- Commit locally after each version with the attribution lines from the session reminder.
- Do not remind David to delete `mostra.js`, `HANDOFF-ESO.md` or `BLOCS-PENDENTS.md` (he did; he asked not to be told again).

## 9. Open items

- **CW Tabla**: done in v91 from the manual's text; VERIFICAR.md rows 32–35 wait for David's check on the real
  calculator (the HOME layout, the TOOLS order, the range screen, the empty g(x) column).

- **VERIFICAR.md**: rows for X II (15), fx-82/85SP X II (11), MS (1–16) and MS aliases pending checks on real
  calculators (David doesn't have them at hand); CW rows 30–31 (SCI 3 result, Verificar with ½ = 0.5) are new.
- **Editor d'enunciats**: empty after the v82 batch; when David edits again, apply with the §6b workflow.
- **Galaxy Tab S10 Lite blank page**: waiting for David's `js/vigia.js` screenshot.
- No more ESO fitxes for now; no projector mode.
- Optional: fx-85SP CW alias; clean-up of lever code after the choice settles.
- David is token-sensitive: be efficient, avoid long test loops, deliver promptly.
