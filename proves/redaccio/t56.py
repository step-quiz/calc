# Reescriu els textos de la T5 «Mitjanes» i la T6 «Pitàgores, àrees i volums» amb les normes apreses a la T3 i la T4.
import re, sys
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from solmat import solmat
ARREL = sys.argv[1]
FR = '{FRASE}'

def js(t):
    e = t.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
    return "'" + e.replace(FR, "' + FRASE_ERROR + '") + "'"

ANS = "La calculadora continua amb el resultat d'abans (Ans)."
def EXACTE(forma):
    return "Si surt " + forma + " és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria "

# ───────────────────────── T5 · Mitjanes ─────────────────────────
TAULA_EST = "$$\\begin{array}{l|ccccc}\\text{Estrelles} & 5 & 4 & 3 & 2 & 1\\\\ \\hline \\text{Clients} & 22 & 32 & 16 & 8 & 2\\end{array}$$"
TAULA_NOT = "$$\\begin{array}{l|ccccccccc}\\text{Nota} & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10\\\\ \\hline \\text{Alumnes} & 1 & 2 & 3 & 5 & 6 & 5 & 4 & 2 & 2\\end{array}$$"
EX5 = {
'cb4-26-q15': dict(titol="Les places de l'hotel",
  enunciat="Un hotel apunta cada setmana quantes places ha ocupat. En $4$ setmanes ha ocupat $168$, $154$, $210$ i $260$ places, respectivament.\n\nQuina ha estat la mitjana de places ocupades?",
  tancament="[mat]Recorda:\n• Si vols dividir tota una suma, recorda d'escriure-la entre parèntesis.\n\n$(168+154+210+260)\\div 4=198$ places[/mat]",
  provaTu=("Aquesta setmana, un bar ha venut $35$, $42$, $28$, $50$ i $45$ entrepans, de dilluns a divendres.\nQuina és la mitjana d'entrepans venuts per dia?",
           "$(35+42+28+50+45)\\div 5=40$\nR) De mitjana, el bar ha venut $40$ entrepans per dia.")),
'cb4-24-q8': dict(titol='Les estrelles de la botiga',
  enunciat="Els $80$ clients d'una botiga han valorat la seva compra amb una puntuació d'$1$ a $5$ estrelles. Aquesta taula diu quants clients han donat cada puntuació:\n\n" + TAULA_EST + "\nQuina és la puntuació mitjana de la botiga?",
  provaTu=("Aquesta taula mostra les notes d'un examen de matemàtiques dels $30$ alumnes d'una classe:\n\n" + TAULA_NOT + "\nQuina és la nota mitjana de la classe?",
           "$\\frac{2\\cdot 1+3\\cdot 2+4\\cdot 3+5\\cdot 5+6\\cdot 6+7\\cdot 5+8\\cdot 4+9\\cdot 2+10\\cdot 2}{30}=\\frac{186}{30}=6{,}2$\nR) La nota mitjana de la classe és un $6{,}2$.")),
'cb4-25-q17': dict(titol='Les tardes a la biblioteca',
  enunciat="S'ha fet una enquesta per saber quantes tardes per setmana els alumnes de 4t d'ESO d'un institut van a estudiar a la biblioteca del barri.\n\nDels alumnes enquestats, $25$ hi van $1$ tarda per setmana, $35$ hi van $2$ tardes, $25$ hi van $3$ tardes i $10$ hi van $4$ tardes.\n\nDe mitjana, quantes tardes per setmana hi van?",
  tancament="[mat]Recorda:\n• Si el denominador és una suma, recorda d'escriure'l entre parèntesis, o fer servir la plantilla de fracció si la calculadora en té.\n\n$\\frac{210}{95}\\simeq 2{,}21$ tardes per setmana[/mat]",
  provaTu=("En una classe de $40$ alumnes, $12$ no tenen cap germà, $15$ en tenen $1$, $8$ en tenen $2$ i $5$ en tenen $3$.\nQuina és la mitjana de germans per alumne?",
           "$\\frac{0\\cdot 12+1\\cdot 15+2\\cdot 8+3\\cdot 5}{12+15+8+5}=\\frac{46}{40}=1{,}15$ germans\nR) De mitjana, cada alumne té $1{,}15$ germans.")),
'll4a-8-56': dict(titol='La nota final de Tecnologia',
  enunciat="A l'institut de la Marta, la nota final de Tecnologia es calcula així:\n• l'examen compta un $30$ %;\n• la part pràctica al laboratori, un $30$ %;\n• el projecte final, un $40$ %.\n\nLa Marta ha tret un $5$ a l'examen, un $6$ a les pràctiques i un $9$ al projecte.\n\nQuina és la nota mitjana de la Marta?",
  provaTu=("La nota d'una matèria es calcula amb aquesta mitjana ponderada: un $60$ % l'examen i un $40$ % els treballs.\nTu has tret un $4$ a l'examen i un $8$ als treballs. Quina és la teva nota mitjana?",
           "$0{,}6\\cdot 4+0{,}4\\cdot 8=5{,}6$\nR) La meva nota mitjana és un $5{,}6$.")),
}
SUMA_HOTEL = "[[lpar]] $168$ [[mes]] $154$ [[mes]] $210$ [[mes]] $260$ [[rpar]]"
CW5 = {
'cb4-26-q15': [
  "[mat]La mitjana és la suma de les places dividida entre el nombre de setmanes:\n$\\frac{168+154+210+260}{4}$[/mat] [calc]Primer escriu la suma entre parèntesis: " + SUMA_HOTEL + ".[/calc]",
  "[calc]Ara fes l'operació [[entre]] $4$.[/calc] [mat]Gràcies als parèntesis, es divideix tota la suma entre $4$.[/mat]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $198$.[/calc] [mat]R) La mitjana ha estat de $198$ places ocupades per setmana.[/mat]",
  "[calc]!!Error típic!!:\nSi escrius la suma sense parèntesis: $168$ [[mes]] $154$ [[mes]] $210$ [[mes]] $260$ [[entre]] $4$.[/calc]",
  "[calc]Prem [[exe]]: obtens $597$.[/calc] [mat]La calculadora ha seguit bé les instruccions, però sense parèntesis només s'ha dividit el $260$ entre $4$.[/mat] [mat]No té cap sentit: la mitjana no pot ser més gran que les places de qualsevol setmana![/mat]"],
'cb4-24-q8': [
  "[mat]• Cada puntuació d'estrelles s'ha de multiplicar pel nombre de clients que l'han donada.\n• Després, cal sumar tots els resultats.\n• Finalment, caldrà fer una divisió.[/mat] [calc]Per començar, prem [[frac]] i escriu la suma al numerador.[/calc]",
  "[mat]Necessitem saber el total de clients:\n$22+32+16+8+2=80$\nCaldrà dividir la nostra suma entre el total de clients, que és $80$.[/mat] [calc]Baixa al denominador amb [[down]] i escriu $80$.[/calc]",
  "[calc]Prem [[exe]]: obtens $\\frac{19}{5}$.\n" + EXACTE("en forma de fracció") + "$3.8$.[/calc] [mat]$\\frac{19}{5}=3{,}8$ estrelles[/mat]",
  "[calc]Per tenir-lo en decimal, prem [[shift]] [[exe]] (≈): obtens $3.8$.[/calc] [mat]R) La puntuació mitjana és de $3{,}8$ estrelles.[/mat]"],
'cb4-25-q17': [
  "[mat]• Cada nombre de tardes s'ha de multiplicar pel nombre d'alumnes que hi van.\n• Després, cal sumar tots els resultats.\n• Finalment, caldrà fer una divisió.[/mat] [calc]Per començar, prem [[frac]] i escriu la suma al numerador.[/calc]",
  "[mat]Necessitem saber el total d'alumnes enquestats:\n$25+35+25+10$\nCaldrà dividir la nostra suma entre aquest total.[/mat] [calc]Baixa al denominador amb [[down]] i escriu aquesta suma.[/calc]",
  "[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $2.210526316$.[/calc] [mat]R) De mitjana, hi van aproximadament $2{,}21$ tardes per setmana.[/mat]",
  "[calc]!!Error típic!!:\nSi ho escrius en una línia i no poses parèntesis al denominador: [[lpar]] … [[rpar]] [[entre]] $25$ [[mes]] $35$ [[mes]] $25$ [[mes]] $10$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $78.4$.[/calc] [mat]La calculadora ha seguit bé les instruccions, però sense parèntesis només s'ha dividit entre el primer $25$.[/mat] [mat]No té cap sentit: una setmana no té $78$ tardes![/mat]"],
'll4a-8-56': [
  "[mat]Abans de calcular, pensa:\n• és possible que la seva nota mitjana sigui un $4$?\n• creus que la seva nota s'acostarà més al $5$ o al $7$?[/mat]",
  "[mat]Cada nota es multiplica pel seu pes ($30$ % és $0{,}3$) i se sumen.\nNo cal dividir: els pesos ja sumen $1$, el $100$ %.[/mat] [calc]Escriu $0.3$ [[per]] $5$ [[mes]] $0.3$ [[per]] $6$ [[mes]] $0.4$ [[per]] $9$.[/calc]",
  "[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $6.9$.[/calc] [mat]R) La nota mitjana de la Marta és un $6{,}9$.[/mat]"],
}
X25 = {k: list(v) for k, v in CW5.items()}
X25['cb4-24-q8'][3] = CW5['cb4-24-q8'][3].replace("prem [[shift]] [[exe]] (≈)", "prem [[sd]]")
X25['cb4-25-q17'][4] = CW5['cb4-25-q17'][4].replace("Prem [[shift]] [[exe]] (≈)", "Prem [[exe]] i després [[sd]]")

def ms(t):
    t = t.replace("Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és", "Prem [[igual]]: obtens el resultat, que és")
    return t.replace('[[shift]] [[exe]] (≈)', '[[igual]]').replace('[[exe]]', '[[igual]]')
MS5 = {k: [ms(x) for x in v] for k, v in CW5.items()}
MS5['cb4-24-q8'] = [
  "[mat]• Cada puntuació d'estrelles s'ha de multiplicar pel nombre de clients que l'han donada.\n• Després, cal sumar tots els resultats.\n• Finalment, caldrà fer una divisió.[/mat] [calc]La fx-82MS no té plantilla de fracció: escriu la suma entre parèntesis.[/calc]",
  "[mat]Necessitem saber el total de clients:\n$22+32+16+8+2=80$\nCaldrà dividir la nostra suma entre el total de clients, que és $80$.[/mat] [calc]Ara fes l'operació [[entre]] $80$.[/calc]",
  "[calc]Prem [[igual]]: obtens el resultat, que és $3.8$.[/calc] [mat]R) La puntuació mitjana és de $3{,}8$ estrelles.[/mat]"]
MS5['cb4-25-q17'][0] = "[mat]• Cada nombre de tardes s'ha de multiplicar pel nombre d'alumnes que hi van.\n• Després, cal sumar tots els resultats.\n• Finalment, caldrà fer una divisió.[/mat] [calc]Per començar, escriu la suma entre parèntesis.[/calc]"
MS5['cb4-25-q17'][1] = "[mat]Necessitem saber el total d'alumnes enquestats:\n$25+35+25+10$\nCaldrà dividir la nostra suma entre aquest total.[/mat] [calc]Ara fes l'operació [[entre]] i escriu aquesta suma, també entre parèntesis.[/calc]"
MS5['cb4-25-q17'][3] = "[calc]!!Error típic!!:\nSi no poses parèntesis al denominador: [[lpar]] … [[rpar]] [[entre]] $25$ [[mes]] $35$ [[mes]] $25$ [[mes]] $10$.[/calc]"

# ───────────────────── T6 · Pitàgores, àrees i volums ─────────────────────
EX6 = {
'cb4-26-q7': dict(titol="El tram d'escala",
  enunciat="Una escala uneix dues plantes d'un edifici. Cada tram d'escala puja una altura de $3$ m i avança una longitud de $5$ m.\n\nQuant mesura cada tram d'escala?",
  provaTu=("La rampa de l'skatepark del teu barri puja una altura d'$1{,}2$ m i avança una longitud de $5$ m.\nQuant mesura la rampa?",
           "$\\sqrt{1{,}2^2+5^2}=\\sqrt{26{,}44}\\simeq 5{,}14$ m\nR) La rampa mesura aproximadament $5{,}14$ m.")),
'll4a-4-34': dict(titol="L'escala recolzada a la paret",
  enunciat="En Marc recolza una escala de $5$ m en una paret per pintar-la. El peu de l'escala queda separat una distància de $4$ m respecte de la base de la paret.\n\nA quina altura de la paret arriba l'escala?",
  tancament="[mat]Recorda:\n• Si coneixes la hipotenusa i un catet, i vols trobar la mida de l'altre catet, et cal aplicar la fórmula adequada:\n\n$\\sqrt{5^2-4^2}=3$ m[/mat]",
  provaTu=("Els bombers recolzen una escala de $6{,}5$ m en una paret. El peu de l'escala és a $2{,}5$ m de la paret.\nA quina altura arriba l'escala?",
           "$\\sqrt{6{,}5^2-2{,}5^2}=\\sqrt{36}=6$ m\nR) L'escala arriba a $6$ m d'altura.")),
'cb4-22-q8': dict(titol='El got de vidre',
  enunciat="Un got de vidre té forma de cilindre. El radi de la base fa $3$ cm i l'alçada, $15$ cm.\n\nQuin és el volum del got?[nota]Volum d'un cilindre: $V=\\pi\\cdot r^2\\cdot h$[/nota]",
  provaTu=("Una llauna de refresc té forma de cilindre. El radi de la base fa $3$ cm i l'alçada, $11{,}66$ cm.\n• Quin és el volum de la llauna?\n• És cert que hi caben $330$ ml?",
           "$V=\\pi\\cdot 3^2\\cdot 11{,}66=104{,}94\\pi\\simeq 329{,}7$ cm³\nR) El volum de la llauna és aproximadament de $329{,}7$ cm³, és a dir, uns $330$ ml: sí, hi caben.")),
'cb4-25-q27': dict(titol='La tela del para-sol',
  enunciat="Volem saber quanta tela fa falta per construir un para-sol. Podem aproximar l'àrea del para-sol per la d'un cercle de $0{,}75$ m de radi.\n\nTroba el valor d'aquesta àrea.[nota]Àrea del cercle: $A=\\pi\\cdot r^2$[/nota]",
  provaTu=("Una pizza rodona fa $15$ cm de radi.\nQuant val la seva àrea?",
           "$A=\\pi\\cdot 15^2=225\\pi\\simeq 706{,}86$ cm²\nR) La pizza té una àrea aproximada de $706{,}86$ cm².")),
'll4a-4-8': dict(titol="L'ombra del campanar",
  enunciat="Un dia de sol, la Júlia vol saber l'altura del campanar del seu poble. Fa aquest experiment:\n• En primer lloc, mesura l'ombra que fa el campanar al terra: són $12$ m.\n• Ràpidament, posa un pal vertical i pren mesures: el pal mesura $2$ m i la seva ombra, $1{,}5$ m.\n\nLa Júlia ha anat ràpid perquè no volia que el Sol canviés la seva inclinació respecte del terra.\n\nLa Júlia ja sap que el campanar mesura $16$ m d'altura. Com ho ha sabut?",
  tancament="[mat]Recorda:\n• Si l'ombra és $8$ vegades més llarga, l'altura també és $8$ vegades més gran\n\n$12\\div 1{,}5=8$\n$2\\cdot 8=16$ m[/mat]",
  provaTu=("Un fanal de $6$ m fa una ombra de $9$ m.\nA la mateixa hora, quina ombra faràs tu, si fas $1{,}8$ m d'alçada?",
           "$9\\div 6=1{,}5$\n$1{,}8\\cdot 1{,}5=2{,}7$ m\nR) La meva ombra farà $2{,}7$ m.")),
}
PI_CW, PI_X2 = "π ([[shift]] [[7]])", "π ([[shift]] [[exp]])"
ESC_TRI = "[mat]Podem formar un triangle rectangle, on:\n• el tros de terra ($4$ m) és un catet;\n• l'altura a la qual arriba l'escala és l'altre catet;\n• la pròpia escala és la hipotenusa.\nPel teorema de Pitàgores, l'altura de l'escala val:\n$\\sqrt{5^2-4^2}$[/mat] "
ESC_ERR = "[mat]La calculadora ha seguit les teves instruccions, però no té cap sentit, perquè una escala de $5$ m inclinada no pot arribar a $6{,}4$ m d'altura. L'altura màxima seria precisament $5$ m, posant-la vertical.[/mat]"
CW6 = {
'cb4-26-q7': [
  "[mat]El tram és la hipotenusa d'un triangle rectangle amb catets de $3$ m i $5$ m.\nApliquem el teorema de Pitàgores per trobar quant mesura la hipotenusa:\n$\\sqrt{3^2+5^2}$[/mat] [calc]Prem [[arrel]] i escriu a dins $3$ [[x2]] [[mes]] $5$ [[x2]].[/calc]",
  "[calc]Prem [[exe]]: obtens $\\sqrt{34}$.\n" + EXACTE("en forma d'arrel") + "$5.830951895$.[/calc] [mat]$\\sqrt{34}\\simeq 5{,}83$ m[/mat]",
  "[calc]Per obtenir l'expressió decimal de l'arrel, prem [[shift]] [[exe]] (≈).\nObtens $5.830951895$.[/calc] [mat]R) Cada tram d'escala mesura aproximadament $5{,}83$ m.[/mat]"],
'll4a-4-34': [
  "[mat]Abans de calcular, pensa:\n• quin és el costat més llarg del triangle: l'escala, la paret o el terra?\n• l'escala pot arribar a més de $5$ m d'altura?[/mat]",
  ESC_TRI + "[calc]Prem [[arrel]] i escriu a dins $5$ [[x2]] [[menys]] $4$ [[x2]].[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $3$.[/calc] [mat]R) L'escala arriba a $3$ m d'altura de la paret.[/mat]",
  "[calc]!!Error típic!!:\nSi sumes els quadrats en lloc de restar-los: [[arrel]] $5$ [[x2]] [[mes]] $4$ [[x2]].[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $6.403124237$.[/calc] " + ESC_ERR],
'cb4-22-q8': [
  "[mat]El volum del got es calcula així, a partir del seu radi i de la seva altura:\n$V=\\pi\\cdot 3^2\\cdot 15$[/mat] [calc]Escriu " + PI_CW + ", [[per]] $3$ [[x2]] [[per]] $15$.[/calc]",
  "[calc]Prem [[exe]]: obtens $135\\pi$.\n" + EXACTE("amb π") + "$424.1150082$.[/calc]",
  "[calc]Per tenir-lo en decimal, prem [[shift]] [[exe]] (≈): obtens $424.1150082$.[/calc] [mat]R) El volum del got és aproximadament de $424$ cm³.[/mat]"],
'cb4-25-q27': [
  "[mat]L'àrea del cercle es calcula així:\n$A=\\pi\\cdot 0{,}75^2$[/mat] [calc]Escriu " + PI_CW + ", [[per]] $0.75$ [[x2]].[/calc]",
  "[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $1.767145868$.[/calc] [mat]R) Calen aproximadament $1{,}77$ m² de tela.[/mat]"],
'll4a-4-8': [
  "[mat]Abans de calcular, pensa:\n• el pal mesura més que la seva pròpia ombra, o menys?\n• aleshores, el campanar tindrà una altura superior o inferior a $12$ m?[/mat]",
  "[mat]El pal i el campanar, amb les seves ombres, formen triangles semblants.\nLa raó de semblança és aquesta:\n$12\\div 1{,}5$[/mat] [calc]Escriu $12$ [[entre]] $1.5$.[/calc]",
  "[calc]Prem [[exe]]: obtens $8$.[/calc] [mat]Això vol dir que l'ombra del campanar és $8$ vegades la del pal. Per tant, l'altura del campanar també serà $8$ vegades la del pal.\nCom que el pal mesura $2$ m, farem el següent:[/mat]",
  "[calc]Fes l'operació [[per]] $2$.\n" + ANS + "[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $16$.[/calc] [mat]R) La Júlia ho ha sabut perquè l'altura del campanar és $8$ vegades la del pal: $2\\cdot 8=16$ m.[/mat]",
  "[calc]!!Error típic!!:\nSi inverteixes la raó i fas ombra entre altura: $1.5$ [[per]] $12$ [[entre]] $2$.[/calc]",
  "[calc]Prem [[exe]]: obtens $9$.[/calc] " + FR + " [mat]No té sentit: el campanar ($9$ m) seria més baix que la seva ombra ($12$ m), i el pal no![/mat]"],
}
X26 = {k: [x.replace(PI_CW, PI_X2) for x in v] for k, v in CW6.items()}
for k, i in [('cb4-26-q7', 2), ('cb4-22-q8', 2)]:
    X26[k][i] = X26[k][i].replace("prem [[shift]] [[exe]] (≈)", "prem [[sd]]")
X26['cb4-25-q27'][1] = "[calc]Prem [[exe]]: obtens $\\frac{9}{16}\\pi$.\nAmb [[sd]] el passes a decimal: $1.767145868$.[/calc] [mat]R) Calen aproximadament $1{,}77$ m² de tela.[/mat]"

MS6 = {k: [ms(x.replace(PI_CW, PI_X2)) for x in v] for k, v in CW6.items()}
MS6['cb4-26-q7'] = [
  CW6['cb4-26-q7'][0].replace("Prem [[arrel]] i escriu a dins", "Prem [[arrel]] i escriu, entre parèntesis,"),
  "[calc]Prem [[igual]]: obtens el resultat, que és $5.830951895$.[/calc] [mat]R) Cada tram d'escala mesura aproximadament $5{,}83$ m.[/mat]",
  "[calc]!!Error típic!!:\nSi escrius l'arrel sense parèntesis: [[arrel]] $3$ [[x2]] [[mes]] $5$ [[x2]].[/calc]",
  "[calc]Prem [[igual]]: obtens $28$.[/calc] [mat]La calculadora ha seguit bé les instruccions, però sense parèntesis l'arrel només afecta el $3^2$.[/mat] [mat]No té sentit: el tram no pot ser més llarg que $3+5=8$ m![/mat]"]
MS6['ll4a-4-34'][1] = MS6['ll4a-4-34'][1].replace("Prem [[arrel]] i escriu a dins", "Prem [[arrel]] i escriu, entre parèntesis,")
MS6['ll4a-4-34'][3] = "[calc]!!Error típic!!:\nSi sumes els quadrats en lloc de restar-los: [[arrel]] [[lpar]] $5$ [[x2]] [[mes]] $4$ [[x2]] [[rpar]].[/calc]"
MS6['cb4-22-q8'] = [MS6['cb4-22-q8'][0],
  "[calc]Prem [[igual]]: obtens el resultat, que és $424.1150082$.[/calc] [mat]R) El volum del got és aproximadament de $424$ cm³.[/mat]"]
MS_TANC_Q7 = "[mat]Recorda:\n• A la fx-82MS, el que va dins de l'arrel s'ha d'escriure entre parèntesis\n\n$\\sqrt{3^2+5^2}\\simeq 5{,}83$ m[/mat]"

def bloc(s, fid):
    a = s.index("{\n  id: '%s'" % fid); b = s.index("\n},\n", a) + 4
    return a, b

def posaPassos(path, textos):
    s = open(path).read()
    for fid, nous in textos.items():
        a, b = bloc(s, fid)
        cos = s[a:b].split('\n')
        idx = [i for i, l in enumerate(cos) if l.lstrip().startswith('text: ')]
        assert len(idx) == len(nous), (path, fid, len(idx), len(nous))
        for i, t in zip(idx, nous):
            final = '},' if cos[i].rstrip().endswith('},') else '}'
            cos[i] = '      text: ' + js(t) + final
        s = s[:a] + '\n'.join(cos) + s[b:]
    open(path, 'w').write(s)

def posaExercicis(path, EX):
    s = open(path).read()
    for fid, d in EX.items():
        a, b = bloc(s, fid)
        o = s[a:b]
        out = []
        for l in o.split('\n'):
            if l.startswith('  titol: '): out.append('  titol: ' + js(d['titol']) + ','); continue
            if l.startswith('  enunciat: '):
                out.append('  enunciat: ' + js(d['enunciat']) + ',')
                if 'tancament' in d and '\n  tancament: ' not in o: out.append('  tancament: ' + js(d['tancament']) + ',')
                continue
            if l.startswith('  tancament: '):
                if 'tancament' in d: out.append('  tancament: ' + js(d['tancament']) + ',')
                continue
            if l.startswith('    enunciat: '): out.append('    enunciat: ' + js(d['provaTu'][0]) + ','); continue
            if l.startswith('    solucio: '): out.append('    solucio: ' + js(solmat(d['provaTu'][1])) + ','); continue
            out.append(l)
        s = s[:a] + '\n'.join(out) + s[b:]
    open(path, 'w').write(s)

posaExercicis(ARREL + '/exercicis/eso/mitjanes.js', EX5)
posaExercicis(ARREL + '/exercicis/eso/geometria.js', EX6)
for f, cw, x2, msd in [('mitjanes', CW5, X25, MS5), ('geometria', CW6, X26, MS6)]:
    posaPassos(ARREL + '/models/fx-82sp-cw/fitxes/eso/%s.js' % f, cw)
    posaPassos(ARREL + '/models/fx-570sp-x2/fitxes/eso/%s.js' % f, x2)
    posaPassos(ARREL + '/models/fx-82sp-x2/fitxes/eso/%s.js' % f, x2)
    posaPassos(ARREL + '/models/fx-82ms/fitxes/eso/%s.js' % f, msd)
# tancament propi de la fx-82MS (cb4-26-q7)
p = ARREL + '/models/fx-82ms/fitxes/eso/geometria.js'
s = open(p).read()
s = re.sub(r"(\{\n  id: 'cb4-26-q7',\n  tancament: )[^\n]*,\n", lambda m: m.group(1) + js(MS_TANC_Q7) + ",\n", s, count=1)
open(p, 'w').write(s)
print('fet')
