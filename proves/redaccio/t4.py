# Reescriu els textos de les 5 fitxes del bloc T4 «Percentatges» amb les normes apreses a la T3 (ARCHITECTURE §9).
import re, sys
import os; sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from solmat import solmat
ARREL = sys.argv[1]
FR = '{FRASE}'

def js(t):
    t = re.sub(r"(\$[^$]+\$) euros", r"\1 €", t)
    e = t.replace('\\', '\\\\').replace("'", "\\'").replace('\n', '\\n')
    return "'" + e.replace(FR, "' + FRASE_ERROR + '") + "'"

ANS = "La calculadora continua amb el resultat d'abans (Ans)."

EX = {
'cb4-23-q23': dict(titol='Les fotos amb descompte',
  enunciat="Una botiga imprimeix fotografies en color a $0{,}30$ € cadascuna.\n\nL'Anna hi imprimeix $40$ fotografies en color i la botiga li fa un descompte del $25$ %.\n\nQuant li costarà imprimir les fotografies?",
  tancament="[mat]Recorda:\n• Si et fan un descompte del $25$ %, en el fons vol dir que pagues un $75$ % del preu. Per tant, cal multiplicar per $0{,}75$\n\n$40\\cdot 0{,}30\\cdot 0{,}75=9$ €[/mat]",
  provaTu=("Una llibreta costa $2{,}40$ €. Tu en compres $15$ i et fan un descompte del $20$ %.\nQuant pagaràs en total?",
           "$15\\cdot 2{,}40\\cdot 0{,}80=28{,}80$ €\nR) Pagaré $28{,}80$ €.")),
'cb4-23-q24': dict(titol="Les fotos que imprimeix l'Anna",
  enunciat="L'Anna va a una botiga a imprimir fotografies en color. Sap que van a $0{,}30$ € cada còpia.\n\nLi fan un descompte del $25$ % i paga $4{,}50$ €.\n\nQuantes fotografies ha imprès?",
  tancament="[mat]Recorda:\n• Si has pagat el $75$ % del preu, per saber el preu sense descompte cal dividir entre $0{,}75$\n\n$4{,}50\\div 0{,}75=6$ €\n$6\\div 0{,}30=20$ fotografies[/mat]",
  provaTu=("Unes llibretes costen $2{,}40$ € cadascuna. Amb un descompte del $20$ %, has pagat $28{,}80$ €.\nQuantes llibretes has comprat?",
           "$28{,}80\\div 0{,}80=36$ €\n$36\\div 2{,}40=15$ llibretes\nR) He comprat $15$ llibretes.")),
'll4-2-25': dict(titol="La declaració de l'IVA",
  enunciat="En Jordi té una botiga d'electrodomèstics. Cada trimestre ha de fer la declaració de l'IVA a Hisenda.\n\nEn el primer trimestre de l'any ha cobrat $18.150$ € als seus clients, amb l'IVA del $21$ % inclòs.\n\n**a)** Quants diners ha facturat realment, sense IVA?\n**b)** Quants diners d'IVA haurà de pagar a Hisenda?",
  provaTu=("Tens una petita botiga de roba. En un trimestre has cobrat $24.200$ € als clients, amb l'IVA del $21$ % inclòs.\n**a)** Quants diners has facturat sense IVA?\n**b)** Quants diners d'IVA hauràs de pagar a Hisenda?",
           "$24.200\\div 1{,}21=20.000$ €\n$24.200-20.000=4.200$ €\nR) He facturat $20.000$ € i hauré de pagar $4.200$ € d'IVA.")),
'll4a-2-17': dict(titol="L'abric rebaixat",
  enunciat="En una botiga de roba hi ha un cartell que diu: «Rebaixa del $40$ % i, els dijous, un $10$ % extra: tindràs un $50$ % de descompte!».\n\nEn Pau hi vol comprar un abric de $200$ €. Aprofita que és dijous per tenir més rebaixa. De fet, en Pau creu que haurà de pagar just la meitat, o sigui, $100$ €.\n\n**a)** Realment, quin és el preu rebaixat que pagarà en Pau?\n**b)** És cert que li han fet un $50$ % de descompte?",
  tancament="[mat]Recorda:\n• Si et fan dos descomptes seguits, primer pagues el $60$ % del preu inicial i, després, el $90$ % del primer preu rebaixat. Per tant, cal multiplicar per $0{,}6$ i per $0{,}9$\n\n$200$ € $\\cdot 0{,}6\\cdot 0{,}9=108$ €[/mat]",
  provaTu=("Una tauleta costa $300$ €. Primer la rebaixen un $20$ % i després, sobre el preu rebaixat, un $10$ % més.\n**a)** Quin és el preu final?\n**b)** Quin percentatge de descompte t'han fet en total?",
           "$300\\cdot 0{,}8\\cdot 0{,}9=216$ €\n$300-216=84$ €\n$84\\div 300=0{,}28$\nR) La tauleta em costarà $216$ €.\nM'han fet un descompte del $28$ %, no del $30$ %.")),
'll4-2-16': dict(titol="L'historial de preus del televisor",
  enunciat="La Naia està mirant l'historial de preus d'un televisor en una botiga en línia. La Naia se sorprèn molt, fixa't què passa:\n\n• Fa $2$ mesos, el preu era $300$ €.\n• Fa $1$ mes, el preu va baixar exactament un $15$ %.\n• Ahir mateix, el preu va pujar exactament un $15$ %.\n\nPerò el preu actual, segons està veient la Naia, **no és** de $300$ €.\n\n**a)** Quin és el preu actual del televisor?\n**b)** Com pot ser que no torni a costar $300$ €?",
  provaTu=("Una samarreta costa $40$ €. Primer el preu puja un $25$ % i després baixa un $25$ %.\nQuin és el preu final de la samarreta?",
           "$40\\cdot 1{,}25\\cdot 0{,}75=37{,}50$ €\nR) La samarreta costa $37{,}50$ €, menys que al principi.")),
}

CW = {
'cb4-23-q23': [
  "[mat]Sense descompte, $40$ fotografies costen això:\n$40\\cdot 0{,}30$ €.[/mat] [calc]Escriu $40$ [[per]] $0.3$.[/calc]",
  "[mat]Amb un descompte del $25$ %, es paga el $75$ % del preu.\nPagar el $75$ % és multiplicar per $0{,}75$.[/mat] [calc]Ara fes l'operació [[per]] $0.75$.[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $9$.[/calc] [mat]R) A l'Anna li costarà $9$ € imprimir les $40$ fotografies.[/mat]",
  "[calc]!!Error típic!!:\nSi multipliques pel descompte en lloc de pel que es paga: $40$ [[per]] $0.3$ [[per]] $0.25$.[/calc]",
  "[calc]Prem [[exe]]: obtens $3$.[/calc] " + FR + " [mat]No té sentit: $3$ € és el que s'estalvia l'Anna, i no és el preu final que cal pagar.[/mat]"],
'cb4-23-q24': [
  "[mat]Amb el descompte, l'Anna paga el $75$ % del preu: $4{,}50$ € és el $75$ % del preu sense descompte.\nPer trobar el preu sense descompte, es divideix entre $0{,}75$.[/mat] [calc]Escriu $4.5$ [[entre]] $0.75$.[/calc]",
  "[calc]Prem [[exe]]: obtens $6$.[/calc] [mat]Sense descompte, les fotografies costarien $6$ €.[/mat]",
  "[mat]Cada fotografia costa $0{,}30$ €: hi ha tantes fotografies com vegades hi cap $0{,}30$ € en $6$ €.[/mat] [calc]Fes l'operació [[entre]] $0.3$.\n" + ANS + "[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $20$.[/calc] [mat]R) L'Anna ha imprès $20$ fotografies.[/mat]",
  "[calc]!!Error típic!!:\nSi desfàs el descompte afegint un $25$ %, és a dir, multiplicant per $1.25$: $4.5$ [[per]] $1.25$ [[entre]] $0.3$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens $18.75$.[/calc] " + FR + " [mat]No té cap sentit imprimir $18{,}75$ fotografies, i això ens fa sospitar que no hem plantejat bé les operacions.[/mat]"],
'll4-2-25': [
  "[mat]Afegir l'IVA del $21$ % és multiplicar per $1{,}21$.\nPer calcular el preu sense IVA, cal fer aquesta operació:\n$18.150$ € $\\div 1{,}21$[/mat] [calc]Escriu $18150$ [[entre]] $1.21$.[/calc]",
  "[calc]Prem [[exe]]: obtens $15000$.[/calc] [mat]Sense IVA, en Jordi ha facturat $15.000$ €.[/mat]",
  "[mat]L'IVA és la diferència entre el que ha cobrat i el que ha facturat:\n$18.150$ € $-\\ 15.000$ €[/mat] [calc]Escriu $18150$ [[menys]] [[ans]].\n[[ans]] és el resultat d'abans.[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $3150$.[/calc] [mat]R) En Jordi ha facturat $15.000$ € i haurà de pagar $3.150$ € d'IVA a Hisenda.[/mat]"],
'll4a-2-17': [
  "[mat]Abans de calcular, pensa:\n• el $10$ % extra es calcula sobre $200$ € o sobre un preu més petit?[/mat]",
  "[mat]Amb un $40$ % de descompte es paga el $60$ %: es multiplica per $0{,}6$.\nAmb el $10$ % extra es paga el $90$ % del que queda: es multiplica per $0{,}9$.[/mat] [calc]Escriu $200$ [[per]] $0.6$ [[per]] $0.9$.[/calc]",
  "[calc]Prem [[exe]]: obtens el resultat, que és $108$.[/calc] [mat]R) L'abric costa $108$ €.\nEl descompte que li han fet és:\n$200-108=92$ €\nPer tant, no li fan un $50$ % de descompte, perquè no li han rebaixat $100$ €.[/mat]",
  "[calc]!!Error típic!!:\nSi sumes els descomptes, $40$ % $+\\ 10$ % $=50$ %: $200$ [[per]] $0.5$.[/calc]",
  "[calc]Prem [[exe]]: obtens $100$.[/calc] " + FR + " [mat]No té sentit: el $10$ % extra és sobre $120$ €, no sobre $200$ €. Els descomptes encadenats no se sumen![/mat]"],
'll4-2-16': [
  "[mat]Abans de calcular, pensa:\n• Sabem que la baixada del $15$ % es calcula sobre $300$ €. Però... la pujada del $15$ %, sobre quin preu es calcula?[/mat]",
  "[mat]• Baixar un $15$ % és pagar el $85$ %: es multiplica per $0{,}85$.\n• Pujar un $15$ % és pagar el $115$ %: es multiplica per $1{,}15$.\nPreu actual: $300$ € $\\cdot 0{,}85\\cdot 1{,}15$[/mat] [calc]Escriu $300$ [[per]] $0.85$ [[per]] $1.15$.[/calc]",
  "[calc]Prem [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $293.25$.[/calc] [mat]R) Ara el televisor costa $293{,}25$ €, i no $300$ €.\nLa baixada i la pujada no es compensen.[/mat]"],
}
X2 = {k: list(v) for k, v in CW.items()}
X2['ll4-2-16'][2] = CW['ll4-2-16'][2].replace("Prem [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és $293.25$.", "Prem [[exe]] i després [[sd]]: obtens el resultat en decimal, que és $293.25$.")
X2['cb4-23-q24'][5] = CW['cb4-23-q24'][5].replace("Prem [[shift]] [[exe]] (≈): obtens $18.75$.", "Prem [[exe]] i després [[sd]]: obtens $18.75$.")

def ms(t):
    t = t.replace("Prem [[shift]] [[exe]] (≈): obtens el resultat en decimal, que és", "Prem [[igual]]: obtens el resultat, que és")
    return t.replace('[[shift]] [[exe]] (≈)', '[[igual]]').replace('[[exe]]', '[[igual]]')
MS = {k: [ms(x) for x in v] for k, v in CW.items()}

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

posaExercicis(ARREL + '/exercicis/eso/percentatges.js')
posaPassos(ARREL + '/models/fx-82sp-cw/fitxes/eso/percentatges.js', CW)
posaPassos(ARREL + '/models/fx-570sp-x2/fitxes/eso/percentatges.js', X2)
posaPassos(ARREL + '/models/fx-82sp-x2/fitxes/eso/percentatges.js', X2)
posaPassos(ARREL + '/models/fx-82ms/fitxes/eso/percentatges.js', MS)
print('fet')
