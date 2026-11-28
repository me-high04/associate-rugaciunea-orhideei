// Rulează în <head>, înainte de afișare: marchează că JS e activ și
// încarcă Microsoft Clarity doar dacă vizitatorul a ales „Acceptă toate”.
document.documentElement.classList.add('js');
window.loadClarity = function(){
  if(window.__clarityLoaded) return; window.__clarityLoaded = true;
  (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", "ywirw90dnd");
};
try { if(localStorage.getItem('cookieConsent') === 'all') window.loadClarity(); } catch(e) {}
