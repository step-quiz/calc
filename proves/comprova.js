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
       cada bloc diu a quines etapes surt (etapes del catàleg), i una fitxa
       relacionada és de la mateixa etapa;
     · cada pas: tecles del model, text, error (zona d'error) true o absent,
       apartats marcats a l'enunciat;
     · els textos: les [[tecles]] existeixen, els $, {{ }}, [mat] i [calc]
       estan tancats; un error comença amb AC si hi havia un resultat; a
       l'ESO, frases [mat]/[calc], font a part i sense parlar de l'opció;
     · les relacionades apunten a fitxes que existeixen;
     · el simulador: una pantalla per tecla, i el que s'escriu coincideix
       amb la pantalla final de cada pas (també als «Ara tu»);
     · les proves pròpies del model (models/<id>/proves.js): les pantalles,
       les traduccions, el teclat, els resultats…;
     · (amb KATEX) cada fórmula dels textos.
   I del web: el nucli (js/nucli/ i css/estil.css) no coneix cap
   calculadora, els «?v=» de les pàgines coincideixen amb Models.VERSIO,
   les etapes del catàleg són correctes, i les adreces (Models.adreca)
   van i tornen i no porten els valors per defecte (v36).
   ═══════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const arrel = path.join(__dirname, '..');
const context = {console, URLSearchParams};   // URLSearchParams: Models.adreca (v36)
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

/* Les etapes (v36): id curt i únic, i els textos de la portada (nom del selector, lema, <title>, descripció) */
const ETAPES = Models.llistaEtapes;
ok(ETAPES.length > 0, 'models/cataleg.js', 'no hi ha cap etapa (Models.etapes)');
{
  const vistes = new Set();
  for (const e of ETAPES) {
    const on = `models/cataleg.js · etapa ${e.id}`;
    ok(/^[a-z]+$/.test(e.id) && !vistes.has(e.id), on, 'l\'id d\'una etapa ha de ser únic i en minúscules');
    vistes.add(e.id);
    for (const camp of ['nom', 'lema', 'titol', 'descripcio']) ok(typeof e[camp] === 'string' && e[camp].trim(), on, `falta «${camp}»`);
  }
}
const ID_ETAPES = new Set(ETAPES.map(e => e.id));

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

  // Opcional (v38): pantalla.ajusta(element), si hi és, és una funció (el nucli la crida després de dibuixar la pantalla)
  ok(M.pantalla.ajusta === undefined || typeof M.pantalla.ajusta === 'function', on, 'pantalla.ajusta ha de ser una funció');

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
    // [mat]…[/mat] i [calc]…[/calc] (v38): tancats, sense niar-se ni barrejar-se
    const marques = [...t.matchAll(/\[(\/?)(mat|calc)\]/g)].map(m => m[1] + m[2]);
    let obert = null, bones = true;
    for (const m of marques) {
      if (!m.startsWith('/')) { if (obert) bones = false; obert = m; } else { if (obert !== m.slice(1)) bones = false; obert = null; }
    }
    ok(bones && !obert, on2, '[mat]…[/mat] o [calc]…[/calc] sense tancar o niats');
    ok((t.match(/\[nota\]/g) || []).length === (t.match(/\[\/nota\]/g) || []).length, on2, '[nota]…[/nota] sense tancar');
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
    // L'etapa (v36): sempre escrita, sense valor per defecte; ids del catàleg, sense repetir
    ok(Array.isArray(b.etapes) && b.etapes.length > 0 && b.etapes.every(e => ID_ETAPES.has(e)) && new Set(b.etapes).size === b.etapes.length,
      `${on} · bloc ${b.id}`, `etapes ha de ser una llista d'etapes del catàleg (${[...ID_ETAPES].join(', ')}), sense repetir`);
  }
  const etapesBloc = new Map(BLOCS.map(b => [b.id, Array.isArray(b.etapes) ? b.etapes : []]));

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
    for (const r of f.relacionades || []) {
      if (!ok(idsFitxes.has(r) && r !== f.id, `${on} · fitxa ${f.id}`, `relacionada desconeguda (${r})`)) continue;
      // Una relacionada és de la mateixa etapa (v36): l'alumne d'ESO no salta sense voler a una fitxa de Batxillerat
      const altra = FITXES.find(g => g.id === r);
      ok((etapesBloc.get(f.bloc) || []).some(e => (etapesBloc.get(altra.bloc) || []).includes(e)), `${on} · fitxa ${f.id}`,
        `la relacionada ${r} és d'una altra etapa`);
    }
  }

  // Les etapes del selector de la portada: les que tenen alguna fitxa (i l'actual)
  {
    const ambFitxes = new Set(FITXES.flatMap(f => etapesBloc.get(f.bloc) || []));
    const visibles = Models.etapesVisibles(M).map(e => e.id);
    ok(visibles.every(e => ambFitxes.has(e) || e === Models.etapaActual()) && [...ambFitxes].every(e => visibles.includes(e)),
      `${on} · etapes`, `el selector d'etapa hauria d'oferir ${[...ambFitxes].join(', ')} (ofereix ${visibles.join(', ')})`);
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

  /* v38 (David, 1/11/2026): un error comença sempre esborrant la pantalla. Si la pantalla d'abans mostra un resultat, la
     primera tecla del primer pas d'un error no pot començar a escriure un càlcul nou (amb el resultat bo encara a la vista). */
  for (const f of AMB_ARA_TU) {
    const {pantalles} = M.simulador.pantalles(f);
    f.passos.forEach((p, i) => {
      if (!p.error || (i > 0 && f.passos[i - 1].error) || !pantalles[i] || !pantalles[i].length) return;
      const abans = i ? f.passos[i - 1].pantalla : f.inici;
      const primera = pantalles[i][0];
      // el cursor de text de la CW (\htmlClass{cursor-tex}{…}) no és res escrit
      const escrit = e => String(e || '').replace(/\\htmlClass\{cursor-tex\}\{(?:[^{}]|\{[^{}]*\})*\}/g, '').trim();
      if (abans && abans.tipus === 'calc' && abans.resultat && primera && primera.tipus === 'calc')
        ok(!(escrit(primera.entrada) && !primera.resultat && primera.entrada !== abans.entrada), `${on} · fitxa ${f.id} · pas ${i + 1}`,
          'un error comença amb AC: si no, el resultat bo es queda a la pantalla mentre s\'escriu l\'error');
    });
  }

  /* Les fitxes d'ESO i les d'exercicis reals (v38, David, 1/11/2026): la font va a «font» (una icona davant de l'enunciat),
     no a l'enunciat; a l'ESO, cada frase d'un pas és [mat]…[/mat] o [calc]…[/calc], i cap text no parla de l'opció bona. */
  for (const f of FITXES) {
    const onF = `${on} · fitxa ${f.id}`;
    // La figura de l'enunciat (v46): {src, alt}; la imatge és al repositori, a img/
    if (f.figura !== undefined) ok(f.figura && typeof f.alt !== 'object' && /^img\/[a-z0-9/_.-]+\.(png|svg|jpg)$/.test(f.figura.src || '')
      && fs.existsSync(path.join(arrel, f.figura.src)) && typeof f.figura.alt === 'string' && f.figura.alt.trim(), onF, 'figura ha de ser {src: \'img/…\' (un fitxer que existeixi), alt: \'…\'}');
    if (f.font !== undefined) ok(typeof f.font === 'string' && f.font.trim() && !/[$[\]{}!]/.test(f.font), onF, 'font ha de ser un text pla');
    // v42: si l'últim pas és un error, el motor hi afegeix «Activitat finalitzada» amb la pantalla esborrada (M.pantalla.buida)
    const darrer = f.passos[f.passos.length - 1];
    if (darrer.error && ok(typeof M.pantalla.buida === 'function', onF, 'cal pantalla.buida per al pas final després d\'un error'))
      comprovaPantalla(M.pantalla.buida(darrer.pantalla), onF + ' · pas «Activitat finalitzada»');
    const cb = /^cb(\d)-(\d\d)-q(\d+)$/.exec(f.id);
    if (cb) {
      ok(f.font === `CB ${cb[1]}ESO (20${cb[2]}), pregunta ${cb[3]}`, onF, `la font ha de ser «CB ${cb[1]}ESO (20${cb[2]}), pregunta ${cb[3]}»`);
      ok(!/Competències bàsiques/i.test(f.enunciat), onF, 'la font no va a l\'enunciat (va a «font»)');
    }
    // Els exercicis PAU reals (v39, David): «PAU juny 2024, qüestió 2 a)» va a «font», no al començament de l'enunciat
    ok(!/^PAU /.test(f.enunciat), onF, 'la font («PAU …») no va a l\'enunciat (va a «font»)');
    if (['pau-ag', 'pau-ap'].includes(f.bloc)) ok(typeof f.font === 'string' && /^PAU /.test(f.font), onF, 'un exercici PAU real porta «font: \'PAU …\'»');
    // A tot el web (v40, David): cada frase d'un pas, també de l'«Ara tu», és [mat]…[/mat] o [calc]…[/calc]
    for (const [nom, passos] of [['', f.passos], [' · ara tu', (f.araTu && f.araTu.passos) || []]]) passos.forEach((p, i) => {
      const fora = String(p.text).replace(/\[(mat|calc)\][\s\S]*?\[\/\1\]/g, '');
      ok(/\[(mat|calc)\]/.test(p.text) && !fora.trim(), `${onF}${nom} · pas ${i + 1}`, 'cada frase és [mat]…[/mat] o [calc]…[/calc]');
    });
    if (!(etapesBloc.get(f.bloc) || []).includes('eso')) continue;
    for (const t of [f.enunciat, ...f.passos.map(p => p.text)]) ok(!/(^|[^\p{L}])opci[óo](?!\p{L})/iu.test(t), onF, 'no es parla de l\'opció bona ni dels distractors');
  }

  /* Les proves pròpies del model que miren el conjunt (traduccions, teclat, resultats…) */
  for (const P of propies) if (P.comprova) P.comprova({AMB_ARA_TU});
}

/* ── Entre calculadores ─────────────────────────────────────────────
   El mateix tema, el mateix id (David, 1/11/2026): si dues calculadores tenen una fitxa amb el mateix id, és del
   mateix bloc (en canviar de calculadora, l'alumne es queda a la mateixa fitxa). */
for (let a = 0; a < models.length; a++) {
  for (let b = a + 1; b < models.length; b++) {
    const blocs = new Map(models[a].dades.FITXES.map(f => [f.id, f.bloc]));
    for (const f of models[b].dades.FITXES) {
      if (blocs.has(f.id)) ok(blocs.get(f.id) === f.bloc, `fitxa ${f.id}`, `és al bloc «${blocs.get(f.id)}» a la ${models[a].curt} i al «${f.bloc}» a la ${models[b].curt}`);
    }
    // El mateix bloc, les mateixes etapes (v36): en canviar de calculadora, l'alumne es queda a la mateixa etapa
    const etapes = new Map(models[a].dades.BLOCS.map(bl => [bl.id, String(bl.etapes)]));
    for (const bl of models[b].dades.BLOCS) {
      if (etapes.has(bl.id)) ok(etapes.get(bl.id) === String(bl.etapes), `bloc ${bl.id}`, `té etapes diferents a la ${models[a].curt} i a la ${models[b].curt}`);
    }
  }
}

/* ── Les etapes i les adreces (v36) ─────────────────────────────────
   Models.adreca no posa els valors per defecte (els enllaços d'abans no canvien) i l'adreça torna el que s'hi ha
   posat; Models.etapaActual llegeix ?etapa=, després l'etapa desada (Preferencies) i, si no, la de per defecte. */
{
  const on = 'Models.adreca';
  const [M0, E0] = [Models.ids[0], ETAPES[0].id];
  ok(Models.adreca({}) === 'index.html' && Models.adreca({model: M0, etapa: E0}) === 'index.html', on, 'la portada per defecte ha de ser index.html, sense paràmetres');
  ok(Models.adreca({model: M0, etapa: E0, fitxa: 'ans'}) === 'fitxa.html?id=ans', on, 'una fitxa per defecte ha de ser fitxa.html?id=…');
  if (Models.ids.includes('fx-82ms')) ok(Models.adreca({model: 'fx-82ms', fitxa: 'pot-negativa'}) === 'fitxa.html?model=fx-82ms&id=pot-negativa', on, 'els enllaços de la v35 han de continuar iguals');
  for (const model of Models.ids) for (const e of ETAPES) for (const fitxa of [undefined, 'una-fitxa']) {
    const a = Models.adreca({model, etapa: e.id, fitxa});
    const [pagina, cerca = ''] = a.split('?');
    const q = new URLSearchParams(cerca);
    ok(pagina === (fitxa ? 'fitxa.html' : 'index.html') && (q.get('model') || M0) === model && (q.get('etapa') || E0) === e.id
      && q.get('id') === (fitxa || null) && (model !== M0 || !q.has('model')) && (e.id !== E0 || !q.has('etapa')), on, `${a} no torna {${model}, ${e.id}, ${fitxa}}`);
  }

  // etapaActual i etapaDe, amb una adreça i una memòria de mentida
  const memoria = new Map();
  context.localStorage = {getItem: k => (memoria.has(k) ? memoria.get(k) : null), setItem: (k, v) => memoria.set(k, String(v))};
  executa('js/nucli/preferencies.js');
  const amb = (cerca, desada) => {
    context.location = {search: cerca};
    memoria.clear();
    if (desada) context.Preferencies.desaEtapa(desada);
    return Models.etapaActual();
  };
  const [EA, EB] = [E0, (ETAPES[1] || ETAPES[0]).id];
  ok(amb('', null) === EA, 'Models.etapaActual', 'sense res, la de per defecte');
  ok(amb('?etapa=' + EB, null) === EB, 'Models.etapaActual', '?etapa= mana');
  ok(amb('?etapa=no-existeix', EB) === EB, 'Models.etapaActual', 'una ?etapa= desconeguda es descarta i mana la desada');
  ok(amb('?etapa=' + EA, EB) === EA, 'Models.etapaActual', '?etapa= mana sobre la desada');
  ok(amb('', 'no-existeix') === EA, 'Models.etapaActual', 'una etapa desada desconeguda es descarta');
  amb('?etapa=' + EB, null);
  ok(Models.etapaDe([EA]) === EA && Models.etapaDe([EB, EA]) === EB, 'Models.etapaDe', 'ha de triar l\'actual si el bloc la té i, si no, la primera del bloc');
  delete context.location;
  delete context.localStorage;
  delete context.Preferencies;
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
console.log(`Tot correcte: ${comprovacions} comprovacions, ${models.length} calculador${models.length === 1 ? 'a' : 'es'} (${models.map(M => M.curt).join(', ')}), `
  + `${fitxes} fitxes, ${passos} passos (${zona} en zona d'error)`
  + (katex ? ' (amb KaTeX).' : ' (sense KaTeX: per comprovar les fórmules, KATEX=<katex>/dist).'));
