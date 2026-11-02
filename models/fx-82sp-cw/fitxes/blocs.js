/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/blocs.js — Peces comunes de les fitxes de la fx-82SP CW
   ───────────────────────────────────────────────────────────────────
   Els blocs i els exercicis (títol, enunciat…) són a exercicis/. Aquí
   hi ha el que fan servir les fitxes de diversos blocs (M.comu).

   Una fitxa d'aquesta calculadora (fitxes/<bloc>.js, M.fitxes.push):
     id         el de l'exercici (exercicis/<bloc>.js)
     inici      la pantalla del pas 0 (com està la calculadora abans de començar)
     passos     [{tecles, pantalla, text, error, apartat, parcials}]
                tecles   ids de tecles.js, en ordre ('shift' afecta la tecla següent);
                         [] si el pas només explica la pantalla (llavors, pantalla.marca)
                pantalla com queda la pantalla després de l'última tecla (guions.js)
                text     [mat]…[/mat] i [calc]…[/calc] (vegeu exercicis/blocs.js)
                error    true si el pas ensenya un ús erroni («zona d'error»). Si abans hi
                         havia un resultat, el primer pas de l'error comença amb [[ac]]
                apartat  la lletra de l'apartat de l'enunciat que es resol ([a]…[/a])
                parcials {índex de tecla: pantalla}, per a les pantalles intermèdies que
                         simulador.js no sap deduir
     relacionades  ids d'altres fitxes de la mateixa etapa (opcional)
     araTu      (opcional) exercici semblant amb passos: {enunciat, resultat (TeX), error,
                inici, passos}; la calculadora conserva les f(x) i g(x) de la fitxa
   I, si cal, qualsevol camp de l'exercici que hagi de ser diferent en aquesta calculadora.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {IND, ind} = M.guions;

/** Fórmules i indicadors que fan servir les fitxes de diversos blocs (com els escriu la pantalla). */
M.comu = Object.freeze({
  SEN45: '\\mathrm{sen}(45)',
  ARREL2_2: '\\frac{\\sqrt{2}}{2}',
  D: IND.D, R: IND.R,
  FIX: ind(IND.D, {fix: true}),
});

})(Models.obre('fx-82sp-cw'));
