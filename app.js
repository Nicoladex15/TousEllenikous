// 1. Carica il CSV
async function caricaCSV() {
    const risposta = await fetch("csv/lemmi.csv");
    const testo = await risposta.text();
    return testo;
}

// 2. Converte il CSV in oggetti { lemma, significato, categoria, note }
function parseCSV(csv) {
    const righe = csv.split("\n");
    const lemmi = [];

    righe.forEach(riga => {
        const campi = riga.split(";");

        if (campi.length < 4) return;

        lemmi.push({
            lemma: campi[0].trim(),
            significato: campi[1].trim(),
            categoria: campi[2].trim(),
            note: campi[3].trim()
        });
    });

    return lemmi;
}

let listaLemmi = [];

// 3. Carica e converti il CSV
caricaCSV().then(csv => {
    listaLemmi = parseCSV(csv);
});

// 4. Funzione di ricerca
function cercaLemma(testo) {
    testo = testo.toLowerCase();

    return listaLemmi.filter(l =>
        l.lemma.toLowerCase().includes(testo) ||
        l.significato.toLowerCase().includes(testo)
    );
}

// 5. Mostra i risultati nella pagina
function mostraRisultati(lista) {
    const div = document.getElementById("risultati");
    div.innerHTML = "";

    lista.forEach(l => {
        const p = document.createElement("p");
        p.textContent = `${l.lemma} — ${l.significato}`;
        p.style.cursor = "pointer";

        p.addEventListener("click", () => {
            apriLemma(l);
        });

        div.appendChild(p);
    });
}

// 6. Apre la pagina del lemma
function apriLemma(l) {
    localStorage.setItem("lemmaSelezionato", JSON.stringify(l));
    window.location.href = "pages/lemma.html";
}

// 7. Collega la barra di ricerca
document.getElementById("search").addEventListener("input", e => {
    const query = e.target.value;
    const risultati = cercaLemma(query);
    mostraRisultati(risultati);
});
