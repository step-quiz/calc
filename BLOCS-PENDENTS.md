# BLOCS-PENDENTS.md — Work order for the two empty blocks (cold-start AI)

> **Estat (31/10/2026, versió 16).** El bloc 2 `fraccions` ja està fet: `frac-plantilla`, `frac-prioritat`, `pot-negativa`, `pot-fraccio` i `arrel-n`. David va descartar `frac-mixta`, `frac-decimal`, `factor-primo` i `simp`. Correcció: escrit en una línia, `2+3÷4−1` dona 7/4 (no 5/4). El bloc 4 `pau` també està fet: `definir-fx`, `ans`, `logaritmes`, `combinatoria` i `verificar`. Segona onada (`abs`, `taula`) no feta.


Target repo: `step-quiz/calc` (static site, fx-82SP CW step-by-step demos). Site version at time of writing: **12** (31/10/2026).
Empty blocks to fill:

| # | Block id (in `js/fitxes.js` → `BLOCS`) | Home-page title (do not change) | Colour |
|---|---|---|---|
| 2 | `fraccions` | Operar amb fraccions i potències | `#b33c3c` |
| 4 | `pau` | Funcions útils per a la PAU | `#7c5cbf` |

A block with no fitxes renders «Properament» on the home page. As soon as one fitxa has `bloc: 'fraccions'` (or `'pau'`), the block lists it automatically (`js/portada.js`). No HTML changes are needed.

---

## 0. Read before writing a single line

1. `CLAUDE.md` — house rules (Catalan with David; ZIP root = repo root; never `[skip ci]`/`[ci skip]`/`[cf-pages-skip]` in commit messages; bump the version on every JS/CSS change; run the tests).
2. `ARCHITECTURE.md` — engine, data model, invariants.
3. `VERIFICAR.md` — screens that were inferred rather than read from the manual. Every new inferred screen goes there as a new numbered row.
4. `js/fitxes.js` — the existing 11 fitxes. Use them as templates. The closest models are listed below:
   - `exacte-decimal` / `mode-decimal`: FORMAT menu, S⇔D.
   - `pau-geo-25s-q4b`: fraction + root + power templates typed with ↓ →.
   - `pau-ana-24i-q1`: FUNCTION > Definir f(x).
5. `js/simulador.js` — what the per-key screen simulator can and cannot infer (header comment).

### Process David requires (non-negotiable)

- **Propose before implementing.** Send David, in Catalan, a short list of fitxa ideas for the block: the title, a one-line goal and the key sequence for each. Wait for approval. He explicitly asked to be shown the idea before tokens are spent on implementation.
- **Deliver one block at a time**, as a ZIP whose root is the repo root, with numbered copy-paste upload steps (GitHub → `_uploads/` → *Add file* → *Upload files* → commit message).
- He reviews the layout of each new fitxa. Expect iteration.

### Hard constraints

- **Model scope.** Use the **fx-82SP CW** only. Apps: Calcular, Estadística, Tabla, Math Box.
  - It has **no** equation solver, matrices, vectors, numerical derivative or integral, Σ, or probability distributions (binomial/normal CD/PD). Those belong to the fx-570/991SP CW.
  - Never write a fitxa that uses them. If unsure whether a function exists on the 82SP CW, check the official Spanish user's guide (fx-82SP CW, CASIO worldwide education site), list it as an open question for David, and do not invent it.
- **Language.**
  - Student-facing text is in Catalan.
  - Calculator menu labels are in Spanish, verbatim from the manual, written `{{Label}}` in texts.
- **Realism.**
  - Every fitxa shows how a student would really use the calculator in an exam: the shortest sensible key sequence.
  - No detours such as storing numbers in variables "to show the feature" when typing the number is faster. David rejected exactly this in `pau-alg-24j-q2` and called it horrible.
  - No absurd steps. He made us delete a "last calculation" step that added nothing.
- **Negatives.** Type them with the ordinary `menys` key, not SHIFT `(−)`; David confirmed this works on the device and is faster.
- **Fit.** Every step of every fitxa must fit the viewport with no page scroll at **1366×657**. Also check 1280×640, 1536×730, 1280×800 and 1920×960.
  - Keep enunciats short (≈ 2–3 lines in the left column, which is 40 % of the width).
  - Keep sentences one or two lines.
  - Keep steps ≤ 10 per fitxa. 5–8 is the sweet spot.
- **Badges.** Order badges appear only for steps with 2–6 keys (`MAX_ORDRE`). Prefer splitting long sequences into meaningful steps, e.g. numerator, denominator, EXE.

---

## 1. Data model recap (what a fitxa is)

```js
{
  id: 'frac-mixta',                 // [a-z0-9-]+, unique; URL is fitxa.html?id=<id>
  bloc: 'fraccions',
  titol: 'Fraccions mixtes',        // short; shown on home page and in the «Fitxes de…» list
  enunciat: 'Calcula $2\\frac{1}{3}+\\frac{3}{4}$ i dona el resultat com a fracció mixta.',
  inici: calc(D),                   // initial LCD (guions.js builders)
  passos: [
    { tecles: ['shift', 'frac', '2', 'right', '1', 'down', '3', 'right'],
      pantalla: calc(D, '2\\frac{1}{3}'),          // FINAL screen of the step only
      text: 'Prem [[shift]] [[frac]] per a la plantilla de fracció mixta…',
      parcials: { 2: /* screen after key index 2 */ },   // only if the simulator cannot infer it
      apartat: 'a' },                                  // optional; enunciat must contain [a]…[/a]
  ],
  relacionades: ['exacte-decimal'],  // other existing fitxa ids
}
```

Text mini-syntax:

| Syntax | Meaning |
|---|---|
| `$TeX$` | Inline formula |
| `$$TeX$$` | Display formula |
| `[[keyId]]` | Inline keycap |
| `{{Label}}` | LCD-styled menu label |
| `[a]…[/a]` | Statement part, highlighted while a step has `apartat:'a'` |

Key ids are in `js/tecles.js` → `TECLES`. The ones relevant here:

| Key | SHIFT function (blue legend) |
|---|---|
| `frac` | mixed-fraction template `■□⁄□` |
| `arrel` | n-th root `■√□` |
| `pot` (`■^□`) | `■⁻¹` |
| `x2` | `log` |
| `logab` | `ln` |
| `ans` | **Simp** |
| `exe` | `≈` |

Other relevant keys:
- `format` opens the FORMAT menu: Estándar / Decimal / …; for fraction results it probably offers mixed-fraction and prime-factor options. Verify this.
- `catalog`, `tools`, `variable`, `funcio`.

LCD state builders are in `js/guions.js` (`G`): `calc(ind, entrada, resultat, opts)`, `menu`, `radio`, `config`, `configCalcul`, `format`, `catalog`, `definicio`, `menuFuncio`, `variables`, `home`, `missatge`, `marca`. Indicator presets are `G.IND.D`/`G.IND.R`, with extras via `G.ind(base, {simp:true, verif:true, …})`. `Pantalla` already supports the `simp` and `verif` indicators.

---

## 2. Block 2 — «Operar amb fraccions i potències» (`bloc: 'fraccions'`)

### Pedagogical goal

Batxillerat students lose marks by mistyping fractions, priorities and powers, and by misreading what the calculator returns. They also lose marks when they don't know how to get the form the exam wants: an irreducible fraction, a mixed number, a decimal, or a power of a fraction. Each fitxa = one concrete trap or one concrete skill.

### Candidate fitxes (propose these to David, ≈ 4–6 of them; he decides)

| Proposed id | Title (Catalan) | Content / key idea | Classic error shown |
|---|---|---|---|
| `frac-plantilla` | Escriu una fracció amb la plantilla | `[[frac]]`, type the numerator, ↓, type the denominator, → to leave the template. Example: $\frac{3}{4}+\frac{5}{6}$ → $\frac{19}{12}$. | Forgetting → so the next term goes into the denominator. Show the wrong screen. |
| `frac-prioritat` | Fracció de sumes: on van els parèntesis | $\frac{2+3}{4-1}$ via the template (the template is the bracket) vs linear `2+3÷4−1`. | The linear typing gives $\frac{5}{4}$, not $\frac{5}{3}$. |
| `frac-mixta` | Fraccions mixtes (entrar i obtenir-les) | Enter $2\frac{1}{3}$ with SHIFT `frac`. Convert a result $\frac{19}{12}$ to $1\frac{7}{12}$ with FORMAT. | Typing `2` followed by $\frac{1}{3}$ without the mixed template means $2\cdot\frac{1}{3}$? (Verify what the 82SP CW actually does: implicit multiplication vs syntax.) |
| `frac-decimal` | Fracció ↔ decimal | FORMAT > {{Decimal}}, and back. `≈` (SHIFT EXE) for a direct decimal. Link to the `exacte-decimal` fitxa. | Copying 0.3333333333 into the exam instead of $\frac{1}{3}$. |
| `pot-negativa` | Potències de negatius | $(-2)^4=16$ vs $-2^4=-16$, using the `pot` template and parentheses. | Without parentheses the sign is not raised. The PAU geometry fitxa uses $(-1)^2$, so link it. |
| `pot-fraccio` | Potència d'una fracció i exponent fraccionari | $\left(\frac{2}{3}\right)^{-2}=\frac{9}{4}$; $8^{\frac{2}{3}}=4$ (a fraction template inside the exponent field); `SHIFT pot` for $x^{-1}$. | Forgetting the parentheses around the fraction, so only the denominator is raised. |
| `arrel-n` | Arrels d'índex n | SHIFT `arrel` → $\sqrt[3]{-27}=-3$; $\sqrt[4]{16}$. | Using $\sqrt{\ }$ then `^(1/3)` without parentheses. |
| `factor-primo` | Descomposició en factors primers | FORMAT > {{Factor primo}} (if present on 82SP CW; verify). Useful for simplifying radicals and LCM/GCD checks. | — |
| `simp` | Simplificar pas a pas (Simp) | SHIFT `ans` = Simp, when Result fracción / Simplificar is set to Manual (indicator ⇩). **Only if David wants it**: it is rarely needed in an exam; the default auto-simplify is what students use. | Leaving the calculator in Manual simplification, so results are not reduced. This could fit as an "error" fitxa. |

Recommendation to present to David:
- Core of 5: `frac-plantilla`, `frac-prioritat`, `pot-negativa`, `pot-fraccio`, `frac-mixta`.
- Optional: `arrel-n`, `frac-decimal` (overlaps with block 1), `factor-primo`, `simp`.

### Simulator work needed for block 2

`js/simulador.js` currently supports the `frac`, `arrel` and `pot` templates (`PLANTILLES`/`CAMPS`), `x2`, digits and operators, and ↓ ↑ → ← inside templates. Missing:

1. **Mixed-fraction template.** Add node type `mixta` with fields `[ent, num, den]` and TeX `ent\frac{num}{den}`. Navigation: the cursor starts in `ent`; → goes to `num`, ↓ to `den`, → out (verify the real cursor order on the manual, p. "Entrada de fracciones mixtas"). Map `ESCRIU_SHIFT.frac` → template `mixta`.
2. **n-th root template.** Node type `arreln` with fields `[idx, rad]` and TeX `\sqrt[idx]{rad}`. Map `SHIFT arrel`.
3. **`SHIFT pot` = `^{-1}`.** Add `pot: '^{-1}'` to `ESCRIU_SHIFT` (a plain token, not a template).
4. **FORMAT on a fraction result.** The existing FORMAT menu builder is for irrational results: `FORMAT_IRRACIONAL` = Estándar, Decimal, Notación ING, Sexagesimal. Add a builder for rational results, e.g. `G.formatFraccio(sel)`, with manual-verbatim labels (probably including mixed fraction and prime factorisation; verify). Then teach `okAlMenu` the transition, or give it via `parcials`.
5. **Simp.** Only if `simp` is approved: SHIFT `ans` on a result screen. It probably asks for a factor or shows the step; this is unknown. Give screens via `parcials`, and add a `VERIFICAR.md` row.
6. Keep the **final-TeX consistency check** working. After a typing-only step, the simulated TeX must equal the authored `entrada` (spaces ignored), so author `entrada` with exactly the TeX the simulator produces for the new nodes.

Add a test case for each new node type indirectly: the fitxes that use them are the test. `proves/comprova.js` already fails on any simulator error and on KaTeX errors when `KATEX=<katex>/dist` is set.

### Open questions to list for David (to check on his physical calculator)

- What does typing `2`, then `frac`, `1`, ↓, `3` give: implicit multiplication or a syntax error?
- What are the exact labels and order of the FORMAT menu when the result is a fraction ($\frac{19}{12}$)?
- Is {{Factor primo}} available on the 82SP CW, and in which menu?
- What is the default of CONFIG > Config cálculo > {{Result fracción}} (`ab/c` vs `d/c`), and does it matter for the fitxes?

---

## 3. Block 4 — «Funcions útils per a la PAU» (`bloc: 'pau'`)

### Pedagogical goal

Features of the 82SP CW that let a student **check by hand-done work quickly** during the PAU (scientific-technological modality). The PAU exam fitxes (blocks 5 and 6) already show realistic use inside an exercise. Block 4 teaches each tool in isolation, briefly, so that blocks 5–6 can link to it via `relacionades`.

### Candidate fitxes (propose to David, ≈ 4–6)

| Proposed id | Title (Catalan) | Content | PAU use |
|---|---|---|---|
| `definir-fx` | Defineix f(x) un cop i avalua-la | FUNCTION > {{Definir f(x)}}, EXE; then FUNCTION > {{f(x)}} `3` `)` EXE. Also g(x). | Bolzano, extreme values, checking limits numerically. Already used in `pau-ana-24i-q1`; this is the generic version, so link both ways. |
| `taula` | Taula de valors (app Tabla) | HOME → Tabla. Define f(x) (and optionally g(x)), with Inicio / Fin / Paso, and read the table. | Locating a root sign change, sketching a graph, checking monotonicity. Caveat: David rejected Tabla *inside* the Bolzano PAU fitxa as slower there. In block 4 it is legitimate as a tool, but present it as an option and let him decide. |
| `ans` | Ans: encadena càlculs sense copiar decimals | Use the result of the previous calculation: `×2 EXE` continues with Ans; `Ans` explicitly inside an expression. | Avoids rounding errors when copying intermediate decimals (probability, geometry distances). |
| `verificar` | Verificar una igualtat | The Verify mode (indicator ✔, already supported by `Pantalla`). Example: check $\frac{1}{\sqrt{2}}=\frac{\sqrt{2}}{2}$ → Verdadero. Verify on the manual how it is entered: CATALOG > … or the TOOLS key; the equality/inequality symbols are in a submenu. | Checking a simplified expression or a log/trig identity at the end. |
| `combinatoria` | Combinacions, variacions i factorial | CATALOG > {{Probabilidad}} > nCr, nPr, x!. Example: $\binom{5}{4}$, used in the binomial fitxa `pau-pro-24i-q4`. | Binomial probability, counting. |
| `logaritmes` | Logaritmes en qualsevol base | The `logab` template $\log_a b$; `SHIFT x2` = log₁₀; `SHIFT logab` = ln. Example: $\log_2 32$. | Exponential equations, checking a hand-solved $x=\log_3 7$. |
| `abs` | Valor absolut | Abs (find which menu: CATALOG > {{Análisis func}}? verify). | Distances: the geometry fitxa computes the absolute value by hand; this would show the alternative. |
| `variables` | Guardar un valor en una variable | VARIABLE key, store/recall A–F, x, y, z. **Warning:** David considers storing values a detour in exam-style fitxas. Propose it only as a pure feature fitxa, last priority, and ask. | Long chained computations. |
| `estadistica` | Estadística: mitjana i desviació | App Estadística, 1-variable stats. Probably out of scope for the PAU CT, so ask before writing. | Rare in the PAU CT. |

Recommendation to present to David:
- Core: `definir-fx`, `ans`, `combinatoria`, `logaritmes`, `verificar`.
- Second wave: `taula`, `abs`.
- Ask about `variables` and `estadistica`, and expect him to say no.

### Simulator / screen work needed for block 4

The simulator already handles FUNCTION > Definir f(x) / f(x), CATALOG > Ang/Coord/Sexag, and the VARIABLE list. Missing:

1. **CATALOG > Probabilidad submenu.** Add `G.CATALOG_PROBABILIDAD` with manual-verbatim labels (likely `%`, `x!`, `nPr`, `nCr`, `Ran#`, `RanInt#`; verify the exact order). Add the OK transition in `okAlMenu`, mirroring the Ang/Coord/Sexag one, so that OK on an item writes its token (`\mathrm{C}` / `{}_{n}\mathrm{C}_{r}` style). Choose a TeX form and document it in `VERIFICAR.md`.
2. **CATALOG > Análisis func** (for Abs, if that is where it lives) is the same pattern.
3. **`logab` template.** Currently `logab` is NOT supported without SHIFT (only `SHIFT logab` = `\ln(` is in `ESCRIU_SHIFT`). Add a 2-field template `logab` → `[base, arg]`, TeX `\log_{base}(arg)` (verify the real cursor order: base first, then → to the argument).
4. **Ans continuation.** The simulator already continues with Ans when an operator follows a result. Make sure the TeX it writes (`\mathrm{Ans}\times 2`) matches what you author.
5. **Tabla app.**
   - New LCD screen types are needed: the function-definition screen in the Tabla app, a 3-row parameter screen (Inicio / Fin / Paso) and a table grid (x | f(x) [| g(x)]) with a highlighted cell.
   - Add `Pantalla` types (e.g. `taulaParams`, `taula`) with renderers, update `Pantalla.TIPUS` and the type checks in `proves/comprova.js` → `comprovaPantalla`, and add `G` builders.
   - Simulator transitions can be given with `parcials` at first. Only automate them if several fitxes need them.
   - This is the biggest piece of work in either block, so do it only after David approves `taula`.
6. **Verify mode.** The indicator exists. The entry screen with `=`/`≠`/`<`… and the result screen «Verdadero»/«Falso» need a screen form. A `calc` screen with `resultat: '\\text{Verdadero}'` is probably enough, but verify the real rendering.

---

## 4. Implementation checklist (per block)

1. Get David's approval of the fitxa list (titles, goals and key sequences, in Catalan).
2. Add any missing `G` builders in `js/guions.js`, with manual-verbatim Spanish labels.
3. Extend `js/simulador.js` (new templates, menu transitions). Update its header comment ("Què sap fer").
4. Add the fitxes to `js/fitxes.js`, under a section comment `/* ── FRACCIONS I POTÈNCIES ── */` or `/* ── FUNCIONS ÚTILS PER A LA PAU ── */`, placed in the order of `BLOCS`. Fill in `relacionades` with existing ids, both ways where it makes sense (e.g. add `pot-negativa` to `pau-geo-25s-q4b.relacionades`).
5. Run `KATEX=<katex 0.16.9>/dist node proves/comprova.js` and get «Tot correcte».
6. Check visually with Playwright against `python3 -m http.server`, routing cdnjs KaTeX to a local copy (see `ARCHITECTURE.md` §5):
   - every step fits at the five viewports;
   - the current step is visible in the list;
   - no LCD label is truncated;
   - there are no JS errors;
   - the screen changes after every key.
7. Bump `VERSIO` in `js/motor.js` and every `?v=` in `index.html` and `fitxa.html`. The footer shows the new number.
8. Update the docs:
   - `README.md` (Catalan): the fitxes table.
   - `ARCHITECTURE.md`: §3 if new screen types, §7 roadmap.
   - `VERIFICAR.md`: one row per inferred screen.
9. Deliver the ZIP (repo-root paths) and the upload steps in Catalan, with a commit message with no skip tokens.

## 5. Things not to do

- Do not add descriptions, step counts or intro text to the home page. David removed them on 31/10/2026.
- Do not change the block titles or colours.
- Do not stretch the calculator geometry or touch `js/tecles.js` positions.
- Do not add autoplay, a restart button, step dots, a «Per recordar» box or a third column.
- Do not use functions that exist only on the fx-570/991SP CW.
- Do not write long sequences as one step when they can be split into meaningful sub-steps (≤ 6 keys gets order badges).
