/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/examen.js — Les fitxes del bloc «Abans de l'examen»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El format d'una fitxa és a fitxes/blocs.js.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {IND, ind, calc, marca, config, configCalcul, entradaSortida, unitatAngular,
  formatNumero, normal, reiniciar, format, catalog, angCoordSexag, home, missatge, definicio, menuFuncio,
  probabilidad, tools, catalogVerificar} = M.guions;
const {SEN45, ARREL2_2, D, R, FIX} = M.comu;

M.fitxes.push(

{
  id: 'abans-examen',
  inici: calc(D),
  passos: [
    {tecles: ['1', 'entre', '2', 'exe'], pantalla: marca(calc(D, '1\\div 2', '\\frac{1}{2}'), 'resultat'),
      text: '[calc]Calcula $1\\div 2$: ha de sortir $\\frac{1}{2}$, perquè la calculadora ha de ser en mode {{E Mat/S Mat}}. Si surt 0.5, és en {{E Mat/S Decimal}}: arregla-ho com a la fitxa «Em surt 0.5 en lloc d\'1/2».[/calc]'},
    {tecles: [], pantalla: marca(calc(D, '1\\div 2', '\\frac{1}{2}'), 'ang'),
      text: '[calc]Mira la lletra de la unitat dels angles: D (graus) o R (radians).[/calc] [mat]Si l\'examen té funcions trigonomètriques de $x$, ha de ser R; per a angles en graus, D.[/mat]'},
    {tecles: ['ac'], pantalla: calc(D, '', '', {hist: true}),
      text: '[calc]Prem [[ac]]. A la barra no hi ha d\'haver FIX ni SCI (si n\'hi ha, fitxa «Tot em surt arrodonit») ni ✔ (si n\'hi és, [[tools]] i {{Verificar OFF}}).[/calc]'},
    {tecles: ['settings', 'down'], pantalla: marca(config(1), 'fila-1'),
      text: '[calc]Si els menús no surten en l\'idioma que esperes: [[settings]], {{Config sistema}} i {{Idioma}}. Tria també el mateix idioma a dalt d\'aquesta pàgina («Calculadora en»): així les fitxes et mostraran els mateixos menús.[/calc]'},
    {tecles: ['ac'], pantalla: calc(D, '', '', {hist: true}),
      text: '[calc]Prem [[ac]] per tornar a la pantalla de càlcul. Ja pots començar l\'examen.[/calc]'},
  ],
  araTu: {
    enunciat: 'Una sola operació ho comprova gairebé tot: calcula $\\cos 60$. Què ha de sortir per a un examen amb angles en graus?',
    resultat: '\\frac{1}{2}',
    error: 'Començar l\'examen si surt 0.5 (la calculadora és en mode {{E Mat/S Decimal}}) o −0.9524129804 (és en radians: és el cosinus de 60 radians).',
    inici: calc(D),
    passos: [
      {tecles: ['cos', '6', '0', 'rpar', 'exe'], pantalla: marca(calc(D, '\\cos(60)', '\\frac{1}{2}'), 'resultat'),
        text: '[calc][[cos]], el 60, [[rpar]] i [[exe]]: $\\frac{1}{2}$. La calculadora és en graus i en mode {{E Mat/S Mat}}.[/calc]'},
    ],
  },
  relacionades: ['indicadors', 'mode-decimal', 'fix', 'canvia-radians', 'verificar'],
},

);

})(Models.obre());
