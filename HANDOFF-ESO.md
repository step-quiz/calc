# HANDOFF — ESO stage for the `calc` site (for a cold-start AI)

Written 1/11/2026 at the end of the session that built v30–v35. The repository docs are the source of truth. This file only adds what they do not say yet: the new goal, the design decision David already took, a proposed design to validate with him, and the working conventions from the previous sessions.

**Reading order:** `CLAUDE.md` (house rules), then this file, then `ARCHITECTURE.md` (§2, §3, §3a, §4 and roadmap items 13–18), then `BLOCS-PENDENTS.md` §0 (David's process). Read `VERIFICAR.md` only when you touch a screen. Talk to David in **Catalan**. Write documents aimed at an AI, like this one, in **English**.

---

## 1. Goal

The site teaches Catalan students to use two CASIO calculators: the **fx-82SP CW** (default) and the **fx-82MS 2nd edition**. Everything so far is the **Batxillerat** stage, with real PAU exercises as examples.

David now wants an **ESO stage** on the same site, with the same two calculators. The examples will be, among others:
- **competència matemàtica** tests;
- exams that David will hand over.

These sources are ground truth, the way the PAU pautes were for Batxillerat. Never invent a statement or an official solution.

**David's decision (1/11/2026): one site with a stage axis («opció 1»).**
- One repo, one deployment, the same core and the same two calculator models.
- Only the fitxes and blocks differ by stage.
- The student picks the stage the same way they pick the calculator.
- Rejected:
  - a git branch, because Cloudflare publishes `main` and the core and models would be duplicated;
  - a separate repo, because every calculator fix would have to be done twice.

## 2. State at handoff (v35)

- **Commits:** v30 `225209f` («Ara tu» everywhere), v31 `d67c18a` («Ara tu» commented out in the real-PAU fitxes), then v32–v35, the two-calculator plan phases 1–5.
- **Fitxes:** 31 on the CW and 27 on the MS, 58 in total. The MS lacks `definir-fx`, `barrow`, `verificar` and `pau-ana-25j-q1`, because it has no f(x) and no Verify.
  - **No MS fitxa has an `araTu`** yet.
- **Tests:** `KATEX=… node proves/comprova.js` → «Tot correcte: 35462 comprovacions, 2 calculadores (fx-82SP CW, fx-82MS), 58 fitxes, 351 passos (26 en zona d'error) (amb KaTeX)».
- **Fit check:** `node proves/encaix.js` is new in the repo. On v35 it gives «Tot hi cap: 1227 passos (fx-82sp-cw, fx-82ms; finestres 1366×657, 1280×559, 1280×632)».
- **Loose ends from the Batxillerat work** (none of them blocks the ESO work):
  - `VERIFICAR.md`, fx-82MS part, rows 10–13 are not yet confirmed on the device: replay ◀ cursor and overwrite, how the bottom-line ×10 exponent is drawn, «6C4», and the implicit × in `10(1.5-1)ln 1.5`.
  - It is still open whether `barrow` (block `pau`, a PAU statement) should also have its «Ara tu» commented out. David was asked and never answered.
  - Phase 6 of the two-calculator plan (missing CW content) waits for David's go-ahead. He had rejected Tabla, Estadística and trigonometry for Batxillerat. ESO may change that; ask him.
  - After v32, David had to delete 8 old files: `git rm js/tecles.js js/pantalla.js js/guions.js js/fitxes.js js/simulador.js js/motor.js js/portada.js proves/resultats.js`.
    - Check whether they still exist in the repo; if they do, give him that command.
    - They are harmless, because no page loads them, but they confuse readers.

> **Update (1/11/2026, v36):** David approved §3 and answered §8 (see §9). Phase E1 (the stage axis) is done in v36 and documented in `ARCHITECTURE.md` §3b, which is now the reference; §3 below is kept as the original proposal. Differences from it: one field `etapes` (always an array, never missing; no `etapa` string, no loader default), every page stores the stage it shows, and the «Etapa» selector only appears when two or more stages have fitxes (ESO is reachable with `?etapa=eso` until then).

## 3. Proposed design for the stage axis (validate with David before coding)

Treat this as a proposal: send David a short Catalan summary and wait for his OK, as `BLOCS-PENDENTS.md` §0 requires. It mirrors the calculator axis built in v34.

**Ids and catalogue**
- Stages: `batx` (default; the current content) and `eso`.
- They are declared next to the models in `models/cataleg.js`, e.g. `Models.etapes([{id: 'batx', nom: 'Batxillerat', lema: 'Matemàtiques · Batxillerat · PAU'}, {id: 'eso', nom: 'ESO', lema: '…'}])`.
- This is site configuration, not calculator knowledge, so the core may read it. The core must still never name a key or a menu.

**Where the stage lives in the data**
- On the block, not on each fitxa: `M.blocs[i].etapa = 'batx' | 'eso'`.
- If David wants a block shown in both stages (for example basic fractions), it gets `etapes: ['eso', 'batx']`.
- Fitxes get their stage through their `bloc`.
- ESO data files go in `models/<id>/fitxes/eso/<bloc>.js` and are listed in `model.js` `fitxers`.
- Existing blocks get `etapa: 'batx'`, or the loader defaults a missing value to `batx`. Decide which, and test it.

**Ids stay unique per model across both stages**
- So `fitxa.html?id=…` still finds the fitxa without knowing the stage.
- The existing rule still holds: the same topic gets the same id on both calculators, and a shared id sits in the same block. It therefore sits in the same stage, and switching calculator keeps you on the same fitxa.

**Choosing and remembering the stage**
- `Preferencies.etapa()` / `desaEtapa()` store the stage under the localStorage key `calc-etapa`, inside try/catch like the others.
- `Models.etapaActual()` = `?etapa=` if valid, else the stored stage, else the first.
- `Models.adreca` gains the stage and omits default values, so every link already shared (Batxillerat, CW) stays valid.
- Consider moving `adreca` to an options object `{model, fitxa, etapa}`; update every call site and the test.

**Home page (`js/nucli/portada.js`, `index.html`)**
- An «Etapa» `<select>` next to «La teva calculadora» inside `.tries`.
- The page shows only the blocks of the current stage.
- `<title>`, the `meta description`, the `.nom-bloc` line («Matemàtiques · Batxillerat · PAU») and the h1 depend on the stage.
  - Today they are hard-coded to Batxillerat in `index.html`, `fitxa.html` and `portada.js`, and `README.md` says the same.
- The small-bubble blocks (`petit: true`, «Abans de l'examen») are filtered by stage too.

**Fitxa page (`js/nucli/motor.js`)**
- The stage is the fitxa's block stage.
- If the block has two stages, use the current one from the URL or the stored choice.
- It feeds the back link (`← Calculadora` → that stage's home page, `#<bloc>`) and the calculator selector, which must keep the stage.
- No stage selector inside a fitxa unless David asks for one.

**Tests (`proves/comprova.js`)**
- Every block has a valid stage or stages.
- Every stage in the catalogue that has blocks has at least one fitxa, or it shows «Properament», as now.
- `adreca` round-trips and omits the defaults.
- All current invariants hold for ESO fitxes unchanged.
- `proves/encaix.js` already reads the fitxes from the browser (`Models.carrega(model).dades.FITXES`), so it covers ESO automatically. Add an `ETAPA` filter only if useful.

**Docs:** README (in Catalan, for David), ARCHITECTURE (new §3b and a roadmap item), CLAUDE.md («This repository» paragraph: Batxillerat + ESO).

**Gate for this refactor:** no visible change for Batxillerat, as in v32.
- Tests pass, `encaix.js` passes, and the Batxillerat home page and fitxas look identical apart from the new selector.
- The ESO stage first appears empty, or with its block titles and «Properament».
- Bump `VERSIO` to 36 and every `?v=`.

## 4. ESO content (David decides everything; propose, then build)

**Sources**
- Ask David for the competència matemàtica tests and the exams, as files, before proposing fitxes.
- Each source needs its official statement and solution. Treat its answer key or correction criteria like the PAU pautes.

**Process**, the same as for Batxillerat (`BLOCS-PENDENTS.md` §0):
1. Propose a list of blocks.
2. For each block, propose 3 or 4 fitxes, each with a title, a one-line goal and the key sequence.
3. Build one block at a time and deliver a ZIP.
4. David reviews the layout of each fitxa.

**Topics likely useful in ESO** — candidates to propose, not decided:
- order of operations;
- fractions and mixed numbers;
- percentages, including successive increases and discounts;
- powers and scientific notation;
- square and n-th roots;
- rounding and reading the display;
- proportionality;
- Pythagoras;
- basic trigonometry (4t);
- statistics: mean and standard deviation.
  - The CW has the Estadística app and the MS has SD mode, but the simulators model neither. That would be new simulator and screen work.
  - Ask David first: he rejected statistics for Batxillerat.
- checking the solution of an equation or a system by substitution. Neither calculator has a solver, so never imply one.

**Reuse**
- Several Batxillerat blocks are basic: `exacte`, `fraccions`, `angles`.
- Ask David whether ESO should show some of them (`etapes: ['eso', 'batx']`) or get its own, simpler versions with new ids.

**«Ara tu»**
- In Batxillerat every non-PAU fitxa has one, and the 12 real-PAU fitxes have it commented out (v31).
- Ask David what he wants for ESO, in particular for fitxes built on real competence-test or exam items.

**Wording:** the students are 12 to 16 years old. Keep statements and step sentences shorter and simpler than in Batxillerat. Same notation rules (§5).

**Both calculators**
- Write each ESO fitxa for the CW and, where possible, for the MS with the same id.
- MS limits: no f(x), no Verify, a linear editor, and the (−) key for negatives. It has SD mode, if statistics is approved.
- A fitxa may exist on one calculator only; the site already handles that with its «No hi ha cap fitxa … per a la fx-82MS» message.

## 5. Rules carried over (some are only in this file)

**Process**
- Propose before implementing; David wants to see the idea before tokens are spent.
- Deliver phase by phase.
- When David asks for two phases at once, do them in one delivery.

**Realism**
- Show the calculator as a student would really use it in an exam: the shortest sensible sequence.
- No detours such as storing values in variables, on the MS too. There, re-evaluate with replay ◀ and overwrite.
- No pointless steps.

**Size**
- At most about 10 steps per fitxa; 5–8 is ideal.
- Statements of about 2–3 lines; step sentences of 1–2 lines.
- Every step must fit at 1366×657 without scroll.

**Negatives:** on the CW, use the ordinary − key (`menys`), never SHIFT (−). On the MS, use the (−) key (`neg`); the MS test enforces it.

**Notation in texts**
- «sin» in texts, «sen» only as the key or LCD label.
- A point for what is typed or shown on the calculator; a comma for written maths.
- No € inside TeX (KaTeX warns); write «euros».

**Exact results (CW)**
- The first exact result of a fitxa must mention {{E Mat/S Mat}} and what decimal mode would show. The test enforces it.
- Decimal answers use SHIFT EXE (≈).

**MS display**
- Norm 1 by default.
- 10 digits counting the leading 0 of 0.…
- In ab/c, a fraction greater than 1 is shown mixed (`1┘7┘12`).
- Compute every display value with `models/fx-82ms/calcul.js`; never by hand.

**Error zone:** steps that show a wrong use carry `error: true`, and the first one starts with `!!Error típic!!`.

**Layout:** two columns, 15/40/30/15. No header title, no «Per recordar» box, no autoplay, no clickable keys.

**Delivery**
- Deliver a ZIP whose root is the repo root, containing only the changed and new files.
- David uploads it at GitHub → `_uploads/` → *Add file* → *Upload files*, and the workflow unpacks it.
- Deleted files cannot travel in a ZIP. Give David the exact `git rm` command, with numbered steps.
- Commit messages look like `Versió 36: …` and must **never** contain `[skip ci]`, `[ci skip]` or `[cf-pages-skip]`.
- Tell David to check the green tick in *Actions* and the footer «Versió N».

**Before delivering**
- `node proves/comprova.js` with KaTeX, plus `node proves/encaix.js` when fitxes or layout change.
- Report both results to David.
- Update the docs in the same change.

## 6. Environment notes for the new session

- **Getting the code:** the session needs the repo. Either it is attached from GitHub, or David uploads a ZIP of the current `main` and you unpack it.
  - The working repo in the previous sessions had no git remote, so ZIP + `_uploads/` was the only way back.
- **KaTeX for the tests:** `npm install katex@0.16.9` in a scratch folder, then `KATEX=<that folder>/node_modules/katex/dist node proves/comprova.js`.
- **Playwright:** `proves/encaix.js` needs `require('playwright')` and its Chromium; in Anthropic's cloud container both are preinstalled. The script serves the repo itself, so no separate server is needed.
- **Screenshots:** for visual review, Playwright screenshots of `fitxa.html?id=<id>&model=<model>&pas=<n>` are the quickest way. Send them to David when the layout is new.

## 7. Suggested phase plan (propose to David; he may reorder)

1. **E1:** the stage axis, as in §3. No visible change for Batxillerat; ESO is empty or «Properament». Version 36.
2. **E2:** David hands over the first sources. Propose the ESO block list and the first block's fitxes.
3. **E3 and later:** one block per delivery, CW and MS together. Extend the simulator or the screens when a topic needs it, for example statistics, if approved.

## 8. Questions to ask David at the start (in Catalan; at most a few at a time)

1. Is the §3 design OK?
   - stage on the block;
   - `?etapa=eso`;
   - selector on the home page;
   - Batxillerat as default.
2. Which courses: all of ESO or mainly 3r–4t? Which competence tests: the year and the source of the files?
3. Should ESO reuse some Batxillerat blocks (fractions, exact/decimal, degrees/radians), or get its own versions?
4. Do statistics (Estadística on the CW, SD on the MS) and basic trigonometry come in for ESO?
5. «Ara tu» in ESO: everywhere, or not in the fitxes built on real test or exam items (as with PAU)?
6. What do the home page's line, its title and the `<title>` say for ESO? For example «Matemàtiques · ESO · Competència matemàtica».

## 9. David's answers (1/11/2026)

1. The §3 design is OK (with the refinements in the note above §3).
2. Courses: **3r and 4t ESO**. Source: the competència bàsica tests in the `step-quiz/cb` repo (`preguntes.json` + `data/*.png`: 4t ESO 2022–2026, 2n ESO 2024–2026; statement and question images, `indexCorrecte` from the Departament's key). **Calculators are allowed in those tests**, so the fitxes show real exam use. David asked for activity proposals from `cb`. (`step-quiz/recu`, 1r–3r ESO recovery exams, was also read: text statements with solutions; useful as a secondary source.)
3. ESO gets **its own blocks**, simpler versions with new ids; no Batxillerat block is shared.
4. **No Estadística app and no SD mode** for now: means are typed in Calcular. **Trigonometry (4t) is in.**
5. **No «Ara tu» in ESO** for now.
6. Texts as proposed: lema «Matemàtiques · ESO · Competència matemàtica», `<title>` «Calculadora <curt> — Matemàtiques d'ESO».

**Second round (1/11/2026, after the block proposal):** six ESO blocks (David added «Ús dels parèntesis»); trigonometry examples will come from David's own exams; the a–d options are not copied into the statement (the last step names the right option); first block built: «Mitjanes» (v37, `ARCHITECTURE.md` §7 item 20). Next: the other five blocks, one per delivery, proposing the fitxes first. Proposal already shown to David for them: «La pantalla» (7÷4 → 7/4 → ≈ 1.75; reading and rounding 2÷3; the parentheses fitxa moves to «Ús dels parèntesis»), «Percentatges i proporcions» (`cb4-23-q23` ×0.75 → 9; `cb4-23-q24` ÷0.75 → 20; `cb4-24-q7` → 7,5 %; `cb4-23-q26` 34·42/62 ≈ 23), «Pitàgores, àrees i volums» (`cb4-26-q7` √34 ≈ 5,83; `cb4-22-q8` 135π ≈ 424; `cb4-22-q9` with Ans → 4; `cb4-25-q27` 9π/16 ≈ 1,77), «Trigonometria» (degree mode, sin/cos/tan, SHIFT tan = Arctan — new CW simulator work and a `VERIFICAR.md` row —, the radians error).

## 10. How to write an ESO fitxa (David, 1/11/2026; the three Mitjanes fitxes are the few-shot examples)

Copy the shape of `models/fx-82sp-cw/fitxes/eso/mitjanes.js` (and its MS twin). Propose each block's fitxes to David first (title, one-line goal, key sequence, the step sentences), then build.

- **Id and source:** `cb<course>-<yy>-q<question>`; `font: 'CB 4ESO (2026), pregunta 15'`; the statement is only the problem (no source, no a–d options), ≤ 3 lines, data as in the test (a small KaTeX `array` for a table).
- **Sentences:** every step text is a sequence of `[mat]…[/mat]` (the mathematics: what a mean is, why we divide by 80, the answer) and `[calc]…[/calc]` (what to press and what the screen shows). Usually one or two sentences of each kind per step.
- **Fixed wordings:** «Primer escriu …», «Ara fes l'operació [[entre]] 4.», «Prem [[exe]]: obtens el resultat, que és 198.» then `[mat]`«La resposta correcta és que la mitjana és de 198 places ocupades.» With ≈: «Prem [[shift]] [[exe]] (≈): obtens …». Rounded answers: «Arrodonint a les centèsimes, la resposta correcta és que …». Written maths uses a decimal comma (3,8), the calculator a point (3.8).
- **Never** the option letter, and never mention the distractors outside the error zone.
- **Error zone:** the first error step starts with [[ac]] («!!Error típic!!: esborra amb [[ac]] i escriu-ho …»), then a step that shows the wrong result and a `[mat]` sentence saying why it cannot be right («No pot ser: …»).
- **CW exact results:** the first fraction/root/π result says it comes from {{E Mat/S Mat}} and what {{E Mat/S Decimal}} would show; [[shift]] [[exe]] right after a result recomputes it in decimal (confirmed by David).
- **Both calculators**, same id, statement and source; the MS has no fraction template (sums in parentheses) and gives decimals directly.

## 11. State at v39 (1/11/2026, session ended by token limit) — PENDING WORK

David's answers after v38: (1) all OK, the source bubble gets a light-grey background (done: `#eceff3`); (2) error zones only where pedagogically relevant, not in every fitxa; (3) apply the source icon and the M/C sentences to Batxillerat too, everywhere; (4) speeds: «ràpida» 20 % faster, «lenta» 10 % slower (done: factors 0.83 / 1.65 / 2.09 in `motor.js`).

Done in v39: grey bubble, new speeds, the source of the 13 CW + 11 MS real PAU fitxes (and `barrow`) moved from the statement to `font` (test: no statement starts with «PAU », blocks `pau-ag`/`pau-ap` need `font: 'PAU …'`).

**PENDING:** tag every Batxillerat step sentence (408 step texts, 391 distinct, in `models/*/fitxes/*.js`, both calculators, active «Ara tu» included) as `[mat]…[/mat]` or `[calc]…[/calc]`, then extend the test in `proves/comprova.js` (the «a l'ESO, cada frase és [mat]…» check) from ESO blocks to all fitxes. Method used: extract the `text: '…'` raw literals (skip `/* … */` comments), split into sentences outside `$…$`, `[[…]]`, `{{…}}`, `!!…!!`, pre-tag C when a sentence has keys, menus or words like prem/escriu/surt/pantalla/calculadora/mode, review every text by hand, merge consecutive same-tag sentences, write back by replacing the raw literal. Keep wording; only split. Then screenshots, `encaix.js`, docs (README, ARCHITECTURE item 22), version 40.
