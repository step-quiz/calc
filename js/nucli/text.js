/* ═══════════════════════════════════════════════════════════════════
   nucli/text.js — Els textos de les fitxes, en HTML
   ───────────────────────────────────────────────────────────────────
   $$TeX$$ = fórmula en una línia pròpia; $TeX$ = fórmula; [[id]] = tecla
   petita (la dibuixa el model); {{Opció}} = text d'un menú de la
   calculadora (el tradueix el model a l'idioma de l'alumne);
   !!Error típic!! = l'avís d'un pas d'error; [a]…[/a] = apartat de
   l'enunciat (es ressalta quan el pas el resol).
   [mat]…[/mat] i [calc]…[/calc] (v38, David): una frase de matemàtiques
   o una indicació de calculadora; cadascuna surt en un bloc amb la seva
   lletra i el seu fons (totes les frases dels passos ho són).
   [nota]…[/nota] (v48): una nota de l'enunciat (una fórmula donada, per
   exemple), en una línia pròpia i en cursiva.

   Text.creador({model, idioma}) → text(t): l'HTML d'un text.
   Depèn de KaTeX. Exporta «Text».
   ═══════════════════════════════════════════════════════════════════ */
(function (arrel) {
'use strict';

const escapa = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const formula = (t, displayMode = false) => katex.renderToString(t, {throwOnError: false, displayMode});

function creador({model, idioma}) {
  function textSimple(t) {
    return String(t || '').split(/(\$\$[^$]+\$\$|\$[^$]+\$|\[\[[^\]]+\]\]|\{\{[^}]+\}\}|!![^!]+!!)/).map(tros => {
      if (/^\$\$[^$]+\$\$$/.test(tros)) return formula(tros.slice(2, -2), true);
      if (/^\$[^$]+\$$/.test(tros)) return formula(tros.slice(1, -1));
      if (/^\[\[[^\]]+\]\]$/.test(tros)) return model.tecles.html(tros.slice(2, -2), {petita: true});
      if (/^\{\{[^}]+\}\}$/.test(tros)) return `<span class="opcio-menu">${escapa(model.guions.textCalc(tros.slice(2, -2), idioma))}</span>`;
      if (/^!![^!]+!!$/.test(tros)) return `<span class="avis-error">${escapa(tros.slice(2, -2))}</span>`;
      return escapa(tros).replace(/\n/g, '<br>');
    }).join('');
  }
  /** [a]…[/a] → <span class="apartat" data-apartat="a">. No confon les tecles [[x]]. */
  function ambApartats(t) {
    return String(t || '').split(/((?<!\[)\[[a-z]\](?!\])[\s\S]*?\[\/[a-z]\])/).map(tros => {
      const m = /^\[([a-z])\]([\s\S]*)\[\/\1\]$/.exec(tros);
      return m ? `<span class="apartat" data-apartat="${m[1]}">${textSimple(m[2])}</span>` : textSimple(tros);
    }).join('');
  }
  /** [mat]…[/mat] → <span class="frase-mat">, [calc]…[/calc] → <span class="frase-calc"> (blocs; els espais entre blocs no compten). */
  return function text(t) {
    const trossos = String(t || '').split(/(\[(?:mat|calc|nota)\][\s\S]*?\[\/(?:mat|calc|nota)\])/);
    const ambFrases = trossos.length > 1;
    return trossos.map(tros => {
      const m = /^\[(mat|calc|nota)\]([\s\S]*)\[\/\1\]$/.exec(tros);
      if (m) return `<span class="frase-${m[1]}">${ambApartats(m[2])}</span>`;
      return ambFrases && !tros.trim() ? '' : ambApartats(tros);
    }).join('');
  };
}

arrel.Text = Object.freeze({creador, escapa, formula});

})(globalThis);
