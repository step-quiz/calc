/* ═══════════════════════════════════════════════════════════════════
   models/fx-82ms/fitxes/eso/proporcionalitat.js — ESO · bloc «Proporcionalitat»
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
const ANS = 'Ans';
const Q26 = '34×42÷62';

M.fitxes.push(

{
  id: 'cb2-26-q5',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: amb més ous, el pastís és més gran i porta més xocolata. Ha de sortir més de 180 g.[/mat]'},
    {tecles: ['1', '8', '0', 'entre', '3'], pantalla: calc(D, '180÷3'),
      text: '[mat]Primer, la xocolata que va amb cada ou: 180 g entre 3 ous.[/mat] [calc]Escriu 180 [[entre]] 3.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '180÷3', '60'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 60.[/calc] [mat]Cada ou va amb 60 g de xocolata.[/mat]'},
    {tecles: ['per', '5'], pantalla: calc(D, ANS + '×5'),
      text: '[mat]Amb 5 ous, calen 5 vegades 60 g.[/mat] [calc]Fes l\'operació [[per]] 5: la calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANS + '×5', '300'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 300.[/calc] [mat]La resposta correcta és que hi ha de posar 300 g de xocolata: més de 180 g, com havíem estimat.[/mat]'},
    {error: true, tecles: ['ac', '1', '8', '0', 'per', '3', 'entre', '5'], pantalla: calc(D, '180×3÷5'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i fes la regla de tres al revés: 180 [[per]] 3 [[entre]] 5.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '180×3÷5', '108'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 108.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: amb més ous no pot portar menys xocolata.[/mat]'},
  ],
},
{
  id: 'cb4-22-q26',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: 60 segons és molt més que 3 segons, i n\'han de sortir molt més de 0,2 litres.[/mat]'},
    {tecles: ['0', 'punt', '2', 'entre', '3'], pantalla: calc(D, '0.2÷3'),
      text: '[mat]Primer, l\'aigua que surt en 1 segon: 0,2 litres entre 3 segons.[/mat] [calc]Escriu 0.2 [[entre]] 3.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '0.2÷3', '0.066666667'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 0.066666667.[/calc] [mat]És l\'aigua que surt en 1 segon. No l\'arrodoneixis: la calculadora la guarda sencera (Ans).[/mat]'},
    {tecles: ['per', '6', '0'], pantalla: calc(D, ANS + '×60'),
      text: '[mat]En 60 segons en surt 60 vegades més.[/mat] [calc]Fes l\'operació [[per]] 60: la calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANS + '×60', '4'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 4.[/calc] [mat]La resposta correcta és que en 60 segons surten 4 litres.[/mat]'},
  ],
},
{
  id: 'cb4-25-q8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: 16 ml és més del triple de 5 ml, i per tant hi ha d\'haver més de 300 mg.[/mat]'},
    {tecles: ['1', '0', '5', 'entre', '5'], pantalla: calc(D, '105÷5'),
      text: '[mat]Primer, el principi actiu d\'1 ml: 105 mg entre 5 ml.[/mat] [calc]Escriu 105 [[entre]] 5.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '105÷5', '21'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 21.[/calc] [mat]Cada mil·lilitre té 21 mg de principi actiu.[/mat]'},
    {tecles: ['per', '1', '6'], pantalla: calc(D, ANS + '×16'),
      text: '[mat]16 ml en tenen 16 vegades més.[/mat] [calc]Fes l\'operació [[per]] 16: la calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANS + '×16', '336'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 336.[/calc] [mat]La resposta correcta és que hi ha 336 mg: més de 300 mg, com havíem estimat.[/mat]'},
    {error: true, tecles: ['ac', '1', '0', '5', 'per', '5', 'entre', '1', '6'], pantalla: calc(D, '105×5÷16'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i fes la regla de tres al revés: 105 [[per]] 5 [[entre]] 16.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '105×5÷16', '32.8125'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 32.8125.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: en més xarop no hi pot haver menys principi actiu.[/mat]'},
  ],
},
{
  id: 'cb4-23-q26',
  inici: calc(D),
  passos: [
    {tecles: ['3', '4', 'per', '4', '2'], pantalla: calc(D, '34×42'),
      text: '[mat]Si es manté la proporció, l\'alçada nova és $\\frac{34\\cdot 42}{62}$ (regla de tres).[/mat] [calc]Escriu 34 [[per]] 42.[/calc]'},
    {tecles: ['entre', '6', '2'], pantalla: calc(D, Q26),
      text: '[calc]Ara fes l\'operació [[entre]] 62.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, Q26, '23.03225806'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 23.03225806.[/calc] [mat]La resposta correcta és que l\'alçada serà d\'uns 23 cm.[/mat]'},
  ],
},
{
  id: 'cb4-26-q8',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: si cada esglaó fes 10 cm, en caldrien 30 per pujar 3 m. Com que en fa 15, n\'hi haurà menys de 30.[/mat]'},
    {tecles: ['3', 'entre', '0', 'punt', '1', '5'], pantalla: calc(D, '3÷0.15'),
      text: '[mat]El tram puja 3 m i cada esglaó en puja 0,15 m (15 cm): les dues mesures, en metres.[/mat] [calc]Escriu 3 [[entre]] 0.15.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3÷0.15', '20'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 20.[/calc] [mat]La resposta correcta és que cada tram té 20 esglaons: menys de 30, com havíem estimat.[/mat]'},
    {error: true, tecles: ['ac', '1', '5', 'entre', '3', 'per', '5'], pantalla: calc(D, '15÷3×5'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i fes una «regla de tres» amb els números de l\'enunciat: 15 [[entre]] 3 [[per]] 5.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '15÷3×5', '25'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 25.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: 25 esglaons de 15 cm pugen 375 cm, i el tram només puja 300 cm.[/mat]'},
  ],
},
{
  id: 'cb4-26-q25',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: 2,38 kg són 2 380 g, i cada disc pesa pocs grams. Han de sortir centenars de discos.[/mat]'},
    {tecles: ['7', '0', 'entre', '2', '0'], pantalla: calc(D, '70÷20'),
      text: '[mat]Primer, el pes d\'un disc: 70 g entre 20 discos.[/mat] [calc]Escriu 70 [[entre]] 20.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '70÷20', '3.5'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 3.5.[/calc] [mat]Cada disc pesa 3,5 g.[/mat]'},
    {tecles: ['2', '3', '8', '0', 'entre', 'ans'], pantalla: calc(D, '2380÷' + ANS),
      text: '[mat]Ara, el pes de la bossa en grams (2 380 g) entre el pes d\'un disc.[/mat] [calc]Escriu 2380 [[entre]] i prem [[ans]], el resultat d\'abans.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '2380÷' + ANS, '680'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 680.[/calc] [mat]La resposta correcta és que a la bossa hi ha 680 discos.[/mat]'},
    {error: true, tecles: ['ac', '2', '3', '8', '0', 'per', '3', 'punt', '5'], pantalla: calc(D, '2380×3.5'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i multiplica en lloc de dividir: 2380 [[per]] 3.5.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '2380×3.5', '8330'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 8330.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: 8 330 discos de 3,5 g pesarien més de 29 kg, i la bossa en pesa 2,38.[/mat]'},
  ],
},
{
  id: 'll4a-3-26',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: de debò, la paret ha de ser molt més llarga que al plànol.[/mat]'},
    {tecles: ['8', 'per', '5', '0'], pantalla: calc(D, '8×50'),
      text: '[mat]A escala 1 : 50, cada centímetre del plànol són 50 cm de debò.[/mat] [calc]Escriu 8 [[per]] 50.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '8×50', '400'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 400.[/calc] [mat]Són 400 cm. La resposta correcta és que la paret fa 4 m.[/mat]'},
    {error: true, tecles: ['ac', '8', 'entre', '5', '0'], pantalla: calc(D, '8÷50'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i divideix en lloc de multiplicar: 8 [[entre]] 50.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '8÷50', '0.16'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 0.16.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: de debò, la paret faria 0,16 cm, menys que al plànol.[/mat]'},
  ],
},
{
  id: 'll4a-3-13',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: amb menys jardiners, trigaran més dies. Ha de sortir més de 10.[/mat]'},
    {tecles: ['6', 'per', '1', '0'], pantalla: calc(D, '6×10'),
      text: '[mat]Com menys jardiners, més dies: és proporcionalitat inversa. Primer, quants dies trigaria un sol jardiner: $6\\cdot 10$.[/mat] [calc]Escriu 6 [[per]] 10.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '6×10', '60'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 60.[/calc] [mat]Un sol jardiner trigaria 60 dies.[/mat]'},
    {tecles: ['entre', '4'], pantalla: calc(D, ANS + '÷4'),
      text: '[mat]4 jardiners es reparteixen la feina: trigaran 4 vegades menys.[/mat] [calc]Fes l\'operació [[entre]] 4: la calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANS + '÷4', '15'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 15.[/calc] [mat]La resposta correcta és que trigaran 15 dies: més de 10, com havíem estimat.[/mat]'},
    {error: true, tecles: ['ac', '1', '0', 'per', '4', 'entre', '6'], pantalla: calc(D, '10×4÷6'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i fes una regla de tres directa: 10 [[per]] 4 [[entre]] 6.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '10×4÷6', '6.666666667'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 6.666666667.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: amb menys jardiners no poden trigar menys dies.[/mat]'},
  ],
},
{
  id: 'recu-f6-102',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, estima: amb pots més petits, en calen més. Ha de sortir més de 6.[/mat]'},
    {tecles: ['6', 'per', '4'], pantalla: calc(D, '6×4'),
      text: '[mat]Primer, la pintura que cal en total: 6 pots de 4 kg.[/mat] [calc]Escriu 6 [[per]] 4.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '6×4', '24'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 24.[/calc] [mat]Calen 24 kg de pintura.[/mat]'},
    {tecles: ['entre', '3'], pantalla: calc(D, ANS + '÷3'),
      text: '[mat]Ara, quants pots de 3 kg fan 24 kg.[/mat] [calc]Fes l\'operació [[entre]] 3: la calculadora continua amb el resultat d\'abans (Ans).[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, ANS + '÷3', '8'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 8.[/calc] [mat]La resposta correcta és que necessita 8 pots: més de 6, com havíem estimat.[/mat]'},
    {error: true, tecles: ['ac', '6', 'per', '3', 'entre', '4'], pantalla: calc(D, '6×3÷4'),
      text: '[calc]!!Error típic!!: esborra amb [[ac]] i fes una regla de tres directa: 6 [[per]] 3 [[entre]] 4.[/calc]'},
    {error: true, tecles: ['igual'], pantalla: marca(calc(D, '6×3÷4', '4.5'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 4.5.[/calc] ' + FRASE_ERROR + ' [mat]No pot ser: amb pots més petits no en calen menys. I no es pot comprar mig pot.[/mat]'},
  ],
},
{
  id: 'll4a-3-14',
  inici: calc(D),
  passos: [
    {tecles: [], pantalla: calc(D),
      text: '[mat]Abans de calcular, pensa: si el preu fos proporcional als km, 10 km costarien el doble que 5 km. Ho comprovarem.[/mat]'},
    {tecles: ['3', 'punt', '5', 'mes', '1', 'punt', '2', 'per', '5'], pantalla: calc(D, '3.5+1.2×5'),
      text: '[mat]El preu és la baixada de bandera més 1,20 euros per km: $3{,}50+1{,}20\\cdot 5$.[/mat] [calc]Escriu 3.5 + 1.2 [[per]] 5. No calen parèntesis: la calculadora fa primer la multiplicació.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3.5+1.2×5', '9.5'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens el resultat, que és 9.5.[/calc] [mat]El trajecte de 5 km costa 9,50 euros.[/mat]'},
    {tecles: ['ac', '3', 'punt', '5', 'mes', '1', 'punt', '2', 'per', '1', '0'], pantalla: calc(D, '3.5+1.2×10'),
      text: '[mat]Per a 10 km: $3{,}50+1{,}20\\cdot 10$.[/mat] [calc]Esborra amb [[ac]] i escriu 3.5 + 1.2 [[per]] 10.[/calc]'},
    {tecles: ['igual'], pantalla: marca(calc(D, '3.5+1.2×10', '15.5'), 'resultat'),
      text: '[calc]Prem [[igual]]: obtens 15.5.[/calc] [mat]El trajecte de 10 km costa 15,50 euros.[/mat]'},
    {tecles: [], pantalla: marca(calc(D, '3.5+1.2×10', '15.5'), 'resultat'),
      text: '[mat]El doble de 9,50 seria 19 euros. No és el doble, perquè la baixada de bandera es paga una sola vegada.[/mat] [mat]La resposta correcta és que costen 9,50 i 15,50 euros: el preu no és proporcional als km, i no s\'hi pot fer una regla de tres.[/mat]'},
  ],
},

);

})(Models.obre());
