const CACHE_NAME = "greco-cache-minimal-v1";

const urlsToCache = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",

  "pages/offline.html",

  "csv/lemmi.csv",

  "./icons/icon-192.png",
  "./icons/icon-512.png",

  // Immagini
  "img/articolo_femminile_greco_1.png",
  "img/articolo_maschile_greco_1.png",
  "img/articolo_neutro_greco_1.png",
  "img/eimi_imp_presente.png",
  "img/eimi_ind_imperfetto.png",
  "img/eimi_ind_presente.png",
  "img/eimi_inf_presente.png",
  "img/imperativo_presente.png",
  "img/indicativo_imperfetto.png",
  "img/indicativo_presente_tematico.png",
  "img/infinito_presente.png",
  "img/tabella_aggettivi_2_uscite_prima_classe.png",
  "img/tabella_aggettivi_3_uscite_1a_classe.png",
  "img/tabella_alfa_impuro_breve_fem.png",
  "img/tabella_alfa_impuro_lungo_fem.png",
  "img/tabella_alfa_impuro_mas.png",
  "img/tabella_alfa_puro_fem.png",
  "img/tabella_alfa_puro_mas.png",
  "img/tabella_seconda_mas_fem.png",
  "img/tabella_seconda_neut.png",

  // JS
  "pages/accentatore.obf.js",
  "pages/accentatore.js",
  "pages/coniugatore.obf.js",
  "pages/coniugatore.js",
  "pages/declinatore.obf.js",
  "pages/declinatore.js",
  "pages/lemma.obf.js",
  "pages/lemma.js",
  "pages/ricercaSignificato.obf.js",
  "pages/ricercaSignificato.js",

  // Pagine principali
  "pages/coniugatore.html",
  "pages/declinatore_coniugatore.html",
  "pages/declinatore.html",
  "pages/dettaglio.html",
  "pages/dizionario.html",
  "pages/fonetica.html",
  "pages/info.html",
  "pages/lemma.html",
  "pages/morfologia.html",
  "pages/offline.html",
  "pages/percorso-guidato.html",
  "pages/pillole_cultura.html",
  "pages/regole.html",
  "pages/ricercaSignificato.html",
  "pages/sintassi.html",

  // Fonetica
  "pages/fonetica/accentazione.html",
  "pages/fonetica/alfabeto.html",
  "pages/fonetica/consonanti.html",
  "pages/fonetica/dittonghi.html",
  "pages/fonetica/pronuncia.html",
  "pages/fonetica/segni_diacritici.html",
  "pages/fonetica/sillabe.html",
  "pages/fonetica/vocali.html",

  // Morfologia
  "pages/morfologia/aggettivo.html",
  "pages/morfologia/articolo.html",
  "pages/morfologia/complementi.html",
  "pages/morfologia/particelle.html",
  "pages/morfologia/sostantivo.html",
  "pages/morfologia/verbo.html",
  "pages/morfologia/regoleContrazione.html",

  // Aggettivi
  "pages/morfologia/Aggettivo/aggettivoPrimaClasse.html",
  "pages/morfologia/Aggettivo/aggettivoSecondaClasse.html",
  "pages/morfologia/Aggettivo/introduzioneAggettivo.html",
  "pages/morfologia/Aggettivo/PrimaClasse/aggettivoPrimaClasse2Uscite.html",
  "pages/morfologia/Aggettivo/PrimaClasse/aggettivoPrimaClasse3Uscite.html",
  "pages/morfologia/Contrazione/aggettivoContrazione.html",
  "pages/morfologia/Contrazione/AggettiviContratti/secondaClasseContratti.html",
  "pages/morfologia/Contrazione/AggettiviContratti/primaClasseContratti.html",
  "pages/morfologia/Contrazione/AggettiviContratti/PrimaClasseContratti/primaClasse2UsciteContratti.html",
  "pages/morfologia/Contrazione/AggettiviContratti/PrimaClasseContratti/primaClasse3UsciteContratti.html",
  "pages/morfologia/Contrazione/AggettiviContratti/secondaClasseContratti.html",

  // Articolo
  "pages/morfologia/Articolo/articoloFemminile.html",
  "pages/morfologia/Articolo/articoloMaschile.html",
  "pages/morfologia/Articolo/articoloNeutro.html",
  "pages/morfologia/Articolo/introduzioneArticolo.html",

  // Particelle
  "pages/morfologia/Particelle/kaiE.html",
  "pages/morfologia/Particelle/menDe.html",
  "pages/morfologia/Particelle/oteOsEiEpeiEpeide.html",
  "pages/morfologia/Particelle/ouMe.html",

  // Sostantivo
  "pages/morfologia/sostantivo/apposizioni.html",
  "pages/morfologia/sostantivo/casi.html",
  "pages/morfologia/sostantivo/contrazioni.html",
  "pages/morfologia/sostantivo/primaDeclinazione.html",
  "pages/morfologia/sostantivo/secondaDeclinazione.html",
  "pages/morfologia/Contrazione/sostantivoContrazione.html",

  // Prima declinazione
  "pages/morfologia/sostantivo/Prima_declinazione/primaDeclinazioneAlfaImpuroBreveFem.html",
  "pages/morfologia/sostantivo/Prima_declinazione/primaDeclinazioneAlfaImpuroLungoFem.html",
  "pages/morfologia/sostantivo/Prima_declinazione/primaDeclinazioneAlfaImpuroMas.html",
  "pages/morfologia/sostantivo/Prima_declinazione/primaDeclinazioneAlfaPuroFem.html",
  "pages/morfologia/sostantivo/Prima_declinazione/primaDeclinazioneAlfaPuroMas.html",
  "pages/morfologia/Contrazione/SostantiviContratti/primaDeclinazioneContratti.html",

  // Seconda declinazione
  "pages/morfologia/sostantivo/Seconda_declinazione/secondaDeclinazioneMaschileFemminile.html",
  "pages/morfologia/sostantivo/Seconda_declinazione/secondaDeclinazioneNeutro.html",
  "pages/morfologia/Contrazione/SostantiviContratti/secondaDeclinazioneContratti.html",
  // Verbo
  "pages/morfologia/Verbo/coniugazioneAtematica.html",
  "pages/morfologia/Verbo/coniugazioneTematica.html",
  "pages/morfologia/Verbo/diatesi.html",
  "pages/morfologia/Contrazione/verboContrazione.html",

  // Verbo – dettagli
  "pages/morfologia/Verbo/coniugazioneAtematica/ampliamentoNeNa.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/ampliamentoNu.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/radoppiamentoTemaPresente.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro.html",

  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/eimi.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/Eimi/imperativoeimi.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/Eimi/indicativoeimi.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/Eimi/infinitoeimi.html",

  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/Eimi/ImperativoEimi/imperativoeimipresente.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/Eimi/IndicativoEimi/imperfettoindicativoeimi.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/Eimi/IndicativoEimi/presenteindicativoeimi.html",
  "pages/morfologia/Verbo/coniugazioneAtematica/temaPuro/Eimi/InfinitoEimi/presenteinfinitoeimi.html",

  "pages/morfologia/Verbo/coniugazioneTematica/imperativo.html",
  "pages/morfologia/Verbo/coniugazioneTematica/indicativo.html",
  "pages/morfologia/Verbo/coniugazioneTematica/infinito.html",

  "pages/morfologia/Verbo/coniugazioneTematica/Imperativo/imperativo_presente_tematico.html",
  "pages/morfologia/Verbo/coniugazioneTematica/Indicativo/imperfetto_tematico.html",
  "pages/morfologia/Verbo/coniugazioneTematica/Indicativo/presente_tematico.html",
  "pages/morfologia/Verbo/coniugazioneTematica/Infinito/infinitopresentetematico.html",

  // Pillole cultura
  "pages/PilloleCultura/fren.html",
  "pages/PilloleCultura/unSentimentoUnaParola.html",
  "pages/PilloleCultura/UnSentimentoUnaParola/parolaAmore.html",

  // Sintassi
  "pages/sintassi/costruzioniParticolari.html",
  "pages/sintassi/frase.html",
  "pages/sintassi/subordinate.html",
  "pages/sintassi/Subordinate/infinitive.html"
];

self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {

  // ⭐ 1. Gestione delle richieste HTML (navigate)
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("pages/offline.html");
      })
    );
    return;
  }

  // ⭐ 2. Gestione di tutte le altre richieste (CSS, JS, IMG…)
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return (
        response ||
        fetch(event.request).catch(() => {
          return caches.match("pages/offline.html");
        })
      );
    })
  );
});