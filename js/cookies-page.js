// Preferințele de cookies de pe pagina Politica de cookies
  (function(){
    var st = document.getElementById('clarityState'), saved = document.getElementById('prefSaved');
    function get(){ try { return localStorage.getItem('cookieConsent'); } catch(e) { return null; } }
    function show(){ var on = get() === 'all'; st.textContent = on ? 'activ' : 'inactiv'; st.className = 'pill ' + (on ? 'on' : 'off'); }
    function set(v){ try { localStorage.setItem('cookieConsent', v); } catch(e) {} show(); saved.hidden = false; setTimeout(function(){ saved.hidden = true; }, 2000); if(v === 'all' && window.loadClarity) window.loadClarity(); }
    document.getElementById('prefAll').addEventListener('click', function(){ set('all'); });
    document.getElementById('prefNecessary').addEventListener('click', function(){ set('necessary'); });
    show();
  })();
