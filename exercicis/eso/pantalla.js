/* exercicis/eso/pantalla.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'eso-fraccio-decimal', bloc: 'eso-pantalla',
  titol: 'Em surt una fracció: vull el decimal',
  enunciat: 'Calcula $7\\div 4$ i dona el resultat:\n- en forma de fracció\n- en forma decimal.',
  provaTu: {
    enunciat: 'Calcula $9\\div 8$ i dona el resultat:\n- en forma de fracció\n- en forma decimal.',
    solucio: '$9\\div 8=\\frac{9}{8}=1{,}125$.',
  },
},
{
  id: 'eso-arrodonir', bloc: 'eso-pantalla',
  titol: 'Arrodonir el que surt a la pantalla',
  enunciat: 'Calcula $2\\div 3$ i arrodoneix el resultat a les centèsimes.',
  provaTu: {
    enunciat: 'Calcula $5\\div 7$ i arrodoneix el resultat a les centèsimes.',
    solucio: '$5\\div 7=0{,}714285\\ldots\\approx 0{,}71$.',
  },
},
{
  id: 'll4-1-exemple2', bloc: 'eso-pantalla',
  titol: 'L\'arrel de 50: entre quins enters és?',
  font: 'Llibre 4t ESO, unitat 1, exemple 2',
  enunciat: 'Sense calculadora, digues entre quins dos nombres enters es troba $\\sqrt{50}$.\nDesprés, calcula-la amb la calculadora.',
  provaTu: {
    enunciat: 'Sense calculadora, digues entre quins dos nombres enters es troba $\\sqrt{90}$. Després, calcula-la amb la calculadora.',
    solucio: '$9^2=81$ i $10^2=100$: entre 9 i 10. $\\sqrt{90}=3\\sqrt{10}\\approx 9{,}49$.',
  },
},
{
  id: 'eso-notacio-cientifica', bloc: 'eso-pantalla',
  titol: 'Nombres molt grans: notació científica',
  tancament: '[calc]Recorda: $3\\cdot 10^8$ s\'escriu amb [[exp]] (×10ˣ), no amb [[pot]].[/calc] [mat]La llum recorre $2{,}592\\cdot 10^{13}$ metres en un dia.[/mat]',
  enunciat: 'La llum recorre $3\\cdot 10^8$ metres cada segon.\n• Un dia té 86 400 segons.\nQuants metres recorre la llum en un dia?',
  provaTu: {
    enunciat: 'El so recorre 343 metres cada segon.\n• Un any té 31 536 000 segons.\nQuants metres recorre el so en un any?',
    solucio: '$343\\cdot 31.536.000=1{,}0816848\\cdot 10^{10}$ metres, és a dir, 10.816.848.000 m.',
  },
},

);
