# Reescriu els textos de les 10 fitxes del bloc T3 «Proporcionalitat» amb les normes de David (artifact «Normes de redacció»).
import re, sys
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from solmat import solmat
ARREL = sys.argv[1]
FR = '{FRASE}'

def js(t):
    """Text → expressió JS entre cometes simples; {FRASE} → ' + FRASE_ERROR + '."""
    t = re.sub(r"(\$[^$]+\$) euros", r"\1 €", t)   # els imports, amb el símbol € fora de la fórmula (David)
    e = t.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
    return "'" + e.replace(FR, "' + FRASE_ERROR + '") + "'"

# ── Textos comuns (exercicis/eso/proporcionalitat.js) ──
EX = {
'cb2-26-q5': dict(titol='La recepta del pastís',
  enunciat="En Biel fa un pastís de xocolata seguint una recepta per a $5$ persones: cal posar $3$ ous i $180$ g de xocolata.\n\nAl cap d'uns dies, en Biel repeteix la recepta, però s'equivoca i hi posa $5$ ous.\n\nQuanta xocolata haurà d'utilitzar per mantenir les proporcions de la recepta?",
  tancament='[mat]Recorda:\n• $180\\div 3=60$ g\n• $60\\cdot 5=300$ g[/mat]',
  provaTu=("Una recepta per a fer creps demana posar $2$ ous i $250$ ml de llet.\nTu tens a la nevera $3$ ous i els vols gastar tots. Quanta llet hauràs de posar per mantenir les proporcions?",
           "$250\\div 2=125$ ml\n$125\\cdot 3=375$ ml\nR) Hauré de fer servir $375$ ml de llet.")),
'cb4-22-q26': dict(titol="L'aixeta del lavabo",
  enunciat="En Nil estudia quanta aigua es fa servir a casa seva. Ha observat que l'aixeta del lavabo omple un got de $0{,}2$ litres en $3$ segons.\n\nQuants litres d'aigua surten de l'aixeta en $60$ segons?",
  provaTu=("Una aixeta omple una ampolla d'$1{,}5$ litres en $10$ segons.\nTu deixes l'aixeta oberta $2$ minuts ($120$ segons). Quants litres d'aigua hi surten, si raja sempre igual?",
           "$1{,}5\\div 10=0{,}15$ litres\n$0{,}15\\cdot 120=18$ litres\nR) De l'aixeta surten $18$ litres d'aigua.")),
'cb4-25-q8': dict(titol='El xarop',
  enunciat="A en Mario li han receptat un xarop. En $5$ ml de xarop hi ha $105$ mg de principi actiu.\n\nQuants mg de principi actiu hi ha en $16$ ml del mateix xarop?",
  tancament='[mat]Recorda:\n• $105\\div 5=21$ mg\n• $21\\cdot 16=336$ mg[/mat]',
  provaTu=("En $10$ ml d'un xarop hi ha $250$ mg de principi actiu.\nTu has de prendre $6$ ml de xarop. Quants mg de principi actiu prendràs?",
           "$250\\div 10=25$ mg\n$25\\cdot 6=150$ mg\nR) Prendré $150$ mg de principi actiu.")),
'cb4-23-q26': dict(titol='La fotografia més petita',
  enunciat="L'Anna té una fotografia de $62$ cm d'amplada i $34$ cm d'alçada. La vol imprimir més petita, de $42$ cm d'amplada.\n\nQuina alçada tindrà la fotografia impresa, si l'Anna no la vol deformar?",
  provaTu=("Tens una foto de $45$ cm d'amplada i $30$ cm d'alçada.\nLa vols imprimir amb $20$ cm d'amplada, sense deformar-la. Quina alçada tindrà?",
           "$30\\cdot 20\\div 45=13{,}33\\ldots$ cm\nR) La foto mesurarà aproximadament $13{,}3$ cm d'alçada.")),
'cb4-26-q8': dict(titol="Els esglaons de l'escala",
  enunciat="En Samuel viu al 1r 2a, i puja a peu les escales del seu edifici.\nCada esglaó de l'escala mesura $15$ cm d'altura i en total haurà pujat $3$ m.\n\nQuants esglaons haurà pujat?",
  tancament='[mat]Recorda:\n• $15$ cm $=0{,}15$ m\n• $3\\div 0{,}15=20$ esglaons[/mat]',
  provaTu=("Una escala puja $2{,}4$ m d'altura i cada esglaó fa $16$ cm d'altura.\nQuants esglaons hauràs de pujar per arribar a dalt?",
           "$16$ cm $=0{,}16$ m\n$2{,}4\\div 0{,}16=15$ esglaons\nR) Hauré de pujar $15$ esglaons.")),
'cb4-26-q25': dict(titol='La bossa de botons',
  enunciat="Una empresa fabrica botons de plàstic, tots iguals. Sabem que $20$ botons pesen $70$ g.\n\nUna bossa plena de botons pesa $2{,}41$ kg. Quants botons hi ha a la bossa, si la bossa buida pesa $30$ g?",
  tancament='[mat]Recorda:\n• $70\\div 20=3{,}5$ g\n• $2.410-30=2.380$ g\n• $2.380\\div 3{,}5=680$ botons[/mat]',
  provaTu=("Tens una caixa plena de claus iguals que pesa $1{,}5$ kg. Poses $12$ claus a la bàscula i llegeixes: $30$ g.\nQuants claus hi ha a la caixa?",
           "$30\\div 12=2{,}5$ g\n$1.500\\div 2{,}5=600$ claus\nR) A la caixa hi ha $600$ claus.")),
'll4a-3-26': dict(titol='El plànol del pis',
  enunciat="El plànol d'un pis està dibuixat a escala $1:50$. Al plànol, una de les parets fa $8$ cm de longitud.\n\nQuant mesura aquesta paret de debò, en metres?",
  tancament='[mat]Recorda:\n• $8\\cdot 50=400$ cm\n• $400$ cm $=4$ m[/mat]',
  provaTu=("En un mapa a escala $1:25.000$, dos pobles són a $6$ cm.\nQuina distància hi ha de debò entre els dos pobles, en km?",
           "$6\\cdot 25.000=150.000$ cm\n$150.000$ cm $=1{,}5$ km\nR) Entre els dos pobles hi ha $1{,}5$ km.")),
'll4a-3-13': dict(titol='La neteja en un parc',
  enunciat="L'any passat, per arreglar tot un parc, es va formar un equip de $6$ jardiners per podar els arbres, i van trigar $10$ dies per acabar la feina.\n\nAquest any només hi ha $4$ jardiners per fer la mateixa feina.\n\nQuants dies trigaran a podar tot el parc, si van al mateix ritme de feina?",
  tancament="[mat]Recorda:\n• L'equació és aquesta: $6\\cdot 10=4\\cdot x$\n• La solució és aquesta: $x=15$ dies[/mat]",
  provaTu=("Fa $5$ anys que es va pintar tot l'institut, i ho van fer $3$ pintors, en $8$ dies de feina.\nAquest cop, s'han contractat $4$ pintors.\n\nQuants dies trigaran a pintar l'institut, si treballen al mateix ritme?",
           "$3\\cdot 8=4\\cdot x$\n$x=24\\div 4=6$ dies\nR) Els $4$ pintors trigaran $6$ dies.")),
'recu-f6-102': dict(titol='Els pots de pintura',
  enunciat="En Carles recorda que quan va pintar la seva habitació, ja fa temps, va fer servir $6$ pots de pintura de $4$ kg cadascun.\nAra la vol tornar a pintar, però a la botiga només venen pots de $3$ kg.\n\nQuants pots de $3$ kg necessitarà?",
  tancament="[mat]Recorda:\n• L'equació és aquesta: $6\\cdot 4=x\\cdot 3$\n• La solució és aquesta: $x=8$ pots[/mat]",
  provaTu=("Per omplir una piscina calen $12$ camions de $9.000$ litres.\nTu només tens camions de $6.000$ litres. Quants camions et caldran?",
           "$12\\cdot 9.000=x\\cdot 6.000$\n$x=108.000\\div 6.000=18$ camions\nR) Em caldran $18$ camions.")),
'll4a-3-14': dict(titol='El taxi',
  enunciat="Un taxi cobra $3{,}50$ € per començar el viatge i, després, $1{,}20$ € per cada km recorregut.\n\nPer anar a l'hospital a visitar un familiar has fet un trajecte de $5$ km. Després, per acompanyar-lo a casa seva, has fet un trajecte de $10$ km.\n\n**a)** Creus que el trajecte de $10$ km costa el doble que el de $5$ km?\n**b)** Quant costa cada trajecte?",
  provaTu=("Un gimnàs cobra $30$ € de matrícula inicial i, posteriorment, cobra $25$ € cada mes.\n**a)** Quant pagaràs si hi vas $3$ mesos?\n**b)** I si hi vas $6$ mesos?\n**c)** En el segon cas, pagues el doble que en el primer cas?",
           "$30+25\\cdot 3=105$ €\n$30+25\\cdot 6=180$ €\nR) Pagaré $105$ € i $180$ €, respectivament.\nNo és el doble, perquè la matrícula sempre es paga una sola vegada.")),
}

ANS = "La calculadora continua amb el resultat d'abans (Ans)."
EXACTE = "Si surt en forma de fracció és perquè la calculadora està configurada per donar resultats exactes.\nSi estigués configurada per donar decimals, sortiria "
# ── Passos de la fx-82SP CW (la fx-570/991SP CW fa servir el mateix fitxer; les X II, igual llevat de q26) ──
CW = {
'cb2-26-q5': [
  "[mat]Abans de calcular, pensa:\n• si té més ous, haurà de gastar més xocolata o menys xocolata?\n• si tingués el doble d'ous, és cert que caldria el doble de xocolata?[/mat]",
  "[mat]$3$ ous → $180$ g de xocolata\n$1$ ou → ?[/mat] [calc]Escriu $180$ [[entre]] $3$.[/calc]",
  "[calc]Prem [[exe]]: obtens $60$.[/calc] [mat]$1$ ou → $60$ g de xocolata[/mat]",
  "[mat]Amb $5$ ous, cal gastar $5$ vegades més xocolata que amb $1$ ou.[/mat] [calc]Fes l'operació [[per]] $5$.\n" + ANS + "[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $300$.[/calc] [mat]R) En Biel ha de fer servir $300$ g de xocolata per $5$ ous.[/mat]",
  "[calc]!!Error típic!!:\nSi apliques malament la regla de tres: $180$ [[per]] $3$ [[entre]] $5$.[/calc]",
  "[calc]Prem [[exe]]: obtens $108$.[/calc] " + FR + " [mat]No té lògica que amb $5$ ous portis menys xocolata que amb $3$ ous.[/mat]"],
'cb4-22-q26': [
  "[mat]Abans de calcular, pensa:\n• en $60$ segons obté més o menys de $0{,}2$ litres?\n• si manté l'aixeta oberta el doble de temps, surt el doble d'aigua?[/mat]",
  "[mat]$3$ segons → $0{,}2$ litres\n$1$ segon → ?[/mat] [calc]Escriu $0.2$ [[entre]] $3$.[/calc]",
  "[calc]Prem [[exe]]: obtens $\\frac{1}{15}$.\n" + EXACTE + "$0.06666666667$.[/calc] [mat]$1$ segon → $\\frac{1}{15}\\simeq 0{,}067$ litres[/mat]",
  "[mat]En $60$ segons surt $60$ vegades més aigua que en $1$ segon.[/mat] [calc]Fes l'operació [[per]] $60$.\n" + ANS + "[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $4$.[/calc] [mat]R) En $60$ segons surten $4$ litres d'aigua de l'aixeta.[/mat]"],
'cb4-25-q8': [
  "[mat]Abans de calcular, pensa:\n• si prens el triple de xarop, també prendràs el triple de principi actiu?[/mat]",
  "[mat]$5$ ml → $105$ mg\n$1$ ml → ?[/mat] [calc]Escriu $105$ [[entre]] $5$.[/calc]",
  "[calc]Prem [[exe]]: obtens $21$.[/calc] [mat]$1$ ml → $21$ mg[/mat]",
  "[mat]En $16$ ml hi ha $16$ vegades més principi actiu que en $1$ ml.[/mat] [calc]Fes l'operació [[per]] $16$.\n" + ANS + "[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $336$.[/calc] [mat]R) En $16$ ml de xarop hi ha $336$ mg de principi actiu.[/mat]",
  "[calc]!!Error típic!!:\nSi apliques malament la regla de tres: $105$ [[per]] $5$ [[entre]] $16$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $32.8125$.[/calc] " + FR + " [mat]No té sentit que en $16$ ml hi hagi menys principi actiu de medicament que en $5$ ml.[/mat]"],
'cb4-23-q26': [
  "[mat]Si no es deforma, l'alçada és proporcional a l'amplada:\n$62$ cm d'amplada → $34$ cm d'alçada\n$42$ cm d'amplada → ?\nL'alçada nova és $\\frac{34\\cdot 42}{62}$.[/mat] [calc]Escriu $34$ [[per]] $42$.[/calc]",
  "[calc]Ara fes l'operació [[entre]] $62$.[/calc]",
  "[calc]Prem [[exe]]: obtens $\\frac{714}{31}$.\n" + EXACTE + "$23.03225806$.[/calc] [mat]$\\frac{714}{31}\\simeq 23{,}03$ cm[/mat]",
  "[calc]Per tenir-lo en decimal, prem [[shift]] i [[exe]] (≈): obtens $23.03225806$.[/calc] [mat]R) La fotografia impresa farà aproximadament $23$ cm d'alçada.[/mat]"],
'cb4-26-q8': [
  "[mat]Abans de calcular, pensa:\n• si els esglaons fossin només de $12$ cm, creus que caldrien més esglaons o menys?[/mat]",
  "[mat]En total puja $3$ m i cada esglaó en puja $15$ cm.\nÉs **necessari** que les mesures siguin en les mateixes unitats, per exemple, en metres.\n\n$3$ m $=3$ m\n$15$ cm $=0{,}15$ m[/mat] [calc]Escriu $3$ [[entre]] $0.15$.[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $20$.[/calc] [mat]R) En Samuel haurà pujat $20$ esglaons.[/mat]",
  "[calc]!!Error típic!!:\nSi no passes les mesures a les mateixes unitats: $3$ [[entre]] $15$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $0.2$.[/calc] " + FR + " [mat]No té cap sentit: no es pot pujar $0{,}2$ esglaons per arribar a $3$ m d'altura![/mat]"],
'cb4-26-q25': [
  "[mat]Abans de calcular, pensa:\n• quants grams són $2{,}41$ kg?\n• com faràs servir que la bossa buida pesa $30$ g?[/mat]",
  "[mat]$20$ botons → $70$ g\n$1$ botó → ?[/mat] [calc]Escriu $70$ [[entre]] $20$.[/calc]",
  "[calc]Prem [[exe]]: obtens $\\frac{7}{2}$.\n" + EXACTE + "$3.5$.[/calc] [mat]$1$ botó → $\\frac{7}{2}=3{,}5$ g[/mat]",
  "[mat]La bossa plena pesa $2{,}41$ kg $=2.410$ g.\nSense la bossa buida, els botons pesen $2.410-30$ g.\nHi ha tants botons com vegades hi cap el pes d'un botó.[/mat] [calc]Escriu [[lpar]] $2410$ [[menys]] $30$ [[rpar]] [[entre]] i prem [[ans]].\n[[ans]] és el resultat d'abans.[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $680$.[/calc] [mat]R) A la bossa hi ha $680$ botons.[/mat]",
  "[calc]!!Error típic!!:\nSi multipliques en lloc de dividir: $2380$ [[per]] $3.5$.[/calc]",
  "[calc]Prem [[exe]]: obtens $8330$.[/calc] " + FR + " [mat]No pot ser: $8.330$ botons de $3{,}5$ g pesarien més de $29$ kg, i la bossa pesa $2{,}41$ kg.[/mat]"],
'll4a-3-26': [
  "[mat]Abans de calcular, pensa:\n• què vol dir l'escala $1:50$?\n• creus que un resultat com $3{,}2$ m seria possible? I un resultat com $0{,}4$ cm?[/mat]",
  "[mat]A escala $1:50$, cada centímetre del plànol són $50$ cm de debò.[/mat] [calc]Escriu $8$ [[per]] $50$.[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $400$.[/calc] [mat]R) La paret fa $400$ cm, és a dir, $4$ m.[/mat]",
  "[calc]!!Error típic!!:\nSi divideixes en lloc de multiplicar: $8$ [[entre]] $50$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $0.16$.[/calc] " + FR + " [mat]No té sentit: de debò, la paret faria $0{,}16$ cm, que és absurd.[/mat]"],
'll4a-3-13': [
  "[mat]Abans de calcular, pensa:\n• amb menys jardiners, es triga més dies o menys dies?\n• amb la meitat de jardiners es triga el doble de temps?[/mat]",
  "[mat]És una situació de proporcionalitat inversa.\n$6$ jardiners → $10$ dies\n$4$ jardiners → $x$\n\nSabem que $6\\cdot 10=4\\cdot x$.[/mat] [calc]Escriu $6$ [[per]] $10$.[/calc]",
  "[calc]Prem [[exe]]: obtens $60$.[/calc] [mat]Aquest nombre es manté constant: $60$.[/mat]",
  "[mat]Sabem que $4\\cdot x=60$.[/mat] [calc]Fes l'operació $60$ [[entre]] $4$.\n" + ANS + "[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $15$.[/calc] [mat]R) Els $4$ jardiners trigaran $15$ dies a podar el parc.[/mat]",
  "[calc]!!Error típic!!:\nSi fas una regla de tres directa: $10$ [[per]] $4$ [[entre]] $6$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $6.666666667$.[/calc] " + FR + " [mat]No té lògica que $4$ jardiners acabin la feina més ràpid que $6$ jardiners.[/mat]"],
'recu-f6-102': [
  "[mat]Abans de calcular, pensa:\n• amb pots més petits, calen més pots o menys?\n• en el fons, quants kg de pintura calen en total?[/mat]",
  "[mat]És una situació de proporcionalitat inversa.\n$6$ pots → $4$ kg cada pot\n$x$ pots → $3$ kg cada pot\n\nSabem que $6\\cdot 4=x\\cdot 3$.[/mat] [calc]Escriu $6$ [[per]] $4$.[/calc]",
  "[calc]Prem [[exe]]: obtens $24$.[/calc] [mat]Aquest nombre es manté constant: són els $24$ kg de pintura que calen.[/mat]",
  "[mat]Sabem que $x\\cdot 3=24$.[/mat] [calc]Fes l'operació $24$ [[entre]] $3$.\n" + ANS + "[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $8$.[/calc] [mat]R) En Carles necessita $8$ pots de $3$ kg.[/mat]",
  "[calc]!!Error típic!!:\nSi fas una regla de tres directa: $6$ [[per]] $3$ [[entre]] $4$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $4.5$.[/calc] " + FR + " [mat]No té cap sentit, perquè si compres pots més petits, en necessites més de $6$, segur![/mat]"],
'll4a-3-14': [
  "[mat]Per fer un trajecte de $5$ km es paguen els $3{,}50$ € inicials i després $1{,}20$ € per cada km.\n$3{,}50$ € $+\\ 5\\cdot 1{,}20$ €[/mat] [calc]Escriu $3.5$ [[mes]] $1.2$ [[per]] $5$.[/calc]",
  "[calc]Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $9.5$.[/calc] [mat]El trajecte de $5$ km costa $9{,}50$ €.[/mat]",
  "[mat]Per un trajecte de $10$ km: $3{,}50$ € $+\\ 10\\cdot 1{,}20$ €[/mat] [calc]Esborra amb [[ac]] i escriu $3.5$ [[mes]] $10$ [[per]] $1.2$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $15.5$.[/calc] [mat]El trajecte de $10$ km costa $15{,}50$ €.[/mat]",
  "[mat]R) El trajecte de $5$ km costa $9{,}50$ € i el de $10$ km, $15{,}50$ €.\nEl preu no és proporcional als km recorreguts.[/mat]"],
}
X2 = {k: list(v) for k, v in CW.items()}
X2['cb4-23-q26'][3] = "[calc]Per tenir-lo en decimal, prem [[sd]]: obtens $23.03225806$.[/calc] [mat]R) La fotografia impresa farà aproximadament $23$ cm d'alçada.[/mat]"

def ms(t):
    t = t.replace("Prem directament [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $9.5$.", "Prem [[igual]]: obtens el resultat, que és $9.5$.")
    return t.replace('[[shift]] [[exe]] (≈)', '[[igual]]').replace('[[exe]]', '[[igual]]')
MS = {k: [ms(x) for x in v] for k, v in CW.items()}
MS['cb4-22-q26'][2] = "[calc]Prem [[igual]]: obtens $0.066666667$.\nNo l'arrodoneixis: la calculadora el guarda sencer (Ans).[/calc] [mat]$1$ segon → $0{,}0666\\ldots\\simeq 0{,}067$ litres[/mat]"
MS['cb4-26-q25'][2] = "[calc]Prem [[igual]]: obtens $3.5$.[/calc] [mat]$1$ botó → $3{,}5$ g[/mat]"
MS['cb4-23-q26'] = [ms(CW['cb4-23-q26'][0]), ms(CW['cb4-23-q26'][1]),
  "[calc]Prem [[igual]]: obtens el resultat, que és $23.03225806$.[/calc] [mat]R) La fotografia impresa farà aproximadament $23$ cm d'alçada.[/mat]"]

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

def posaExercicis(path):
    s = open(path).read()
    for fid, d in EX.items():
        a, b = bloc(s, fid)
        o = s[a:b]
        o = re.sub(r"\n  titol: '(?:[^'\\]|\\.)*',", "\n  titol: " + js(d['titol']).replace('\\', '\\\\') + ",", o, 1) if False else o
        lines = o.split('\n')
        out = []
        skip = False
        for l in lines:
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

posaExercicis(ARREL + '/exercicis/eso/proporcionalitat.js')
posaPassos(ARREL + '/models/fx-82sp-cw/fitxes/eso/proporcionalitat.js', CW)
posaPassos(ARREL + '/models/fx-570sp-x2/fitxes/eso/proporcionalitat.js', X2)
posaPassos(ARREL + '/models/fx-82sp-x2/fitxes/eso/proporcionalitat.js', X2)
posaPassos(ARREL + '/models/fx-82ms/fitxes/eso/proporcionalitat.js', MS)
print('fet')
