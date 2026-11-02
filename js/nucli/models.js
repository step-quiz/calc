/* ═══════════════════════════════════════════════════════════════════
   nucli/models.js — Els exercicis, les calculadores i les etapes
   ───────────────────────────────────────────────────────────────────
   Una fitxa = un exercici (comú a totes les calculadores) + les tecles
   i les pantalles d'una calculadora.
     exercicis/        els blocs i els exercicis (exercicis/blocs.js en
                       diu el format): Models.defineixBlocs([…]) i
                       Models.afegeixExercicis({…}, …)
     models/<id>/      una calculadora («model»): model.js és el
                       descriptor, Models.descriu({id, nom, curt, idiomes,
                       fitxers, estils, proves}); els altres fitxers
                       omplen el model en construcció:
                       const M = Models.obre(); M.tecles = …;
                       M.pantalla = …; M.guions = …; M.simulador = …;
                       M.fitxes.push({id, inici, passos, …});
                       M.blocs = {<id del bloc>: {titol}} (opcional)
     models/cataleg.js quines calculadores i quines etapes hi ha, i els
                       fitxers d'exercicis (Models.cataleg, Models.etapes,
                       Models.exercicis). La primera calculadora i la
                       primera etapa són les de per defecte.

   El contracte d'una calculadora (Models.tanca el comprova):
     tecles    {TECLES, TECLAT: {alcada, vidre, …}, html(id, opcions), existeix(id), htmlTeclat()}
               TECLES[id] = {etiqueta, nom, tipus, …}; tipus 'num' = xifra o punt
               decimal (s'anima més de pressa); una tecla de prefix (SHIFT,
               ALPHA…) porta prefix: '<capa>'
     pantalla  {html(estat, idioma), TIPUS}; opcional ajusta(element), que el
               nucli crida després de dibuixar la pantalla
     guions    {textCalc(text, idioma)} i els constructors de pantalles de les fitxes
     simulador {pantalles(fitxa) → {pantalles, errors}}
   El nucli (js/nucli/) només fa servir el contracte: no coneix cap tecla
   ni cap menú. L'aspecte de cada calculadora és a models/<id>/estil.css.

   Exporta «Models».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/**
 * Versió de la web. Quan es canvia qualsevol .js o .css, s'ha d'augmentar aquí, als «?v=» d'index.html i
 * fitxa.html i al peu d'index.html (la prova ho comprova): així cap navegador no fa servir fitxers vells.
 * Els fitxers dels exercicis i dels models es carreguen amb aquest mateix «?v=».
 */
const VERSIO = '62';

/** Les parts que ha de donar cada model, amb les funcions o els camps que el nucli hi fa servir. */
const CONTRACTE = Object.freeze({
  tecles: ['TECLES', 'TECLAT', 'html', 'existeix', 'htmlTeclat'],
  pantalla: ['html', 'TIPUS'],
  guions: ['textCalc'],
  simulador: ['pantalles'],
});

let ids = [];                       // el catàleg, en ordre
let fitxersExercicis = [];          // exercicis/…, en ordre
let blocsComuns = [];               // Models.defineixBlocs
const exercicis = new Map();        // id → exercici
const descriptors = {};             // id → descriptor (model.js)
const enObres = {};                 // id → model en construcció
const tancats = {};                 // id → model acabat (congelat)

function cataleg(llista) { ids = llista.slice(); }

/** Els fitxers d'exercicis (relatius a exercicis/), en ordre: models/cataleg.js. */
function exercicisFitxers(llista) { fitxersExercicis = llista.slice(); }

function defineixBlocs(llista) { blocsComuns = llista.map(b => Object.freeze(Object.assign({}, b, {etapes: Object.freeze(b.etapes.slice())}))); }

function afegeixExercicis(...llista) {
  for (const e of llista) {
    if (!e || !e.id) throw new Error('Models.afegeixExercicis: un exercici sense id');
    if (exercicis.has(e.id)) throw new Error(`Models.afegeixExercicis: l'exercici «${e.id}» està repetit`);
    exercicis.set(e.id, Object.freeze(Object.assign({}, e)));
  }
}

function descriu(d) {
  if (!d || !d.id) throw new Error('Models.descriu: falta l\'id');
  descriptors[d.id] = Object.freeze(Object.assign({idiomes: null, estils: [], proves: []}, d));
}

/**
 * El model que s'està carregant ara: els fitxers d'un model no porten l'id escrit (Models.obre()), així els d'una
 * calculadora els pot reaprofitar una altra que només hi canvia el que és diferent (vegeu models/fx-570sp-cw/). Al
 * navegador, l'id és el de l'script que s'executa (data-model, el posa script()); a les proves, Models.carregant(id).
 */
let enCarrega = null;
function carregant(id) { enCarrega = id; }
function modelDeLScript() {
  const s = typeof document !== 'undefined' && document.currentScript;
  return (s && s.dataset && s.dataset.model) || enCarrega;
}

/** El model en construcció (el fan servir els fitxers del model en carregar-se; sense id, el que s'està carregant). */
function obre(id = modelDeLScript()) {
  if (!id) throw new Error('Models.obre: no se sap quin model s\'està carregant');
  if (!enObres[id]) enObres[id] = {fitxes: []};
  return enObres[id];
}

/**
 * Acaba el model: comprova el contracte, ajunta cada fitxa amb el seu exercici (la fitxa mana) i ho congela tot.
 * Torna el model.
 */
function tanca(id) {
  if (tancats[id]) return tancats[id];
  const d = descriptors[id], m = enObres[id];
  if (!d || !m) throw new Error(`El model «${id}» no s'ha carregat`);
  for (const [part, camps] of Object.entries(CONTRACTE)) {
    if (!m[part]) throw new Error(`El model «${id}» no té «${part}»`);
    for (const c of camps) if (m[part][c] === undefined) throw new Error(`El model «${id}»: a «${part}» li falta «${c}»`);
  }
  const canvis = m.blocs || {};
  const BLOCS = blocsComuns.map(b => Object.freeze(Object.assign({}, b, canvis[b.id] || {})));
  const FITXES = m.fitxes.map(f => {
    const e = exercicis.get(f.id);
    if (!e) throw new Error(`El model «${id}»: la fitxa «${f.id}» no té exercici (exercicis/)`);
    return Object.freeze(Object.assign({}, e, f));
  });
  tancats[id] = Object.freeze({
    id: d.id, nom: d.nom, curt: d.curt, idiomes: d.idiomes,
    tecles: m.tecles, pantalla: m.pantalla, guions: m.guions, simulador: m.simulador,
    dades: Object.freeze({BLOCS: Object.freeze(BLOCS), FITXES: Object.freeze(FITXES)}),
  });
  return tancats[id];
}

const carpeta = id => 'models/' + id + '/';

function parametre(nom) {
  try { return new URLSearchParams(location.search).get(nom); } catch (e) { return null; }
}

/**
 * El model d'aquesta pàgina: ?model=<id> si existeix; si no, el que l'alumne va triar (Preferencies, si s'ha
 * carregat); si no, el primer del catàleg (el de per defecte).
 */
function idActual() {
  const p = parametre('model');
  if (ids.includes(p)) return p;
  const desat = typeof Preferencies !== 'undefined' ? Preferencies.model() : null;
  return ids.includes(desat) ? desat : ids[0];
}

/* ── Les etapes: Batxillerat i ESO ─────────────────────────────────
   Cada bloc diu a quines etapes surt (bloc.etapes); una fitxa és de l'etapa del seu bloc. La portada només
   ensenya els blocs de l'etapa triada. */

let etapesWeb = [];                 // [{id, nom, titol, descripcio}], en ordre; la primera, la de per defecte

function etapes(llista) { etapesWeb = Object.freeze(llista.map(e => Object.freeze(Object.assign({}, e)))); }

/** Una etapa (el descriptor) o null. */
const etapa = id => etapesWeb.find(e => e.id === id) || null;

/**
 * L'etapa d'aquesta pàgina: ?etapa=<id> si existeix; si no, l'última que l'alumne va veure (Preferencies, si
 * s'ha carregat); si no, la primera (la de per defecte).
 */
function etapaActual() {
  const p = parametre('etapa');
  if (etapa(p)) return p;
  const desada = typeof Preferencies !== 'undefined' ? Preferencies.etapa() : null;
  return etapa(desada) ? desada : etapesWeb[0].id;
}

/** D'una llista d'etapes (les d'un bloc), la que toca ara: l'actual si hi és; si no, la primera de la llista. */
const etapaDe = llista => (llista.includes(etapaActual()) ? etapaActual() : llista[0]);

/**
 * Les etapes que surten al selector de la portada per a un model: les que hi tenen alguna fitxa, en l'ordre del
 * catàleg, i l'actual encara que no en tingui (així, amb ?etapa=eso, es pot veure i tornar enrere). Una etapa sense
 * cap fitxa no surt: l'alumnat no veu una etapa buida.
 */
function etapesVisibles(M) {
  const actual = etapaActual();
  const blocsAmbFitxes = new Set(M.dades.FITXES.map(f => f.bloc));
  const ambFitxes = new Set(M.dades.BLOCS.filter(b => blocsAmbFitxes.has(b.id)).flatMap(b => b.etapes));
  return etapesWeb.filter(e => e.id === actual || ambFitxes.has(e.id));
}

/**
 * L'adreça de la portada (sense fitxa) o d'una fitxa: {model, etapa, fitxa}. Els paràmetres model i etapa només hi
 * van si no són els de per defecte: així els enllaços d'abans (Batxillerat, fx-82SP CW) no canvien.
 */
function adreca({model, etapa: e, fitxa} = {}) {
  const q = new URLSearchParams();
  if (model && model !== ids[0]) q.set('model', model);
  if (e && etapesWeb.length && e !== etapesWeb[0].id) q.set('etapa', e);
  if (fitxa) q.set('id', fitxa);
  const s = q.toString();
  return (fitxa ? 'fitxa.html' : 'index.html') + (s ? '?' + s : '');
}

/** Els descriptors de tots els models del catàleg (per al selector de calculadora): carrega els model.js que faltin. */
async function descriptorsTots() {
  await Promise.all(ids.filter(id => !descriptors[id]).map(id => script(carpeta(id) + 'model.js')));
  return ids.map(id => descriptors[id]);
}

/** Carrega un script (en ordre, gràcies a async = false) amb el «?v=» de la versió; model = el model que omple. */
function script(src, model) {
  return new Promise((resol, falla) => {
    const s = document.createElement('script');
    s.src = src + '?v=' + VERSIO;
    if (model) s.dataset.model = model;
    s.async = false;
    s.onload = () => resol();
    s.onerror = () => falla(new Error('No s\'ha pogut carregar ' + src));
    document.head.append(s);
  });
}

/** Carrega un full d'estil (després dels que ja hi ha: el del model mana sobre el del nucli) amb el «?v=» de la versió. */
function estil(href) {
  return new Promise((resol, falla) => {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = href + '?v=' + VERSIO;
    l.onload = () => resol();
    l.onerror = () => falla(new Error('No s\'ha pogut carregar ' + href));
    document.head.append(l);
  });
}

/**
 * Carrega el model (per defecte, el d'aquesta pàgina): el descriptor i, després, els exercicis, els fitxers del
 * model i els seus estils (es dibuixa quan tot és a punt, sense parpelleig). Torna una promesa del model.
 */
async function carrega(id = idActual()) {
  if (tancats[id]) return tancats[id];
  if (!descriptors[id]) await script(carpeta(id) + 'model.js');
  const d = descriptors[id];
  const comuns = exercicis.size ? [] : fitxersExercicis.map(f => script('exercicis/' + f));
  await Promise.all(comuns.concat(d.fitxers.map(f => script(carpeta(id) + f, id)), d.estils.map(f => estil(carpeta(id) + f))));
  return tanca(id);
}

/**
 * Eines per dibuixar el teclat (les fan servir els models a htmlTeclat): totes les mesures en cqw, és a dir,
 * en percentatge de l'amplada de la calculadora.
 *   caixa(classe, {x, y, w, h})  un rectangle (marc, creu…) amb la cantonada de dalt a l'esquerra a (x, y);
 *   cel({x, y, w, h}, html)      el lloc d'una tecla: un rectangle w × h centrat a (x, y) (vegeu .cel a estil.css).
 */
const dibuix = Object.freeze({
  caixa: (classe, q) => `<div class="${classe}" style="left:${q.x}cqw;top:${q.y}cqw;width:${q.w}cqw;height:${q.h}cqw"></div>`,
  cel: (q, html) => `<div class="cel" style="left:${q.x}cqw;top:${q.y}cqw;--w:${q.w}cqw;--h:${q.h}cqw">${html}</div>`,
});

/** Un model ja carregat (o null). */
const model = id => tancats[id] || null;

arrel.Models = Object.freeze({VERSIO, CONTRACTE, cataleg, descriu, obre, tanca, carrega, idActual, model, carpeta, dibuix, adreca, descriptorsTots,
  exercicis: exercicisFitxers, defineixBlocs, afegeixExercicis, carregant,
  get fitxersExercicis() { return fitxersExercicis.slice(); }, exercici: id => exercicis.get(id) || null,
  get ids() { return ids.slice(); }, descriptor: id => descriptors[id] || null,
  etapes, etapa, etapaActual, etapaDe, etapesVisibles, get llistaEtapes() { return etapesWeb.slice(); }});

})(globalThis);
