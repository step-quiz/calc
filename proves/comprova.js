/* ═══════════════════════════════════════════════════════════════════
   proves/comprova.js — Comprova el nucli i totes les calculadores
   ───────────────────────────────────────────────────────────────────
   Ús (des de l'arrel del repositori):
       node proves/comprova.js
   Si hi ha KaTeX 0.16.9 a mà, també comprova que totes les fórmules es
   dibuixen sense errors:
       KATEX=/camí/a/katex/dist node proves/comprova.js
   (per exemple, després de «npm install katex@0.16.9» en una carpeta
   qualsevol: KATEX=<carpeta>/node_modules/katex/dist)

   Per a CADA model del catàleg (models/cataleg.js), carregat com al
   navegador (model.js i els seus fitxers, en ordre):
     · el contracte (Models.tanca) i el descriptor;
     · els blocs i les fitxes: ids únics, bloc existent, camps obligatoris;
     · cada pas: tecles del model, text, error (zona d'error) true o absent,
       apartats marcats a l'enunciat;
     · els textos: les [[tecles]] existeixen, els $ i {{ }} estan tancats;
     · les relacionades apunten a fitxes que existeixen;
     · el simulador: una pantalla per tecla, i el que s'escriu coincideix
       amb la pantalla final de cada pas (també als «Ara tu»);
     · les proves pròpies del model (models/<id>/proves.js): les pantalles,
       les traduccions, el teclat, els resultats…;
     · (amb KATEX) cada fórmula dels textos.
   I del web: el nucli (js/nucli/ i css/estil.css) no coneix cap
   calculadora, i els «?v=» de les pàgines coincideixen amb Models.VERSIO.
   ═══════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const arrel = path.join(__dirname, '..');
const context = {console};
context.globalThis = context;
vm.createContext(context);
const executa = f => vm.runInContext(fs.readFileSync(path.join(arrel, f), 'utf8'), context, {filename: f});

let katex = null;
if (process.env.KATEX) {
  const fitxer = path.join(process.env.KATEX, 'katex.js');
  katex = require(fs.existsSync(fitxer) ? fitxer : process.env.KATEX);
}

let errors = 0, comprovacions = 0;
const error = (on, missatge) => { errors++; console.error(`✗ ${on}: ${missatge}`); };
const ok = (condicio, on, missatge) => { comprovacions++; if (!condicio) error(on, missatge); return condicio; };
const compta = n => { comprovacions += n; };

/** Una fórmula: KaTeX l'ha de poder dibuixar (opcions = les del model, si en té). */
function comprovaTeX(tex, on, opcions = {}) {
  if (!katex || !tex) return;
  comprovacions++;
  try {
    katex.renderToString(tex, Object.assign({}, opcions, {throwOnError: true}));
  } catch (e) {
    error(on, `KaTeX no pot dibuixar «${tex}»: ${e.message}`);
  }
}

/* ── El nucli i el catàleg ─────────────────────────────────────────── */

executa('js/nucli/models.js');
executa('models/cataleg.js');
const {Models} = context;
ok(Models.ids.length > 0, 'models/cataleg.js', 'el catàleg és buit');

/* El nucli no coneix cap calculadora: no fa servir els noms globals d'abans (Tecles, Pantalla, G, Dades, Simulador)
   ni cap id de tecla entre cometes (els tipus de tecla, com 'shift', sí que hi poden ser). */
const NUCLI = fs.readdirSync(path.join(arrel, 'js/nucli')).filter(f => f.endsWith('.js')).map(f => 'js/nucli/' + f);
const nucli = NUCLI.map(f => [f, fs.readFileSync(path.join(arrel, f), 'utf8')]);
for (const [f, codi] of nucli) {
  const senseComentaris = codi.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '');
  ok(!/\b(Tecles|Pantalla|Dades|Simulador|G)\.[A-Za-z]/.test(senseComentaris), f, 'el nucli no pot fer servir els mòduls d\'una calculadora (ho ha de demanar al model)');
}

/* ── Cada model ────────────────────────────────────────────────────── */

const models = [];
for (const id of Models.ids) {
  const on = `model ${id}`;
  const carpeta = Models.carpeta(id);
  if (!ok(fs.existsSync(path.join(arrel, carpeta, 'model.js')), on, `falta ${carpeta}model.js`)) continue;
  executa(carpeta + 'model.js');
  const d = Models.descriptor(id);
  if (!ok(d && d.id === id, on, 'model.js no descriu aquest id')) continue;
  ok(typeof d.nom === 'string' && d.nom && typeof d.curt === 'string' && d.curt, on, 'falten el nom i el nom curt');
  ok(d.idiomes === null || (typeof d.idiomes === 'object' && Object.keys(d.idiomes).length > 0), on, 'idiomes ha de ser {codi: nom} o null');
  let tot = true;
  for (const f of d.fitxers.concat(d.estils)) tot = ok(fs.existsSync(path.join(arrel, carpeta, f)), on, `falta el fitxer ${f}`) && tot;
  ok(d.estils.length > 0, on, 'el model ha de portar el seu full d\'estil (estils)');
  if (!tot) continue;
  for (const f of d.fitxers) executa(carpeta + f);
  let M;
  try { M = Models.tanca(id); comprovacions++; } catch (e) { error(on, e.message); continue; }
  models.push(M);

  // Les tecles de prefix: la capa és un nom curt (fa la classe «prefix-<capa>» del teclat)
  for (const [t, def] of Object.entries(M.tecles.TECLES)) {
    if (def.prefix !== undefined) ok(/^[a-z]+$/.test(def.prefix), on, `la tecla ${t}: prefix ha de ser un nom en minúscules`);
  }
  // L'estil del nucli no dibuixa cap tecla concreta ni cap tipus de tecla d'aquest model (això va a models/<id>/estil.css)
  {
    const css = fs.readFileSync(path.join(arrel, 'css/estil.css'), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
    for (const m of css.matchAll(/\.t-([a-z0-9]+)\b/g)) ok(!M.tecles.existeix(m[1]), 'css/estil.css', `parla de la tecla «${m[1]}» de ${id}`);
    for (const m of css.matchAll(/\.tecla-([a-z]+)\b/g)) ok(false, 'css/estil.css', `parla del tipus de tecla «${m[1]}» (va a l'estil del model)`);
    ok(!/\.prefix-/.test(css), 'css/estil.css', 'els rètols d\'una capa (.prefix-…) van a l\'estil del model');
  }

  // Cap id de tecla d'aquest model al nucli
  const tipus = new Set(Object.values(M.tecles.TECLES).map(t => t.tipus));
  for (const [f, codi] of nucli) {
    for (const t of Object.keys(M.tecles.TECLES)) {
      if (tipus.has(t) || t.length < 2) continue;
      ok(!new RegExp(`['"\`]${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"\`]`).test(codi), f, `el nucli parla de la tecla «${t}» de ${id}`);
    }
  }

  // Les proves pròpies del model (Node): {comprovaPantalla(p, on), comprova()}
  const eines = {ok, error, compta, comprovaTeX, katex, context};
  const propies = (d.proves || []).map(f => require(path.join(arrel, carpeta, f))(M, eines));
  const comprovaPantalla = (p, on2) => {
    ok(p && typeof p === 'object' && M.pantalla.TIPUS.includes(p.tipus), on2, `pantalla de tipus desconegut (${p && p.tipus})`);
    for (const P of propies) if (P.comprovaPantalla) P.comprovaPantalla(p, on2);
  };

  function comprovaText(t, on2) {
    if (!ok(typeof t === 'string' && t.trim().length > 0, on2, 'falta el text')) return;
    ok((t.match(/\$/g) || []).length % 2 === 0, on2, 'hi ha un $ sense tancar');
    const senseTeX = t.replace(/\$\$[^$]*\$\$/g, '').replace(/\$[^$]*\$/g, '');            // dins d'una fórmula, «}}» és normal
    ok((senseTeX.match(/\{\{/g) || []).length === (senseTeX.match(/\}\}/g) || []).length, on2, '{{ }} sense tancar');
    for (const m of t.matchAll(/\[\[([^\]]+)\]\]/g)) ok(M.tecles.existeix(m[1]), on2, `tecla desconeguda [[${m[1]}]]`);
    for (const m of t.matchAll(/\$\$([^$]+)\$\$|\$([^$]+)\$/g)) comprovaTeX(m[1] || m[2], on2);   // $$…$$ abans que $…$
    ok(!/\[\[[^\]]*$/.test(t), on2, '[[ sense tancar');
  }

  function comprovaPassos(f, on2, enunciat) {
    f.passos.forEach((p, i) => {
      const onPas = `${on2} · pas ${i + 1}`;
      ok(Array.isArray(p.tecles), onPas, 'tecles ha de ser una llista');
      for (const t of p.tecles) ok(M.tecles.existeix(t), onPas, `tecla desconeguda (${t})`);
      // Un pas pot acabar amb una tecla de prefix (SHIFT, ALPHA…) només si és per ensenyar-ne l'indicador (ind.<capa>)
      const darrera = M.tecles.TECLES[p.tecles[p.tecles.length - 1]];
      ok(!darrera || !darrera.prefix || (p.pantalla.ind && p.pantalla.ind[darrera.prefix]), onPas,
        `el pas acaba amb la tecla de prefix «${darrera && darrera.prefix}» (falta la tecla de després)`);
      comprovaPantalla(p.pantalla, onPas);
      comprovaText(p.text, onPas);
      ok(p.tecles.length > 0 || p.pantalla.marca, onPas, 'un pas sense tecles ha de ressaltar alguna cosa (marca)');
      ok(p.error === undefined || p.error === true, onPas, 'error ha de ser true (o no posar-lo)');
      ok((p.text.match(/!!/g) || []).length % 2 === 0, onPas, '!! sense tancar');
      ok(!/!!/.test(p.text) || p.error, onPas, 'l\'avís !!…!! només va en un pas amb error: true');
      if (p.apartat) ok(new RegExp('\\[' + p.apartat + '\\][\\s\\S]*?\\[\\/' + p.apartat + '\\]').test(enunciat), onPas,
        `l'apartat «${p.apartat}» no està marcat a l'enunciat amb [${p.apartat}]…[/${p.apartat}]`);
    });
  }

  const {BLOCS, FITXES} = M.dades;

  /* Blocs */
  const idsBlocs = new Set();
  for (const b of BLOCS) {
    ok(!idsBlocs.has(b.id), `${on} · BLOCS`, `id repetit (${b.id})`);
    idsBlocs.add(b.id);
    ok(/^#[0-9a-f]{6}$/i.test(b.color), `${on} · bloc ${b.id}`, 'color incorrecte');
    ok(b.titol, `${on} · bloc ${b.id}`, 'falta el títol');
  }

  /* Els «Ara tu» amb passos es comproven com una fitxa més (pantalles, simulador, resultats). Comencen amb la calculadora
     com l'ha deixada la fitxa: les f(x) i g(x) definides a la fitxa continuen desades (funcions). */
  const PSEUDO = new Map(FITXES.filter(f => f.araTu && f.araTu.passos).map(f =>
    [f.id, {id: f.id + '-ara-tu', enunciat: f.araTu.enunciat, inici: f.araTu.inici, passos: f.araTu.passos,
      funcions: Object.fromEntries(f.passos.filter(p => p.pantalla.tipus === 'definicio' && p.pantalla.entrada).map(p => [p.pantalla.nom, p.pantalla.entrada]))}]));
  const AMB_ARA_TU = FITXES.concat([...PSEUDO.values()]);

  /* Fitxes */
  const idsFitxes = new Set();
  for (const f of FITXES) {
    const onF = `${on} · fitxa ${f.id}`;
    ok(/^[a-z0-9-]+$/.test(f.id), onF, 'l\'id només pot tenir minúscules, xifres i guions');
    ok(!idsFitxes.has(f.id), onF, 'id repetit');
    idsFitxes.add(f.id);
    ok(idsBlocs.has(f.bloc), onF, `bloc desconegut (${f.bloc})`);
    ok(f.titol, onF, 'falta el títol');
    comprovaText(f.enunciat, onF + ' · enunciat');
    comprovaPantalla(f.inici, onF + ' · inici');
    if (f.araTu) {   // «Ara tu» (v26): enunciat, resultat correcte (TeX), error típic (opcional) i els passos per comprovar-ho
      comprovaText(f.araTu.enunciat, onF + ' · ara tu');
      ok(typeof f.araTu.resultat === 'string' && f.araTu.resultat, onF, 'l\'«Ara tu» ha de portar el resultat correcte');
      comprovaTeX(f.araTu.resultat, onF + ' · ara tu (resultat)');
      if (f.araTu.error) { comprovaText(f.araTu.error, onF + ' · ara tu (error)'); ok(!/!!/.test(f.araTu.error), onF, 'l\'error de l\'«Ara tu» ja porta «Error típic»: sense !!…!!'); }
      if (f.araTu.passos) { comprovaPantalla(f.araTu.inici, onF + ' · ara tu · inici'); comprovaPassos(PSEUDO.get(f.id), onF + ' · ara tu', f.araTu.enunciat); }
    }
    ok(Array.isArray(f.passos) && f.passos.length >= 2, onF, 'calen almenys dos passos');
    comprovaPassos(f, onF, f.enunciat);
  }
  for (const f of FITXES) {
    for (const r of f.relacionades || []) ok(idsFitxes.has(r) && r !== f.id, `${on} · fitxa ${f.id}`, `relacionada desconeguda (${r})`);
  }

  /* El simulador: totes les pantalles intermèdies es poden deduir (o la fitxa les dona) i el que
     s'escriu tecla a tecla coincideix amb la pantalla final de cada pas. */
  for (const f of AMB_ARA_TU) {
    const {pantalles, errors: errorsSim} = M.simulador.pantalles(f);
    comprovacions++;
    for (const e of errorsSim) error(`${on} · fitxa ${f.id} · simulador`, e);
    pantalles.forEach((llista, i) => {
      ok(llista.length === f.passos[i].tecles.length, `${on} · fitxa ${f.id} · pas ${i + 1}`, 'el simulador no dona una pantalla per tecla');
      llista.forEach((p, j) => { if (j < llista.length - 1) comprovaPantalla(p, `${on} · fitxa ${f.id} · pas ${i + 1} · tecla ${j + 1}`); });
    });
  }

  /* Les proves pròpies del model que miren el conjunt (traduccions, teclat, resultats…) */
  for (const P of propies) if (P.comprova) P.comprova({AMB_ARA_TU});
}

/* ── El web ────────────────────────────────────────────────────────── */

/* Versió: tots els .js i .css d'index.html i fitxa.html porten «?v=» igual a Models.VERSIO (els fitxers dels models
   ja el porten, perquè els carrega Models.carrega amb aquest mateix «?v=») */
for (const pag of ['index.html', 'fitxa.html']) {
  const html = fs.readFileSync(path.join(arrel, pag), 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="((?:js|css|models)\/[^"]+)"/g)].map(m => m[1]);
  ok(refs.length > 0, pag, 'no carrega cap fitxer del web');
  for (const r of refs) {
    ok(r.endsWith('?v=' + Models.VERSIO), pag, `${r} ha de portar ?v=${Models.VERSIO}`);
    ok(fs.existsSync(path.join(arrel, r.replace(/\?.*$/, ''))), pag, `${r} no existeix`);
  }
}

if (errors) {
  console.error(`\n${errors} error(s) en ${comprovacions} comprovacions.`);
  process.exit(1);
}
const fitxes = models.reduce((s, M) => s + M.dades.FITXES.length, 0);
const passos = models.reduce((s, M) => s + M.dades.FITXES.reduce((t, f) => t + f.passos.length, 0), 0);
const zona = models.reduce((s, M) => s + M.dades.FITXES.reduce((t, f) => t + f.passos.filter(p => p.error).length, 0), 0);
console.log(`Tot correcte: ${comprovacions} comprovacions, ${models.length} calculadora${models.length === 1 ? '' : 'es'} (${models.map(M => M.curt).join(', ')}), `
  + `${fitxes} fitxes, ${passos} passos (${zona} en zona d'error)`
  + (katex ? ' (amb KaTeX).' : ' (sense KaTeX: per comprovar les fórmules, KATEX=<katex>/dist).'));
