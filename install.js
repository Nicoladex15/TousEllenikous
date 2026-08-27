let deferredPrompt;
const installBtn = document.getElementById('installApp');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.style.display = 'block';

  installBtn.onclick = async () => {
    installBtn.style.display = 'none';
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;
  };
});

// iPhone: mostra istruzioni invece dell’installazione
if (/iphone|ipad|ipod/i.test(navigator.userAgent)) {
  installBtn.style.display = 'block';
  installBtn.textContent = '📥 Aggiungi alla Home';
  installBtn.onclick = () => {
    alert("Su iPhone: premi il pulsante Condividi → 'Aggiungi alla Home'.");
  };
}
