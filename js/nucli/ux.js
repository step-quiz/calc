/* ═══════════════════════════════════════════════════════════════════
   nucli/ux.js — Palanques d'UX per provar (el laboratori d'UX)
   ───────────────────────────────────────────────────────────────────
   Amb ?ux=a1,b3,… a l'adreça, la pàgina activa unes variants de la
   interfície (les «palanques») que es volen provar abans de decidir
   si passen a ser el comportament de sempre. Sense ?ux=, no canvia
   res: l'alumnat no les veu mai.

   Cada palanca activa posa la classe «ux-<palanca>» a l'element
   <html> (el CSS en fa la resta) i el nucli en pregunta l'estat amb
   UX.te('<palanca>') quan cal canviar com es construeix o s'anima la
   pàgina. Les palanques:
     A1 només el pas actual (la llista sencera, a demanda)
     A2 l'enunciat es plega a una línia en començar
     A3 capçalera mínima: «Escollir calculadora» i l'idioma, dins d'un ⚙
     A4 sense el peu
     B1 les tecles que no són del pas, apagades
     B2 (ja no fa res: les tecles mai no porten números d'ordre)
     B3 sense el cursor: les tecles s'il·luminen quan es premen
     B4 lupa: s'amplia la zona de les tecles mentre es premen
     C1 l'animació espera el temps de lectura de la frase
     C2 primer la frase [mat]; la [calc] surt quan comencen les tecles
     C3 [mat] i [calc] sense fons de color, amb una icona
     C4 la frase del pas, sota la calculadora
     D1 error típic sense tenyir la pàgina
     D2 «Ara tu» / «Prova-ho tu» en una pantalla a part, amb ▶
     E2 la calculadora al mig, la frase del pas a la dreta
     E3 una sola columna (com al mòbil)

   PER_DEFECTE són les palanques triades, que sempre són actives (amb
   ?ux= o sense): l'enunciat plegat (A2), el ⚙ a la capçalera (A3),
   les tecles apagades (B1), [mat] i [calc] amb icona i ratlla (C3) i
   l'«Ara tu» en una pantalla a part (D2). ?ux= hi afegeix les altres.

   Si la pàgina és dins d'un marc (el laboratori) i porta ?ux=, li
   envia l'adreça i el pas actual amb postMessage, perquè el
   laboratori pugui tornar a obrir el mateix pas amb unes altres
   palanques. Models.adreca conserva ?ux= als enllaços.

   No depèn de res. Exporta «UX»: te(p), actives, enLaboratori, avisa(dades).
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

/** Les palanques que David ha triat (al laboratori, combinació «final-1»): ja són el comportament de sempre. */
const PER_DEFECTE = Object.freeze(['a2', 'a3', 'b1', 'c3', 'd2']);
const PALANQUES = Object.freeze(['a1', 'a2', 'a3', 'a4', 'b1', 'b2', 'b3', 'b4', 'c1', 'c2', 'c3', 'c4', 'd1', 'd2', 'e2', 'e3']);

function llegeix() {
  try {
    const q = new URLSearchParams(location.search);
    if (!q.has('ux')) return {hiEs: false, llista: []};
    const llista = (q.get('ux') || '').toLowerCase().split(/[\s,]+/).filter(p => PALANQUES.includes(p));
    return {hiEs: true, llista};
  } catch (e) { return {hiEs: false, llista: []}; }
}

const {hiEs, llista} = typeof location !== 'undefined' ? llegeix() : {hiEs: false, llista: []};
const actives = new Set(PER_DEFECTE.concat(llista));
const dinsDeMarc = (() => { try { return arrel.parent && arrel.parent !== arrel; } catch (e) { return true; } })();

if (typeof document !== 'undefined') for (const p of actives) document.documentElement.classList.add('ux-' + p);

/** Envia al laboratori (la pàgina que conté aquesta dins d'un marc) on som. Només amb ?ux= i dins d'un marc. */
function avisa(dades = {}) {
  if (!hiEs || !dinsDeMarc) return;
  try { arrel.parent.postMessage(Object.assign({font: 'calc-ux', href: location.href}, dades), '*'); } catch (e) { /* sense marc */ }
}

if (typeof addEventListener === 'function') addEventListener('pageshow', () => avisa({tipus: 'pagina'}));

arrel.UX = Object.freeze({PALANQUES, te: p => actives.has(p), get actives() { return [...actives]; }, enLaboratori: hiEs && dinsDeMarc, avisa});

})(globalThis);
