# HANDOFF — text rewrite of the fitxes (state at v117, 5/11/2026)

For a cold-start AI continuing David's text-rewrite project. Read this, then `ARCHITECTURE.md` §9 «Wording rules (v103)»
(all bullets, they are cumulative and the latest bullet wins), then `HANDOUT.md` (versions log, editor section).

## 1. The user and the workflow
- David, maths teacher (ESO/Batxillerat, Catalonia). **Always answer in Catalan.** Docs for AI in English.
- Questions to David: always with the multiple-choice tool (AskUserQuestion), 2–4 short options, recommended first with
  «(Recomanat)». More than 5–6 decision points → a review artifact (see user preferences), not a long chat text.
- Delivery: a ZIP whose root is the repo root, only the changed files (`git diff --name-only HEAD~1 | zip -q out.zip -@`);
  David uploads it to `_upload/` of the GitHub repo; Cloudflare Pages publishes. Give numbered copy-paste steps and the
  commit message. **Never** put «[skip ci]», «[ci skip]» or «[cf-pages-skip]» in any commit message.
- Every change: bump `VERSIO` in `js/nucli/models.js`, every `?v=` in `index.html` and `fitxa.html`, footer «Versió N»
  in `index.html`, «Current: **N**» in `HANDOUT.md`; add an entry to `CHANGELOG.md` (Catalan) and `HANDOUT.md` (English);
  add the new lessons as a bullet to ARCHITECTURE §9. Current version: **117**.
- Tests (all must pass before delivering):
  - `KATEX=<path>/katex/dist node proves/comprova.js` → «Tot correcte» (install: `npm i katex` in a scratch dir).
  - `FITXES=id1,id2 ERRORS=1 node proves/encaix.js` → «Tot hi cap» (every step fits at 1280×559 etc.). When a step
    does not fit, shorten the text (drop blank lines first, then words) and say so to David.
  - `node proves/ux.js` → «Palanques correctes».

## 2. The «Editor de textos» artifact (where David edits)
- URL https://claude.ai/artifact/MDke3r88osr3RPgPQhaRP6 — slug `a3be977f-abbb-4b6d-8c37-aefbec42f469`, owner David
  (account davidarso1, created v117; capability `db` rules `[{path:"", read:"view", write:"owner"}]`). The old editor
  (GMvQzEgtdG3NSTdgX8QcrX) lives in another account that is no longer usable: ignore it. Republish with publish_files,
  same slug, base_version = latest from get_artifact. A static copy of the published page: `proves/editor-textos/editor-publicat.html`.
- Build: `node proves/editor-textos/construeix.js /tmp/editor.html` (template `plantilla.html` + data from `extreu.js`,
  which reads the current repo texts). Rebuild and republish after every applied batch, **only when David is not
  editing** (ask, or wait until he says he finished).
- Database (persistent, lives in the artifact): collection `canvis`, doc id = fitxa id. Fields: `id, titol, model,
  camps {clau: text}, originals {clau: text}, comentari, actualitzat, [aplicat, aplicatA]`. Keys: `titol`, `enunciat`,
  `tancament`, `provaTu.enunciat`, `provaTu.solucio`, `pas.<n>@<model>` (David uses `fx-82sp-x2`; n is 1-based).
- Read new work: `db_query` on `canvis` ordered by `-actualitzat`; a doc without `aplicat: true` (or with `actualitzat`
  later than the last apply) has new edits. Compare `camps` with `originals` to see exactly what he changed.
  `comentari` = free instructions; texts starting with `##` inside a field are instructions to you
  (e.g. «##elimina aquest pas»).
- After applying: `db_write` merge `{aplicat: true, aplicatA: "versió N del web (d/m/2026)"}` with `ifVersion`.
  **Never delete his docs** (David lost work once; deleting was also refused by the classifier).
- In the new db: `frac-plantilla` (a final point added to the title) was only David testing the editor: do not apply it
  unless he asks. The old db also had `eso-fraccio-decimal` (T1, a line break after the first [calc] sentence) — lost
  with the old account; ask David if he wants it when T1 is rewritten.

## 3. Generators (the source of truth for rewritten blocks)
`proves/redaccio/`: `t3.py` (T3 Proporcionalitat), `t4.py` (T4 Percentatges), `t56.py` (T5 Mitjanes + T6 Geometria),
`t7.py` (T7 Trigonometria), `solmat.py` (wraps «Prova-ho tu» calculations in [mat]), `audit.py` (numbers outside `$`).
Run from the repo root: `python3 proves/redaccio/t7.py .` (idempotent; rewrites `titol`, `enunciat`, `tancament`,
`provaTu` in `exercicis/eso/<block>.js` and every step `text:` in `models/{fx-82sp-cw,fx-570sp-x2,fx-82sp-x2,fx-82ms}/
fitxes/eso/<block>.js`; fx-570sp-cw reuses the CW files). Dicts: `EX*` (statement data), `CW*` (CW step texts),
`X2*` (X II, usually CW with `[[sd]]` instead of SHIFT EXE), `MS*` (fx-82MS: `[[igual]]`, decimals, sometimes
fewer steps). `posaPassos` asserts the number of steps: when David removes/adds a step or changes keys, first edit the
step objects (`tecles`, `pantalla`, `parcials`) in the 4 model files by hand (screens with `calc(D, expr, result)`,
MS screens in plain text like `'18150÷1.21'`), then the generator. Apply David's edits **into the generator**, never
only into the JS, or the next run reverts them.

## 4. Status of the blocks (ESO = T1…T7, ids in `exercicis/blocs.js`)
- T3 Proporcionalitat, T4 Percentatges, T5 Mitjanes, T6 Pitàgores/àrees/volums: rewritten and reviewed by David.
- T7 Trigonometria (`ll4-7-37`, `ll4-7-38`, `ll4-7-39`): reviewed by David, applied in v117 (`eso-posa-graus` deleted
  at his request). Docs `canvis/ll4-7-3*` and `eso-posa-graus` NOT yet marked
  `aplicat`: mark them when the editor is rebuilt and republished (David is editing Batx in it now).
- T1 Pantalla (`eso-pantalla`) and T2 Parèntesis (`eso-parentesis`): not rewritten yet (only the [mat] solutions).
- **Batxillerat / PAU**: David is editing it in the new editor now (after v117). Earlier decisions (E1/E3 in the review): titles and prose-statement rules are
  ESO only; Batx/PAU keep their titles and official statements; the «R)» answer line applies to Batxillerat too;
  `$…$` for all numbers everywhere; thousands with a point everywhere. Ask David (multiple choice) how far the ESO
  rules go in Batx before a big batch, then go block by block, showing each batch in the editor first.

## 5. Wording rules in one page (details and examples in ARCHITECTURE §9)
- Every number in `$…$`, units outside (`$180$ g`); written maths with comma (`$3{,}5$`), typed/shown values with point
  (`$3.5$`); thousands with a point in maths (`$18.150$ €`), none on the calculator (18150); money «$3{,}50$ €»;
  percentages «$25$ %»; `\simeq` for approximations.
- ESO titles: short noun phrase of the situation («L'ombra del campanar»). Statements in prose, paragraphs separated by
  a blank line (situation · what happens · question); `•` lists only for timelines/experiments or several data of the
  same kind; several questions «**a)**», «**b)**» (bold with `**…**`). Realistic contexts close to a 15-year-old,
  believable data; a character's wrong belief may be stated so the fitxa refutes it.
- Estimation step «[mat]Abans de calcular, pensa:\n• …?[/mat]» only when there is something to reflect on (one or two
  questions, may test an impossible value). No error zone if the error is not a real typical one.
- Steps: `[mat]` maths, `[calc]` calculator, instruction first, explanations on new lines; announce an operation with
  «…es calcula així:» / «això:» and the formula on its own line with its name ($V=…$, $h=…$); describe triangles side
  by side with `•`; procedures may be announced in `•` lines; compute totals the student needs.
- Exact results (CW/X II): «Si surt en forma de fracció/d'arrel/amb π és perquè la calculadora està configurada per
  donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $X$.» then the ≃ value.
- Last good step: «[mat]R) <complete sentence answering the question>[/mat]», no filler, «aproximadament» for rounded.
- Error zone: «[calc]!!Error típic!!:\nSi <what goes wrong>: <keys>.[/calc]», result step, then `FRASE_ERROR`
  («La calculadora ha seguit bé les instruccions. El problema és que s'han plantejat malament els càlculs.») for
  reasoning errors, or an own sentence for keying errors («…però sense parèntesis només s'ha dividit…»); closing
  «No té sentit…!» with a concrete, physical reason. `tancament` («[mat]Recorda:\n• <idea in words, 2nd person>\n\n
  <calculation>[/mat]») **only** in fitxes that end with an error zone (test enforces).
- «Prova-ho tu»: second person, `•` or **a)** questions; solution «[mat]<calculations>[/mat]\nR) <first person>».

## 6. First message to David (suggested)
In Catalan: confirm you have the handoff, ask him to tell you when T7 is finished in the editor, then read the db.
