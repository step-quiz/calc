/* ═══════════════════════════════════════════════════════════════════
   models/fx-82sp-cw/fitxes/eso/proporcionalitat.js — ESO · bloc «Proporcionalitat»
   ───────────────────────────────────────────────────────────────────
   NOMÉS DADES. Normes d'ESO: ARCHITECTURE.md, «Writing fitxes».
   Model d'aquest bloc (David): primer pas sense tecles per estimar el
   resultat; la regla de tres sempre passa per la unitat (1 ml, 1 ou, un
   sol jardiner…); la zona d'error, quan n'hi ha, és un plantejament
   equivocat que la calculadora fa bé, i acaba amb la frase fixa
   (FRASE_ERROR) i un «No pot ser: …» que es pot raonar sense calculadora.
   ═══════════════════════════════════════════════════════════════════ */
(function (M) {
'use strict';
const {calc, marca} = M.guions;
const {D} = M.comu;

const FRASE_ERROR = '[mat]La calculadora ha seguit bé les instruccions. El problema és que s\'han plantejat malament els càlculs.[/mat]';
const ANS = '\\mathrm{Ans}';
const Q26 = '34\\times 42\\div 62';

M.fitxes.push(

{
  id: 'cb2-26-q5',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• si té més ous, haurà de gastar més xocolata o menys xocolata?\n• si tingués el doble d\'ous, és cert que caldria el doble de xocolata?[/mat]'},
    {tecles: ['1', '8', '0', 'entre', '3'], pantalla: calc(D, '180\\div 3'),
      text: '[mat]$3$ ous → $180$ g de xocolata\n$1$ ou → ?[/mat] [calc]Escriu $180$ [[entre]] $3$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '180\\div 3', '60'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $60$.[/calc] [mat]$1$ ou → $60$ g de xocolata[/mat]'},
    {tecles: ['per', '5'], pantalla: calc(D, ANS + '\\times 5', '', {hist: true}),
      text: '[mat]Amb $5$ ous, cal gastar $5$ vegades més xocolata que amb $1$ ou.[/mat] [calc]Fes l\'operació [[per]] $5$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANS + '\\times 5', '300'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $300$.[/calc] [mat]R) En Biel ha de fer servir $300$ g de xocolata per $5$ ous.[/mat]'},
    {error: true, tecles: ['ac', '1', '8', '0', 'per', '3', 'entre', '5'], pantalla: calc(D, '180\\times 3\\div 5', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi apliques malament la regla de tres: $180$ [[per]] $3$ [[entre]] $5$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '180\\times 3\\div 5', '108'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $108$.[/calc] ' + FRASE_ERROR + ' [mat]No té lògica que amb $5$ ous portis menys xocolata que amb $3$ ous.[/mat]'},
  ],
},
{
  id: 'cb4-22-q26',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• en $60$ segons obté més o menys de $0{,}2$ litres?\n• si manté l\'aixeta oberta el doble de temps, surt el doble d\'aigua?[/mat]'},
    {tecles: ['0', 'punt', '2', 'entre', '3'], pantalla: calc(D, '0.2\\div 3'),
      text: '[mat]$3$ segons → $0{,}2$ litres\n$1$ segon → ?[/mat] [calc]Escriu $0.2$ [[entre]] $3$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '0.2\\div 3', '\\frac{1}{15}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{1}{15}$.\nSi surt en forma de fracció és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $0.06666666667$.[/calc] [mat]$1$ segon → $\\frac{1}{15}\\simeq 0{,}067$ litres[/mat]'},
    {tecles: ['per', '6', '0'], pantalla: calc(D, ANS + '\\times 60', '', {hist: true}),
      text: '[mat]En $60$ segons surt $60$ vegades més aigua que en $1$ segon.[/mat] [calc]Fes l\'operació [[per]] $60$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANS + '\\times 60', '4'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $4$.[/calc] [mat]R) En $60$ segons surten $4$ litres d\'aigua de l\'aixeta.[/mat]'},
  ],
},
{
  id: 'cb4-25-q8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• en $16$ ml hi ha més o menys de $105$ mg?\n• en el triple de xarop, hi ha el triple de principi actiu?[/mat]'},
    {tecles: ['1', '0', '5', 'entre', '5'], pantalla: calc(D, '105\\div 5'),
      text: '[mat]$5$ ml → $105$ mg\n$1$ ml → ?[/mat] [calc]Escriu $105$ [[entre]] $5$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '105\\div 5', '21'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $21$.[/calc] [mat]$1$ ml → $21$ mg[/mat]'},
    {tecles: ['per', '1', '6'], pantalla: calc(D, ANS + '\\times 16', '', {hist: true}),
      text: '[mat]En $16$ ml hi ha $16$ vegades més principi actiu que en $1$ ml.[/mat] [calc]Fes l\'operació [[per]] $16$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANS + '\\times 16', '336'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $336$.[/calc] [mat]R) En $16$ ml de xarop hi ha $336$ mg de principi actiu.[/mat]'},
    {error: true, tecles: ['ac', '1', '0', '5', 'per', '5', 'entre', '1', '6'], pantalla: calc(D, '105\\times 5\\div 16', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi apliques malament la regla de tres: $105$ [[per]] $5$ [[entre]] $16$.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, '105\\times 5\\div 16', '32.8125'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $32.8125$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit que en $16$ ml hi hagi menys principi actiu que en $5$ ml.[/mat]'},
  ],
},
{
  id: 'cb4-23-q26',
  inici: calc(D),
  passos: [
    {tecles: ['3', '4', 'per', '4', '2'], pantalla: calc(D, '34\\times 42'),
      text: '[mat]Si no es deforma, l\'alçada és proporcional a l\'amplada:\n$62$ cm d\'amplada → $34$ cm d\'alçada\n$42$ cm d\'amplada → ?\nL\'alçada nova és $\\frac{34\\cdot 42}{62}$.[/mat] [calc]Escriu $34$ [[per]] $42$.[/calc]'},
    {tecles: ['entre', '6', '2'], pantalla: calc(D, Q26),
      text: '[calc]Ara fes l\'operació [[entre]] $62$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, Q26, '\\frac{714}{31}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{714}{31}$.\nSi surt en forma de fracció és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $23.03225806$.[/calc] [mat]$\\frac{714}{31}\\simeq 23{,}03$ cm[/mat]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, Q26, '23.03225806'), 'resultat'),
      text: '[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (≈): obtens $23.03225806$.[/calc] [mat]R) La fotografia impresa farà uns $23$ cm d\'alçada.[/mat]'},
  ],
},
{
  id: 'cb4-26-q8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• si cada esglaó fa $10$ cm, quants esglaons calen per pujar $3$ m?\n• amb esglaons de $15$ cm, calen més esglaons o menys?[/mat]'},
    {tecles: ['3', 'entre', '0', 'punt', '1', '5'], pantalla: calc(D, '3\\div 0.15'),
      text: '[mat]El tram puja $3$ m i cada esglaó en puja $0{,}15$ m ($15$ cm): les dues mesures, en metres.[/mat] [calc]Escriu $3$ [[entre]] $0.15$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '3\\div 0.15', '20'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $20$.[/calc] [mat]R) Cada tram d\'escala té $20$ esglaons.[/mat]'},
    {error: true, tecles: ['ac', '1', '5', 'entre', '3', 'per', '5'], pantalla: calc(D, '15\\div 3\\times 5', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi fas una «regla de tres» amb els números de l\'enunciat: $15$ [[entre]] $3$ [[per]] $5$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '15\\div 3\\times 5', '25'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $25$.[/calc] ' + FRASE_ERROR + ' [mat]No encaixa amb l\'enunciat: $25$ esglaons de $15$ cm pugen $375$ cm, i el tram només puja $300$ cm.[/mat]'},
  ],
},
{
  id: 'cb4-26-q25',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• quants grams són $2{,}38$ kg?\n• a la bossa hi ha desenes, centenars o milers de discos?[/mat]'},
    {tecles: ['7', '0', 'entre', '2', '0'], pantalla: calc(D, '70\\div 20'),
      text: '[mat]$20$ discos → $70$ g\n$1$ disc → ?[/mat] [calc]Escriu $70$ [[entre]] $20$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '70\\div 20', '\\frac{7}{2}'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $\\frac{7}{2}$.\nSi surt en forma de fracció és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria $3.5$.[/calc] [mat]$1$ disc → $\\frac{7}{2}=3{,}5$ g[/mat]'},
    {tecles: ['2', '3', '8', '0', 'entre', 'ans'], pantalla: calc(D, '2380\\div ' + ANS, '', {hist: true}),
      text: '[mat]La bossa pesa $2{,}38$ kg $=2\\,380$ g: hi ha tants discos com vegades hi cap el pes d\'un disc.[/mat] [calc]Escriu $2380$ [[entre]] i prem [[ans]].\n[[ans]] és el resultat d\'abans.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '2380\\div ' + ANS, '680'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $680$.[/calc] [mat]R) A la bossa hi ha $680$ discos.[/mat]'},
    {error: true, tecles: ['ac', '2', '3', '8', '0', 'per', '3', 'punt', '5'], pantalla: calc(D, '2380\\times 3.5', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi multipliques en lloc de dividir: $2380$ [[per]] $3.5$.[/calc]'},
    {error: true, tecles: ['exe'], pantalla: marca(calc(D, '2380\\times 3.5', '8330'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $8330$.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: $8\\,330$ discos de $3{,}5$ g pesarien més de $29$ kg, i la bossa en pesa $2{,}38$.[/mat]'},
  ],
},
{
  id: 'll4a-3-26',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• de debò, la paret és més llarga o més curta que al plànol?\n• què vol dir l\'escala $1:50$?[/mat]'},
    {tecles: ['8', 'per', '5', '0'], pantalla: calc(D, '8\\times 50'),
      text: '[mat]A escala $1:50$, cada centímetre del plànol són $50$ cm de debò.[/mat] [calc]Escriu $8$ [[per]] $50$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '8\\times 50', '400'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $400$.[/calc] [mat]R) La paret fa $400$ cm, és a dir, $4$ m.[/mat]'},
    {error: true, tecles: ['ac', '8', 'entre', '5', '0'], pantalla: calc(D, '8\\div 50', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi divideixes en lloc de multiplicar: $8$ [[entre]] $50$.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, '8\\div 50', '0.16'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $0.16$.[/calc] ' + FRASE_ERROR + ' [mat]No té sentit: de debò, la paret faria $0{,}16$ cm, menys que al plànol.[/mat]'},
  ],
},
{
  id: 'll4a-3-13',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• amb menys jardiners, es triga més dies o menys dies?\n• amb la meitat de jardiners es triga el doble de temps?[/mat]'},
    {tecles: ['6', 'per', '1', '0'], pantalla: calc(D, '6\\times 10'),
      text: '[mat]És una situació de proporcionalitat inversa.\n$6$ jardiners → $10$ dies\n$4$ jardiners → $x$\n\nSabem que $6\\cdot 10=4\\cdot x$.[/mat] [calc]Escriu $6$ [[per]] $10$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '6\\times 10', '60'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $60$.[/calc] [mat]Aquest nombre es manté constant: $60$.[/mat]'},
    {tecles: ['entre', '4'], pantalla: calc(D, ANS + '\\div 4', '', {hist: true}),
      text: '[mat]Sabem que $4\\cdot x=60$.[/mat] [calc]Fes l\'operació $60$ [[entre]] $4$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANS + '\\div 4', '15'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $15$.[/calc] [mat]R) Els $4$ jardiners trigaran $15$ dies a podar el parc.[/mat]'},
    {error: true, tecles: ['ac', '1', '0', 'per', '4', 'entre', '6'], pantalla: calc(D, '10\\times 4\\div 6', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi fas una regla de tres directa: $10$ [[per]] $4$ [[entre]] $6$.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, '10\\times 4\\div 6', '6.666666667'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $6.666666667$.[/calc] ' + FRASE_ERROR + ' [mat]No té lògica que $4$ jardiners acabin la feina més ràpid que $6$ jardiners.[/mat]'},
  ],
},
{
  id: 'recu-f6-102',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• amb pots més petits, calen més pots o menys?\n• quanta pintura cal en total?[/mat]'},
    {tecles: ['6', 'per', '4'], pantalla: calc(D, '6\\times 4'),
      text: '[mat]És una situació de proporcionalitat inversa: com més petits són els pots, més pots calen.\n$6$ pots → $4$ kg cada pot\n$x$ pots → $3$ kg cada pot\n\nSabem que $6\\cdot 4=x\\cdot 3$.[/mat] [calc]Escriu $6$ [[per]] $4$.[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, '6\\times 4', '24'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens $24$.[/calc] [mat]Aquest nombre es manté constant: són els $24$ kg de pintura que calen.[/mat]'},
    {tecles: ['entre', '3'], pantalla: calc(D, ANS + '\\div 3', '', {hist: true}),
      text: '[mat]Sabem que $x\\cdot 3=24$.[/mat] [calc]Fes l\'operació $24$ [[entre]] $3$.\nLa calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['exe'], pantalla: marca(calc(D, ANS + '\\div 3', '8'), 'resultat'),
      text: '[calc]Prem [[exe]]: obtens el resultat, que és $8$.[/calc] [mat]R) En Carles necessita $8$ pots de $3$ kg.[/mat]'},
    {error: true, tecles: ['ac', '6', 'per', '3', 'entre', '4'], pantalla: calc(D, '6\\times 3\\div 4', '', {hist: true}),
      text: '[calc]!!Error típic!!:\nSi fas una regla de tres directa: $6$ [[per]] $3$ [[entre]] $4$.[/calc]'},
    {error: true, tecles: ['shift', 'exe'], pantalla: marca(calc(D, '6\\times 3\\div 4', '4.5'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $4.5$.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: amb pots més petits no calen menys pots, i no es pot comprar mig pot.[/mat]'},
  ],
},
{
  id: 'll4a-3-14',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa:\n• si el preu és proporcional als km, quant costa el trajecte de $10$ km comparat amb el de $5$ km?\n• la baixada de bandera es paga a cada km o una sola vegada?[/mat]'},
    {tecles: ['3', 'punt', '5', 'mes', '1', 'punt', '2', 'per', '5'], pantalla: calc(D, '3.5+1.2\\times 5'),
      text: '[mat]El preu és la baixada de bandera més $1{,}20$ € per km: $3{,}50+1{,}20\\cdot 5$.[/mat] [calc]Escriu $3.5$ + $1.2$ [[per]] $5$.\nNo calen parèntesis: la calculadora fa primer la multiplicació.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '3.5+1.2\\times 5', '9.5'), 'resultat'),
      text: '[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $9.5$.\nAmb [[exe]] l\'obtindries en fracció.[/calc] [mat]El trajecte de $5$ km costa $9{,}50$ €.[/mat]'},
    {tecles: ['ac', '3', 'punt', '5', 'mes', '1', 'punt', '2', 'per', '1', '0'], pantalla: calc(D, '3.5+1.2\\times 10', '', {hist: true}),
      text: '[mat]Per a $10$ km: $3{,}50+1{,}20\\cdot 10$.[/mat] [calc]Esborra amb [[ac]] i escriu $3.5$ + $1.2$ [[per]] $10$.[/calc]'},
    {tecles: ['shift', 'exe'], pantalla: marca(calc(D, '3.5+1.2\\times 10', '15.5'), 'resultat'),
      text: '[calc]Prem [[shift]] [[exe]] (≈): obtens $15.5$.[/calc] [mat]El trajecte de $10$ km costa $15{,}50$ €.[/mat]'},
    {tecles: [], pantalla: marca(calc(D, '3.5+1.2\\times 10', '15.5'), 'resultat'),
      text: '[mat]El doble de $9{,}50$ € seria $19$ €: no és el doble, perquè la baixada de bandera es paga una sola vegada.[/mat] [mat]R) El trajecte de $5$ km costa $9{,}50$ € i el de $10$ km, $15{,}50$ €. El preu no és proporcional als km: aquí no es pot fer una regla de tres.[/mat]'},
  ],
},

);

})(Models.obre());
