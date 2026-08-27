// ============================================================
// ENUM (simulati)
// ============================================================

const Caso = {
  NOM: "NOM",
  GEN: "GEN",
  DAT: "DAT",
  ACC: "ACC",
  VOC: "VOC",
};

const Numero = {
  SING: "SING",
  DUAL: "DUAL",
  PLUR: "PLUR",
};

const TipoAccentoLemma = {
  OSSITONA: "OSSITONA",
  PAROSSITONA: "PAROSSITONA",
  PROPAROSSITONA: "PROPAROSSITONA",
  PERISPOMENA: "PERISPOMENA",
  PROPERISPOMENA: "PROPERISPOMENA",
};

// ============================================================
// ARTICOLI
// ============================================================

const FEMMINILI_CONTRATTI = new Set([
  "θεά", "Ἀθηνᾶ", "Αθηνᾶ", "Διώνᾱ", "Κλεονᾶ",
]);

const ARTICOLI_FEM = {
  [Caso.NOM]: { [Numero.SING]: "ἡ", [Numero.PLUR]: "αἱ", [Numero.DUAL]: "τώ" },
  [Caso.GEN]: { [Numero.SING]: "τῆς", [Numero.PLUR]: "τῶν", [Numero.DUAL]: "τοῖν" },
  [Caso.DAT]: { [Numero.SING]: "τῇ", [Numero.PLUR]: "ταῖς", [Numero.DUAL]: "τοῖν" },
  [Caso.ACC]: { [Numero.SING]: "τήν", [Numero.PLUR]: "τάς", [Numero.DUAL]: "τώ" },
  [Caso.VOC]: { [Numero.SING]: "ὦ", [Numero.PLUR]: "ὦ", [Numero.DUAL]: "ὦ" },
};

const ARTICOLI_MASC = {
  [Caso.NOM]: { [Numero.SING]: "ὁ", [Numero.PLUR]: "οἱ", [Numero.DUAL]: "τώ" },
  [Caso.GEN]: { [Numero.SING]: "τοῦ", [Numero.PLUR]: "τῶν", [Numero.DUAL]: "τοῖν" },
  [Caso.DAT]: { [Numero.SING]: "τῷ", [Numero.PLUR]: "τοῖς", [Numero.DUAL]: "τοῖν" },
  [Caso.ACC]: { [Numero.SING]: "τόν", [Numero.PLUR]: "τούς", [Numero.DUAL]: "τώ" },
  [Caso.VOC]: { [Numero.SING]: "ὦ", [Numero.PLUR]: "ὦ", [Numero.DUAL]: "ὦ" },
};

const ARTICOLI_NEUT = {
  [Caso.NOM]: { [Numero.SING]: "τό", [Numero.PLUR]: "τά", [Numero.DUAL]: "τώ" },
  [Caso.GEN]: { [Numero.SING]: "τοῦ", [Numero.PLUR]: "τῶν", [Numero.DUAL]: "τοῖν" },
  [Caso.DAT]: { [Numero.SING]: "τῷ", [Numero.PLUR]: "τοῖς", [Numero.DUAL]: "τοῖν" },
  [Caso.ACC]: { [Numero.SING]: "τό", [Numero.PLUR]: "τά", [Numero.DUAL]: "τώ" },
  [Caso.VOC]: { [Numero.SING]: "τό", [Numero.PLUR]: "τά", [Numero.DUAL]: "" },
};

// ============================================================
// ACCENTI
// ============================================================

const ACUTO = {
  "α": "ά", "ε": "έ", "η": "ή", "ι": "ί", "ο": "ό", "υ": "ύ", "ω": "ώ",
};

const GRAVE = {
  "ά": "ὰ", "έ": "ὲ", "ή": "ὴ", "ί": "ὶ", "ό": "ὸ", "ύ": "ὺ", "ώ": "ὼ",
};

const CIRCONFLESSO = {
  "α": "ᾶ",
  "η": "ῆ",
  "ι": "ῖ",
  "υ": "ῦ",
  "ω": "ῶ",
};

const CIRCONFLESSO_IOTA = {
  "ᾳ": "ᾷ", "ῃ": "ῇ", "ῳ": "ῷ",
};

const SENZA_ACCENTO = {
  "ά": "α", "ὰ": "α", "ᾶ": "α",
  "ᾱ": "α",
  "έ": "ε", "ὲ": "ε",
  "ή": "η", "ὴ": "η", "ῆ": "η",
  "ί": "ι", "ὶ": "ι",
  "ῑ": "ι",
  "ό": "ο", "ὸ": "ο",
  "ύ": "υ", "ὺ": "υ",
  "ῡ": "υ",
  "ώ": "ω", "ὼ": "ω", "ῶ": "ω",
  "ᾷ": "ᾳ", "ῇ": "ῃ", "ῷ": "ῳ",
};

function rimuoviAccenti(s) {
  return [...s].map(ch => SENZA_ACCENTO[ch] || ch).join("");
}

// ============================================================
// NORMALIZZAZIONE
// ============================================================

function normalizzaTilde(s) {
  return s
    .replace(/\u007E/g, "\u0342")
    .replace(/\u02DC/g, "\u0342")
    .replace(/\u0303/g, "\u0342")
    .replace(/\u1FC0/g, "\u0342")
    .normalize("NFC");
}

function normalizzaAccentiDuplicati(s) {
  let t = s;

  t = t.replace(/\u0301\u0342/g, "\u0342")
       .replace(/\u0342\u0301/g, "\u0342");

  t = t.replace(/α\u0342/g, "ᾶ")
       .replace(/η\u0342/g, "ῆ")
       .replace(/ι\u0342/g, "ῖ")
       .replace(/υ\u0342/g, "ῦ")
       .replace(/ω\u0342/g, "ῶ");

  t = t.replace(/αι\u0342/g, "αῖ")
       .replace(/ει\u0342/g, "εῖ")
       .replace(/οι\u0342/g, "οῖ")
       .replace(/υι\u0342/g, "υῖ");

  t = t.replace(/ᾳ\u0342/g, "ᾷ")
       .replace(/ῃ\u0342/g, "ῇ")
       .replace(/ῳ\u0342/g, "ῷ");

  return t;
}

function normalizzaInputUtente(s) {
  let t = s
    .replace(/\u007E/g, "\u0342")
    .replace(/\u02DC/g, "\u0342")
    .replace(/\u0303/g, "\u0342")
    .replace(/\u1FC0/g, "\u0342");

  t = t.normalize("NFD");

  t = t.replace(/\u0301\u0342/g, "\u0342")
       .replace(/\u0342\u0301/g, "\u0342");

  t = t.replace(/α\u0342/g, "ᾶ")
       .replace(/η\u0342/g, "ῆ")
       .replace(/ι\u0342/g, "ῖ")
       .replace(/υ\u0342/g, "ῦ")
       .replace(/ω\u0342/g, "ῶ");

  t = t.replace(/αι\u0342/g, "αῖ")
       .replace(/ει\u0342/g, "εῖ")
       .replace(/οι\u0342/g, "οῖ")
       .replace(/υι\u0342/g, "υῖ");

  t = t.replace(/ᾳ\u0342/g, "ᾷ")
       .replace(/ῃ\u0342/g, "ῇ")
       .replace(/ῳ\u0342/g, "ῷ");

  return t.normalize("NFC");
}

function normalizzaGreco(s) {
  return s.normalize("NFC");
}

function normalizzaFormaGenerata(s) {
  return s.normalize("NFC");
}

// ============================================================
// UNITÀ VOCALICHE
// ============================================================

function trovaUnitaVocaliche(s) {
  const units = [];
  const chars = [...s];
  let i = 0;

  const dittonghi = new Set([
    "αι","ει","οι","υι","αυ","ευ","ου","ηυ",
    "αῖ","εῖ","οῖ","υῖ",
    "αῦ","εῦ","οῦ","ηῦ",
  ]);

  const vocali = new Set([
    "α","ε","η","ι","ο","υ","ω",
    "ᾳ","ῃ","ῳ",
    "ᾱ","ῑ","ῡ",
    "ᾶ","ῆ","ῖ","ῦ","ῶ",
    "α\u0342","η\u0342","ι\u0342","υ\u0342","ω\u0342",
  ]);

  while (i < chars.length) {
    if (i + 1 < chars.length) {
      const d = chars[i] + chars[i + 1];
      if (dittonghi.has(d)) {
        units.push({ start: i, length: 2 });
        i += 2;
        continue;
      }
    }

    const c = chars[i];
    if (vocali.has(c)) {
      units.push({ start: i, length: 1 });
    }

    i++;
  }

  return units;
}

function trovaUltimaUnitaVocalica(forma) {
  const s = normalizzaInputUtente(forma);
  const chars = [...s];
  const len = chars.length;

  const dittonghi = new Set([
    "αι","ει","οι","υι","αυ","ευ","ου","ηυ",
    "αῖ","εῖ","οῖ","υῖ",
    "αῦ","εῦ","οῦ","ηῦ",
  ]);

  const vocali = new Set([
    "α","ε","η","ι","ο","υ","ω",
    "ᾳ","ῃ","ῳ",
    "ᾱ","ῑ","ῡ",
    "ᾶ","ῆ","ῖ","ῦ","ῶ",
    "α\u0342","η\u0342","ι\u0342","υ\u0342","ω\u0342",
  ]);

  let i = len - 1;

  while (i >= 0) {
    if (i >= 1) {
      const d = chars[i - 1] + chars[i];
      if (dittonghi.has(d)) {
        return d;
      }
    }

    const c = chars[i];
    if (vocali.has(c)) {
      return c;
    }

    i--;
  }

  return null;
}

function isUltimaLunga(forma) {
  const s = normalizzaInputUtente(forma);
  const unita = trovaUltimaUnitaVocalica(s);
  if (!unita) return false;

  if ([
    "η","ω",
    "ᾱ","ῑ","ῡ",
    "ᾶ","ῆ","ῖ","ῦ","ῶ",
  ].includes(unita)) return true;

  if ([
    "α\u0342","η\u0342","ι\u0342","υ\u0342","ω\u0342",
  ].includes(unita)) return true;

  if (s.endsWith("ας") && ["α","α\u0342"].includes(unita))
    return true;

  if (["ᾳ","ῃ","ῳ"].includes(unita))
    return true;

  if (["αυ","ευ","ου","ηυ","αῦ","εῦ","οῦ","ηῦ"].includes(unita))
    return true;

  if (["αι","ει","οι","υι","αῖ","εῖ","οῖ","υῖ"].includes(unita)) {
    if (unita === "αι" && s.endsWith("αι")) return false;
    if (unita === "οι" && s.endsWith("οι")) return false;
    return true;
  }

  return false;
}

function haTrocheoFinale(forma) {
  const s = normalizzaFormaGenerata(forma);
  const unita = trovaUnitaVocaliche(s);
  if (unita.length < 2) return false;

  const ultima = unita[unita.length - 1];
  const penultima = unita[unita.length - 2];

  const ultimaStr = s.substring(ultima.start, ultima.start + ultima.length);
  const penultimaStr = s.substring(penultima.start, penultima.start + penultima.length);

  const ultimaBreve = !isUltimaLunga(ultimaStr);
  const penultimaLunga = isUltimaLunga(penultimaStr);

  return ultimaBreve && penultimaLunga;
}

// ------------------------------------------------------------
// Esportazione (se usi moduli)
// ------------------------------------------------------------

export {
  Caso,
  Numero,
  TipoAccentoLemma,
  FEMMINILI_CONTRATTI,
  ARTICOLI_FEM,
  ARTICOLI_MASC,
  ARTICOLI_NEUT,
  ACUTO,
  GRAVE,
  CIRCONFLESSO,
  CIRCONFLESSO_IOTA,
  SENZA_ACCENTO,
  rimuoviAccenti,
  normalizzaTilde,
  normalizzaAccentiDuplicati,
  normalizzaInputUtente,
  normalizzaGreco,
  normalizzaFormaGenerata,
  trovaUnitaVocaliche,
  trovaUltimaUnitaVocalica,
  isUltimaLunga,
  haTrocheoFinale,
};

// ============================================================
// ACCENTARE N-ESIMA UNITÀ VOCALICA DA DESTRA
// ============================================================

function accentaNdaDestra(s, n, tipo) {
  const sNorm = normalizzaInputUtente(s);
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

// ============================================================
// ACCENTO SU SEGMENTO
// ============================================================

function accentaSegmento(segmento, tipo) {
  const seg = normalizzaInputUtente(segmento);

  // Iota sottoscritta
  if (seg.length === 1 && ["ᾳ", "ῃ", "ῳ"].includes(seg)) {
    const nuovo =
      tipo === "circonflesso" ? CIRCONFLESSO_IOTA[seg] :
      tipo === "acuto" ? ACUTO[seg] :
      tipo === "grave" ? GRAVE[seg] :
      null;

    if (nuovo) return nuovo;
  }

  // Dittonghi classici con circonflesso
  if (seg.length === 2 && ["αι","ει","οι","υι"].includes(seg)) {
    if (tipo === "circonflesso") {
      return normalizzaInputUtente(seg[0] + seg[1] + "\u0342");
    }
  }

  // Ultima vocale del segmento
  const chars = [...seg];
  for (let i = chars.length - 1; i >= 0; i--) {
    const c = chars[i];
    const nuovo =
      tipo === "acuto" ? ACUTO[c] :
      tipo === "grave" ? GRAVE[c] :
      tipo === "circonflesso" ? CIRCONFLESSO[c] :
      null;

    if (nuovo) {
      chars[i] = nuovo;
      return chars.join("");
    }
  }

  return seg;
}

// ============================================================
// ANALISI ACCENTO DEL LEMMA
// ============================================================

function analizzaAccentoLemma(lemma) {
  const s = normalizzaInputUtente(lemma);
  const chars = [...s];

  let idxAcc = -1;
  let tipo = "";

  const acuti = new Set(['ά','έ','ή','ί','ό','ύ','ώ','Ά','Έ','Ή','Ί','Ό','Ύ','Ώ']);
  const gravi = new Set(['ὰ','ὲ','ὴ','ὶ','ὸ','ὺ','ὼ','Ὰ','Ὲ','Ὴ','Ὶ','Ὸ','Ὺ','Ὼ']);
  const circonflessi = new Set([
    'ᾶ','ῆ','ῖ','ῦ','ῶ','ᾷ','ῇ','ῷ',
    'ᾶ'.toUpperCase(), 'ῆ'.toUpperCase(),
    'ῖ'.toUpperCase(), 'ῦ'.toUpperCase(),
    'ῶ'.toUpperCase()
  ]);
  const combiningCirc = '\u0342';

  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (acuti.has(c)) { tipo = "acuto"; idxAcc = i; }
    else if (gravi.has(c)) { tipo = "grave"; idxAcc = i; }
    else if (circonflessi.has(c)) { tipo = "circonflesso"; idxAcc = i; }
    else if (c === combiningCirc) { tipo = "circonflesso"; idxAcc = i - 1; }
  }

  if (idxAcc === -1)
    return TipoAccentoLemma.PAROSSITONA;

  const dopo = s.substring(idxAcc + 1);
  const unitaDopo = trovaUnitaVocaliche(dopo).length;

  if (tipo === "circonflesso") {
    if (unitaDopo === 1) return TipoAccentoLemma.PERISPOMENA;
    if (unitaDopo === 2) return TipoAccentoLemma.PROPERISPOMENA;
    return TipoAccentoLemma.PERISPOMENA;
  }

  if (unitaDopo === 0) return TipoAccentoLemma.OSSITONA;
  if (unitaDopo === 1) return TipoAccentoLemma.PAROSSITONA;
  if (unitaDopo === 2) return TipoAccentoLemma.PROPAROSSITONA;

  return TipoAccentoLemma.PAROSSITONA;
}

// ============================================================
// POSIZIONE DELL'ACCENTO NEL LEMMA
// ============================================================

function posizioneAccentoLemma(lemma) {
  const s = normalizzaInputUtente(lemma);
  const unita = trovaUnitaVocaliche(s);
  if (unita.length === 0) return 0;

  const chars = [...s];

  const acuti = new Set(['ά','έ','ή','ί','ό','ύ','ώ']);
  const gravi = new Set(['ὰ','ὲ','ὴ','ὶ','ὸ','ὺ','ὼ']);
  const circonf = new Set(['ᾶ','ῆ','ῖ','ῦ','ῶ','ᾷ','ῇ','ῷ']);
  const combiningCirc = '\u0342';

  let idxAcc = -1;
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    if (acuti.has(c) || gravi.has(c) || circonf.has(c)) idxAcc = i;
    else if (c === combiningCirc) idxAcc = i - 1;
  }

  if (idxAcc === -1)
    return unita.length - 2;

  for (let index = 0; index < unita.length; index++) {
    const u = unita[index];
    if (idxAcc >= u.start && idxAcc < u.start + u.length)
      return index;
  }

  const tipo = analizzaAccentoLemma(lemma);
  if (tipo === TipoAccentoLemma.OSSITONA)
    return unita.length - 1;

  return unita.length - 1;
}

// ============================================================
// DEDUZIONE QUANTITÀ DELL'ALPHA
// ============================================================

function deduciQuantitaAlphaDalLemma(lemma) {
  const s = normalizzaInputUtente(lemma);
  const unita = trovaUnitaVocaliche(s);
  const idxAcc = posizioneAccentoLemma(lemma);

  const ultima = unita[unita.length - 1];
  const ultimaStr = s.substring(ultima.start, ultima.start + ultima.length);

  if (!["α","ᾱ","ᾶ"].includes(ultimaStr)) return false;
  if (ultimaStr === "ᾶ") return true;

  if (idxAcc === unita.length - 3) return false;
  if (idxAcc === unita.length - 2) return true;
  if (idxAcc === unita.length - 1) return true;

  return false;
}

// ============================================================
// α LUNGO CONTRATTO
// ============================================================

function alphaLungoContratto(lemma) {
  return lemma.endsWith("ά") || lemma.endsWith("ᾶ");
}

// ============================================================
// ACCENTATORE PRINCIPALE DELLA FORMA
// ============================================================

function accentaForma({
  lemma,
  forma,
  caso,
  numero,
  nomSing,
  alphaLunga
}) {

if (caso === Caso.GEN && numero === Numero.PLUR) {
  return generaGenitivoPlurale(lemma, forma, caso, numero);
}


  const lemmaN = normalizzaGreco(lemma);
  const formaN = normalizzaGreco(forma);
  const baseLemma = rimuoviAccenti(lemmaN);

  const tipoLemma = analizzaAccentoLemma(lemmaN);
  const lemmaOssitono = tipoLemma === TipoAccentoLemma.OSSITONA;
  const lemmaPerispomeno =
    tipoLemma === TipoAccentoLemma.PERISPOMENA ||
    tipoLemma === TipoAccentoLemma.PROPERISPOMENA;

  const ultimaLunga = isUltimaLunga(formaN);
  const alphaContratto = alphaLungoContratto(lemmaN);

  // ------------------------------------------------------------
  // 0) ACCUSATIVO SINGOLARE — trocheo finale
  // ------------------------------------------------------------
  if (
    caso === Caso.ACC &&
    numero === Numero.SING &&
    tipoLemma !== TipoAccentoLemma.PROPAROSSITONA
  ) {
    if (alphaLunga && !alphaContratto) {
      const pulita = rimuoviAccenti(formaN);
      return accentaNdaDestra(pulita, 2, "acuto");
    }

    if (haTrocheoFinale(nomSing)) {
      const pulita = rimuoviAccenti(formaN);
      return accentaNdaDestra(pulita, 2, "circonflesso");
    }
  }

  // ------------------------------------------------------------
  // 1) MASCHILI IN -της → vocativo circonflesso
  // ------------------------------------------------------------
  if (baseLemma.endsWith("της")) {
    const penultimaLunga = isUltimaLunga(baseLemma.slice(0, -2));
    if (caso === Caso.VOC && penultimaLunga) {
      const pulita = rimuoviAccenti(formaN);
      return accentaNdaDestra(pulita, 2, "circonflesso");
    }
  }

// ------------------------------------------------------------
// GENITIVO PLURALE — tutte le declinazioni (versione corretta)
// ------------------------------------------------------------
function generaGenitivoPlurale(lemma, formaN, caso, numero) {
  if (caso === "GEN" && numero === "PLUR") {

    const lemmaNoAcc = rimuoviAccenti(lemma);

    // nomi attici in -ως
    if (lemmaNoAcc.endsWith("ως")) {
      const pulita = rimuoviAccenti(formaN);
      return accentaNdaDestra(pulita, 2, "acuto");
    }

    // prima declinazione
    const primaDeclPossibile =
      lemmaNoAcc.endsWith("ας") || lemmaNoAcc.endsWith("ᾱς") ||
      lemmaNoAcc.endsWith("ης") || lemmaNoAcc.endsWith("α") ||
      lemmaNoAcc.endsWith("ᾱ") || lemmaNoAcc.endsWith("η");

    const esclusioniPrimaDecl =
      lemmaNoAcc.endsWith("ον") ||
      lemmaNoAcc.endsWith("ος") ||
      lemmaNoAcc.endsWith("ου") ||
      lemmaNoAcc.endsWith("ωρ") ||
      lemmaNoAcc.endsWith("ις") ||
      lemmaNoAcc.endsWith("υς") ||
      lemmaNoAcc.endsWith("μα");

    if (primaDeclPossibile && !esclusioniPrimaDecl) {

      const drop = (
        lemmaNoAcc.endsWith("ας") ||
        lemmaNoAcc.endsWith("ᾱς") ||
        lemmaNoAcc.endsWith("ης")
      ) ? 2 : 1;

      // *** UGUALE AL KOTLIN ***
      const tema = lemmaNoAcc.slice(0, -drop);

      return tema + "ῶν";   // NON usare l'accentatore
    }

    // seconda declinazione
    let tema, desinenza;

    if (lemmaNoAcc.endsWith("ος") || lemmaNoAcc.endsWith("ον")) {
      tema = lemmaNoAcc.slice(0, -2);
      desinenza = "ων";
    } else {
      tema = lemmaNoAcc;
      desinenza = "ῶν";
    }

    const formaGrezza = normalizzaFormaGenerata(tema + desinenza);
    const pulita = rimuoviAccenti(formaGrezza);

    return accentaNdaDestra(pulita, 2, "acuto");
  }
}

  // ------------------------------------------------------------
  // 3) OSSITONI — regole speciali
  // ------------------------------------------------------------
  if (lemmaOssitono) {
    const obliquo = caso === Caso.GEN || caso === Caso.DAT;

    if (obliquo && ultimaLunga) {
      const pulita = rimuoviAccenti(formaN);
      return accentaNdaDestra(pulita, 1, "circonflesso");
    }

    if (
      numero === Numero.PLUR &&
      (caso === Caso.NOM || caso === Caso.VOC) &&
      formaN.endsWith("αι")
    ) {
      const ultimaBreve = !isUltimaLunga(formaN);
      const penultimaLunga = isUltimaLunga(formaN.slice(0, -2));

      if (ultimaBreve && penultimaLunga) {
        const pulita = rimuoviAccenti(formaN);
        return accentaNdaDestra(pulita, 2, "circonflesso");
      }
    }

    const pulita = rimuoviAccenti(formaN);
    return accentaNdaDestra(pulita, 1, "acuto");
  }

  // ------------------------------------------------------------
  // 4) PERISPOMENA — GEN/DAT/VOC circonflesso
  // ------------------------------------------------------------
  if (lemmaPerispomeno) {
    if (caso === Caso.GEN || caso === Caso.DAT || caso === Caso.VOC) {
      const pulita = rimuoviAccenti(formaN);
      return accentaNdaDestra(pulita, 1, "circonflesso");
    }
  }

  // ------------------------------------------------------------
  // 5) NOM/ACC singolare perispomeni → invariato
  // ------------------------------------------------------------
  if (
    (tipoLemma === TipoAccentoLemma.PERISPOMENA ||
     tipoLemma === TipoAccentoLemma.PROPERISPOMENA) &&
    numero === Numero.SING &&
    (caso === Caso.NOM || caso === Caso.ACC)
  ) {
    return formaN;
  }

  // ------------------------------------------------------------
  // 6) Se contiene U+0342 → non riaccentare
  // ------------------------------------------------------------
  if (formaN.includes("\u0342")) {
    return formaN;
  }

  // ------------------------------------------------------------
  // 7) NOM PLUR in -αι → trocheo finale
  // ------------------------------------------------------------
  if (
    caso === Caso.NOM &&
    numero === Numero.PLUR &&
    formaN.endsWith("αι") &&
    tipoLemma !== TipoAccentoLemma.PROPAROSSITONA
  ) {
    const ultimaBreve = !isUltimaLunga(formaN);
    const penultimaLunga = isUltimaLunga(formaN.slice(0, -2));

    if (penultimaLunga && ultimaBreve) {
      const pulita = rimuoviAccenti(formaN);
      return accentaNdaDestra(pulita, 2, "circonflesso");
    }
  }

  // ------------------------------------------------------------
  // 8) ACCENTO PERSISTENTE (default)
  // ------------------------------------------------------------
  let n;
  switch (tipoLemma) {
    case TipoAccentoLemma.PAROSSITONA: n = 2; break;
    case TipoAccentoLemma.PROPAROSSITONA: n = 3; break;
    default: n = 2;
  }

  if (ultimaLunga && n === 3) n = 2;

  const pulita = rimuoviAccenti(formaN);
  return accentaNdaDestra(pulita, n, "acuto");
}

// ============================================================
// TIPO DI DECLINAZIONE
// ============================================================

const TipoDeclinazione = {
  PRIMA_ETA: "PRIMA_ETA",
  PRIMA_ALPHA: "PRIMA_ALPHA",
  PRIMA_ALPHA_IMPURO: "PRIMA_ALPHA_IMPURO",
  PRIMA_MASC_PURO: "PRIMA_MASC_PURO",
  PRIMA_MASC_IMPURO: "PRIMA_MASC_IMPURO",
  SECONDA_MASC: "SECONDA_MASC",
  SECONDA_NEUTRO: "SECONDA_NEUTRO",
};

// ============================================================
// GENERE DA DECLINAZIONE
// ============================================================

function genereDaDeclinazione(tipo) {
  switch (tipo) {
    case TipoDeclinazione.PRIMA_ETA:
    case TipoDeclinazione.PRIMA_ALPHA:
    case TipoDeclinazione.PRIMA_ALPHA_IMPURO:
      return "FEM";

    case TipoDeclinazione.PRIMA_MASC_PURO:
    case TipoDeclinazione.PRIMA_MASC_IMPURO:
    case TipoDeclinazione.SECONDA_MASC:
      return "MASC";

    case TipoDeclinazione.SECONDA_NEUTRO:
      return "NEUT";

    default:
      return null;
  }
}

// ============================================================
// RICONOSCIMENTO DECLINAZIONE
// ============================================================

function riconosciDeclinazione(lemma) {
  const base = rimuoviAccenti(lemma);

  if (base.endsWith("η"))
    return TipoDeclinazione.PRIMA_ETA;

  if (base.endsWith("α")) {
    const penultima = base.length >= 2 ? base[base.length - 2] : " ";
    if (["ε","ι","ρ"].includes(penultima))
      return TipoDeclinazione.PRIMA_ALPHA;
    return TipoDeclinazione.PRIMA_ALPHA_IMPURO;
  }

  if (base.endsWith("ας"))
    return TipoDeclinazione.PRIMA_MASC_PURO;

  if (base.endsWith("ης"))
    return TipoDeclinazione.PRIMA_MASC_IMPURO;

  if (base.endsWith("ος"))
    return TipoDeclinazione.SECONDA_MASC;

  if (base.endsWith("ον"))
    return TipoDeclinazione.SECONDA_NEUTRO;

  return null;
}

// ============================================================
// PRIMA DECLINAZIONE IN -η
// ============================================================

function declinaPrimaEta(lemma) {
  const lemmaN = normalizzaInputUtente(lemma);
  const tema = rimuoviAccenti(lemmaN).slice(0, -1);
  const map = {};

  function f(des, c, n) {
    const forma = normalizzaInputUtente(tema + des);
    map[`${c}_${n}`] = forma;
  }

  f("η", Caso.NOM, Numero.SING);
  f("ης", Caso.GEN, Numero.SING);
  f("ῃ", Caso.DAT, Numero.SING);
  f("ην", Caso.ACC, Numero.SING);
  f("η", Caso.VOC, Numero.SING);

  f("ᾱ", Caso.NOM, Numero.DUAL);
  f("ᾱ", Caso.ACC, Numero.DUAL);
  f("αιν", Caso.GEN, Numero.DUAL);
  f("αιν", Caso.DAT, Numero.DUAL);

  f("αι", Caso.NOM, Numero.PLUR);
  f("ῶν", Caso.GEN, Numero.PLUR);
  f("αις", Caso.DAT, Numero.PLUR);
  f("ᾱς", Caso.ACC, Numero.PLUR);
  f("αι", Caso.VOC, Numero.PLUR);

  return map;
}

// ============================================================
// PRIMA DECLINAZIONE IN -α (χώρα, θεά)
// ============================================================

function declinaPrimaAlpha(lemma) {
  const lemmaN = normalizzaInputUtente(lemma);
  const tema = rimuoviAccenti(lemmaN).slice(0, -1);
  const map = {};

  function f(des, c, n) {
    const forma = normalizzaInputUtente(tema + des);
    map[`${c}_${n}`] = forma;
  }

  f("α", Caso.NOM, Numero.SING);

  const contratto = FEMMINILI_CONTRATTI.has(lemmaN);
  if (contratto)
    f("ᾶς", Caso.GEN, Numero.SING);
  else
    f("ας", Caso.GEN, Numero.SING);

  f("ᾳ", Caso.DAT, Numero.SING);
  f("αν", Caso.ACC, Numero.SING);
  f("α", Caso.VOC, Numero.SING);

  f("ᾱ", Caso.NOM, Numero.DUAL);
  f("ᾱ", Caso.ACC, Numero.DUAL);
  f("αιν", Caso.GEN, Numero.DUAL);
  f("αιν", Caso.DAT, Numero.DUAL);

  f("αι", Caso.NOM, Numero.PLUR);
  f("ῶν", Caso.GEN, Numero.PLUR);
  f("αις", Caso.DAT, Numero.PLUR);
  f("ᾱς", Caso.ACC, Numero.PLUR);
  f("αι", Caso.VOC, Numero.PLUR);

  return map;
}

// ============================================================
// PRIMA DECLINAZIONE IN -α impuro (θάλαττα)
// ============================================================

function declinaPrimaAlphaImpuro(lemma) {
  const lemmaN = normalizzaInputUtente(lemma);
  const tema = rimuoviAccenti(lemmaN).slice(0, -1);
  const map = {};

  function f(des, c, n) {
    const forma = normalizzaInputUtente(tema + des);
    map[`${c}_${n}`] = forma;
  }

  f("α", Caso.NOM, Numero.SING);
  f("ης", Caso.GEN, Numero.SING);
  f("ῃ", Caso.DAT, Numero.SING);
  f("αν", Caso.ACC, Numero.SING);
  f("α", Caso.VOC, Numero.SING);

  f("ᾱ", Caso.NOM, Numero.DUAL);
  f("ᾱ", Caso.ACC, Numero.DUAL);
  f("αιν", Caso.GEN, Numero.DUAL);
  f("αιν", Caso.DAT, Numero.DUAL);

  f("αι", Caso.NOM, Numero.PLUR);
  f("ῶν", Caso.GEN, Numero.PLUR);
  f("αις", Caso.DAT, Numero.PLUR);
  f("ᾱς", Caso.ACC, Numero.PLUR);
  f("αι", Caso.VOC, Numero.PLUR);

  return map;
}

// ============================================================
// PRIMA DECLINAZIONE MASCHILE (νεανίας)
// ============================================================

function declinaPrimaMaschile(lemma) {
  const lemmaN = normalizzaInputUtente(lemma);
  const base = rimuoviAccenti(lemmaN);

  const alphaPuro = base.endsWith("ας");
  const alphaImpuro = base.endsWith("ης");

  let temaBase;
  if (base.endsWith("ας") || base.endsWith("ᾱς"))
    temaBase = base.slice(0, -2);
  else if (base.endsWith("ης"))
    temaBase = base.slice(0, -2);
  else
    temaBase = base;

  const temaVocativo = temaBase.replace("ω", "ῶ");
  const finale = base.slice(-2);

  const map = {};

  function f(tema, des, c, n) {
    const forma = normalizzaInputUtente(tema + des);
    map[`${c}_${n}`] = forma;
  }

  f(temaBase, finale, Caso.NOM, Numero.SING);
  f(temaBase, "ου", Caso.GEN, Numero.SING);

  if (alphaPuro) {
    f(temaBase, "ᾳ", Caso.DAT, Numero.SING);
    f(temaBase, "αν", Caso.ACC, Numero.SING);
  } else {
    f(temaBase, "ῃ", Caso.DAT, Numero.SING);
    f(temaBase, "ην", Caso.ACC, Numero.SING);
  }

  f(temaVocativo, "α", Caso.VOC, Numero.SING);

  f(temaBase, "ᾱ", Caso.NOM, Numero.DUAL);
  f(temaBase, "ᾱ", Caso.ACC, Numero.DUAL);
  f(temaBase, "αιν", Caso.GEN, Numero.DUAL);
  f(temaBase, "αιν", Caso.DAT, Numero.DUAL);

  f(temaBase, "αι", Caso.NOM, Numero.PLUR);
  f(temaBase, "ῶν", Caso.GEN, Numero.PLUR);
  f(temaBase, "αις", Caso.DAT, Numero.PLUR);
  f(temaBase, "ᾱς", Caso.ACC, Numero.PLUR);
  f(temaBase, "αι", Caso.VOC, Numero.PLUR);

  return map;
}

// ============================================================
// SECONDA DECLINAZIONE (λόγος / δῶρον)
// ============================================================

function declinaSeconda(lemma) {
  const lemmaN = normalizzaInputUtente(lemma);
  const tema = rimuoviAccenti(lemmaN).slice(0, -2);
  const finale = rimuoviAccenti(lemmaN).slice(-2);
  const map = {};

  function f(des, c, n) {
    const forma = normalizzaInputUtente(tema + des);
    map[`${c}_${n}`] = forma;
  }

  if (finale === "ος") {
    f("ος", Caso.NOM, Numero.SING);
    f("ου", Caso.GEN, Numero.SING);
    f("ῳ", Caso.DAT, Numero.SING);
    f("ον", Caso.ACC, Numero.SING);
    f("ε", Caso.VOC, Numero.SING);
  } else {
    f("ον", Caso.NOM, Numero.SING);
    f("ου", Caso.GEN, Numero.SING);
    f("ῳ", Caso.DAT, Numero.SING);
    f("ον", Caso.ACC, Numero.SING);
    f("ον", Caso.VOC, Numero.SING);
  }

  f("ω", Caso.NOM, Numero.DUAL);
  f("ω", Caso.ACC, Numero.DUAL);
  f("οιν", Caso.GEN, Numero.DUAL);
  f("οιν", Caso.DAT, Numero.DUAL);

  if (finale === "ος") {
    f("οι", Caso.NOM, Numero.PLUR);
    f("ων", Caso.GEN, Numero.PLUR);
    f("οις", Caso.DAT, Numero.PLUR);
    f("ους", Caso.ACC, Numero.PLUR);
    f("οι", Caso.VOC, Numero.PLUR);
  } else {
    f("α", Caso.NOM, Numero.PLUR);
    f("ων", Caso.GEN, Numero.PLUR);
    f("οις", Caso.DAT, Numero.PLUR);
    f("α", Caso.ACC, Numero.PLUR);
    f("α", Caso.VOC, Numero.PLUR);
  }

  return map;
}

function declinaAtticoOs(lemma) {
    const lemmaN = normalizzaInputUtente(lemma);
    const tema = rimuoviAccenti(lemmaN).slice(0, -2);   // dropLast(2)
    const map = {};

    function f(des, c, n) {
        const forma = normalizzaInputUtente(tema + des);
        map[`${c}_${n}`] = forma;
    }

    // Singolare
    f("ως", Caso.NOM, Numero.SING);
    f("ω",  Caso.GEN, Numero.SING);
    f("ῳ", Caso.DAT, Numero.SING);
    f("ων", Caso.ACC, Numero.SING);
    f("ως", Caso.VOC, Numero.SING);

    // Duale
    f("ω",  Caso.NOM, Numero.DUAL);
    f("ῳν", Caso.GEN, Numero.DUAL);
    f("ῳν", Caso.DAT, Numero.DUAL);
    f("ω",  Caso.ACC, Numero.DUAL);

    // Plurale
    f("ῳ", Caso.NOM, Numero.PLUR);
    f("ων", Caso.GEN, Numero.PLUR);
    f("ῳς", Caso.DAT, Numero.PLUR);
    f("ως", Caso.ACC, Numero.PLUR);
    f("ῳ", Caso.VOC, Numero.PLUR);

    return map;
}

// ============================================================
// GENERA TUTTE LE FORME (GREZZE + ACCENTATE + ARTICOLI)
// ============================================================

function generaForme(lemma) {

  // ============================================================
  // 1) NORMALIZZAZIONE COMPLETA DEL LEMMA
  // ============================================================
  let lemmaN = lemma.normalize("NFD");
  lemmaN = normalizzaTilde(lemmaN);
  lemmaN = normalizzaAccentiDuplicati(lemmaN);
  lemmaN = normalizzaGreco(lemmaN);

  // ============================================================
  // 0) DECLINAZIONE ATTICA IN -ως (λεώς, νεώς, ecc.)
  // ============================================================
  if (lemmaN.endsWith("ως")) {

    const raw = declinaAtticoOs(lemmaN);
    const result = {};

    const nomSing = raw[`${Caso.NOM}_${Numero.SING}`] || lemmaN;
    const alphaLunga = false; // come in Kotlin

    // Accentatore
    for (const key of Object.keys(raw)) {
      const formaGrezza = raw[key];
      const [caso, numero] = key.split("_");

      const formaAccentata = accentaForma({
        lemma: lemmaN,
        forma: formaGrezza,
        caso,
        numero,
        nomSing,
        alphaLunga
      });

      result[key] = formaAccentata;
    }

    // VOC PLUR = NOM PLUR
    const nomPlurKey = `${Caso.NOM}_${Numero.PLUR}`;
    const vocPlurKey = `${Caso.VOC}_${Numero.PLUR}`;
    if (result[nomPlurKey]) {
      result[vocPlurKey] = result[nomPlurKey];
    }

    // Articoli maschili
    const articoli = ARTICOLI_MASC;
    for (const key of Object.keys(result)) {
      const [caso, numero] = key.split("_");
      const art = articoli[caso]?.[numero] || "";
      if (art) result[key] = `${art} ${result[key]}`;
    }

    // Output finale con unificazione del duale
    const output = {};

    // Singolare e plurale
    for (const key of Object.keys(result)) {
      const [caso, numero] = key.split("_");
      if (numero !== Numero.DUAL) {
        const etichetta = `${caso} ${numero === Numero.SING ? "SING" : "PLUR"}`;
        output[etichetta] = result[key];
      }
    }

    // Duale diretti
    const dualDiretti =
      result[`${Caso.NOM}_${Numero.DUAL}`] ||
      result[`${Caso.ACC}_${Numero.DUAL}`] ||
      result[`${Caso.VOC}_${Numero.DUAL}`];

    // Duale obliqui
    const dualObliqui =
      result[`${Caso.GEN}_${Numero.DUAL}`] ||
      result[`${Caso.DAT}_${Numero.DUAL}`];

    if (dualDiretti) output["Duale N/A/V"] = dualDiretti;
    if (dualObliqui) output["Duale G/D"] = dualObliqui;

    return output;
  }

  // ============================================================
  // 1) RICONOSCIMENTO DECLINAZIONE (normale)
  // ============================================================
  const tipo = riconosciDeclinazione(lemmaN);

  // Quantità dell’alpha (solo prima declinazione)
  const alphaLunga = deduciQuantitaAlphaDalLemma(lemmaN);

  // ============================================================
  // 2) Forme grezze
  // ============================================================
  let raw;
  switch (tipo) {
    case TipoDeclinazione.PRIMA_ETA:
      raw = declinaPrimaEta(lemmaN);
      break;
    case TipoDeclinazione.PRIMA_ALPHA:
      raw = declinaPrimaAlpha(lemmaN);
      break;
    case TipoDeclinazione.PRIMA_ALPHA_IMPURO:
      raw = declinaPrimaAlphaImpuro(lemmaN);
      break;
    case TipoDeclinazione.PRIMA_MASC_PURO:
    case TipoDeclinazione.PRIMA_MASC_IMPURO:
      raw = declinaPrimaMaschile(lemmaN);
      break;
    case TipoDeclinazione.SECONDA_MASC:
    case TipoDeclinazione.SECONDA_NEUTRO:
      raw = declinaSeconda(lemmaN);
      break;
    default:
      raw = {};
  }

  const result = {};
  const nomSing = raw[`${Caso.NOM}_${Numero.SING}`] || lemmaN;

  // ============================================================
  // 3) Accentatore
  // ============================================================
// ============================================================
// 3) Accentatore
// ============================================================
const casiValidi = ["NOM", "GEN", "DAT", "ACC", "VOC"];
const numeriValidi = ["SING", "PLUR", "DUAL"];

for (const numero of numeriValidi) {
  for (const caso of casiValidi) {
    const key = `${caso}_${numero}`;
    const formaGrezza = raw[key];
    if (!formaGrezza) continue;

    // Usa SEMPRE accentaForma (come in Kotlin)
    const formaAccentata = accentaForma({
      lemma: lemmaN,
      forma: formaGrezza,
      caso,
      numero,
      nomSing,
      alphaLunga
    });

    result[key] = formaAccentata;
  }
}

  // VOC PLUR = NOM PLUR
  const nomPlurKey2 = `${Caso.NOM}_${Numero.PLUR}`;
  const vocPlurKey2 = `${Caso.VOC}_${Numero.PLUR}`;
  if (result[nomPlurKey2]) {
    result[vocPlurKey2] = result[nomPlurKey2];
  }

  // ============================================================
  // 4) Articoli
  // ============================================================
  const genere = genereDaDeclinazione(tipo);
  let articoli = null;

  if (genere === "FEM") articoli = ARTICOLI_FEM;
  else if (genere === "MASC") articoli = ARTICOLI_MASC;
  else if (genere === "NEUT") articoli = ARTICOLI_NEUT;

  if (articoli) {
    for (const key of Object.keys(result)) {
      const [caso, numero] = key.split("_");
      const art = articoli[caso]?.[numero] || "";
      if (art) result[key] = `${art} ${result[key]}`;
    }
  }

  // ============================================================
  // 5) Output finale con unificazione del duale
  // ============================================================
  const output = {};

  // Singolare e plurale
  for (const key of Object.keys(result)) {
    const [caso, numero] = key.split("_");
    if (numero !== Numero.DUAL) {
      const etichetta = `${caso} ${numero === Numero.SING ? "SING" : "PLUR"}`;
      output[etichetta] = result[key];
    }
  }

  // Duale diretti
  const dualDiretti2 =
    result[`${Caso.NOM}_${Numero.DUAL}`] ||
    result[`${Caso.ACC}_${Numero.DUAL}`] ||
    result[`${Caso.VOC}_${Numero.DUAL}`];

  // Duale obliqui
  const dualObliqui2 =
    result[`${Caso.GEN}_${Numero.DUAL}`] ||
    result[`${Caso.DAT}_${Numero.DUAL}`];

  if (dualDiretti2) output["Duale N/A/V"] = dualDiretti2;
  if (dualObliqui2) output["Duale G/D"] = dualObliqui2;

  return output;
}

export { generaForme };