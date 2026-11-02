/* ═══════════════════════════════════════════════════════════════════
   models/fx-570sp-x2/fitxes/mostra.js — Fitxes de mostra de la fx-570/991SP X II
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. El format d'una fitxa és a models/fx-82sp-cw/fitxes/blocs.js
   (és el mateix) i les normes d'ESO, a ARCHITECTURE.md, «Writing fitxes».
   Quatre exercicis d'ESO (els exercicis són a exercicis/eso/), fets amb
   les tecles d'aquesta calculadora, per revisar el dibuix, la pantalla,
   el simulador i els menús numerats abans de fer-ne la resta:
     · cb4-26-q15  la mitjana de l'hotel: parèntesis i =;
     · cb4-24-q8   les estrelles: la plantilla de fracció i S⇔D;
     · eso-quadrat-negatiu  la tecla (−) i x²;
     · eso-posa-graus       SHIFT MENU (CONFIG) i els menús numerats.
   Les diferències amb la fx-82SP CW: la tecla = (id «exe»), el signe
   negatiu és la tecla (−) (id «neg») i els menús es trien amb el número.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D, R} = M.comu;
const X2 = M.x2;

const HOTEL = '(168+154+210+260)\\div 4';
const HOTEL_ERROR = '168+154+210+260\\div 4';
const ESTRELLES_NUM = '5\\times 22+4\\times 32+3\\times 16+2\\times 8+1\\times 2';
const ESTRELLES = `\\frac{${ESTRELLES_NUM}}{80}`;
const ARBRE = '12\\tan(35)';

M.fitxes.push(

{
  id: 'cb4-26-q15',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', '1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'rpar'], pantalla: calc(D, '(168+154+210+260)'),
      text: '[mat]La mitjana és la suma dividida entre el nombre de setmanes.[/mat] [calc]Primer escriu la suma entre parèntesis: [[lpar]] 168 + 154 + 210 + 260 [[rpar]].[/calc]'},
    {tecles: ['entre', '4'], pantalla: calc(D, HOTEL),
      text: '[calc]Ara fes l\'operació [[entre]] 4.[/calc] [mat]Gràcies als parèntesis, es divideix tota la suma entre 4.[/mat]'},
    {tecles: ['exe'], pantalla: marca(calc(D, HOTEL, '198'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 198.[/calc] [mat]La resposta correcta és que la mitjana és de 198 places ocupades.[/mat]'},
    {error: true, tecles: ['ac', '1', '6', '8', 'mes', '1', '5', '4', 'mes', '2', '1', '0', 'mes', '2', '6', '0', 'entre', '4'],
      pantalla: calc(D, HOTEL_ERROR, '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis, $168+154+210+260\\div 4$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, HOTEL_ERROR, '597'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 597.[/calc] [mat]No pot ser: són més places que les de qualsevol setmana. Sense parèntesis, la divisió es fa abans que les sumes, i només s\'ha dividit el 260 entre 4.[/mat]'},
  ],
},
{
  id: 'cb4-24-q8',
  inici: calc(D),
  passos: [
    {tecles: ['frac', '5', 'per', '2', '2', 'mes', '4', 'per', '3', '2', 'mes', '3', 'per', '1', '6', 'mes', '2', 'per', '8', 'mes', '1', 'per', '2'],
      pantalla: calc(D, `\\frac{${ESTRELLES_NUM}}{\\square}`),
      text: '[mat]Cada nombre d\'estrelles es multiplica pel nombre de clients que l\'han donat, i se sumen tots els productes.[/mat] [calc]Prem [[frac]] i escriu la suma al numerador.[/calc]'},
    {tecles: ['down', '8', '0'], pantalla: calc(D, ESTRELLES),
      text: '[mat]Hi ha 80 clients: la suma es divideix entre 80.[/mat] [calc]Baixa al denominador amb [[down]] i escriu 80. La barra de la fracció fa de parèntesi: es divideix tota la suma.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ESTRELLES, '\\frac{19}{5}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $\\frac{19}{5}$. Surt en fracció perquè la calculadora està configurada per donar resultats exactes; si estigués configurada per donar decimals, sortiria 3.8.[/calc]'},
    {tecles: ['sd'], pantalla: marca(calc(D, ESTRELLES, '3.8'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[sd]]: la fracció passa a decimal, 3.8. Si la tornes a prémer, torna a sortir la fracció.[/calc] [mat]La resposta correcta és que la mitjana és de 3,8 estrelles.[/mat]'},
  ],
},
{
  id: 'eso-quadrat-negatiu',
  inici: calc(D),
  passos: [
    {tecles: ['lpar', 'neg', '3', 'rpar'], pantalla: calc(D, '(-3)'),
      text: '[mat]El quadrat de −3 és $(-3)\\cdot(-3)=9$: el signe també s\'eleva al quadrat.[/mat] [calc]Escriu el −3 entre parèntesis: [[lpar]] [[neg]] 3 [[rpar]]. El signe negatiu és la tecla [[neg]], no la de restar.[/calc]'},
    {tecles: ['x2'], pantalla: calc(D, '(-3)^{2}'),
      text: '[calc]Prem [[x2]] per elevar-lo al quadrat.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '(-3)^{2}', '9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és 9.[/calc] [mat]La resposta correcta és $(-3)^2=9$.[/mat]'},
    {error: true, tecles: ['ac', 'neg', '3', 'x2'], pantalla: calc(D, '-3^{2}', '', {hist: true}),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i escriu-ho sense parèntesis: [[neg]] 3 [[x2]].[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '-3^{2}', '-9'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens −9.[/calc] [mat]No és el quadrat de −3: sense parèntesis, el quadrat només afecta el 3, i el signe es posa després: $-3^2=-(3^2)=-9$.[/mat]'},
  ],
},
{
  id: 'eso-posa-graus',
  inici: calc(R),
  passos: [
    {error: true, tecles: ['1', '2', 'tan', '3', '5', 'rpar'], pantalla: calc(R, ARBRE),
      text: '[calc]!!Error típic!!: amb la R a la barra, escriu 12 [[tan]] 35 [[rpar]], com a l\'exercici de l\'arbre.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(R, ARBRE, '5.685776645'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 5.685776645.[/calc] [mat]No és l\'altura de l\'arbre: la calculadora ha entès 35 radians, no 35°.[/mat]'},
    {tecles: ['shift', 'menu'], pantalla: X2.config(),
      text: '[calc]Ho arreglem. Prem [[shift]] i [[menu]] (a sobre hi ha CONFIG): el menú de configuració. Les opcions es trien prement el seu número.[/calc]'},
    {tecles: ['2'], pantalla: X2.unitat(),
      text: '[calc]Prem 2: {{2:Unidad angular}}.[/calc]'},
    {tecles: ['1'], pantalla: marca(calc(D, '', '', {hist: true}), 'ang'),
      text: '[calc]Prem 1: {{1:Grado sexag (D)}}, els graus. La calculadora torna a la pantalla de calcular, i a la barra ara hi ha D.[/calc]'},
    {tecles: ['1', '2', 'tan', '3', '5', 'rpar'], pantalla: calc(D, ARBRE, '', {hist: true}),
      text: '[calc]Torna a escriure 12 [[tan]] 35 [[rpar]].[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ARBRE, '8.402490459'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens 8.402490459.[/calc] [mat]Ara sí: l\'arbre fa uns 8,4 m d\'alt.[/mat]'},
  ],
},

);

})(Models.obre());
