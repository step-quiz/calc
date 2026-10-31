# ARCHITECTURE — fx-82SP CW step-by-step site (for a cold-start AI)

Read `CLAUDE.md` first (house rules), then this file, then `js/fitxes.js` (the data) and `proves/comprova.js`.

## 1. Purpose and constraints

- Teaches Batxillerat students (Catalonia) to use the **CASIO fx-82SP CW** calculator. Student-facing text: **Catalan**. Calculator menu labels: **Spanish, verbatim from the user manual** (that is what students see on the device; David's decision).
- The target model is the **fx-82SP CW** only: apps Calcular, Estadística, Tabla, Math Box. It has **no** equation solver, matrices, vectors, derivatives, integrals or distributions (those are fx-570/991SP CW). Never write a fitxa that uses them.
- Vanilla HTML/CSS/JS, no build, no npm at runtime. External: KaTeX 0.16.9 (cdnjs) + Google Fonts. Deployed by Cloudflare Pages from `main`.
- Primary devices: **laptops** (Chromebook 1366×768 and 1280×720 viewports ≈ 1366×657, Lenovo 1536×864 / 1920×1080), touch and non-touch. Mobile must work but gets no extra effort.
- UX model copied from `step-quiz/pau` → `procediments/` (the DEMO pages): step 0 = statement, ▶ / ← → / space, speed select, step dots, explanation bubble.

## 2. Mental model

A fitxa is **pure data**: an initial screen state plus a list of steps `{tecles, pantalla, text}`. The engine never computes anything mathematical: every screen is written explicitly. Animating step *i*: mark step *i*'s keys on the full keyboard with their press order (badges), then the cursor moves to each key and presses it, SHIFT shows the `S` indicator and highlights blue legends, and finally the LCD is replaced by `pantalla` (short fade). Jumping (`salta`) sets everything without animation.

## 3. Files and responsibilities

| File | Global | Responsibility |
|---|---|---|
| `js/tecles.js` | `Tecles` | `TECLES` catalog (`etiqueta`, `alt` = SHIFT function in blue, `rotul` = label printed above key, `nom`, `tipus`) and `TECLAT` = physical layout (top: 5 rows × 6 cols; bottom: 4 rows × 5 cols; `pgup`/`pgdn` share one tall cell in col 6, rows 1–2). Layout verified against a photo of a real fx-82SP CW Iberia. `html(id, {petita, ambShift, teclat, atributs})`. |
| `js/pantalla.js` | `Pantalla` | Pure renderer `html(state) → string` for the LCD. Types: `calc`, `menu` (4 visible rows + scrollbar window), `home`, `missatge`. `ambIndicador(state, name)` adds an indicator (used for SHIFT's `S`). Highlight via `state.marca` (`mat`, `ang`, `fix`, `sci`, `shift`, `hist`, `simp`, `verif`, `entrada`, `resultat`, `fila-N`). |
| `js/guions.js` | `G` | Builders for recurring screens with manual-verbatim labels: `calc(ind, entrada, resultat, opts)`, `config`, `configCalcul`, `entradaSortida(marked, sel)`, `unitatAngular`, `formatNumero`, `normal`, `reiniciar`, `format`, `catalog`, `angCoordSexag`, `home`, `missatge`, `marca(state, name)`. Indicator presets `G.IND.D`, `G.IND.R`; `G.ind(base, extra)`. |
| `js/fitxes.js` | `Dades` | **Data only**: `BLOCS` (id, title, colour, description) and `FITXES`. Text mini-syntax: `$TeX$`, `[[keyId]]` (inline keycap), `{{Menu label}}` (LCD-styled label). |
| `js/motor.js` | `Motor` | Builds `fitxa.html?id=…`: header, left column (explanation bubble, statement, player, «Per recordar»), centre (`.calculadora` = LCD + full keyboard, plus cursor/effects overlay), right column (`.costat` = step list + other fitxes). Player logic adapted from `pau/procediments/motor.js`. Exposes the controller as global `fitxa` in `fitxa.html` (`salta(i)`, `seguent()`, `total`, `pas`). |
| `js/portada.js` | — | Renders `index.html` cards from `Dades`. A block with no fitxes shows «Properament». |
| `css/estil.css` | — | Everything visual. The calculator uses **container query units** (`cqw` of `.calculadora`); its width is `min(440px, (100dvh − 104px) / 1.72)` at ≥ 1000 px so the whole device fits the viewport height. Low-height (`max-height:700px`) and touch (`any-pointer:coarse`) overrides. |
| `proves/comprova.js` | — | Node test (vm-loads the four data/engine-free scripts). |

## 4. Invariants (enforced by `proves/comprova.js`)

- Unique fitxa ids (`[a-z0-9-]+`), existing `bloc`, `relacionades` point to other existing fitxes.
- Every key id used in steps and in `[[…]]` exists; every catalog key appears **exactly once** in `TECLAT`; rows have 6 / 5 columns.
- A step may end with `shift` only if its screen shows the `S` indicator.
- A step without keys must set `pantalla.marca` (otherwise nothing visibly happens).
- Menus: `sel` in range, at most one `◉`.
- `marca` on an indicator requires that indicator to be present.
- With `KATEX=<katex>/dist`, every TeX in screens and texts renders with `throwOnError: true`.

## 5. Visual checks used during development (not in repo)

Playwright against `python3 -m http.server`, routing cdnjs KaTeX to a local copy: for every fitxa and every step, at 1280×640, 1366×657, 1536×730 and 1920×960, assert `scrollHeight ≤ innerHeight`, the calculator bottom is inside the viewport, no LCD menu label is truncated (`.lcd-fila .t` `scrollWidth ≤ clientWidth`), entry/result do not overlap, and no JS errors.

## 6. Known approximations

See `VERIFICAR.md` (screens not drawn in the manual). Fix them in `js/guions.js` when David confirms on the device.

## 7. Roadmap

1. Blocks «Fraccions» and «Funcions útils per a la PAU» (Tabla f(x)/g(x), Verificar, variables A–F/x/y/z, Ans, nCr, Recta real).
2. Phase 2: four real PAU exercises (one each: Àlgebra, Geometria, Anàlisi, Probabilitat) from `step-quiz/pau/data/`, showing correct calculator use and the errors to avoid.
