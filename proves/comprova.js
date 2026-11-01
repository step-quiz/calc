/* ═══════════════════════════════════════════════════════════════════
   proves/comprova.js — Comprova les dades de les fitxes
   ───────────────────────────────────────────────────────────────────
   Ús (des de l'arrel del repositori):
       node proves/comprova.js
   Si hi ha KaTeX 0.16.9 a mà, també comprova que totes les fórmules es
   dibuixen sense errors:
       KATEX=/camí/a/katex/dist node proves/comprova.js
   (per exemple, després de «npm install katex@0.16.9» en una carpeta
   qualsevol: KATEX=<carpeta>/node_modules/katex/dist)

   Comprova:
     · els blocs i les fitxes: ids únics, bloc existent, camps obligatoris;
     · cada pas: tecles existents, pantalla d'un tipus conegut, text, error (zona d'error) true o absent;
     · els menús: la fila triada existeix; com a molt un ◉;
     · els textos: les [[tecles]] existeixen, els $ i {{ }} estan tancats;
     · les relacionades apunten a fitxes que existeixen;
     · els resultats de les pantalles, tornant-los a calcular (proves/resultats.js);
     · (amb KATEX) cada fórmula de les pantalles i dels textos.
   ═══════════════════════════════════════════════════════════════════ */
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const arrel = path.join(__dirname, '..');
const context = {console};
context.globalThis = context;
vm.createContext(context);

let katex = null;
if (process.env.KATEX) {
  const fitxer = path.join(process.env.KATEX, 'katex.js');
  katex = require(fs.existsSync(fitxer) ? fitxer : process.env.KATEX);
}
for (const f of ['js/tecles.js', 'js/pantalla.js', 'js/guions.js', 'js/fitxes.js', 'js/simulador.js']) {
  vm.runInContext(fs.readFileSync(path.join(arrel, f), 'utf8'), context, {filename: f});
}
const {Tecles, Pantalla, Dades, Simulador, G} = context;

let errors = 0, comprovacions = 0;
const error = (on, missatge) => { errors++; console.error(`✗ ${on}: ${missatge}`); };
const ok = (condicio, on, missatge) => { comprovacions++; if (!condicio) error(on, missatge); return condicio; };

function comprovaTeX(tex, on) {
  if (!katex || !tex) return;
  comprovacions++;
  try {
    katex.renderToString(tex, Object.assign({}, Pantalla.OPCIONS_KATEX, {throwOnError: true}));
  } catch (e) {
    error(on, `KaTeX no pot dibuixar «${tex}»: ${e.message}`);
  }
}

function comprovaText(t, on) {
  if (!ok(typeof t === 'string' && t.trim().length > 0, on, 'falta el text')) return;
  ok((t.match(/\$/g) || []).length % 2 === 0, on, 'hi ha un $ sense tancar');
  const senseTeX = t.replace(/\$\$[^$]*\$\$/g, '').replace(/\$[^$]*\$/g, '');            // dins d'una fórmula, «}}» és normal
  ok((senseTeX.match(/\{\{/g) || []).length === (senseTeX.match(/\}\}/g) || []).length, on, '{{ }} sense tancar');
  for (const m of t.matchAll(/\[\[([^\]]+)\]\]/g)) ok(Tecles.existeix(m[1]), on, `tecla desconeguda [[${m[1]}]]`);
  for (const m of t.matchAll(/\$([^$]+)\$/g)) comprovaTeX(m[1], on);
  ok(!/\[\[[^\]]*$/.test(t), on, '[[ sense tancar');
}

function comprovaPantalla(p, on) {
  if (!ok(p && Pantalla.TIPUS.includes(p.tipus), on, `pantalla de tipus desconegut (${p && p.tipus})`)) return;
  if (p.tipus === 'calc') {
    ok(p.ind && typeof p.ind === 'object', on, 'falten els indicadors');
    ok(!p.ind.ang || ['D', 'R', 'G'].includes(p.ind.ang), on, `unitat d'angle desconeguda (${p.ind.ang})`);
    ok(!(p.ind.fix && p.ind.sci), on, 'FIX i SCI alhora');
    if (!p.linia) { comprovaTeX(p.entrada, on + ' (entrada)'); comprovaTeX(p.resultat, on + ' (resultat)'); }
    ok(!p.marca || ['mat', 'ang', 'fix', 'sci', 'shift', 'hist', 'simp', 'verif', 'entrada', 'resultat'].includes(p.marca), on, `marca desconeguda (${p.marca})`);
    if (p.marca && Pantalla.INDICADORS.includes(p.marca)) ok(p.ind[p.marca], on, `es marca l'indicador ${p.marca}, però no hi és`);
    if (p.marca === 'hist') ok(p.ind.hist, on, 'es marca ▲, però no hi és');
  } else if (p.tipus === 'menu') {
    ok(Array.isArray(p.files) && p.files.length > 0, on, 'menú buit');
    ok(Number.isInteger(p.sel) && p.sel >= 0 && p.sel < p.files.length, on, `fila triada fora del menú (${p.sel})`);
    ok(p.files.filter(f => f.radio === 'on').length <= 1, on, 'més d\'un ◉');
    // Fase 2 (v24): el simulador navega pels menús per l'id i la clau de cada fila, mai pel text
    if (ok(p.id && G.MENUS[p.id], on, `menú sense id conegut (${p.id}): fes-lo amb els constructors de guions.js`)) {
      ok(p.files.every((f, k) => f.clau === G.MENUS[p.id][k][0]), on, `les files del menú ${p.id} no coincideixen amb G.MENUS`);
    }
    for (const f of p.files) ok(typeof f.t === 'string' && f.t.length > 0, on, 'fila sense text');
  } else if (p.tipus === 'home') {
    ok(p.sel >= 0 && p.sel < 4, on, 'aplicació triada fora de la pantalla HOME');
  } else if (p.tipus === 'definicio') {
    ok(/^[fg]$/.test(p.nom), on, 'la funció ha de ser f o g');
    comprovaTeX(p.nom + '(x)=' + (p.entrada || ''), on + ' (definició)');
  } else if (p.tipus === 'variables') {
    ok(Array.isArray(p.valors) && p.valors.length === 9, on, 'la llista de variables ha de tenir les 9 variables');
    ok(p.valors.some(([n]) => n === p.sel), on, `variable triada desconeguda (${p.sel})`);
  } else if (p.tipus === 'missatge') {
    ok(Array.isArray(p.linies) && p.linies.length > 0, on, 'missatge sense text');
  }
  // Que es pugui dibuixar (sense KaTeX, Pantalla escriu el TeX tal qual)
  ok(typeof Pantalla.html(p) === 'string', on, 'Pantalla.html falla');
}

/* Blocs */
const idsBlocs = new Set();
for (const b of Dades.BLOCS) {
  ok(!idsBlocs.has(b.id), 'BLOCS', `id repetit (${b.id})`);
  idsBlocs.add(b.id);
  ok(/^#[0-9a-f]{6}$/i.test(b.color), `bloc ${b.id}`, 'color incorrecte');
  ok(b.titol, `bloc ${b.id}`, 'falta el títol');
}

/* Menús de G.MENUS: claus úniques dins de cada menú */
for (const [id, files] of Object.entries(G.MENUS)) {
  ok(new Set(files.map(f => f[0])).size === files.length, `menú ${id}`, 'claus repetides');
}

/* Calculadora en català (fase 3): cada text de menú i cada {{…}} dels textos ha de tenir traducció a G.CATALA */
for (const [id, files] of Object.entries(G.MENUS)) {
  for (const f of files) ok(Object.prototype.hasOwnProperty.call(G.CATALA, f[1]), `menú ${id}`, `«${f[1]}» no té traducció al català (G.CATALA)`);
}
for (const f of Dades.FITXES) {
  const textos = [f.enunciat, ...f.passos.map(p => p.text)].concat(f.araTu ? [f.araTu.enunciat, f.araTu.error || '', ...(f.araTu.passos || []).map(p => p.text)] : []);
  for (const t of textos) {
    for (const m of String(t).replace(/\$[^$]*\$/g, '').matchAll(/\{\{([^}]+)\}\}/g)) {
      ok(Object.prototype.hasOwnProperty.call(G.CATALA, m[1]), `fitxa ${f.id}`, `{{${m[1]}}} no té traducció al català (G.CATALA)`);
    }
  }
}

/* Els «Ara tu» amb passos es comproven com una fitxa més (pantalles, simulador, resultats) */
const PSEUDO = new Map(Dades.FITXES.filter(f => f.araTu && f.araTu.passos).map(f =>
  [f.id, {id: f.id + '-ara-tu', enunciat: f.araTu.enunciat, inici: f.araTu.inici, passos: f.araTu.passos,
    // les f(x) i g(x) definides a la fitxa continuen desades a la calculadora durant l'«Ara tu»
    funcions: Object.fromEntries(f.passos.filter(p => p.pantalla.tipus === 'definicio' && p.pantalla.entrada).map(p => [p.pantalla.nom, p.pantalla.entrada]))}]));
const AMB_ARA_TU = Dades.FITXES.concat([...PSEUDO.values()]);

/* Fitxes */
const idsFitxes = new Set();
for (const f of Dades.FITXES) {
  const on = `fitxa ${f.id}`;
  ok(/^[a-z0-9-]+$/.test(f.id), on, 'l\'id només pot tenir minúscules, xifres i guions');
  ok(!idsFitxes.has(f.id), on, 'id repetit');
  idsFitxes.add(f.id);
  ok(idsBlocs.has(f.bloc), on, `bloc desconegut (${f.bloc})`);
  ok(f.titol, on, 'falta el títol');
  comprovaText(f.enunciat, on + ' · enunciat');
  comprovaPantalla(f.inici, on + ' · inici');
  if (f.araTu) {   // «Ara tu» (v26): enunciat, resultat correcte (TeX), error típic (opcional) i els passos per comprovar-ho
    comprovaText(f.araTu.enunciat, on + ' · ara tu');
    ok(typeof f.araTu.resultat === 'string' && f.araTu.resultat, on, 'l\'«Ara tu» ha de portar el resultat correcte');
    comprovaTeX(f.araTu.resultat, on + ' · ara tu (resultat)');
    if (f.araTu.error) { comprovaText(f.araTu.error, on + ' · ara tu (error)'); ok(!/!!/.test(f.araTu.error), on, 'l\'error de l\'«Ara tu» ja porta «Error típic»: sense !!…!!'); }
    if (f.araTu.passos) { comprovaPantalla(f.araTu.inici, on + ' · ara tu · inici'); comprovaPassos(PSEUDO.get(f.id), on + ' · ara tu', f.araTu.enunciat); }
  }
  ok(Array.isArray(f.passos) && f.passos.length >= 2, on, 'calen almenys dos passos');
  comprovaPassos(f, on, f.enunciat);
}
function comprovaPassos(f, on, enunciat) {
  f.passos.forEach((p, i) => {
    const onPas = `${on} · pas ${i + 1}`;
    ok(Array.isArray(p.tecles), onPas, 'tecles ha de ser una llista');
    for (const t of p.tecles) ok(Tecles.existeix(t), onPas, `tecla desconeguda (${t})`);
    // Un pas pot acabar amb ⇧ només si és per ensenyar la S de la barra
    ok(p.tecles[p.tecles.length - 1] !== 'shift' || (p.pantalla.ind && p.pantalla.ind.shift), onPas,
      'el pas acaba amb ⇧ (falta la tecla de després)');
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
/* Mode E Mat/S Mat (David, 31/10/2026): un alumne pot tenir la calculadora en mode decimal. A cada fitxa, el primer
   resultat exacte (fracció, arrel o π) ha d'anar amb una frase que digui que surt així pel mode {{E Mat/S Mat}}
   (en aquell pas o abans). */
for (const f of Dades.FITXES) {
  let dit = /E Mat\/S Mat/.test(f.enunciat);
  f.passos.forEach((p, i) => {
    if (/E Mat\/S Mat/.test(p.text)) dit = true;
    const exacte = p.pantalla.tipus === 'calc' && /\\frac|\\sqrt|\\pi/.test(p.pantalla.resultat || '');
    if (exacte && !dit) error(`fitxa ${f.id} · pas ${i + 1}`, 'primer resultat exacte: cal dir que surt així pel mode {{E Mat/S Mat}}');
    if (exacte) dit = true;
    comprovacions++;
  });
}

/* El simulador: totes les pantalles intermèdies es poden deduir (o la fitxa les dona) i el que
   s'escriu tecla a tecla coincideix amb la pantalla final de cada pas. */
for (const f of AMB_ARA_TU) {
  const {pantalles, errors: errorsSim} = Simulador.pantalles(f);
  comprovacions++;
  for (const e of errorsSim) error(`fitxa ${f.id} · simulador`, e);
  pantalles.forEach((llista, i) => {
    ok(llista.length === f.passos[i].tecles.length, `fitxa ${f.id} · pas ${i + 1}`, 'el simulador no dona una pantalla per tecla');
    llista.forEach((p, j) => { if (j < llista.length - 1) comprovaPantalla(p, `fitxa ${f.id} · pas ${i + 1} · tecla ${j + 1}`); });
  });
}

for (const f of Dades.FITXES) {
  for (const r of f.relacionades || []) {
    ok(idsFitxes.has(r) && r !== f.id, `fitxa ${f.id}`, `relacionada desconeguda (${r})`);
  }
}

/* La calculadora: cada tecla del catàleg té posició (o és a la peça de pàgina), i cap no en trepitja cap altra */
const T = Tecles.TECLAT;
for (const id of Object.keys(Tecles.TECLES)) {
  const n = (T.tecles[id] ? 1 : 0) + (T.aLaPagina.includes(id) ? 1 : 0);
  ok(n === 1, `tecla ${id}`, 'ha de tenir posició al teclat (o ser a la peça de pàgina), i només una');
}
for (const id of [...Object.keys(T.tecles), ...T.aLaPagina]) ok(Tecles.existeix(id), 'TECLAT', `tecla desconeguda (${id})`);
const posicions = Object.entries(T.tecles);
for (const [id, [x, y, d]] of posicions) {
  ok(x - d / 2 > 0 && x + d / 2 < 100 && y - d / 2 > T.vidre.y + T.vidre.h && y + d / 2 < T.alcada, `tecla ${id}`, 'surt de la calculadora o toca la pantalla');
  for (const [id2, [x2, y2, d2]] of posicions) {
    if (id < id2) ok(Math.hypot(x - x2, y - y2) >= (d + d2) / 2, `tecles ${id} i ${id2}`, 'es trepitgen');
  }
}

/* Versió: tots els .js i .css d'index.html i fitxa.html porten «?v=» igual a VERSIO de motor.js */
{
  const versio = (/const VERSIO = '([^']+)'/.exec(fs.readFileSync(path.join(arrel, 'js/motor.js'), 'utf8')) || [])[1];
  ok(versio, 'motor.js', 'falta VERSIO');
  for (const pag of ['index.html', 'fitxa.html']) {
    const html = fs.readFileSync(path.join(arrel, pag), 'utf8');
    const refs = [...html.matchAll(/(?:src|href)="((?:js|css)\/[^"]+)"/g)].map(m => m[1]);
    for (const r of refs) ok(r.endsWith('?v=' + versio), pag, `${r} ha de portar ?v=${versio}`);
  }
}

/* Els resultats de les pantalles: es tornen a calcular i han de coincidir amb el que hi ha escrit (proves/resultats.js) */
{
  const {comprovats, errors: errorsRes} = require('./resultats.js').comprova({FITXES: AMB_ARA_TU});
  comprovacions += comprovats;
  ok(comprovats > 0, 'resultats', 'no s\'ha comprovat cap resultat');
  for (const e of errorsRes) error('resultat', e);
}

/* Totes les tecles del catàleg es poden dibuixar */
for (const id of Object.keys(Tecles.TECLES)) ok(Tecles.html(id).includes('class="tecla'), `tecla ${id}`, 'no es dibuixa');

if (errors) {
  console.error(`\n${errors} error(s) en ${comprovacions} comprovacions.`);
  process.exit(1);
}
console.log(`Tot correcte: ${comprovacions} comprovacions, ${Dades.FITXES.length} fitxes, ${Dades.FITXES.reduce((s, f) => s + f.passos.length, 0)} passos`
  + ` (${Dades.FITXES.reduce((s, f) => s + f.passos.filter(p => p.error).length, 0)} en zona d'error)`
  + (katex ? ' (amb KaTeX).' : ' (sense KaTeX: per comprovar les fórmules, KATEX=<katex>/dist).'));
