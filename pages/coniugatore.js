const ACUTO = {
    'α': 'ά','ε': 'έ','η': 'ή','ι': 'ί','ο': 'ό','υ': 'ύ','ω': 'ώ'
};

const SENZA_ACCENTO = {
    'ά': 'α','ὰ': 'α','ᾶ': 'α','ᾱ': 'α',
    'έ': 'ε','ὲ': 'ε',
    'ή': 'η','ὴ': 'η','ῆ': 'η',
    'ί': 'ι','ὶ': 'ι','ῑ': 'ι',
    'ό': 'ο','ὸ': 'ο',
    'ύ': 'υ','ὺ': 'υ','ῡ': 'υ',
    'ώ': 'ω','ὼ': 'ω','ῶ': 'ω',
    'ᾷ': 'ᾳ','ῇ': 'ῃ','ῷ': 'ῳ'
};

function normalizzaGreco(s) {
    return s.normalize("NFC");
}

function rimuoviAccenti(s) {
    return [...s].map(c => SENZA_ACCENTO[c] || c).join("");
}

class UnitaVocalica {
    constructor(start, length) {
        this.start = start;
        this.length = length;
    }
}

function trovaUnitaVocaliche(s) {
    const u = [];
    const chars = [...s];
    let i = 0;

    const dittonghi = new Set([
        "αι","ει","οι","υι","αυ","ευ","ου","ηυ",
        "αῖ","εῖ","οῖ","υῖ",
        "αῦ","εῦ","οῦ","ηῦ"
    ]);

    const vocali = new Set([
        "α","ε","η","ι","ο","υ","ω",
        "ᾳ","ῃ","ῳ",
        "ᾱ","ῑ","ῡ",
        "ᾶ","ῆ","ῖ","ῦ","ῶ",
        "α\u0342","η\u0342","ι\u0342","υ\u0342","ω\u0342"
    ]);

    while (i < chars.length) {
        if (i + 1 < chars.length) {
            const d = chars[i] + chars[i+1];
            if (dittonghi.has(d)) {
                u.push(new UnitaVocalica(i, 2));
                i += 2;
                continue;
            }
        }

        const c = chars[i];
        if (vocali.has(c)) {
            u.push(new UnitaVocalica(i, 1));
        }

        i++;
    }

    return u;
}

function trovaUltimaUnitaVocalica(forma) {
    const s = normalizzaGreco(forma);
    const chars = [...s];
    let i = chars.length - 1;

    const dittonghi = new Set([
        "αι","ει","οι","υι","αυ","ευ","ου","ηυ",
        "αῖ","εῖ","οῖ","υῖ",
        "αῦ","εῦ","οῦ","ηῦ"
    ]);

    const vocali = new Set([
        "α","ε","η","ι","ο","υ","ω",
        "ᾳ","ῃ","ῳ",
        "ᾱ","ῑ","ῡ",
        "ᾶ","ῆ","ῖ","ῦ","ῶ",
        "α\u0342","η\u0342","ι\u0342","υ\u0342","ω\u0342"
    ]);

    while (i >= 0) {
        if (i >= 1) {
            const d = chars[i-1] + chars[i];
            if (dittonghi.has(d)) return d;
        }

        const c = chars[i];
        if (vocali.has(c)) return c;

        i--;
    }

    return null;
}

function isUltimaLunga(forma) {
    const s = normalizzaGreco(forma);
    const unita = trovaUltimaUnitaVocalica(s);
    if (!unita) return false;

    if (["η","ω","ᾱ","ῑ","ῡ","ᾶ","ῆ","ῖ","ῦ","ῶ"].includes(unita)) return true;

    if (["α\u0342","η\u0342","ι\u0342","υ\u0342","ω\u0342"].includes(unita)) return true;

    if (["ᾳ","ῃ","ῳ"].includes(unita)) return true;

    if (["αυ","ευ","ου","ηυ","αῦ","εῦ","οῦ","ηῦ"].includes(unita)) return true;

    if (["αι","ει","οι","υι","αῖ","εῖ","οῖ","υῖ"].includes(unita)) {
        if (unita === "αι" && s.endsWith("αι")) return false;
        if (unita === "οι" && s.endsWith("οι")) return false;
        return true;
    }

    return false;
}

function accentaSegmento(segmento, tipo) {
    const seg = normalizzaGreco(segmento);
    const chars = [...seg];

    for (let i = chars.length - 1; i >= 0; i--) {
        const nuovo = (tipo === "acuto") ? ACUTO[chars[i]] : null;
        if (nuovo) {
            chars[i] = nuovo;
            return chars.join("");
        }
    }

    return seg;
}

function accentaNdaDestra(s, n, tipo) {
    const sNorm = normalizzaGreco(s);
    const unita = trovaUnitaVocaliche(sNorm);
    if (unita.length === 0) return sNorm;

    const idx = unita.length - n;
    if (idx < 0 || idx >= unita.length) return sNorm;

    const target = unita[idx];
    const start = target.start;
    const end = start + target.length;

    const segmento = sNorm.substring(start, end);
    const accentato = accentaSegmento(segmento, tipo);

    return sNorm.substring(0, start) + accentato + sNorm.substring(end);
}

function accentaFormaVerbo(forma) {
    const formaN = normalizzaGreco(forma);
    const pulita = rimuoviAccenti(formaN);

    const unita = trovaUnitaVocaliche(pulita);
    if (unita.length === 0) return formaN;

    const ultimaLunga = isUltimaLunga(pulita);

    let n = 2; // penultima
    if (!ultimaLunga && unita.length >= 3) {
        n = 3; // terzultima
    }

    return accentaNdaDestra(pulita, n, "acuto");
}

function generaTemaPresente(lemma) {
    const lemmaN = normalizzaGreco(lemma);
    const lemmaPulito = rimuoviAccenti(lemmaN);

    if (lemmaPulito.endsWith("μι")) {
        return lemmaPulito.slice(0, -2);
    }

    if (lemmaPulito.endsWith("ω")) {
        return lemmaPulito.slice(0, -1);
    }

    return lemmaPulito;
}

function coniugaPresenteAttivo(lemma) {
    const tema = generaTemaPresente(lemma);
    const forme = {};

    const desinenze = [
        "ω",      // 1ª sing.
        "εις",    // 2ª sing.
        "ει",     // 3ª sing.
        "ομεν",   // 1ª plur.
        "ετε",    // 2ª plur.
        "ουσι(ν)", // 3ª plur.
        "ετον",   // 2ª duale
        "ετον"    // 3ª duale
    ];

    const persone = [
        "1ª singolare",
        "2ª singolare",
        "3ª singolare",
        "1ª plurale",
        "2ª plurale",
        "3ª plurale",
        "2ª duale",
        "3ª duale"
    ];

    for (let i = 0; i < desinenze.length; i++) {
        const formaGrezza = tema + desinenze[i];
        const formaAccentuata = accentaFormaVerbo(formaGrezza);
        forme[persone[i]] = formaAccentuata;
    }

    return forme;
}

function coniugaPresenteMedioPassivo(lemma) {
    const tema = generaTemaPresente(lemma);
    const forme = {};

    const desinenze = [
        "ομαι",    // 1ª sing.
        "ῃ",       // 2ª sing.
        "εται",    // 3ª sing.
        "ομεθα",   // 1ª plur.
        "εσθε",    // 2ª plur.
        "ονται",   // 3ª plur.
        "εσθον",   // 2ª duale
        "εσθον"    // 3ª duale
    ];

    const persone = [
        "1ª singolare",
        "2ª singolare",
        "3ª singolare",
        "1ª plurale",
        "2ª plurale",
        "3ª plurale",
        "2ª duale",
        "3ª duale"
    ];

    for (let i = 0; i < desinenze.length; i++) {
        const formaGrezza = tema + desinenze[i];
        const formaAccentuata = accentaFormaVerbo(formaGrezza);
        forme[persone[i]] = formaAccentuata;
    }

    return forme;
}

function coniugaImperativoAttivo(lemma) {
    const tema = generaTemaPresente(lemma);
    const forme = {};

    const persone = [
        "2ª singolare",
        "3ª singolare",
        "2ª plurale",
        "3ª plurale",
        "2ª duale",
        "3ª duale"
    ];

    const desinenze = [
        "ε",        // 2ª sing.
        "έτω",      // 3ª sing.
        "ετε",      // 2ª plur.
        "όντων",    // 3ª plur.
        "ετον",     // 2ª duale
        "ετων"      // 3ª duale
    ];

    for (let i = 0; i < desinenze.length; i++) {
        const formaGrezza = tema + desinenze[i];
        const formaAccentuata = accentaFormaVerbo(formaGrezza);
        forme[persone[i]] = formaAccentuata;
    }

    return forme;
}

function coniugaImperativoMedioPassivo(lemma) {
    const tema = generaTemaPresente(lemma);
    const forme = {};

    const persone = [
        "2ª singolare",
        "3ª singolare",
        "2ª plurale",
        "3ª plurale",
        "2ª duale",
        "3ª duale"
    ];

    const desinenze = [
        "ου",        // 2ª sing.
        "έσθω",      // 3ª sing.
        "εσθε",      // 2ª plur.
        "έσθων",     // 3ª plur.
        "εσθον",     // 2ª duale
        "εσθων"      // 3ª duale
    ];

    for (let i = 0; i < desinenze.length; i++) {
        const formaGrezza = tema + desinenze[i];
        const formaAccentuata = accentaFormaVerbo(formaGrezza);
        forme[persone[i]] = formaAccentuata;
    }

    return forme;
}

function coniugaInfinitoAttivo(lemma) {
    const tema = generaTemaPresente(lemma);
    const forme = {};

    const desinenza = "ειν";

    const formaGrezza = tema + desinenza;
    const formaAccentuata = accentaFormaVerbo(formaGrezza);

    forme[""] = formaAccentuata;

    return forme;
}

function coniugaInfinitoMedioPassivo(lemma) {
    const tema = generaTemaPresente(lemma);
    const forme = {};

    const desinenza = "εσθαι";

    const formaGrezza = tema + desinenza;
    const formaAccentuata = accentaFormaVerbo(formaGrezza);

    forme[""] = formaAccentuata;

    return forme;
}

function coniugaEimiPresenteIndicativo() {
    const forme = {};

    const persone = [
        "1ª singolare",
        "2ª singolare",
        "3ª singolare",
        "1ª plurale",
        "2ª plurale",
        "3ª plurale",
        "2ª duale",
        "3ª duale"
    ];

    const formeEimi = [
        "εἰμί",     // 1ª sing.
        "εἶ",       // 2ª sing.
        "ἐστί(ν)",  // 3ª sing.
        "ἐσμέν",    // 1ª plur.
        "ἐστέ",     // 2ª plur.
        "εἰσί(ν)",  // 3ª plur.
        "ἔστον",    // 2ª duale
        "ἔστων"     // 3ª duale
    ];

    for (let i = 0; i < formeEimi.length; i++) {
        forme[persone[i]] = formeEimi[i];
    }

    return forme;
}

function coniugaEimiImperativo() {
    const forme = {};

    const persone = [
        "2ª singolare",
        "3ª singolare",
        "2ª plurale",
        "3ª plurale",
        "2ª duale",
        "3ª duale"
    ];

    const formeEimi = [
        "ἴσθι",     // 2ª sing.
        "ἔστω",     // 3ª sing.
        "ἔστε",     // 2ª plur.
        "ἔστων",    // 3ª plur.
        "ἔστον",    // 2ª duale
        "ἔστων"     // 3ª duale
    ];

    for (let i = 0; i < formeEimi.length; i++) {
        forme[persone[i]] = formeEimi[i];
    }

    return forme;
}

function coniugaEimiInfinito() {
    const forme = {};
    forme[""] = "εῖναι";
    return forme;
}

export {
  coniugaPresenteAttivo,
  coniugaPresenteMedioPassivo,
  coniugaImperativoAttivo,
  coniugaImperativoMedioPassivo,
  coniugaInfinitoAttivo,
  coniugaInfinitoMedioPassivo,
  coniugaEimiPresenteIndicativo,
  coniugaEimiImperativo,
  coniugaEimiInfinito
};
