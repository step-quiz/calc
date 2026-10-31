# ARCHITECTURE — fx-82SP CW step-by-step site (for a cold-start AI)

Read `CLAUDE.md` first (house rules), then this file, then `js/fitxes.js` (the data) and `proves/comprova.js`.

## 1. Purpose and constraints

- Teaches Batxillerat students (Catalonia) to use the **CASIO fx-82SP CW** calculator. Student-facing text: **Catalan**. Calculator menu labels: **Spanish, verbatim from the user manual** (that is what students see on the device; David's decision).
- The target model is the **fx-82SP CW** only: apps Calcular, Estadística, Tabla, Math Box. It has **no** equation solver, matrices, vectors, derivatives, integrals or distributions (those are fx-570/991SP CW). Never write a fitxa that uses them.
- Vanilla HTML/CSS/JS, no build, no npm at runtime. External: KaTeX 0.16.9 (cdnjs) + Google Fonts. Deployed by Cloudflare Pages from `main`.
- Primary devices: **laptops** (Chromebook 1366×768 and 1280×720 viewports ≈ 1366×657, Lenovo 1536×864 / 1920×1080), touch and non-touch. Mobile must work but gets no extra effort.
- UX model copied from `step-quiz/pau` → `procediments/` (the DEMO pages): step 0 = statement, ▶ / ← → / space, speed select, step dots, explanation bubble.

## 2. Mental model

A fitxa is **pure data**: an initial screen state plus a list of steps `{tecles, pantalla, text}`. The engine never computes anything mathematical: every screen is written explicitly. Animating step *i*: outline step *i*'s keys on the full keyboard (order badges only when the step has 2 to `MAX_ORDRE` = 6 keys; longer sequences only get the outline, David found the badges noisy), then the cursor moves to each key and presses it, SHIFT shows the `S` indicator and highlights blue legends, and finally the LCD is replaced by `pantalla` (short fade). Jumping (`salta`) sets everything without animation.

Page layout (David, 31/10/2026, after a usability review): **two columns only**. Left = everything to read (statement, ◀ ▶ buttons only — no autoplay, no restart button —, key-animation speed «normal» ×1.65 / «ràpida» ×1, step list where only the current step is expanded with its sentence, and a collapsed `<details>` with the other fitxes of the block). Right = the calculator only. No header title, no «Per recordar» box, no step dots. Keys: ↓/→ next (animated), ↑/← previous.

## 3. Files and responsibilities

| File | Global | Responsibility |
|---|---|---|
| `js/tecles.js` | `Tecles` | `TECLES` catalog (`etiqueta`, `alt` = SHIFT function in blue, `rotul` = label printed above key, `nom`, `tipus`) and `TECLAT` = measured geometry, all in % of body WIDTH: `tecles: id → [cx, cy, diameter]`, `vidre` (LCD glass), `marc` (bezel), `creu` (cursor-pad cross), `pagina` (tall piece holding `pgup`/`pgdn`), `alcada` = 186.4 (body height with the logo strip cropped). Measured on a perspective-free front image, cross-checked on a photo of a real unit, calibrated with CASIO's official 162 × 77 mm. `html(id, {petita, ambShift, teclat, atributs})`. |
| `js/pantalla.js` | `Pantalla` | Pure renderer `html(state) → string` for the LCD. Types: `calc`, `menu` (4 visible rows + scrollbar window), `home`, `missatge`, `variables` (VARIABLE key list: 5 rows A/B, C/D, E/F, x/y, z). `ambIndicador(state, name)` adds an indicator (used for SHIFT's `S`). Highlight via `state.marca` (`mat`, `ang`, `fix`, `sci`, `shift`, `hist`, `simp`, `verif`, `entrada`, `resultat`, `fila-N`). |
| `js/guions.js` | `G` | Builders for recurring screens with manual-verbatim labels: `calc(ind, entrada, resultat, opts)`, `config`, `configCalcul`, `entradaSortida(marked, sel)`, `unitatAngular`, `formatNumero`, `normal`, `reiniciar`, `format`, `catalog`, `angCoordSexag`, `home`, `missatge`, `marca(state, name)`. Indicator presets `G.IND.D`, `G.IND.R`; `G.ind(base, extra)`. |
| `js/fitxes.js` | `Dades` | **Data only**: `BLOCS` (id, title, colour, description) and `FITXES`. Text mini-syntax: `$$TeX$$` (display), `$TeX$`, `[[keyId]]` (inline keycap), `{{Menu label}}` (LCD-styled label). |
| `js/motor.js` | `Motor` | Builds `fitxa.html?id=…`: slim header (back link only), `.columna` (statement, player, `ol.passos`, `details.altres`) and `.escenari` (`.calculadora` absolutely positioned from `TECLAT` + cursor/effects overlay). Player logic adapted from `pau/procediments/motor.js`. Exposes the controller as global `fitxa` in `fitxa.html` (`salta(i)`, `seguent()`, `total`, `pas`). |
| `js/portada.js` | — | Renders `index.html` cards from `Dades`. A block with no fitxes shows «Properament». |
| `css/estil.css` | — | Everything visual. The calculator is a query container: every position/size inside it is in `cqw` (% of its width) and `aspect-ratio:100/186.4`, so keys are perfect circles. `.lcd` is a nested container: LCD contents are in `cqw` of the LCD width. Note: on the container element itself `cqw` does NOT refer to itself (it falls back to viewport units), so the body's corner radius uses `%`. At ≥ 1000 px both columns are `--alt` = `100dvh − 102px` tall (84px when `max-height:700px`); calculator width = `min(470px, --alt / 1.864)`; the step list scrolls inside the left column. Touch (`any-pointer:coarse`) overrides. |
| `proves/comprova.js` | — | Node test (vm-loads the four data/engine-free scripts). |

## 4. Invariants (enforced by `proves/comprova.js`)

- Unique fitxa ids (`[a-z0-9-]+`), existing `bloc`, `relacionades` point to other existing fitxes.
- Every key id used in steps and in `[[…]]` exists.
- Every catalog key has exactly one position (or sits in the page piece); keys are inside the body, below the LCD, and no two key circles overlap.
- A step may end with `shift` only if its screen shows the `S` indicator.
- A step without keys must set `pantalla.marca` (otherwise nothing visibly happens).
- Menus: `sel` in range, at most one `◉`.
- `marca` on an indicator requires that indicator to be present.
- With `KATEX=<katex>/dist`, every TeX in screens and texts renders with `throwOnError: true`.

## 5. Visual checks used during development (not in repo)

Playwright against `python3 -m http.server`, routing cdnjs KaTeX to a local copy: for every fitxa and every step, at 1280×640, 1366×657, 1536×730, 1280×800 and 1920×960, assert `scrollHeight ≤ innerHeight`, the calculator bottom is inside the viewport, the current step is fully visible inside the step list, no LCD menu label is truncated (`.lcd-fila .t` `scrollWidth ≤ clientWidth`), entry/result do not overlap, and no JS errors.

## 6. Known approximations

See `VERIFICAR.md` (screens not drawn in the manual). Fix them in `js/guions.js` when David confirms on the device.

## 7. Roadmap

1. Blocks «Fraccions» and «Funcions útils per a la PAU» (Tabla f(x)/g(x), Verificar, variables A–F/x/y/z, Ans, nCr, Recta real).
2. Phase 2 (block `exercicis`): four real PAU exercises approved by David — `alg-24j-q2` (done: solve for k = 0 by substitution, store x, y, z with VARIABLE, check every equation, show that rounding to 1.67/−1.33 gives 1.02), then `geo-25s-q4b` (distance √6/2, exact mode, Verificar), `ana-24i-q1` a) (Bolzano with ln, Tabla app; f(1.5) = 0.0273 so rounding ln 1.5 to 0.4 gives a false 0), `pro-24i-q4` (19/30, Bayes 15/19, binomial with nCr; rounding p to 0.63 gives 0.3907 instead of 0.3969). David reviews the layout of each one before the next.
