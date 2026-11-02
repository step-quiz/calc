/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/pau-ap.js — «Exercicis PAU. Anàlisi i Probabilitat» (fx-82MS)
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Els mateixos exercicis, enunciats i ids que a la CW,
   menys pau-ana-25j-q1 (calcular f en deu punts sense f(x) és massa
   llarg). Sense f(x), una funció en diversos punts es calcula amb la
   repetició: ◀ torna a l'expressió i només es canvia el nombre (sense
   desar res en variables).
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';

const {calc, marca} = M.guions;
const {D, R} = M.comu;

M.fitxes.push(

{
  id: 'pau-ana-24i-q1',
  inici: calc(D),
  passos: [
    {tecles: ['neg', '2', 'mes', '1', '0', 'lpar', '1', 'punt', '5', 'menys', '1', 'rpar', 'ln', '1', 'punt', '5'], pantalla: calc(D, '-2+10(1.5-1)ln 1.5'),
      text: '[calc]La fx-82MS no pot desar una funció: escriu directament $f(1{,}5)=-2+10(1{,}5-1)\\ln 1{,}5$. El signe del principi és [[neg]]; entre el 10 i el parèntesi, i entre el parèntesi i el ln, no cal [[per]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '-2+10(1.5-1)ln 1.5', '0.027325541'), 'resultat'),
      text: '[calc]Prem [[igual]]: $f(1{,}5)\\approx 0{,}0273>0$.[/calc] [mat]I $f(1)=-2+0=-2<0$, de cap. Com que $f$ és contínua a $[1;\\,1{,}5]$ i canvia de signe, pel teorema de Bolzano hi ha una arrel. ✓[/mat]'},
    {tecles: ['left', 'left', '4'], pantalla: calc(D, '-2+10(1.5-1)ln 1.4'),
      text: '[calc]Ara $f(1{,}4)$, sense tornar-ho a escriure tot. [[left]] torna a l\'expressió, amb el cursor al final; un altre [[left]] el posa sobre l\'últim 5. Escriu el 4: la calculadora escriu a sobre del 5.[/calc]'},
    {tecles: ['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', '4'], pantalla: calc(D, '-2+10(1.4-1)ln 1.4'),
      text: '[calc]Ara el 5 de dins del parèntesi: [[left]] vuit vegades, fins a sobre del 5, i el 4.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '-2+10(1.4-1)ln 1.4', '-0.654111054'), 'resultat'),
      text: '[calc]Prem [[igual]]: $f(1{,}4)\\approx -0{,}654<0$.[/calc] [mat]Hi ha canvi de signe a $[1{,}4;\\,1{,}5]$, un interval d\'una dècima. ✓[/mat]'},
  ],
  relacionades: ['ans'],
},
{
  id: 'pau-ana-25i-q4a',
  inici: calc(D),
  passos: [
    {tecles: ['shift', 'x3', 'lpar', '1', '0', '0', 'entre', 'lpar', '3', 'shift', 'exp', 'rpar', 'rpar'], pantalla: calc(D, '³√(100÷(3π))'),
      text: '[calc]El radi és $r=\\sqrt[3]{\\frac{100}{3\\pi}}$: [[shift]] [[x3]] (l\'arrel cúbica) i, entre parèntesis, $100\\div(3\\pi)$. π és [[shift]] [[exp]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '³√(100÷(3π))', '2.19740255'), 'resultat'),
      text: '[calc]Prem [[igual]]: el radi és $r\\approx 2{,}20$ cm, i la calculadora el desa a [[ans]] amb tots els decimals.[/calc]'},
    {tecles: ['1', '0', '0', 'entre', 'lpar', 'shift', 'exp', 'ans', 'x2', 'rpar'], pantalla: calc(D, '100÷(πAns²)'),
      text: '[calc]L\'altura, $h=\\frac{100}{\\pi r^2}$, sense copiar el radi: 100, [[entre]] i, entre parèntesis, π, [[ans]] i [[x2]].[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '100÷(πAns²)', '6.592207651'), 'resultat'),
      text: '[calc]Prem [[igual]]: l\'altura és $h\\approx 6{,}59$ cm.[/calc]'},
    {tecles: ['3', 'shift', 'exp', 'per', '2', 'punt', '1', '9', '7', '4', 'x2', 'mes', '2', '0', '0', 'entre', '2', 'punt', '1', '9', '7', '4', 'igual'],
      pantalla: marca(calc(D, '3π×2.1974²+200÷2.1974', '136.5248256'), 'resultat'),
      text: '[calc]Ara [[ans]] ja és l\'altura: per a $S(r)$, escriu el radi amb quatre decimals, 2.1974.[/calc] [mat]La superfície mínima és $S\\approx 136{,}52\\,\\text{cm}^2$.[/mat]'},
  ],
  relacionades: ['arrel-n', 'ans'],
},
{
  id: 'pau-ana-25s-q4a',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['mode', 'mode', '2'], pantalla: marca(calc(R), 'ang'),
      text: '[calc]El sinus i el cosinus són d\'una $x$ en metres, no d\'un angle en graus: posa la calculadora en radians. [[mode]] dues vegades ({{Deg}} {{Rad}} {{Gra}}) i el [[2]]. A dalt, R.[/calc]'},
    {apartat: 'a', tecles: ['3', 'sin', 'lpar', 'shift', 'exp', 'entre', '4', 'rpar'], pantalla: calc(R, '3sin (π÷4)'),
      text: '[mat]a) La segona coordenada del punt $C$ és $3\\sin\\frac{\\pi}{4}$.[/mat] [calc]Escriu el 3, [[sin]] i, entre parèntesis, $\\pi\\div 4$ (π és [[shift]] [[exp]]).[/calc]'},
    {apartat: 'a', tecles: ['igual'], pantalla: marca(calc(R, '3sin (π÷4)', '2.121320344'), 'resultat'),
      text: '[calc]Prem [[igual]]: 2.121320344, el decimal de $\\frac{3\\sqrt{2}}{2}$.[/calc] [mat]Així, $C=\\left(\\pi,\\frac{3\\sqrt{2}}{2}\\right)$. I $B=(0,3)$, perquè $3\\cos 0=3$.[/mat]'},
    {apartat: 'b', tecles: ['1', '2', 'sin', 'lpar', 'shift', 'exp', 'entre', '4', 'rpar', 'mes', '1', '2', 'cos', 'lpar', 'shift', 'exp', 'entre', '4', 'rpar', 'menys', '1', '2'],
      pantalla: calc(R, '12sin (π÷4)+12cos (π÷4)-12'),
      text: '[mat]b) Regla de Barrow: $F(\\pi)-F(0)$. Com que $\\sin 0=0$ i $\\cos 0=1$, $F(0)=12$.[/mat] [calc]Escriu $12\\sin\\frac{\\pi}{4}+12\\cos\\frac{\\pi}{4}-12$.[/calc]'},
    {apartat: 'b', tecles: ['igual'], pantalla: marca(calc(R, '12sin (π÷4)+12cos (π÷4)-12', '4.970562748'), 'resultat'),
      text: '[calc]Prem [[igual]]: l\'àrea és $12(\\sqrt{2}-1)\\approx 4{,}97\\,\\text{m}^2$.[/calc]'},
    {apartat: 'b', tecles: ['per', '7', '5', '0', 'igual'], pantalla: marca(calc(R, 'Ans×750', '3727.922061'), 'resultat'),
      text: '[calc]Ara [[per]] 750: després d\'un resultat, el càlcul comença amb Ans, sense arrodonir.[/calc] [mat]El preu del vitrall és de $3\\,727{,}92$ €.[/mat]'},
  ],
  relacionades: ['canvia-radians', 'ans'],
},
{
  id: 'pau-pro-24i-q4',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['4', 'abc', '6', 'per', '0', 'punt', '7', '5', 'mes', '2', 'abc', '6', 'per', '0', 'punt', '4'], pantalla: calc(D, '4┘6×0.75+2┘6×0.4'),
      text: '[mat]a) Probabilitat total: $P(C)=\\frac{4}{6}\\cdot 0{,}75+\\frac{2}{6}\\cdot 0{,}4$.[/mat] [calc]Escriu-ho tal qual, amb [[abc]] per a les fraccions.[/calc]'},
    {apartat: 'a', tecles: ['igual'], pantalla: marca(calc(D, '4┘6×0.75+2┘6×0.4', '0.633333333'), 'resultat'),
      text: '[calc]Prem [[igual]]: 0.633333333. Surt en decimal perquè hi ha decimals.[/calc]'},
    {apartat: 'a', tecles: ['abc'], pantalla: marca(calc(D, '4┘6×0.75+2┘6×0.4', '19┘30'), 'resultat'),
      text: '[calc]Amb [[abc]], en fracció: $P(C)=\\frac{19}{30}$.[/calc]'},
    {apartat: 'b', tecles: ['lpar', '4', 'abc', '6', 'per', '0', 'punt', '7', '5', 'rpar', 'entre', '1', '9', 'abc', '3', '0'], pantalla: calc(D, '(4┘6×0.75)÷19┘30'),
      text: '[mat]b) Bayes: $P(R\\mid C)=\\dfrac{\\frac{4}{6}\\cdot 0{,}75}{P(C)}$.[/mat] [calc]Escriu $\\left(\\frac{4}{6}\\times 0.75\\right)\\div\\frac{19}{30}$.[/calc]'},
    {apartat: 'b', tecles: ['igual'], pantalla: marca(calc(D, '(4┘6×0.75)÷19┘30', '0.789473684'), 'resultat'),
      text: '[calc]Prem [[igual]]: 0.789473684.[/calc]'},
    {apartat: 'b', tecles: ['abc'], pantalla: marca(calc(D, '(4┘6×0.75)÷19┘30', '15┘19'), 'resultat'),
      text: '[calc]Amb [[abc]]: $P(R\\mid C)=\\frac{15}{19}$.[/calc]'},
    {apartat: 'c', tecles: ['5', 'per', 'lpar', '1', '9', 'abc', '3', '0', 'rpar', 'pot', '4', 'per', '1', '1', 'abc', '3', '0', 'mes', 'lpar', '1', '9', 'abc', '3', '0', 'rpar', 'pot', '5'],
      pantalla: calc(D, '5×(19┘30)^4×11┘30+(19┘30)^5'),
      text: '[mat]c) Binomial, amb $n=5$ i $p=\\frac{19}{30}$: $P(X\\ge 4)=5\\,p^4(1-p)+p^5$, perquè $\\binom{5}{4}=5$ i $1-p=\\frac{11}{30}$.[/mat] [calc]La potència és [[pot]].[/calc]'},
    {apartat: 'c', tecles: ['igual'], pantalla: marca(calc(D, '5×(19┘30)^4×11┘30+(19┘30)^5', '0.396862305'), 'resultat'),
      text: '[calc]Prem [[igual]]: $P(X\\ge 4)\\approx 0{,}3969$. La fracció exacta tindria massa xifres, i la calculadora la dona en decimal.[/calc]'},
    {error: true, apartat: 'c', tecles: ['ac', '5', 'per', '0', 'punt', '6', '3', 'pot', '4', 'per', '0', 'punt', '3', '7', 'mes', '0', 'punt', '6', '3', 'pot', '5', 'igual'],
      pantalla: marca(calc(D, '5×0.63^4×0.37+0.63^5', '0.390673433'), 'resultat'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i, si arrodoneixes $p\\approx 0{,}63$, surt 0.390673433 i no 0.396862305: ja falla la segona xifra decimal. Treballa amb $\\frac{19}{30}$.[/calc]'},
  ],
  relacionades: ['combinatoria', 'pau-pro-24s-q4'],
},
{
  id: 'pau-pro-24s-q4',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['1', 'menys', '0', 'punt', '8', 'pot', '4'], pantalla: calc(D, '1-0.8^4'),
      text: '[mat]a) El nombre de persones amb arrítmia segueix una binomial $B(4;\\,0{,}2)$. «Almenys una» és l\'esdeveniment contrari de «cap»: $1-0{,}8^4$.[/mat] [calc]L\'exponent és [[pot]].[/calc]'},
    {apartat: 'a', tecles: ['igual'], pantalla: marca(calc(D, '1-0.8^4', '0.5904'), 'resultat'),
      text: '[calc]Prem [[igual]]: 0.5904.[/calc]'},
    {apartat: 'b', tecles: ['0', 'punt', '9', '5', 'per', '0', 'punt', '2', 'mes', '0', 'punt', '0', '0', '5', 'per', '0', 'punt', '8'],
      pantalla: calc(D, '0.95×0.2+0.005×0.8'),
      text: '[mat]b) Probabilitat total. Hi ha dues maneres de donar positiu: amb arrítmia ($0{,}2$ i $0{,}95$) o sense ($0{,}8$ i $0{,}005$).[/mat] [calc]Escriu $0.95\\times 0.2+0.005\\times 0.8$.[/calc]'},
    {apartat: 'b', tecles: ['igual'], pantalla: marca(calc(D, '0.95×0.2+0.005×0.8', '0.194'), 'resultat'),
      text: '[calc]Prem [[igual]]: la probabilitat d\'un diagnòstic positiu és 0,194.[/calc]'},
    {apartat: 'c', tecles: ['0', 'punt', '2', 'per', 'lpar', '1', 'menys', '0', 'punt', '9', '5', 'rpar', 'entre', 'lpar', '1', 'menys', 'ans', 'rpar'],
      pantalla: calc(D, '0.2×(1-0.95)÷(1-Ans)'),
      text: '[mat]c) Bayes: tenir arrítmia i donar negatiu, $0{,}2\\cdot(1-0{,}95)$, dividit per la probabilitat d\'un negatiu, $1-0{,}194$.[/mat] [calc]El 0.194 és a [[ans]]: no cal copiar-lo. El denominador, entre parèntesis.[/calc]'},
    {apartat: 'c', tecles: ['igual'], pantalla: marca(calc(D, '0.2×(1-0.95)÷(1-Ans)', '0.012406948'), 'resultat'),
      text: '[calc]Prem [[igual]]: $\\approx 0{,}0124$.[/calc] [mat]Només l\'1,24 % de les persones que donen negatiu pateixen arrítmia.[/mat] [calc](Si el resultat fos més petit que 0,01, sortiria amb una potència de 10: fitxa «Tot em surt arrodonit».)[/calc]'},
  ],
  relacionades: ['pau-pro-24i-q4', 'ans', 'fix'],
},
{
  id: 'pau-pro-25j-q3',
  inici: calc(D),
  passos: [
    {apartat: 'a', tecles: ['0', 'punt', '0', '5', 'per', '0', 'punt', '6', 'mes', '0', 'punt', '0', '3', 'per', '0', 'punt', '4'],
      pantalla: calc(D, '0.05×0.6+0.03×0.4'),
      text: '[mat]a) De les peces de ferro, en són defectuoses el 5 % (100 − 95).[/mat] [calc]Probabilitat total; escriu $0.05\\times 0.6+0.03\\times 0.4$.[/calc]'},
    {apartat: 'a', tecles: ['igual'], pantalla: marca(calc(D, '0.05×0.6+0.03×0.4', '0.042'), 'resultat'),
      text: '[calc]Prem [[igual]]: 0.042, és a dir, un 4,2 % de les peces són defectuoses.[/calc]'},
    {apartat: 'c', tecles: ['5', 'per', 'lpar', '0', 'punt', '8', 'pot', '4', 'menys', '0', 'punt', '8', 'pot', '5', 'rpar'],
      pantalla: calc(D, '5×(0.8^4-0.8^5)'),
      text: '[mat]c) El valor màxim és $f\\left(\\frac{4}{5}\\right)$.[/mat] [calc]Com que $\\frac{4}{5}=0{,}8$, escriu $5\\times(0.8^4-0.8^5)$. Els exponents no necessiten parèntesis.[/calc]'},
    {apartat: 'c', tecles: ['igual'], pantalla: marca(calc(D, '5×(0.8^4-0.8^5)', '0.4096'), 'resultat'),
      text: '[calc]Prem [[igual]]: 0.4096, és a dir, $\\approx 0{,}41$.[/calc]'},
    {apartat: 'c', tecles: ['abc'], pantalla: marca(calc(D, '5×(0.8^4-0.8^5)', '256┘625'), 'resultat'),
      text: '[calc]Amb [[abc]], el valor exacte del màxim: $\\frac{256}{625}$.[/calc]'},
  ],
  relacionades: ['pau-pro-24i-q4'],
},

);

})(Models.obre());
