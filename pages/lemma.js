const l = JSON.parse(localStorage.getItem("lemmaSelezionato"));

document.getElementById("titolo").textContent = l.lemma;
document.getElementById("significato").textContent = l.significato;
document.getElementById("categoria").textContent = l.categoria;
document.getElementById("note").textContent = l.note;

document.getElementById("declina").addEventListener("click", () => {
    localStorage.setItem("lemmaDaDeclinare", JSON.stringify(l));
    window.location.href = "declinatore.html";
});
