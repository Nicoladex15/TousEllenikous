// =========================
// ACCENTATORE GRECO ANTICO
// Versione stabile senza spiriti
// =========================

// --- VOCALI BASE ---
const vocali = ["α","ε","η","ι","ο","υ","ω","ᾳ","ῃ","ῳ"];

// --- RIMOZIONE ACCENTI ---
const mappaBase = {
    "α": ["α","ά","ὰ","ᾶ"],
    "ε": ["ε","έ","ὲ"],
    "η": ["η","ή","ὴ","ῆ"],
    "ι": ["ι","ί","ὶ","ῖ"],
    "ο": ["ο","ό","ὸ"],
    "υ": ["υ","ύ","ὺ","ῦ"],
    "ω": ["ω","ώ","ὼ","ῶ"],
    "ᾳ": ["ᾳ","ᾴ","ᾲ","ᾷ"],
    "ῃ": ["ῃ","ῄ","ῂ","ῇ"],
    "ῳ": ["ῳ","ῴ","ῲ","ῷ"]
};

const mappaInversa = {};
for (let base in mappaBase) {
    for (let variante of mappaBase[base]) {
        mappaInversa[variante] = base;
    }
}

function rimuoviAccenti(parola) {
    let out = "";
    for (let ch of parola) {
        out += mappaInversa[ch] || ch;
    }
    return out;
}

// --- DITTONGHI ---
const dittonghi = ["αι","ει","οι","υι","αυ","ευ","ου"];
function isDittongo(seg) { return dittonghi.includes(seg); }

// --- QUANTITÀ ULTIMA SILLABA ---
const vocaliBrevi = ["ε","ο"];
const vocaliLunghe = ["η","ω"];
const dittonghiLunghi = ["αι","οι"];
const dittonghiBrevi = ["ει","υι","αυ","ευ","ου"];
const conIotaSottoscritto = ["ᾳ","ῃ","ῳ"];

function base(ch) { return mappaInversa[ch] || ch; }

function ultimaSillaba(parola) {
    parola = rimuoviAccenti(parola);

    if (parola.length >= 2) {
        const due = parola.slice(-2);
        if (isDittongo(due)) return due;
        if (conIotaSottoscritto.includes(due)) return due;
    }

    return parola.slice(-1);
}

function isUltimaLunga(parola) {
    const us = ultimaSillaba(parola);

    if (dittonghiLunghi.includes(us)) return true;
    if (dittonghiBrevi.includes(us)) return false;
    if (conIotaSottoscritto.includes(us)) return true;
    if (vocaliLunghe.includes(us)) return true;
    if (vocaliBrevi.includes(us)) return false;

    return true;
}

// --- ACCENTI ---
const acuto = {
    "α":"ά","ε":"έ","η":"ή","ι":"ί","ο":"ό","υ":"ύ","ω":"ώ",
    "ᾳ":"ᾴ","ῃ":"ῄ","ῳ":"ῴ"
};

const circonflesso = {
    "α":"ᾶ","η":"ῆ","ι":"ῖ","υ":"ῦ","ω":"ῶ",
    "ᾳ":"ᾷ","ῃ":"ῇ","ῳ":"ῷ"
};

// --- SILLABAZIONE ---
function sillabe(parola) {
    parola = rimuoviAccenti(parola);
    let s = [];
    let i = parola.length - 1;

    while (i >= 0) {

        if (i >= 1) {
            const due = parola.slice(i-1, i+1);
            if (isDittongo(due) || conIotaSottoscritto.includes(due)) {
                s.unshift(due);
                i -= 2;
                continue;
            }
        }

        const ch = parola[i];
        if (vocali.includes(ch)) {
            s.unshift(ch);
            i--;
            continue;
        }

        if (s.length > 0) s[0] = ch + s[0];
        else s.unshift(ch);
        i--;
    }

    return s;
}

// --- ACCENTARE UNA SILLABA ---
function accentuaSillaba(sillaba, tipo) {
    let out = "";
    let fatto = false;

    for (let ch of sillaba) {
        const b = base(ch);
        if (!fatto && vocali.includes(b)) {
            if (tipo === "acuto" && acuto[b]) out += acuto[b];
            else if (tipo === "circonflesso" && circonflesso[b]) out += circonflesso[b];
            else out += ch;
            fatto = true;
        } else out += ch;
    }

    return out;
}

// --- ACCENTARE N-ESIMA SILLABA DA DESTRA ---
function accentaNdaDestra(parola, n) {
    const s = sillabe(parola);
    if (n > s.length) return parola;

    const idx = s.length - n;
    const target = s[idx];

    let tipo = "acuto";
    if (n === 1 && isUltimaLunga(parola)) tipo = "circonflesso";
    if (n === 2 && isUltimaLunga(parola)) tipo = "circonflesso";

    s[idx] = accentuaSillaba(target, tipo);
    return s.join("");
}

// --- ACCENTAZIONE RECESSIVA ---
function accentaForma(parola) {
    const s = sillabe(parola);
    const n = s.length;

    if (n === 1) return accentaNdaDestra(parola, 1);
    if (n === 2) return accentaNdaDestra(parola, 2);

    const ultimaL = isUltimaLunga(parola);
    if (ultimaL) return accentaNdaDestra(parola, 2);
    return accentaNdaDestra(parola, 3);
}
