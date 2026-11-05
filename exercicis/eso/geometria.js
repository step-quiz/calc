/* exercicis/eso/geometria.js — DADES. El format és a exercicis/blocs.js. */
Models.afegeixExercicis(

{
  id: 'cb4-26-q7', bloc: 'eso-geometria',
  titol: 'El tram d\'escala',
  font: 'CB 4ESO (2026), pregunta 7',
  figura: {src: 'img/eso/cb4eso2026p7-figura.png', alt: 'El tram d\'escala: un triangle rectangle d\'altura 3 m i llargada 5 m; el tram, la hipotenusa, és la incògnita'},
  enunciat: 'Una escala uneix dues plantes d\'un edifici. Cada tram d\'escala puja una altura de $3$ m i avança una longitud de $5$ m.\n\nQuant mesura cada tram d\'escala?',
  provaTu: {
    enunciat: 'La rampa de l\'skatepark del teu barri puja una altura d\'$1{,}2$ m i avança una longitud de $5$ m.\nQuant mesura la rampa?',
    solucio: '[mat]$\\sqrt{1{,}2^2+5^2}=\\sqrt{26{,}44}\\simeq 5{,}14$ m[/mat]\nR) La rampa mesura aproximadament $5{,}14$ m.',
  },
},
{
  id: 'll4a-4-34', bloc: 'eso-geometria',
  titol: 'L\'escala recolzada a la paret',
  font: 'Llibre 4t ESO A, unitat 4, exercici 34',
  enunciat: 'En Marc recolza una escala de $5$ m en una paret per pintar-la. El peu de l\'escala queda separat una distància de $4$ m respecte de la base de la paret.\n\nA quina altura de la paret arriba l\'escala?',
  tancament: '[mat]Recorda:\n• Si coneixes la hipotenusa i un catet, i vols trobar la mida de l\'altre catet, et cal aplicar la fórmula adequada:\n\n$\\sqrt{5^2-4^2}=3$ m[/mat]',
  provaTu: {
    enunciat: 'Els bombers recolzen una escala de $6{,}5$ m en una paret. El peu de l\'escala és a $2{,}5$ m de la paret.\nA quina altura arriba l\'escala?',
    solucio: '[mat]$\\sqrt{6{,}5^2-2{,}5^2}=\\sqrt{36}=6$ m[/mat]\nR) L\'escala arriba a $6$ m d\'altura.',
  },
},
{
  id: 'cb4-22-q8', bloc: 'eso-geometria',
  titol: 'El got de vidre',
  font: 'CB 4ESO (2022), pregunta 8',
  figura: {src: 'img/eso/cb4eso2022e2.png', alt: 'Dibuix del got de vidre (radi 3 cm, alçada 15 cm) i de l\'envàs de iogurt'},
  enunciat: 'Un got de vidre té forma de cilindre. El radi de la base fa $3$ cm i l\'alçada, $15$ cm.\n\nQuin és el volum del got?[nota]Volum d\'un cilindre: $V=\\pi\\cdot r^2\\cdot h$[/nota]',
  provaTu: {
    enunciat: 'Una llauna de refresc té forma de cilindre. El radi de la base fa $3$ cm i l\'alçada, $11{,}66$ cm.\n• Quin és el volum de la llauna?\n• És cert que hi caben $330$ ml?',
    solucio: '[mat]$V=\\pi\\cdot 3^2\\cdot 11{,}66=104{,}94\\pi\\simeq 329{,}7$ cm³[/mat]\nR) El volum de la llauna és aproximadament de $329{,}7$ cm³, és a dir, uns $330$ ml: sí, hi caben.',
  },
},
{
  id: 'cb4-25-q27', bloc: 'eso-geometria',
  titol: 'La tela del para-sol',
  font: 'CB 4ESO (2025), pregunta 27',
  figura: {src: 'img/eso/cb4eso2025e9.png', alt: 'El para-sol obert i, vist des de dalt, la tela en forma d\'octògon regular'},
  enunciat: 'Volem saber quanta tela fa falta per construir un para-sol. Podem aproximar l\'àrea del para-sol per la d\'un cercle de $0{,}75$ m de radi.\n\nTroba el valor d\'aquesta àrea.[nota]Àrea del cercle: $A=\\pi\\cdot r^2$[/nota]',
  provaTu: {
    enunciat: 'Una pizza rodona fa $15$ cm de radi.\nQuant val la seva àrea?',
    solucio: '[mat]$A=\\pi\\cdot 15^2=225\\pi\\simeq 706{,}86$ cm²[/mat]\nR) La pizza té una àrea aproximada de $706{,}86$ cm².',
  },
},

{
  id: 'll4a-4-8', bloc: 'eso-geometria',
  titol: 'L\'ombra del campanar',
  font: 'Llibre 4t ESO A, unitat 4, exercicis 8 i 11',
  enunciat: 'Un dia de sol, la Júlia vol saber l\'altura del campanar del seu poble. Fa aquest experiment:\n• En primer lloc, mesura l\'ombra que fa el campanar al terra: són $12$ m.\n• Ràpidament, posa un pal vertical i pren mesures: el pal mesura $2$ m i la seva ombra, $1{,}5$ m.\n\nLa Júlia ha anat ràpid perquè no volia que el Sol canviés la seva inclinació respecte del terra.\n\nLa Júlia ja sap que el campanar mesura $16$ m d\'altura. Com ho ha sabut?',
  tancament: '[mat]Recorda:\n• Si l\'ombra és $8$ vegades més llarga, l\'altura també és $8$ vegades més gran\n\n$12\\div 1{,}5=8$\n$2\\cdot 8=16$ m[/mat]',
  provaTu: {
    enunciat: 'Un fanal de $6$ m fa una ombra de $9$ m.\nA la mateixa hora, quina ombra faràs tu, si fas $1{,}8$ m d\'alçada?',
    solucio: '[mat]$9\\div 6=1{,}5$\n$1{,}8\\cdot 1{,}5=2{,}7$ m[/mat]\nR) La meva ombra farà $2{,}7$ m.',
  },
},
);
