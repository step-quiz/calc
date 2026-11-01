/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/blocs.js — Els blocs i el format de les fitxes
   ───────────────────────────────────────────────────────────────────
   M.blocs (aquí): els apartats de la portada, en ordre (només id, títol i color: la portada no porta descripcions),
     i etapes: a quines etapes del web surt el bloc (v36; ids de models/cataleg.js): ['batx'], ['eso'] o
     ['eso', 'batx']. Les fitxes són de l'etapa del seu bloc; les d'ESO van a fitxes/eso/<bloc>.js.
   M.comu (aquí): fórmules i indicadors que fan servir les fitxes de diversos blocs.
   Les fitxes, a fitxes/<bloc>.js (M.fitxes.push(…), en l'ordre de la portada). Cada fitxa és un guió pas a pas:
     id         nom a l'adreça: fitxa.html?id=<id>. Si una altra calculadora té una fitxa del mateix tema, el mateix id
     bloc       clau de BLOCS
     titol      títol curt (portada i capçalera)
     font       (opcional, v38) d'on surt un exercici real: «CB 4ESO (2026), pregunta 15». No va a l'enunciat: surt en
                una bombolla en clicar la icona que hi ha davant de l'enunciat (es tanca sola als 8 s)
     enunciat   què farem (es veu al pas 0)
     inici      la pantalla del pas 0 (com està la calculadora abans de començar)
     passos     [{tecles, pantalla, text}]
                tecles   = ids de tecles.js, en ordre ('shift' afecta la tecla següent);
                           [] si el pas només explica la pantalla
                pantalla = com queda la pantalla després de prémer-les (guions.js)
                text     = la frase del pas
                           A l'ESO (v38), cada frase és [mat]…[/mat] (matemàtiques) o [calc]…[/calc] (indicació de
                           calculadora); surten en dos blocs amb lletra i fons diferents
                error    = (opcional) true si el pas ensenya un ús erroni de la calculadora
                           («zona d'error»: mentre és el pas actual, les vores de la pàgina es
                           tornen de color vellut vermell, --vellut a estil.css). Si abans hi havia un resultat,
                           el primer pas de l'error comença amb [[ac]] (v38, David: si no, el resultat bo es queda a
                           la pantalla mentre s'escriu l'error; la prova ho exigeix)
                apartat  = (opcional) la lletra de l'apartat de l'enunciat que es resol: es
                           ressalta a l'enunciat, marcat amb [a]…[/a]
                parcials = (opcional) {índex de tecla: pantalla}, per a les pantalles
                           intermèdies que simulador.js no sap deduir
     relacionades  ids d'altres fitxes (opcional)
     araTu      exercici semblant, al final: {enunciat, resultat (TeX), error (text, sense !!), inici, passos}.
                Els passos són com els de la fitxa; la calculadora conserva les f(x) i g(x) definides a la fitxa.
                Als exercicis PAU (blocs pau-ag i pau-ap) està desactivat, dins d'un comentari (v31, ARCHITECTURE.md, punt 14).

   Als textos: $$TeX$$ = fórmula en una línia pròpia; $TeX$ = fórmula; [[id]] = tecla; {{Text}} = opció d'un menú
   de la calculadora, escrita tal com hi surt; !!Error típic!! = avís d'error, amb fons groc durant 1 s (només en passos amb error: true);
   [mat]…[/mat] i [calc]…[/calc] = frase de matemàtiques i indicació de calculadora (v38).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {IND, ind} = M.guions;

/* Fórmules que surten a diverses fitxes (com les escriu la pantalla) */
const SEN45 = '\\mathrm{sen}(45)';
const ARREL2_2 = '\\frac{\\sqrt{2}}{2}';
const D = IND.D, R = IND.R;
const FIX = ind(D, {fix: true});

/** Per a les fitxes de cada bloc (fitxes/<bloc>.js). */
M.comu = Object.freeze({SEN45, ARREL2_2, D, R, FIX});

M.blocs = Object.freeze([
  {id: 'exacte', titol: 'Treballar en mode \'exacte\' o \'decimal\'', color: '#0c1736', etapes: ['batx']},
  {id: 'fraccions', titol: 'Operar amb fraccions i potències', color: '#0d235e', etapes: ['batx']},
  {id: 'angles', titol: 'Treballar en mode \'graus\' o \'radiants\'', color: '#033d63', etapes: ['batx']},
  {id: 'pau', titol: 'Funcions útils per a la PAU', color: '#876d0d', etapes: ['batx']},
  {id: 'pau-ag', titol: 'Exercicis PAU. Àlgebra i Geometria', color: '#853300', etapes: ['batx']},
  {id: 'pau-ap', titol: 'Exercicis PAU. Anàlisi i Probabilitat', color: '#945600', etapes: ['batx']},
  // Fase 4 (David, 1/11/2026): una bombolla petita a la portada, a part dels 6 blocs (petit: true)
  {id: 'examen', titol: 'Abans de l\'examen', color: '#3d4f1f', etapes: ['batx'], petit: true},
  // ESO (v37, David, 1/11/2026): sis blocs propis (no es comparteix cap bloc amb Batxillerat). Colors: verds i morats
  // foscos, lluny del blau i l'or de Batxillerat i del vellut de la zona d'error (contrast ≥ 7,8 sobre blanc).
  {id: 'eso-pantalla', titol: 'Fracció o decimal. Arrodonir. Notació científica', color: '#0b4a40', etapes: ['eso']},
  {id: 'eso-parentesis', titol: 'Ús dels parèntesis', color: '#0d5c4f', etapes: ['eso']},
  {id: 'eso-percentatges', titol: 'Percentatges i proporcions', color: '#14532d', etapes: ['eso']},
  {id: 'eso-mitjanes', titol: 'Mitjanes', color: '#3b2a6b', etapes: ['eso']},
  {id: 'eso-geometria', titol: 'Pitàgores, àrees i volums', color: '#4f2a73', etapes: ['eso']},
  {id: 'eso-trigonometria', titol: 'Trigonometria', color: '#602f6a', etapes: ['eso']},
]);

})(Models.obre('fx-82sp-cw'));
