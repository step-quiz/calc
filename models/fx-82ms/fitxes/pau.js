/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/pau.js — «Funcions útils per a la PAU» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Els mateixos temes i ids que a la CW, menys els que
   necessiten f(x) o Verificar (definir-fx, barrow, verificar).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {calc, marca} = M.guions;
const {D} = M.comu;

M.fitxes.push(

{
  id: 'ans', bloc: 'pau', titol: 'Reutilitza l\'últim resultat (Ans)',
  enunciat: 'Calcula $\\dfrac{8}{\\sin 35^\\circ}$ amb la calculadora en graus, sense copiar cap decimal intermedi.',
  inici: calc(D),
  passos: [
    {tecles: ['sin', '3', '5'], pantalla: calc(D, 'sin 35'),
      text: 'Primer, $\\sin 35^\\circ$: [[sin]] i el 35.'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'sin 35', '0.573576436'), 'resultat'),
      text: 'Prem [[igual]]. La calculadora desa el resultat a [[ans]] sense arrodonir-lo: la pantalla només en mostra deu xifres.'},
    {tecles: ['8', 'entre', 'ans'], pantalla: calc(D, '8÷Ans'),
      text: 'Ara vols $8\\div\\sin 35^\\circ$. No escriguis el decimal: escriu 8, [[entre]] i la tecla [[ans]].'},
    {tecles: ['igual'], pantalla: marca(calc(D, '8÷Ans', '13.94757436'), 'resultat'),
      text: 'Prem [[igual]]: 13.94757436. Cap decimal copiat, cap error d\'arrodoniment.'},
    {tecles: ['per', '2', 'igual'], pantalla: marca(calc(D, 'Ans×2', '27.89514873'), 'resultat'),
      text: 'Si ara en vols el doble, no cal [[ans]]: després d\'un resultat, una operació com [[per]] ja comença amb Ans.'},
    {error: true, tecles: ['8', 'entre', '0', 'punt', '5', '7', 'igual'], pantalla: marca(calc(D, '8÷0.57', '14.03508772'), 'resultat'),
      text: '!!Error típic!!: copiar només 0.57 en lloc de $\\sin 35^\\circ$. Surt 14.03508772 i no 13.94757436: ja falla el primer decimal.'},
  ],
  relacionades: ['logaritmes', 'exacte-decimal'],
},
{
  id: 'logaritmes', bloc: 'pau', titol: 'Logaritme en qualsevol base',
  enunciat: 'Resol l\'equació $3^x=7$: calcula $x=\\log_3 7$ i comprova el resultat. La fx-82MS no té logaritme en base qualsevol: es fa amb $\\log_3 7=\\dfrac{\\log 7}{\\log 3}$.',
  inici: calc(D),
  passos: [
    {tecles: ['log', '7', 'entre', 'log', '3'], pantalla: calc(D, 'log 7÷log 3'),
      text: 'Escriu $\\log 7\\div\\log 3$: [[log]], el 7, [[entre]], [[log]] i el 3. Cada log s\'aplica al nombre que té darrere.'},
    {tecles: ['igual'], pantalla: marca(calc(D, 'log 7÷log 3', '1.771243749'), 'resultat'),
      text: 'Prem [[igual]]: $x=\\log_3 7\\approx 1{,}7712$. Amb [[ln]] en lloc de [[log]] surt el mateix.'},
    {tecles: ['3', 'pot', 'ans'], pantalla: calc(D, '3^Ans'),
      text: 'Comprova-ho: $3^x$ ha de valer 7. Escriu 3, [[pot]] i [[ans]] (el resultat d\'abans, sense copiar-lo).'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3^Ans', '7'), 'resultat'),
      text: 'Prem [[igual]]: surt 7. ✓'},
    {error: true, tecles: ['log', '7', 'entre', '3', 'igual'], pantalla: marca(calc(D, 'log 7÷3', '0.281699347'), 'resultat'),
      text: '!!Error típic!!: $\\log 7\\div 3$ és $(\\log 7)\\div 3$, no $\\log_3 7$: surt 0.281699347. Al denominador hi va $\\log 3$.'},
  ],
  relacionades: ['ans'],
},
{
  id: 'combinatoria', bloc: 'pau', titol: 'Nombres combinatoris',
  enunciat: 'Una variable $X$ segueix una binomial amb $n=6$ i $p=\\frac{1}{2}$. Calcula $P(X=4)=\\binom{6}{4}\\left(\\frac{1}{2}\\right)^{6}$ sense calcular el nombre combinatori a mà.',
  inici: calc(D),
  passos: [
    {tecles: ['6', 'ncr', '4'], pantalla: calc(D, '6C4'),
      text: 'A la fx-82MS, el nombre combinatori té una tecla pròpia: escriu el 6, prem [[ncr]] i escriu el 4. «6C4» és $\\binom{6}{4}$.'},
    {tecles: ['per', '0', 'punt', '5', 'pot', '6'], pantalla: calc(D, '6C4×0.5^6'),
      text: 'Continua amb [[per]] i $0{,}5^6$: 0.5, [[pot]] i el 6.'},
    {tecles: ['igual'], pantalla: marca(calc(D, '6C4×0.5^6', '0.234375'), 'resultat'),
      text: 'Prem [[igual]]: 0.234375, perquè $\\binom{6}{4}=15$.'},
    {tecles: ['abc'], pantalla: marca(calc(D, '6C4×0.5^6', '15┘64'), 'resultat'),
      text: 'Amb [[abc]], en fracció: $P(X=4)=\\frac{15}{64}$. Amb [[shift]] [[ncr]] hi ha nPr (permutacions) i, amb [[shift]] [[inv]], el factorial.'},
  ],
  relacionades: ['pau-pro-24i-q4', 'pot-fraccio'],
},

);

})(Models.obre('fx-82ms'));
