/* exercicis/eso/geometria.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'cb4-26-q7', bloc: 'eso-geometria',
  titol: 'El tram d\'escala: Pitàgores',
  font: 'CB 4ESO (2026), pregunta 7',
  figura: {src: 'img/eso/cb4eso2026p7-figura.png', alt: 'El tram d\'escala: un triangle rectangle d\'altura 3 m i llargada 5 m; el tram, la hipotenusa, és la incògnita'},
  enunciat: 'Una escala uneix dues plantes d\'un edifici. Cada tram d\'escala:\n• puja una altura de 3 m;\n• avança una longitud de 5 m.\nQuant mesura cada tram d\'escala?',
  provaTu: {
    enunciat: 'Una rampa puja una altura d\'1,2 m i avança una longitud de 5 m. Quant mesura la rampa?',
    solucio: '$\\sqrt{1{,}2^2+5^2}=\\sqrt{26{,}44}\\approx 5{,}14$ m.',
  },
},
{
  id: 'll4a-4-34', bloc: 'eso-geometria',
  titol: 'L\'escala recolzada: fins on arriba?',
  font: 'Llibre 4t ESO A, unitat 4, exercici 34',
  enunciat: 'Una escala de 5 m està recolzada en una paret.\n• El peu de l\'escala és a 4 m de la paret.\nA quina altura de la paret arriba l\'escala?',
  tancament: '[mat]Recorda: si coneixes la hipotenusa, per trobar un catet els quadrats es resten: $\\sqrt{5^2-4^2}=3$ m.[/mat]',
  provaTu: {
    enunciat: 'Una escala de 6,5 m està recolzada en una paret.\n• El peu de l\'escala és a 2,5 m de la paret.\nA quina altura arriba?',
    solucio: '$\\sqrt{6{,}5^2-2{,}5^2}=6$ m.',
  },
},
{
  id: 'cb4-22-q8', bloc: 'eso-geometria',
  titol: 'El volum d\'un got cilíndric',
  font: 'CB 4ESO (2022), pregunta 8',
  figura: {src: 'img/eso/cb4eso2022e2.png', alt: 'Dibuix del got de vidre (radi 3 cm, alçada 15 cm) i de l\'envàs de iogurt'},
  enunciat: 'Un got de vidre té forma de cilindre:\n• radi de la base: 3 cm;\n• alçada: 15 cm.\nQuin és el volum del got, aproximadament?[nota](Volum d\'un cilindre $=\\pi\\cdot r^2\\cdot h$, amb $\\pi=3{,}14$.)[/nota]',
  provaTu: {
    enunciat: 'Una llauna té forma de cilindre:\n• radi de la base: 4 cm;\n• alçada: 11 cm.\nQuin és el volum de la llauna?',
    solucio: '$\\pi\\cdot 4^2\\cdot 11=176\\pi\\approx 552{,}92$ cm³.',
  },
},
{
  id: 'cb4-25-q27', bloc: 'eso-geometria',
  titol: 'La tela d\'un para-sol: l\'àrea d\'un cercle',
  font: 'CB 4ESO (2025), pregunta 27',
  figura: {src: 'img/eso/cb4eso2025e9.png', alt: 'El para-sol obert i, vist des de dalt, la tela en forma d\'octògon regular'},
  enunciat: 'Per saber quanta tela té un para-sol, se n\'aproxima la superfície per la d\'un cercle:\n• radi del cercle: 0,75 m.\nQuina superfície de tela té el para-sol?[nota](Àrea del cercle $=\\pi\\cdot r^2$, amb $\\pi=3{,}14$.)[/nota]',
  provaTu: {
    enunciat: 'Una pizza rodona fa 15 cm de radi. Quina superfície té?',
    solucio: '$\\pi\\cdot 15^2=225\\pi\\approx 706{,}86$ cm²',
  },
},

{
  id: 'll4a-4-8', bloc: 'eso-geometria',
  titol: 'L\'altura d\'una torre per la seva ombra',
  font: 'Llibre 4t ESO A, unitat 4, exercicis 8 i 11',
  enunciat: 'A la mateixa hora del dia:\n• un pal de 2 m fa una ombra d\'1,5 m;\n• una torre fa una ombra de 12 m.\nQuant fa d\'alta la torre?',
  tancament: '[mat]Recorda: l\'ombra de la torre és $12\\div 1{,}5=8$ vegades la del pal, i l\'altura també: $2\\cdot 8=16$ m.[/mat]',
  provaTu: {
    enunciat: 'Un fanal de 6 m fa una ombra de 9 m.\nA la mateixa hora, quina ombra fa una persona d\'1,8 m?',
    solucio: '$9\\div 6=1{,}5$: l\'ombra és 1,5 vegades l\'altura. $1{,}8\\cdot 1{,}5=2{,}7$ m.',
  },
},
);
