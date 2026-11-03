/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/examen.js — «Abans de l'examen» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El mateix tema i id que a la CW.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {calc, marca, mode} = M.guions;
const {D} = M.comu;

M.fitxes.push(

{
  id: 'abans-examen',
  enunciat: 'Abans de començar l\'examen, comprova que la calculadora està ben configurada.',
  inici: calc(D),
  passos: [
    {tecles: ['sin', '3', '0', 'igual'], pantalla: marca(calc(D, 'sin 30', '0.5'), 'resultat'),
      text: '[calc]Calcula $\\sin 30$: ha de sortir 0.5 si la calculadora és en graus. Si surt −0.988031624, és en radians.[/calc]'},
    {tecles: [], pantalla: marca(calc(D, 'sin 30', '0.5'), 'ang'),
      text: '[calc]Mira la lletra de la unitat dels angles: D (graus) o R (radians).[/calc] [mat]Si l\'examen té funcions trigonomètriques de $x$, ha de ser R; per a angles en graus, D.[/mat] [calc]Es canvia amb [[mode]] [[mode]] i el número (fitxa «Posa la calculadora en radians»).[/calc]'},
    {tecles: [], pantalla: marca(calc(D, 'sin 30', '0.5'), 'resultat'),
      text: '[calc]A dalt no hi ha d\'haver FIX ni SCI: si el resultat surt 0.50, o 5.00 amb −01 a la dreta, el format està fixat (fitxa «Tot em surt arrodonit»).[/calc]'},
    {tecles: ['mode'], pantalla: mode(1, D),
      text: '[calc]Prem [[mode]]: {{COMP}} és el mode de calcular. Si a dalt hi havia SD o REG, la calculadora era en un mode d\'estadística.[/calc]'},
    {tecles: ['1'], pantalla: calc(D),
      text: '[calc]Prem l\'[[1]], {{COMP}}: tornes a la pantalla de càlcul. Ja pots començar l\'examen.[/calc]'},
  ],
  relacionades: ['indicadors', 'fix', 'canvia-radians'],
},

);

})(Models.obre());
