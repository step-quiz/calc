# ARCHITECTURE — CASIO calculator step-by-step site

Technical reference for a cold-start AI (or developer). It describes the site **as it is now**; the history is in
`CHANGELOG.md`. Read `CLAUDE.md` first (house rules), then this file, then the data you will touch.

**Document map**

| File | Audience | Content |
|---|---|---|
| `CLAUDE.md` | AI | House rules: language, delivery (ZIP), versioning, tests. |
| `ARCHITECTURE.md` | AI / developer | This file: structure, contracts, data format, authoring rules, invariants, open items. |
| `README.md` | David, teachers (Catalan) | What the site is, how to add a fitxa, tests, publishing. |
| `CHANGELOG.md` | everyone (Catalan) | What changed in each version. |
| `VERIFICAR.md` | David (Catalan) | Screens inferred from the manual that must be checked on the real calculator, and what has been confirmed. |
| `LLICENCIA.md`, `LICENSE` | everyone | Content CC BY-NC-ND 4.0, code MIT. |

## 1. Purpose and constraints

- Teaches Catalan ESO (3r–4t) and Batxillerat students to use CASIO calculators: the **fx-82SP CW** (default), the
  **fx-570SP CW / fx-991SP CW** (a sibling of the fx-82SP CW, §4a), the **fx-570SP X II / fx-991SP X II** (own
  keyboard, CW screen and simulator with variant hooks, §4a; the same exercises as the CW, the f(x) ones with CALC), the
  **fx-82SP X II / fx-85SP X II / fx-350SP X II** (and the SP X without «II»: same manual and keyboard; the X II body
  without CALC/∫; f(x) fitxes with Table)
  and the **fx-82MS 2nd
  edition**.
- A **fitxa** is a worked example played step by step: the statement, a player (◀ ↻ ▶), the steps, and a drawn calculator
  whose keys are pressed by an animated cursor while the screen changes after every key. The student only watches and
  navigates; the keys of the drawn calculator are not clickable (deliberate).
- Student-facing text: **Catalan**. fx-82SP CW menu labels: **Spanish, verbatim from the user manual** (the student can
  switch the drawn menus to Catalan). fx-82MS labels as on the device (COMP, Deg, Fix…; no languages).
- Scope per calculator: only what is useful for basic ESO/Batxillerat work and PAU / competència bàsica questions. The
  fx-82SP CW has the apps Calcular, Estadística, Tabla and Math Box; it has **no** equation solver, matrices, vectors,
  derivatives, integrals, Σ or distributions. The fx-570 models have them, but for now (David) they get exactly the
  same fitxes: never write a shared fitxa that needs a feature the fx-82SP CW lacks. A separate block for the fx-570
  extras may come later.
- Vanilla HTML/CSS/JS, no build, no npm at runtime, no external requests: KaTeX 0.16.9 and the two text fonts (SIL OFL)
  are in `vendor/`. Deployed by Cloudflare Pages from `main` (output directory `/`).
- Primary devices: laptops (Chromebook 1366×657 and 1280×559 viewports; Lenovo 1536×864, 1920×1080), touch and non-touch,
  and 10" tablets in landscape. In portrait, tablets get a «rotate» notice. Phones work in one column, no extra effort.

## 2. Mental model

```
fitxa (what the player plays) = exercici (shared)        +  model fitxa (per calculator)
                                exercicis/<bloc>.js          models/<id>/fitxes/<bloc>.js
                                id, bloc, titol, font,       id, inici, passos, araTu, relacionades
                                figura, enunciat,            + any shared field to override
                                tancament, provaTu
```

- `Models.tanca(id)` merges them: `Object.assign({}, exercici, modelFitxa)` — the model wins. A calculator shows only the
  exercises it has fitxes for (the fx-82MS lacks those that need f(x) or Verificar).
- Blocks are shared (`exercicis/blocs.js`); a model can change a block's title (`M.blocs = {exacte: {titol}}`).
- The engine never computes mathematics. Every step gives the screen **at the end** of the step; the model's simulator
  computes the intermediate screens key by key and checks that the typed keys produce the authored entry.
- The core (`js/nucli/`) knows no key and no menu of any calculator: it asks the model (contract, §5). Key *types*
  (`'num'`, `'shift'`…) are allowed in the core.

## 3. Files

| Path | Global | Responsibility |
|---|---|---|
| `index.html` | — | Home page shell; `js/nucli/portada.js` fills it. |
| `fitxa.html` | — | Fitxa page shell; `js/nucli/motor.js` builds it. `fitxa.html?id=<fitxa>[&model=<id>][&etapa=eso][&pas=N]`. |
| `css/estil.css` | — | Core styles: palette, layout, player, step list, home page, error zone, «Ara tu»/«Prova-ho tu», and how *any* calculator is placed and highlighted. Never a key class, key-type class or layer class (test). |
| `js/vigia.js` | `Vigia` | Loaded first, ES5 only. Shows a visible box (message, file, user agent) on a script/stylesheet load failure, a JS error, an unhandled rejection, or if the page has not called `Vigia.llesta()` after 10 s. Never a silent blank page. Only same-origin files and errors count: anything from another origin was injected by someone else (Cloudflare Web Analytics' `beacon.min.js`, a browser extension) and its failure (Brave Shields, ad blockers) is ignored, as is an opaque «Script error.». |
| `js/nucli/models.js` | `Models` | `VERSIO`; registry and loader of exercises, blocks and models; the contract check (`tanca`); stages; links (`adreca`); drawing helpers (`dibuix`). |
| `js/nucli/preferencies.js` | `Preferencies` | localStorage: `calc-model`, `calc-etapa`, `calc-idioma`, `calc-cursor`, `calc-visites` (visits to the site: one per browser session, `sessionStorage` `calc-en-visita`, home or fitxa; `Preferencies.visita()`), `calc-bombolles` (`'baix'` = bubbles sent down), `calc-errors` (`'si'` = show the trailing «Error típic» steps; default off → `senseErrorsFinals` in motor.js), `calc-progres` (JSON {fitxa id: `'vista'`|`'feta'`}: vista when the fitxa opens, feta when every step has been finished at least once — reproductor `opcions.enPas` → `creaProgres` in motor.js; shown on the home list/bubbles and the fitxa header; cleared per fitxa or all from the ⚙) (try/catch everywhere). |
| `js/nucli/tria.js` | `TriaCalculadora` | «Escollir calculadora»: `boto(descriptors, actual, adreca)` gives the header button; it opens a `<dialog>` with a 3-column grid (2 below 640 px, 1 below 380 px) of every calculator (the image, as tall as the cell allows, and the short name; the current one has a green border; hover/focus highlights). A click stores the choice and opens `adreca(id)`; clicking the calculator already shown also stores it (and reloads the page if nothing was stored yet, so the title and the button update). `titol(el, id)` fills the home-page title «La calculadora <name>, pas a pas» («La teva calculadora, pas a pas» while no calculator has been chosen in this browser and the URL has no `?model=`); hovering (or focusing) the name shows the calculator's picture. Until a choice is made, the button reads «Escollir calculadora», blinks 1.5 s and then stays pure yellow (`.sense-triar`); afterwards it reads «Canviar de calculadora». No `Dom` (the home page does not load it). |
| `js/nucli/text.js` | `Text` | Text mini-syntax → HTML (§6.3). |
| `js/nucli/dom.js` | `Dom` | `element()`, `icona()`, the player icons. |
| `js/nucli/reproductor.js` | `Reproductor` | The step player: step list (with the final «Prova-ho tu»/«Ara tu» row, `.pas-final`), key outlines and order badges, animated cursor, attention cue (`ATENCIO`), `salta` / `seguent` / `repeteix`, invitation arrows (`.te-seguent`, `.convida`), `body.en-marxa` (step 0 vs started), error-zone class, the active `[a]` statement part (scrolled into view), ARIA live announcement, `?pas=` in the URL, the UX-lab hooks (B4, C1, C2, D1, D2, sentence copy for C4/E2). |
| `js/nucli/ux.js` | `UX` | UX-lab levers from `?ux=` (classes on `<html>`, `UX.te`, `postMessage` to the lab). |
| `js/nucli/motor.js` | `Motor` | The fitxa page: header (← Fitxes, «T<n> · block title» and «<n>. fitxa title» as on the home page, ⚙ with «Escollir calculadora», language and cursor colour `COLORS_CURSOR`), statement (source bubble, figure dialog — SVG figures get an explicit width there, since the shrink-to-fit `<dialog>` would collapse them to 0 —, fold button and fold logic, one-line detection), player buttons, speed (`VELOCITATS`), «Ara tu» mode, «Prova-ho tu», closing step, keyboard shortcuts, keyboard-arrows notice, invitation strength by visit (`CONVIT_FORT_S`). Exposes the main player as global `fitxa`. |
| `js/nucli/portada.js` | `Portada` | Home page: stage selector, «Escollir calculadora», language selector, title with the chosen calculator, one card per block of the stage, small blocks as a row of bubbles above the cards. Cards are as narrow as the longest block title of the stage on one line (`ajustaAmplada` measures it and sets `--ample-bloc`; the page is at most 3 cards wide, centred); a thin rule (80 % wide) separates consecutive fitxes of different `grup`. A block with more than 8 fitxes (`FITXES_VISIBLES`) gets an internally scrolling list (`limitaLlistes`, `.llista.desplacable`): its card is no taller than the tallest other card of the stage (measured unstretched with `.blocs.mesurant`, at least 4 fitxes visible), re-measured on resize and after the fonts load; a bottom shadow (scroll-shadow backgrounds) shows there is more. |
| `models/cataleg.js` | — | `Models.cataleg([...])` (calculators; first = default), `Models.etapes([...])` (stages; first = default), `Models.exercicis([...])` (exercise files, in load order). |
| `exercicis/blocs.js` | — | `Models.defineixBlocs([...])` and the documented format of an exercise. |
| `exercicis/<bloc>.js`, `exercicis/eso/<bloc>.js` | — | `Models.afegeixExercicis({…}, …)`: data only. |
| `models/<id>/model.js` | — | Descriptor: `Models.descriu({id, nom, curt, imatge, idiomes, fitxers, estils, proves})`; `imatge` = the picture of the chooser (`imatge.png`, made by `proves/imatges.js`). |
| `models/<id>/tecles.js` | `M.tecles` | Key catalogue (`etiqueta`, `nom`, `tipus`, layers) and the **measured geometry** (`TECLAT`, all in % of the body width). Never stretch it. |
| `models/<id>/pantalla.js` | `M.pantalla` | Pure LCD renderer `html(state, idioma)`; optional `ajusta(element)` after painting (CW: ◀ ▶ overflow arrows). |
| `models/<id>/guions.js` | `M.guions` (`G`) | Builders of screens (`calc`, menus…), menu data, Catalan labels (CW), `textCalc`. |
| `models/<id>/simulador.js` | `M.simulador` | Pure: `pantalles(fitxa) → {pantalles, errors}`. CW: entry as a tree with templates (fraction, roots, log base, exponent, ×10), cursor, DEL, menus. MS: linear token editor (overwrite, INS, DEL, replay ◀). |
| `models/<id>/fitxes/blocs.js` | `M.comu` | Shared TeX snippets / indicator presets; the CW file documents the fitxa format; the MS file sets block-title overrides. |
| `models/<id>/fitxes/<bloc>.js` | `M.fitxes` | Data only: `M.fitxes.push({id, inici, passos, …})`. |
| `models/<id>/estil.css` | — | How that calculator looks (body, keys, legends, LCD inside). Loaded after the core sheet. |
| `models/<id>/calcul.js`, `proves.js` | — | Node only: result evaluator (recomputes every authored result) and model tests. |
| `proves/comprova.js` | — | Node test runner (§10). |
| `proves/encaix.js` | — | Playwright layout test (§10). |
| `proves/imatges.js` | — | Playwright: photographs each drawn calculator (a fitxa at step 0, highlights removed, transparent background) into `models/<id>/imatge.png`. Rerun when a drawing changes or a calculator is added. |
| `img/eso/` | — | Statement figures (copied from the competència bàsica repository; statement images only). |
| `vendor/` | — | KaTeX 0.16.9 and fonts. |
| `_headers` | — | Cloudflare Pages: `Cache-Control: no-cache` (the browser revalidates; `?v=` busts the cache). |
| `.github/workflows/unzip-upload.yml` | — | Unpacks ZIPs uploaded to `_uploads/` into the repo root and commits. |

## 4. Loading

1. The page loads, with static `<script>` tags carrying `?v=VERSIO`: `models.js`, `cataleg.js`, `preferencies.js` and
   (fitxa page) KaTeX, `text.js`, `dom.js`, `reproductor.js`, `motor.js`.
2. `Models.carrega(id = Models.idActual())`: loads `models/<id>/model.js`, then — appended in order with `async = false` —
   the exercise files (once per page), the model's `fitxers` and its `estils` (awaited), all with the same `?v=`.
3. `Models.tanca(id)` checks the contract, merges fitxes with exercises, applies block overrides, freezes everything.
4. `Models.descriptorsTots()` loads the other `model.js` files for the «Escollir calculadora» window.

`Models.idActual()` = `?model=` if in the catalogue, else the stored choice, else the first. `Models.etapaActual()` =
`?etapa=` if valid, else the stored stage, else the first. A fitxa page's stage is its block's (`Models.etapaDe`). Every
page stores the stage it shows; `?model=` is never stored from the URL. `Models.adreca({model, etapa, fitxa})` omits
default values, so old links keep working (`fitxa.html?id=ans`).

## 4a. Sibling calculators

A model whose keyboard and screen are those of another one reuses its files: model files never name their model
(`Models.obre()` with no argument returns the model being loaded: in the browser, the `data-model` attribute that
`Models.carrega` puts on each script; in Node tests, `Models.carregant(id)`). The sibling's descriptor lists its own
`variant.js` first and then the other model's files (`'../fx-82sp-cw/tecles.js'`, …, every `fitxes/` file), and both
stylesheets. `variant.js` sets `M.variant`, read by the shared files: `alt` (SHIFT legends by key id, in `tecles.js`),
`menus` (menu rows by menu id) and `catala` (extra Catalan labels), in `guions.js`. Current sibling: `fx-570sp-cw`
(fx-570SP CW and fx-991SP CW) of `fx-82sp-cw`.

A model with **its own keyboard** but the CW screen and entry editor does the same with fewer shared files:
`fx-570sp-x2` (fx-570SP X II and fx-991SP X II) loads `variant.js`, its own `tecles.js`, then the CW `pantalla.js`,
`guions.js`, `simulador.js` and `fitxes/blocs.js`, and its own `fitxes/`. Keys that do the same as on the CW keep the CW
id (`frac`, `arrel`, `x2`, `pot`, `logab`, `sen`, `lpar`, `ans`, `del`, `ac`, digits, operators); the `=` key is `exe`;
new ids: `neg` ((−)), `ln`, `alpha`, `menu`, `optn`, `calcula` (CALC; not `calc`, which would read as the `[calc]` tag
inside `[[…]]`), `integral`, `grau`, `inv`, `sto`, `eng`, `sd` (S⇔D), `mmes`. Its fitxes are the CW files with these
keys (`(−)` for a negative sign, SHIFT ×10ˣ for π, S⇔D instead of FORMAT) and own versions of the fitxes that use CW menus.
Its keys are rectangles: `TECLAT.tecles` entries are `[x, y, w, h]` (round keys: `[x, y, d]`; the CW geometry test
accepts both). Extra `M.variant` hooks, read by `simulador.js` and `pantalla.js`:

| Hook | Effect |
|---|---|
| `escriu` | extra keys that type TeX (merged into `ESCRIU`): `neg: '-'`, `ln: '\\ln('`, `inv: '^{-1}'` |
| `escriuShift` | replaces `ESCRIU_SHIFT` (SHIFT (−) = `\\log(`, SHIFT x² = `^{3}`, SHIFT ×10ˣ = π, SHIFT ÷ = nCr, Arcsen…) |
| `escriuAlpha` | enables the `alpha` prefix key (A on the bar) and what each key types after it (ALPHA Ans = `\\mathrm{PreAns}`, ALPHA ×10ˣ = `e`) |
| `plantillesShift` | replaces `TECLA_PLANTILLA_SHIFT` (`pot: 'arreln'`) |
| `obreMenu(id, shift, G, estat)` | a screen opened from the calc screen (SHIFT MENU → `x2-config`, OPTN → `x2-optn` or, in Verificar, the signs, MENU → `x2-apps`), or `undefined` |
| `enTriar(G, eines)` | extra menu actions, like `EN_TRIAR`: `{menuId: {clau: estat => screen}}`; `eines` = `{editorBuit, insereix, pantallaCalc, tex, escriuDelMenu, canviaUnitat, canvia(estat, ind, {hist})}` |
| `tecla(id, {shift, alpha}, estat, eines)` | called first for every key: a screen, `null` (unknown) or `undefined` (default path). The X II uses it for CALC and for the `x2-apps` screen |
| `menusNumerats` | menus are chosen by pressing the row number (no OK key); rows are labelled `1:…`, no inverse-video row |
| `pantalles({escapa, tr, marca, texLcd})` | extra screen types for `pantalla.js` (`{tipus: estat => HTML}`); they join `Pantalla.TIPUS` |

A menu screen may carry `desplacable: true` (more pages below: `pantalla.js` draws the scrollbar). `M.x2` (in
`variant.js`) builds the X II screens the fitxes need: `config()`, `menu(id)`, `signes()`, `apps(sel)`, `demana(ind, valor)`.

- **CALC** (`calcula`): the fitxa types the expression with `x` once; CALC shows `x=` with the current value as the
  result; the typed value makes the entry `x=-1`; `=` gives the expression and its value (the fitxa's screen). When the
  value and `=` are in the same step, give the `x=…` screen in `parcials` (`calcul.js` reads `x` from it). `calcul.js`
  also knows `PreAns` (the Ans before the last one), used for Barrow: `F(6)`, `F(1)` and `PreAns−Ans`.
- **`fx-82sp-x2`** (fx-82/85/350SP X II) is built the same way: a copy of the X II keyboard (same body; `resta` ⌙ and
  `simp` where the X II has CALC and ∫; all keys dark, DEL/AC yellow) and its own `variant.js`: CONFIG page 1 ends with
  «4:Result fracción» (manual), OPTN has «1:F. Hiperbólicas, 2:Unidad angular», MENU has 4 apps (1 Calcular, 2
  Estadística, 3 Tabla, 4 Verificar). No CALC: the f(x) fitxes use **Tabla** — MENU 3 → `definicio` f, `=` → g, `=` →
  `x2-rang` (Inic./Final/Paso; digits type into the selected row, `=` stores and moves down; the last `=` gives the table,
  from the fitxa) → `x2-taula` (`M.x2.taula(files, fila, col, ambG)`; ↑↓←→ move the selected cell, its full value is
  shown at the bottom, cells show 6 significant digits; AC goes back to f(x)). `calcul.js` recomputes every f/g cell
  from the `definicio` screens (`ERROR` where undefined). Barrow is typed directly (F(6), then `Ans−(F(1))`).
- **Verificar** is an app (MENU, then the key with the C, x⁻¹; on the fx-82/85SP X II, MENU 4), not a switch: the fitxas mark it with `ind.verif`
  (as on the CW, so `calcul.js` checks «Verdadero»), and the X II stylesheet hides the ✔.

## 5. The model contract

Checked by `Models.tanca` and by the tests:

- descriptor: `id`, `nom`, `curt`, `idiomes` (`{code: name}` or `null`), `fitxers`, `estils`, `proves`;
- `tecles`: `TECLES` (id → `{etiqueta, nom, tipus, …}`; `tipus: 'num'` = digit or decimal point, animated faster; a
  prefix key has `prefix: '<layer>'`), `TECLAT` (`alcada` = height/width × 100, `vidre` = LCD rectangle in cqw; the rest is
  the model's), `html(id, {petita, prefix, …})`, `existeix(id)`, `htmlTeclat()` (every key carries `data-tecla`; built with
  `Models.dibuix.caixa` / `Models.dibuix.cel`, all in cqw);
- `pantalla`: `html(state, idioma)`, `TIPUS`; optional `ajusta(element)`;
- `guions`: `textCalc(text, idioma)` plus the builders the model's fitxes use;
- `simulador`: `pantalles(fitxa) → {pantalles, errors}`;
- data: `M.fitxes` (array) and optional `M.blocs` (title overrides).

While a step animates, the core puts `prefix-<layer>` on `.calculadora` after a prefix key (the model stylesheet
highlights that layer's legends). The calculator's proportion comes from `TECLAT.alcada` (`--alcada-rel`).

## 6. Data format

### 6.1 Exercise (`exercicis/`)

`exercicis/blocs.js` documents it in full. Fields: `id` (`[a-z0-9-]`, unique, the URL id), `bloc`, `titol`, `font`
(optional, plain text, e.g. «CB 4ESO (2026), pregunta 15», shown in a bubble from an icon before the statement),
`figura` (optional `{src: 'img/…', alt}`), `enunciat`, `tancament` (required iff the last step is an error), `provaTu`
(optional `{enunciat, solucio}`; required for fitxes in non-small ESO blocks), `grup` (optional topic inside the block —
«Àlgebra», «Geometria», «Anàlisi», «Probabilitat» in the PAU blocks — drawn as a separating rule on the home page).
Real PAU titles start with the year, «(2024). …» (the block title already says PAU).

Blocks: `{id, titol, color, etapes, petit}`. `etapes` is always an array of catalogue stage ids. `petit: true` renders as a
small bubble in one row **above** the numbered blocks (so they are seen without scrolling). Since v101 from the first visit
(`VISITES_PER_MOURE` = 1), a discreet «↓ Envia-les a baix» button ends the row; it moves the row below the
cards (stored as `calc-bombolles`), where «↑ Torna-les a dalt» brings it back. Below, if the last row of cards has empty
cells (ESO: 7 blocks in 3 columns), the bubbles go **inside the grid**, into those cells (`.bombolles.al-forat`,
`grid-column: span <empty cells>`, a centred column of bubbles; `colocaABaix` in portada.js, re-run on resize); with no
empty cell (Batxillerat: 6 blocks) they go below the grid as a row. From 1000 px wide the grid always has 3 columns
(`repeat(3, minmax(0,1fr))`, David): if three cards as wide as the longest title do not fit, cards shrink and titles may
wrap; below 1000 px, `auto-fill` as before. With the row below, `.fletxes-baix`
(two ↓ chevrons, gently bobbing) invite scrolling: in the empty left margin when the window is ≥ 1720 px wide, else in
the bottom-left corner above the footer; hidden while the row is in view (IntersectionObserver); a click scrolls to it.
There are three, all in both stages, side by side in this order: `eso-inici`
`simbols` «Interpretar els indicadors de pantalla», `examen` «Configurar-ho tot abans d'un examen» and `eso-inici`
«Correcció d'errors d'escriptura» (this order). A bubble shows only its block title (one line; the fitxa title is its
`title` tooltip). The «↓ Envia-les a baix» / «↑ Torna-les a dalt» button is at the start of the row, raised like «← Fitxes»
but with a 3 px edge.

### 6.2 Model fitxa (`models/<id>/fitxes/`)

`models/fx-82sp-cw/fitxes/blocs.js` documents it in full: `id`, `inici` (screen of step 0), `passos`
(`{tecles, pantalla, text, error, apartat, parcials}`), `relacionades` (same stage only), `araTu` (optional; Batxillerat:
`{enunciat, resultat, error, inici, passos}`, played with the calculator in «Ara tu» mode), plus any exercise field to override.

### 6.3 Text mini-syntax (`js/nucli/text.js`)

`$TeX$`, `$$TeX$$` (display), `[[keyId]]` (inline keycap drawn by the model), `{{Menu label}}` (translated by the model),
`!!Error típic!!` (yellow for 1 s; only in `error: true` steps), `[mat]…[/mat]` (mathematics: serif on paper tint),
`[calc]…[/calc]` (what to do on the calculator: sans on LCD tint), `[nota]…[/nota]` (statement note, own line, italic),
`[a]…[/a]` (statement part, highlighted while a step with `apartat: 'a'` is current), `\n` (line break). Every step
sentence, closing text included, is `[mat]` or `[calc]` (test).

## 7. Player behaviour

- Step 0 shows the start screen and «Prem ▶ o la fletxa ↓ del teclat per començar». Until the first step the other
  steps are hidden and the calculator is at 30 % opacity (inactive): `body.pagina-fitxa:not(.en-marxa)`, a 0.4 s fade
  to full when ▶ is pressed; the LCD text cursor is hidden (model stylesheets). `proves/imatges.js` adds `en-marxa` before photographing a calculator.
- **Next** (▶, ↓, →): outline the step's keys on the calculator (no order badges (removed in v94, David)), then the cursor
  presses each key and the LCD shows the simulator's screen after it. Durations: `Reproductor.TEMPS` × the speed factor
  («lenta» 3.46, «normal» 1.90 default, «ràpida» 0.83; × 0.35 under `prefers-reduced-motion`). Before animating a step with keys, a fixed attention cue (`ATENCIO`, independent of speed): 0.3 s with nothing marked, then the calculator's border flashes (inset 3.2cqw, the step-key orange `--marca-vora`, v98) and fades in 1.2 s (`.atencio`); then the step's keys are outlined and the others dim to 40 % (B1, a 0.25 s opacity transition); once they are dim, 0.8 s more of stillness so the student's eyes settle on the calculator (`ATENCIO = {repos: 300, vora: 1200, apaga: 250, fixacio: 800}`); only then does the cursor start pressing keys. Uniform cursor speed (v95, David): a move lasts
  `TEMPS.cursor` (700 ms × factor) per calculator width travelled (`cursor.distancia`), so it is proportional to the
  distance; every key, digits included, has the same press and pause times (the old `RAPIDESA_XIFRES` is gone). Pressing next during an animation finishes it instantly.
- **Previous** (◀, ↑, ←) and clicking a step jump without animation. **Replay** (↻, R) re-animates the current step.
- **Step list**: the current step shows its full sentence; the others show the number and a one-line, ellipsed summary of
  the sentence. Done steps are faded. With D2 (default) the list ends with one more numbered row, «Ara tu» or «Prova-ho
  tu» (`.pas-final`, `opcions.nomFinal`): clicking it, or ▶ from the last step, opens that screen.
- **Invitation to go on**: once the current step has finished and something follows (another step or the «Ara tu» /
  «Prova-ho tu» row), two thin arrows appear under its box, pointing down to the next row (`.convida`: after 1.2 s they appear at full
  opacity inside yellow circles for `--convida-fort` seconds — 4, 3.5, 2.5, 1.5, 0.5 on the 1st…5th visit, none from
  the 6th (`CONVIT_FORT_S` in motor.js, `.sense-convida-fort`) — then settle at 55 % without circles and bob gently; no bob under `prefers-reduced-motion`; red velvet in the error zone). The 22 px
  gap for them (`.te-seguent`, 26 px) is there from the start of the step, so the list never jumps.
- **Error zone**: while the current step has `error: true`, `body.zona-error` turns every border red velvet (`--vellut`)
  and tints the page background 20 %. The first error step after a result starts with AC (test).
- **Closing step**: if the last step is an error, the player appends a keyless step whose screen is the last non-error
  step's screen and whose text is `tancament` (the correct way and the answer). It leaves the error zone.
- **At the last step**: ▶ opens «Ara tu» (Batxillerat) or «Prova-ho tu» (ESO) on its own screen (lever D2, on by default; with
  D2 off it would appear below the step list). «Prova-ho tu» has
  only «Mostra la solució». «Ara tu» adds «Comprova-ho pas a pas» (olive background, its own ◀ ▶ player on the same
  calculator; touching the main player leaves it).
- ◀ ↻ ▶ are the same size and style (▶ has no fill and never blinks); on hover, a thicker border (1.5 px `box-shadow`)
  and a light grey background. In «Prem ▶ …» the ▶ is drawn inside a small circle like the button (`.boto-inline`).
- `?pas=N` opens step N; the URL is updated at every step. After 5 mouse
  clicks on ◀ ▶ with no arrow key ever used, a bubble reminds about the arrows (touch taps do not count). Keyboard
  shortcuts are ignored while a `<dialog>` (the enlarged figure) is open or a form control has focus.

## 8. Layout

- ≥ 1000 px wide: two columns only. Left = statement, player, step list (scrolls inside), «Ara tu»/«Prova-ho tu». No list
  of other fitxes (removed by David; `relacionades` in the data is unused). Right = the calculator only. Widths
  15 % margin · 40 % · 30 % · 15 % margin. The page is exactly the viewport height (grid: header / content / footer).
- Footer: on a fitxa, full for `PEU_SENCER_MS` = 5 s, then only «© 2026 David Arso Civil» (`.peu-autor`; `.peu-resta`
  fades out). On the home page, always full and sticky at the bottom of the viewport (`.peu-flotant`).
- **UX lab levers** (`js/nucli/ux.js`): `?ux=a1,b3,…` sets `ux-<lever>` classes on `<html>` and `UX.te(p)` for the core;
  without `?ux=` nothing changes. `Models.adreca` keeps `?ux=`. Inside a frame the page posts `{font:'calc-ux', href,
  tipus, pas, total}` to the parent (the lab artifact). Levers: A1 only the current step · A2 fold the statement · A3
  header selectors in a ⚙ · A4 no footer · B1 dim other keys · B2 no order badges · B3 no cursor · B4 zoom on the keys ·
  C1 reading time · C2 [calc] appears with the keys · C3 icons instead of tinted sentences · C4 sentence under the
  calculator · D1 error without page tint · D2 «Ara tu» on its own screen via ▶ · E2 three columns, sentence right of
  the calculator · E3 one column. David's choice (A2, A3, B1 at 40 %, C3 with a rule between [mat] and [calc], D2) is
  `UX.PER_DEFECTE`: always on, with or without `?ux=`.
- **Statement (A2 as it is now)**: always shown whole — David: highlighted parts (`[a]…[/a]`) must never be hidden, and the
  statement must never be made narrower. The student folds it to one line (`.plegat`) and back by clicking it or, ≥ 1000 px,
  with the button on its left, vertically centred (`.enunciat-caixa` flex wrapper, `.plega-enunciat`, compress/expand
  icons). That button sits in the page margin: the column widens 52 px to the left (`margin-left:-52px; padding-left:52px`;
  the wrapper takes 46 px, 6 px spare for the hover outline). The fold is a 0.9 s curtain: `max-height` from
  `--alt-enunciat`, measured at the click, only while animating (`.mesurat`), plus an animated `@property --plec-fos` mask.
  On desktop an unfolded statement is capped at 34vh and scrolls inside (the active `[a]` part is scrolled into view). A
  one-line statement (lines counted from the text's client rects, `linies()`; re-checked by a ResizeObserver) cannot fold:
  `.enunciat-curt`, the button `visibility:hidden` so nothing moves. The ⚙ panel (at least 360 px wide, so it clearly overlaps the
  calculator) holds «Escollir calculadora», the language and «Color del cursor»: 16 swatches (`COLORS_CURSOR` in
  `motor.js`, white first = default, no black), stored as `calc-cursor`; the colour goes to `--cursor-fons` on `<html>`
  and `--cursor-vora` is dark or white by luminance (`CURSOR_HTML` reads both). Fitxa header (`.capcalera-de-fitxa`, 3-column grid): «← Fitxes» is a raised button on the left (a thick 6 px bottom edge that disappears when pressed); «T<n> · block» and «<n>. fitxa» are plain centred text separated only by a two-space gap, no sign between them (same size, block dimmed, no box, so they do not look clickable); ⚙ on the right.
- The calculator is a query container: every position and size inside it is in `cqw`, with `aspect-ratio`; the LCD is a
  nested container. It fills its column when the height allows, otherwise its width comes from the height.
- < 1000 px: one column (statement, player, calculator, steps). Below 700 px the header selectors wrap.
- Colours: off-white surfaces (`--surface`, `--bg`: a touch of grey and brown, never pure white) and a dark-grey header
  (`--hd-bg`). The drawn calculators keep their own colours. Home page: blocks numbered T1, T2…; fitxes 1, 2…
- Rejected by David: a third column, a «Per recordar» box, a title in the header, step dots, autoplay, a restart button,
  clickable keys, home-page descriptions or step counts, an explicit «agafa la calculadora» prompt, prediction questions.

## 9. Writing fitxes

**Configuration problems in ESO.** No fitxa teaches an ESO student to fix the calculator's settings: David tells the
student to reset it. Do not add such fitxes. The one exception is the small block «Configurar-ho tot abans d'un examen» (fitxa `abans-examen`),
which, like «Correcció d'errors d'escriptura» (`eso-inici`) and «Interpretar els indicadors de pantalla» (`simbols`), is in both
stages (David): three small bubbles side by side on both home pages. Their texts must satisfy both stages' rules (e.g.
«E Mat/S Mat» and «resultats exactes»).

**Degrees to radians.** `graus-radians` (Batxillerat T3, replaced `grau-puntual`): 60° → π/3 with the conversion
factor written as a fraction, `60×π/180` (fx-82MS: `60×π÷180`, decimal), then an error zone with the factor upside down
(`60×180/π`, ≈ 3437.746771) explained as units that do not cancel, and the closing step «Recorda: …» (David). «Ara tu»:
135° → 3π/4.

**Symbols fitxa.** `indicadors` («Què vol dir cada símbol de la pantalla?», block `simbols`; it used to be the first
fitxa of Batxillerat T1, same id so old links work): ≤ 10 steps, almost all keyless, each marking one symbol and only
explaining it (David: no advice such as «reset it»). CW: √▫/, D, ▲, S (SHIFT pressed), R/G, FIX, SCI, ✔, ◀ ▶ on the
entry line, ×10 with a small exponent. X II: the same with the A of ALPHA instead of ✔ (Verificar is an app there).
fx-82MS: D, S, A, R/G, FIX, SCI, ┘, the small exponent, the arrow of an overlong top line. «Prova-ho tu» in the
exercise (R and FIX). The CW `calcul.js` checks SCI results as SCI 3 (`1.67\times10^{-1}`).

**Process.** Propose before implementing: send David (in Catalan) the candidate fitxes of a block — title, one-line goal,
key sequence, step sentences — and wait for his OK. Deliver block by block. Sources are ground truth: competència bàsica
tests (`step-quiz/cb`, official key), the department's 4t ESO book (`step-quiz/llibre`), real PAU exercises, or own
examples when David allows it. Never invent an official statement or solution.

**Fractions.** Mixed numbers (a b/c) are not used in Europe: a fraction is always shown improper. On the fx-82MS, a
decimal result goes to a fraction with SHIFT a b/c (d/c: `7┘4`), never with a b/c alone (`1┘3┘4`). On the
fx-570/991SP X II, when a fraction (or another exact result) is already on the screen, its decimal is S⇔D (`sd`), not
SHIFT =; SHIFT = (≈) stays for getting the decimal directly from the expression.

**Realism.** Show the calculator the way a student would use it in an exam: the shortest sensible sequence. No detours
such as storing values in variables (on the fx-82MS, re-evaluate with replay ◀ and overwrite). No pointless steps.

**Size.** ≤ 10 steps per fitxa (5–8 ideal); statements of about 2–3 lines (ESO: situation, then one datum per line with
`\n• `, then the question); step sentences of 1–2 lines; every step must fit 1366×657 without scroll (`encaix.js`).

**f(x) and g(x) (David).** When a fitxa uses both, the function is always `f(x)` and its derivative always `g(x)`
(e.g. `pau-ana-26s-q1`: signs of f′ from g, values of f from f). On the X II with CALC (no f/g memory) the derivative
is typed first, then AC and the function; on the fx-82/85SP X II both go into one table (columns f and g).

**CW Tabla app** (`taula-bolzano`): the fx-82SP CW simulator knows HOME (3-column grid: right/left ±1, down/up ±3;
OK on Calcular or Tabla), the Tabla screens (`G.taula(files, fila, col)`, columns x/f(x)/g(x), `''` for an undefined
function; `G.rangTaula(valors, sel, escrivint)`, sel 3 = «Ejecutar») and the menu `taula-tools`. The final table is given
by the fitxa (EXE on «Ejecutar» returns null in the simulator, as on the X II). The fx-570/991SP CW does not list the
fitxa file (its HOME has more apps). Deduced screens: VERIFICAR.md 32–35.

**Both calculators.** The same id, statement and source on both; the fx-82MS has no fraction template (sums in
parentheses), gives decimals directly and uses the (−) key (`neg`) for negatives (test). On the CW, negatives use the
ordinary − key (`menys`), never SHIFT (−). Every displayed value is computed with the model's `calcul.js`, never by hand.

**Notation.** «sin» in texts, «sen» only as the CW key or LCD label. A point for what is typed or shown on the calculator
(3.8), a comma for written maths (3,8). No € inside TeX: write «euros».

**Exact results (CW).** The first exact result of a fitxa (fraction, root or π) must say why it is exact and what decimal
mode would show: Batxillerat names the mode ({{E Mat/S Mat}}, {{E Mat/S Decimal}}); ESO says «la calculadora està
configurada per donar resultats exactes». Decimal answers use SHIFT EXE (≈); right after an EXE result, SHIFT EXE
recomputes the same expression in decimal (confirmed).

**ESO wording** (older; where it disagrees with «Wording rules (v103)» above, the v103 rules win). `[mat]` for the mathematics, `[calc]` for the calculator, usually one or two of each per step. Fixed
phrases: «Primer escriu …», «Ara fes l'operació [[entre]] 4.», «Prem [[exe]]: obtens el resultat, que és 198.», then
`[mat]`«La resposta correcta és que …». With ≈: «Prem [[shift]] [[exe]] (≈): obtens …». Rounded: «Arrodonint a les
centèsimes, la resposta correcta és que …». Never an option letter; distractors only in the error zone. Ids of real items:
`cb<course>-<yy>-q<question>` with `font: 'CB <course>ESO (20<yy>), pregunta <question>'`; book items `ll4-<unit>-<exercise>`.
A formula given by the statement goes at its end as `[nota](…)[/nota]`. Statement figures: only the statement images of the
source (`e<N>.png`), never question images that show the a–d options.

**Wording rules (v103, David; artifact «calc · Normes de redacció», https://claude.ai/artifact/GF2WRWd1L1UgiKxnTHgu74).**
Derived from David's own rewrite of `cb2-26-q5`; applied so far to the T3 block (`eso-proporcionalitat`), to be extended
block by block (rest of ESO, then Batxillerat), each batch shown to David in the «Editor de textos» first.
- Every number in every text goes in `$…$` (statements, steps, [calc] sentences, results, «Prova-ho tu»); units stay
  outside (`$180$ g`); what is typed or shown keeps the decimal point (`$3.5$`), written maths the comma (`$3{,}5$`).
- ESO only (Batxillerat/PAU keep theirs): short titles naming the situation («La recepta del pastís»); statements in
  prose, no `•` lines, paragraphs separated by a blank line (situation · what happens · question), CB included. Official
  statements get no new plot (only prose); own examples may.
- The question carries the condition («…per mantenir les proporcions de la recepta?»).
- Estimation step (only where it already exists; none added): «Abans de calcular, pensa:» + two `•` questions, no
  answer; final steps no longer say «com havíem estimat».
- Rule of three (not percentages or scales): «$3$ ous → $180$ g de xocolata\n$1$ ou → ?», then «$1$ ou → $60$ g…».
- In a [calc] sentence the instruction comes first and each explanation goes on its own line (`\n`), e.g. «Fes
  l'operació [[per]] $5$.\nLa calculadora continua amb el resultat d'abans (Ans).»
- The last good step ends with «[mat]R) <complete sentence with who/what/units>[/mat]» (also Batxillerat), replacing «La
  resposta correcta és que…».
- Error zone: «[calc]!!Error típic!!:\nSi <what the student would do wrong>: <keys>.[/calc]» (no «esborra amb [[ac]]» in
  the text; the AC key stays in the step); then `FRASE_ERROR` and a closing [mat] chosen per case: «No té lògica que…»,
  «No té sentit…», «No encaixa amb l'enunciat…», «No pot ser…», with the exercise's numbers.
- `tancament`: «[mat]Recorda:\n• <calc>\n• <calc>[/mat]», calculations only.
- «Prova-ho tu»: prose, second person («Tu tens…»); solution one calculation per line and «R) …» in first person.
- (from David's rewrite of `cb4-22-q26`) Everyday words («got», not «recipient»). Questions (estimation step) with a
  subject and in the present indicative («en $60$ segons obté…?», «si manté l'aixeta oberta…, surt…?»), no
  subjunctive/conditional, no pronoun «en»: name the magnitude («surt $60$ vegades més aigua», «calen més pots»). Add a
  condition to the question only when the problem needs it (proportions, same pace, not deforming), not when it is
  obvious (a tap runs evenly).
- Exact result: «Si surt en forma de fracció és perquè la calculadora està configurada per donar resultats exactes.\nSi
  estigués configurada per donar decimals, sortiria $X$.» (conditional «sortiria», David), and the [mat] sentence gives
  its approximate decimal with `\simeq` (`$\frac{1}{15}\simeq 0{,}067$`; usually 2 decimals, 3–4 when the context
  needs it); fractions, roots and π alike.

**Calculator with judgement (v92, David).** The fitxes of `eso-proporcionalitat` and the v92 ones in other ESO blocks
teach that the calculator computes correctly a wrongly posed problem. (1) First step without keys or mark, one `[mat]`
sentence that starts «Abans de calcular, estima: …» (or «Abans de calcular, pensa: …» when there is nothing to
estimate): the test accepts a keyless, markless step only there. Later sentences refer back to it («…, com havíem
estimat»). (2) A rule of three always goes through the unit (1 ml, one egg, one gardener) with `Ans`. (3) A wrong
set-up error zone ends with the fixed sentence `FRASE_ERROR` («La calculadora ha seguit bé les instruccions. El problema
és que s'han plantejat malament els càlculs.») and then «No pot ser: …», reasoned without the calculator. Not in
keying-error zones. (4) Not every fitxa gets an error zone: David wants to avoid saturating students (`cb4-22-q26`,
`ll4a-3-14`, `ll4-2-16`, `ll4a-8-56` have none). (5) «Prova-ho tu» keeps the same kind of problem (no traps). (6) No
«check backwards» step. Source ids: `ll4a-<unit>-<exercise>` (book 4t ESO A, `step-quiz/llibre` `4eso-apl`),
`ll3-…` (3r ESO), `recu-<item id>` (recovery bank, `step-quiz/recu`).

**Error zones** only where they teach something. The first step starts with `!!Error típic!!: esborra amb [[ac]] i …`, the
next shows the wrong result with a `[mat]` sentence saying why it cannot be right («No pot ser: …»). If the fitxa ends
with the error, write `tancament`: «Recorda: …» with the correct way and the answer.

**Screens the manual does not draw** go to `VERIFICAR.md` as a new numbered row until David confirms them on the device.

**Disabled «Ara tu».** The 12 real PAU fitxes (blocks `pau-ag`, `pau-ap`) and `barrow` (a PAU statement, David) keep their «Ara tu» inside a block comment
`/* «Ara tu» DESACTIVAT … */` before `relacionades`. To re-enable one: delete the two header lines of the comment and the
closing `*/`, bump the version, run the tests. Never put `*/` inside a commented block.

## 10. Tests

- `node proves/comprova.js` (with `KATEX=<katex 0.16.9>/dist` it also renders every formula with `throwOnError`) must end
  with «Tot correcte». It loads the core, the catalogue, the exercises and every model exactly as the browser does, then:
  - catalogue, stages, exercise files (all listed, each used by some calculator), blocks (`etapes`, colours);
  - the core names no key and no model module; the core stylesheet styles no key, key type or layer;
  - every fitxa: unique id, block, statement, figure file, plain-text source, keys exist, texts well formed
    (`$`, `{{ }}`, `[[ ]]`, `[mat]`/`[calc]`/`[nota]` balanced, every step sentence tagged), a keyless step marks something,
    `!!…!!` only in error steps, `apartat` marked in the statement, related fitxes exist and share a stage;
  - `tancament` present iff the last step is an error; «Prova-ho tu» on every fitxa of the large ESO blocks; no fitxa with
    both «Ara tu» and «Prova-ho tu»;
  - the simulator gives one screen per key, no errors, and what is typed matches each step's authored entry (also «Ara tu»);
  - an error zone after a result starts with AC; ESO texts never mention an «opció»; `cb…` ids have the right `font`;
  - model tests: screen formats, Catalan coverage, the exact-result rule, keyboard geometry (no overlapping keys), every
    authored result recomputed by `calcul.js`; fx-82MS: the (−) rule;
  - every `?v=` in `index.html`/`fitxa.html` equals `VERSIO` and exists; the static footer says «Versió VERSIO»;
  - `Models.adreca` round-trips and omits defaults; `etapaActual`/`etapaDe` with fake `location`/`localStorage`.
- `node proves/encaix.js` (Playwright; serves the repo itself) must end with «Tot hi cap»: for every calculator, fitxa and
  step (step 0 and the closing step included) at 1366×657, 1280×559 and a 10" Android tablet (1280×632, touch, DPR 1.5):
  no page scroll, the whole calculator visible, the current step fully visible in the step list, no JS errors; plus, once,
  the footers (fitxa: full, then author only at 5 s; home: sticky and full) and no page scroll during an animated step.
- `node proves/ux.js` (Playwright, ~1 min) must end with «Palanques correctes»: each lever alone and four combinations,
  three steps and the last one, no JS errors, no page scroll (except E3), D2 opens «Ara tu» with ▶. `MODEL=…`, `FITXES=a,b`, `VP='[[w,h]]'` restrict it.

## 11. Versioning and delivery

- Any change to a served `.js` or `.css` file bumps `VERSIO` in `js/nucli/models.js`, every `?v=` in `index.html` and
  `fitxa.html`, and the static footer of `index.html` (the test checks all three). Files in `proves/` are not served.
- Deliver a ZIP whose root is the repo root, with only the changed and new files (`git diff --name-only --diff-filter=AMR
  HEAD~1 HEAD | zip -@ calc-versio-NN.zip`). David uploads it to `_uploads/`; the workflow unpacks and commits it;
  Cloudflare Pages publishes it (check the footer; if it stays on the old version, see HANDOUT §8). Deleted files cannot
  travel in a ZIP: give David the exact steps to delete them.
- Commit messages like `Versió 50: …`; never `[skip ci]`, `[ci skip]` or `[cf-pages-skip]` (Cloudflare would not publish).
- Update `CHANGELOG.md`, and `README.md`/`ARCHITECTURE.md` if behaviour changed, in the same delivery.

## 12. Open items

- `VERIFICAR.md`: fx-82MS rows 10–14 (replay cursor and overwrite, ×10 exponent on the bottom line,
  «6C4», implicit × before a parenthesis or function, DEL and the cursor); how the fx-82MS draws an EXP entry.
- fx-570/991SP X II: all of its `VERIFICAR.md` section (menu labels and behaviour, CALC screens, Ans/PreAns after
  CALC, Verificar app, OPTN, colours) is unconfirmed; the CW-menu fitxes and the CALC ones wait for David's review.
- New rows awaiting a real calculator: CW 30–31 (SCI 3, Verificar ½ = 0.5), X II 15 (ALPHA indicator, SCI), MS 15–16
  (symbols, 0.082304527 → 20┘243 with a b/c).
- Galaxy Tab S10 Lite blank page: waiting for a `vigia.js` screenshot from David.
- More fitxes per ESO block (sources in the order of §9).
- Larger text for projection (`clamp()` or `?projector=1`): postponed, David does not project.
