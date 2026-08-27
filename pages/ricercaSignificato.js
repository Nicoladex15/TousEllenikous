let lemmi = [];

// Carica il CSV appena la pagina viene aperta
fetch("../csv/lemmi.csv")
    .then(response => response.text())
    .then(text => {
        const righe = text.split("\n");

        // Converte ogni riga del CSV in un oggetto
        lemmi = righe.slice(1).map(r => {
            const [lemma, significato, categoria, note] = r.split(";");
            return { lemma, significato, categoria, note };
        });

        // Mostra subito tutti i lemmi
        mostraRisultati(lemmi);
    });

// Mostra i risultati nella tabella
function mostraRisultati(lista) {
    const tabella = document.getElementById("results");
    tabella.innerHTML = "";

    lista.forEach(l => {
        const riga = document.createElement("tr");
        riga.innerHTML = `
            <td><a href="dettaglio.html?lemma=${encodeURIComponent(l.lemma)}">${l.lemma}</a></td>
            <td>${l.significato}</td>
            <td>${l.categoria}</td>
        `;
        tabella.appendChild(riga);
    });
}

// Ricerca in tempo reale SOLO per significato
document.getElementById("searchSignificato").addEventListener("input", e => {
    const q = e.target.value.toLowerCase().trim();

    const filtrati = q === ""
        ? lemmi
        : lemmi.filter(l =>
            l.significato.toLowerCase().includes(q)
        );

    mostraRisultati(filtrati);
});
