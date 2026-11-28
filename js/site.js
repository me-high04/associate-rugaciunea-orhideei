// Scriptul principal al paginii (mutat din index.html ca să permită o politică CSP strictă)
(function(){
'use strict';
  var isMobile = function(){ return matchMedia('(max-width: 860px)').matches; };
  var reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function icon(name){ return '<svg class="ico" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }

  var IG = 'https://www.instagram.com/';
  // Ordinea e cea din Instagram: cea mai nouă postare prima. Postare nouă => adaug-o sus.
  var STORIES = [
    { date: '25 noiembrie 2026', cat: 'copii', label: 'Copii', link: IG + 'p/DgKWPdmjY9f/',
      photos: ['../instagram/DgKWPdmjY9f-1.jpg', '../instagram/DgKWPdmjY9f-2.jpg', '../instagram/DgKWPdmjY9f-3.jpg', '../instagram/DgKWPdmjY9f-4.jpg', '../instagram/DgKWPdmjY9f-5.jpg'],
      title: 'Vocea copiilor merită ascultată',
      text: 'Cu ocazia Zilei Internaționale a Drepturilor Copilului, în colaborare cu DGASPC Sector 2, am organizat un concurs dedicat implicării, creativității și viziunii copiilor asupra unui sistem mai bun, mai atent și mai apropiat de nevoile lor. Alex, câștigătorul inițiativei, a devenit director al Direcției Generale de Asistență Socială și Protecția Copilului Sector 2 pentru o zi. Propunerile lui au vizat combaterea bullyingului, programe de mentorat în care tinerii care au trecut prin sistem și și-au construit un parcurs frumos să îi îndrume pe cei aflați încă în sistem, precum și continuarea sprijinului și după împlinirea vârstei de 18 ani. Credem că fiecare copil are dreptul să fie ascultat și să participe la construirea unui viitor mai bun. Am oferit premii tuturor participanților, pentru implicare, curaj și creativitate. Felicitări copiilor și mulțumim din suflet sponsorilor și partenerilor noștri!' },
    { date: '10 octombrie 2026', cat: 'familii', label: 'Familii', link: IG + 'p/DeUZQHqDY3O/',
      photos: ['../instagram/DeUZQHqDY3O-1.jpg', '../instagram/DeUZQHqDY3O-2.jpg', '../instagram/DeUZQHqDY3O-3.jpg', '../instagram/DeUZQHqDY3O-4.jpg', '../instagram/DeUZQHqDY3O-5.jpg'],
      title: 'Proiectul lunii octombrie a început',
      text: 'Am fost alături de trei familii: una cu doi părinți și doi băieți, una numeroasă, cu doi părinți și șapte copii, și o mamă care își crește singură cei trei copii. În total, 17 suflete pe care le-am ajutat cu alimente, produse de igienă și produse pentru casă, ca masa să fie plină, iar casa, mai caldă. Mulțumim din suflet celor care ne susțin munca! Fără voi, nimic din toate acestea nu ar fi fost posibil!' },
    { date: '18 septembrie 2026', cat: 'copii', label: 'Copii', link: IG + 'p/DdbkRN9DRhr/',
      photos: ['proiect-10.jpg', 'proiect-09.jpg', 'proiect-01.jpg'],
      title: 'Am pornit din nou în aventura „Înapoi la școală”',
      text: 'Cu ajutorul unor oameni inimoși din comunitate, de data asta am pregătit 32 de ghiozdane complete pentru copii minunați, gata să înceapă anul cu zâmbetul pe buze.' },
    { date: '4 septembrie 2026', cat: 'copii', label: 'Copii', link: IG + 'p/Dc3mU0RDb5A/',
      photos: ['proiect-07.jpg', 'proiect-02.jpg', 'proiect-04.jpg'],
      title: '51 de începuturi de an cu mai multă speranță',
      text: 'În colaborare cu Direcția Generală de Asistență Socială și Protecția Copilului București, am oferit 51 de ghiozdane complet echipate copiilor care au nevoie de sprijin pentru a începe noul an școlar. Mulțumim doamnei Crina Florescu pentru implicare și pentru grija față de acești copii, și tuturor celor care susțin constant proiectele noastre. Prin generozitatea voastră, reușim să transformăm solidaritatea în ajutor concret!' },
    { date: '2 septembrie 2026', cat: 'familii', label: 'Familii', link: IG + 'p/DcymT_Kja2L/',
      photos: ['../instagram/DcymT_Kja2L.jpg', 'proiect-08.jpg'],
      title: 'Anul școlar bate la ușă',
      text: 'Am vrut ca cei doi băieți ai doamnei Daniela să-l întâmpine pregătiți. Le-am pus la punct tot ce le trebuie și le-am completat garderoba cu haine noi, potrivite pentru zilele de școală. Micile gesturi contează enorm atunci când vin la momentul potrivit.' },
    { date: '24 august 2026', cat: 'oameni', label: 'Oameni', link: IG + 'p/DcbLwOTNQB-/',
      photos: ['../instagram/DcbLwOTNQB-.jpg'],
      title: 'Povestea lui Romulus',
      text: 'Romulus a fost abandonat de părinți, iar viața l-a pus în fața unor încercări extrem de grele. El este dovada că sistemul, de cele mai multe ori, nu reușește să salveze oamenii nevoiași și că singurătatea este la fel ca o boală, care te poate distruge. Astăzi trăiește cu depresie, vorbește foarte greu și nu știe să scrie. În prezent este găzduit într-un centru de noapte din București. Cu toate acestea, Romulus și-a găsit o rază de lumină cântând într-un cor. Acolo găsește liniște, speranță și puterea de a merge mai departe.' },
    { date: '1 iunie 2026', cat: 'copii', label: 'Copii', link: IG + 'p/DZCrgBMDSEr/',
      photos: ['proiect-03.jpg', '../instagram/DZCrgBMDSEr.jpg'],
      title: 'Am sărbătorit copilăria',
      text: 'De Ziua Copilului ne-am bucurat să fim alături de cei mici și să le oferim câteva clipe speciale, pline de culoare și voie bună. Fiecare râs, fiecare îmbrățișare și fiecare privire plină de entuziasm ne-au amintit cât de important este să păstrăm vie bucuria copilăriei. Le dorim tuturor copiilor să crească frumos, cu încredere, sănătate și multe motive de fericire.' },
    { date: '1 iunie 2026', cat: 'copii', label: 'Copii', link: IG + 'p/DZCrNiYjdO7/',
      photos: ['../instagram/DZCrNiYjdO7.jpg'],
      title: 'La mulți ani tuturor copiilor!',
      text: 'De Ziua Copilului am avut bucuria să petrecem momente frumoase alături de cei mici, să oferim zâmbete, dulciuri și amintiri care sperăm să rămână mult timp în sufletele lor. Mulțumim tuturor celor care au fost alături de noi și au contribuit la această zi specială.' },
    { date: '1 iunie 2026', cat: 'copii', label: 'Copii', link: IG + 'p/DZCqtnKDUqI/',
      photos: ['../instagram/DZCqtnKDUqI.jpg'],
      title: 'Cele mai bune cadouri pentru copii',
      text: 'La mulți ani tuturor copiilor!' },
    { date: '25 mai 2026', cat: 'familii', label: 'Familii', link: IG + 'reel/DYxIozBNCOh/',
      photos: ['proiect-06.jpg'],
      title: 'Poveri pe care puțini și le-ar putea imagina',
      text: 'Doamna Livia muncește zi de zi pentru a ține casa împreună, în timp ce soțul ei se luptă cu cancerul. Împreună cresc cinci copii, dintre care o fetiță diagnosticată cu tetrapareză spastică și un băiat surdo-mut, ambii având nevoie de îngrijire constantă. În spatele fiecărei zile există tratamente, drumuri și multă putere. Prin acest proiect vrem să fim alături de ei.' },
    { date: '25 mai 2026', cat: 'familii', label: 'Familii', link: IG + 'p/DYxFQ26jVYb/',
      photos: ['proiect-05.jpg'],
      title: 'Opt copii, o singură casă',
      text: 'Doamna Daniela crește opt copii și se confruntă cu dificultăți financiare care depășesc orice limită obișnuită. Printre greutățile zilnice se numără îngrijirea unui copil cu ADHD și trăsături de autism, dar și a unui nepot cu hidrocefalie congenitală severă, care necesită atenție constantă. În spatele acestor cuvinte sunt nopți nedormite și o familie care încearcă să meargă mai departe. Orice gest contează.' }
  ];


  function thumbSrc(ph){ return ph.indexOf('/') >= 0 ? 'images/proiecte/' + ph : 'images/proiecte/thumbs/' + ph; }
  function fullSrc(ph){ return 'images/proiecte/' + ph; }

  /* ---------- POVEȘTI (polaroid-uri pe sfoară) ---------- */
  (function buildStories(){
    var wrap = document.getElementById('stories');
    STORIES.forEach(function(st, i){
      var a = document.createElement('article');
      a.className = 'story'; a.dataset.cat = st.cat;
      a.innerHTML =
        '<button class="story-media" data-story="' + i + '" data-photo="0" aria-label="Deschide pozele: ' + st.title + '">' +
          '<img src="' + thumbSrc(st.photos[0]) + '" alt="' + st.title + '" loading="lazy">' +
          (st.photos.length > 1 ? '<span class="count">1 / ' + st.photos.length + '</span>' : '') + '</button>' +
        '<div class="date">' + (st.date || 'București') + '</div>' +
        '<h3>' + st.title + '</h3>' +
        '<p class="story-text clamp">' + st.text + '</p><button class="story-more" type="button">Citește tot</button>' +
        '<div class="story-foot"><a href="#donatie" class="support">' + icon('heart') + 'Susține</a>' +
          '<a href="' + st.link + '" class="ig" target="_blank" rel="noopener">' + icon('insta') + 'Vezi pe Instagram</a></div>';
      wrap.appendChild(a);
    });
    wrap.querySelectorAll('.story-more').forEach(function(btn){
      var txt = btn.previousElementSibling;
      requestAnimationFrame(function(){ if(txt.scrollHeight <= txt.clientHeight + 2) btn.hidden = true; });
      btn.addEventListener('click', function(){ var c = txt.classList.toggle('clamp'); btn.textContent = c ? 'Citește tot' : 'Mai puțin'; });
    });
  })();

  // rola de povești: tragere cu mouse-ul + săgeți
  (function reel(){
    var r = document.getElementById('stories'), down = false, moved = false, sx = 0, sl = 0;
    r.addEventListener('mousedown', function(e){ down = true; moved = false; sx = e.pageX; sl = r.scrollLeft; });
    addEventListener('mouseup', function(){ if(down){ down = false; r.classList.remove('drag'); } });
    r.addEventListener('mousemove', function(e){ if(!down) return; if(Math.abs(e.pageX - sx) > 5){ moved = true; r.classList.add('drag'); } r.scrollLeft = sl - (e.pageX - sx); });
    r.addEventListener('click', function(e){ if(moved){ e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    document.getElementById('reelPrev').addEventListener('click', function(){ r.scrollBy({ left: -360, behavior: 'smooth' }); });
    document.getElementById('reelNext').addEventListener('click', function(){ r.scrollBy({ left: 360, behavior: 'smooth' }); });
  })();

  /* ---------- FILTRE ---------- */
  document.querySelectorAll('.chip').forEach(function(chip){
    chip.addEventListener('click', function(){
      document.querySelectorAll('.chip').forEach(function(c){ c.classList.toggle('active', c === chip); });
      var f = chip.dataset.filter;
      document.querySelectorAll('.story[data-cat]').forEach(function(it){ it.classList.toggle('hide', f !== 'all' && it.dataset.cat !== f); });
      document.getElementById('stories').scrollLeft = 0;
    });
  });

  /* ---------- GALERIE FOTO ---------- */
  var lb = document.getElementById('lightbox'), lbImg = document.getElementById('lbImg');
  var lbStory = 0, lbPhoto = 0, lastFocus = null;
  function showLb(){
    var st = STORIES[lbStory], ph = st.photos[lbPhoto];
    lbImg.classList.add('swap');
    var img = new Image();
    img.onload = function(){ lbImg.src = img.src; lbImg.alt = st.title; lbImg.classList.remove('swap'); };
    img.src = fullSrc(ph);
    document.getElementById('lbCap').textContent = st.title;
    document.getElementById('lbNum').textContent = (st.date ? st.date + ' · ' : '') + st.label + (st.photos.length > 1 ? ' · ' + (lbPhoto + 1) + ' / ' + st.photos.length : '');
  }
  function openLb(si, pi){ lastFocus = document.activeElement; lbStory = si; lbPhoto = pi; lb.classList.add('open'); document.body.style.overflow = 'hidden'; showLb(); document.getElementById('lbClose').focus(); }
  function closeLb(){ lb.classList.remove('open'); document.body.style.overflow = ''; if(lastFocus) lastFocus.focus(); }
  function stepLb(d){
    var st = STORIES[lbStory]; lbPhoto += d;
    if(lbPhoto >= st.photos.length){ lbStory = (lbStory + 1) % STORIES.length; lbPhoto = 0; }
    else if(lbPhoto < 0){ lbStory = (lbStory - 1 + STORIES.length) % STORIES.length; lbPhoto = STORIES[lbStory].photos.length - 1; }
    showLb();
  }
  document.addEventListener('click', function(e){
    var t = e.target.closest('[data-story], [data-story-id]');
    if(!t) return;
    var si = t.dataset.storyId ? STORIES.findIndex(function(st){ return st.link.indexOf(t.dataset.storyId) >= 0; }) : parseInt(t.dataset.story, 10);
    if(si >= 0) openLb(si, parseInt(t.dataset.photo || '0', 10));
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', function(){ stepLb(-1); });
  document.getElementById('lbNext').addEventListener('click', function(){ stepLb(1); });
  document.getElementById('lbDonate').addEventListener('click', closeLb);
  lb.addEventListener('click', function(e){ if(e.target === lb || e.target.id === 'lbStage') closeLb(); });
  (function swipe(){
    var sx = null, sy = null, stage = document.getElementById('lbStage');
    stage.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
    stage.addEventListener('touchend', function(e){
      if(sx === null) return;
      var dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
      if(Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) stepLb(dx < 0 ? 1 : -1);
      else if(dy > 90) closeLb();
      sx = sy = null;
    });
  })();

  /* ---------- MENIU ---------- */
  var nav = document.getElementById('nav'), menuToggle = document.getElementById('menuToggle'), mmenu = document.getElementById('mmenu');
  function setMenu(open){
    nav.classList.toggle('open', open); mmenu.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', open);
    menuToggle.setAttribute('aria-label', open ? 'Închide meniul' : 'Deschide meniul');
  }
  menuToggle.addEventListener('click', function(){ setMenu(!nav.classList.contains('open')); });
  mmenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ setMenu(false); }); });

  /* ---------- FILE „Cum poți ajuta” (online / 3,5% / firmă) ---------- */
  var TAB_BY_HASH = { '#donatie': 'online', '#redirectionare': 'fizice', '#contract': 'firme' };
  function activateTab(name){
    document.querySelectorAll('.tab').forEach(function(t){ t.setAttribute('aria-selected', t.dataset.tab === name); });
    document.querySelectorAll('.page').forEach(function(p){ p.hidden = p.dataset.panel !== name; });
  }
  document.querySelectorAll('.tab').forEach(function(t){ t.addEventListener('click', function(){ activateTab(t.dataset.tab); }); });
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if(!a || !TAB_BY_HASH[a.getAttribute('href')]) return;
    e.preventDefault();
    activateTab(TAB_BY_HASH[a.getAttribute('href')]);
    document.getElementById('ajuta').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
    history.replaceState(null, '', a.getAttribute('href'));
  });
  if(TAB_BY_HASH[location.hash]){
    activateTab(TAB_BY_HASH[location.hash]);
    window.addEventListener('load', function(){ document.getElementById('ajuta').scrollIntoView(); });
  }

  /* ---------- HERO: cuvinte + poze care cad + parallax ---------- */
  document.querySelectorAll('#h1 .w').forEach(function(w, i){ w.style.animationDelay = (0.15 + i * 0.09) + 's'; });
  document.querySelectorAll('.ph').forEach(function(p, i){ setTimeout(function(){ p.classList.add('in'); }, reduceMotion ? 0 : 600 + i * 260); });
  var board = document.getElementById('board');
  if(matchMedia('(hover: hover)').matches && !reduceMotion){
    board.addEventListener('mousemove', function(e){
      var r = board.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      board.querySelectorAll('.ph.in').forEach(function(p){ var d = +p.dataset.depth; p.style.transform = 'translate(' + (x * d) + 'px,' + (y * d) + 'px) rotate(var(--r))'; });
    });
    board.addEventListener('mouseleave', function(){ board.querySelectorAll('.ph').forEach(function(p){ p.style.transform = ''; }); });
  }

  /* ---------- SCROLL: margine-progres, meniu (pastilă + ascundere), bara de jos ---------- */
  var pill = document.getElementById('pill'), links = document.querySelectorAll('#navLinks a'), lastY = 0;
  var mobileBar = document.getElementById('mobileBar'), waFloat = document.getElementById('waFloat');
  function movePill(a){ if(!a){ pill.style.width = 0; return; } pill.style.left = a.offsetLeft + 'px'; pill.style.width = a.offsetWidth + 'px'; }
  links.forEach(function(a){ a.addEventListener('mouseenter', function(){ movePill(a); }); });
  document.getElementById('navLinks').addEventListener('mouseleave', function(){ movePill(document.querySelector('#navLinks a.active')); });
  function onScroll(){
    var y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
    document.getElementById('prog').style.height = (H > 0 ? y / H * 100 : 0) + '%';
    if(!nav.classList.contains('open')) nav.classList.toggle('hide', y > lastY && y > 400);
    lastY = y;
    var cur = null; ['ajuta','proiecte','despre','intrebari'].forEach(function(id){ if(document.getElementById(id).getBoundingClientRect().top < innerHeight * .45) cur = id; });
    links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
    movePill(document.querySelector('#navLinks a.active'));
    var aj = document.getElementById('ajuta').getBoundingClientRect();
    var showBar = y > innerHeight * .7 && !(aj.top < innerHeight * .6 && aj.bottom > innerHeight * .4);
    mobileBar.classList.toggle('show', showBar); waFloat.classList.toggle('lift', showBar);
  }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  // apariții la scroll
  var io = new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(function(el){ io.observe(el); });

  // ștampila din final
  var stamp = document.getElementById('stamp');
  stamp.addEventListener('click', function(){ stamp.classList.remove('pressed'); void stamp.offsetWidth; stamp.classList.add('pressed'); });

  // cursor „peniță”
  if(matchMedia('(hover: hover)').matches && !reduceMotion){
    var pen = document.getElementById('pen');
    addEventListener('mousemove', function(e){ pen.style.left = e.clientX + 'px'; pen.style.top = e.clientY + 'px'; });
    document.addEventListener('mouseover', function(e){ pen.classList.toggle('big', !!e.target.closest('a, button, .story, summary')); });
  }

  // Esc închide ce e deschis
  document.addEventListener('keydown', function(e){
    if(lb.classList.contains('open')){
      if(e.key === 'Escape') closeLb();
      if(e.key === 'ArrowLeft') stepLb(-1);
      if(e.key === 'ArrowRight') stepLb(1);
      return;
    }
    if(e.key !== 'Escape') return;
    if(nav.classList.contains('open')) setMenu(false);
    if(document.getElementById('thanksModal').style.display === 'flex') closeThanks();
  });

  /* ---------- DONAȚIE: sume (încercuite de mână) ---------- */
  var IMPACT = {
    '20':  ['package', 'Ajută la <b>alimente de bază</b> pentru o familie.'],
    '50':  ['package', 'Contribuie la <b>un pachet cu alimente și produse de igienă</b>.'],
    '100': ['home',    'Sprijină <b>o familie aflată în dificultate</b>.'],
    '200': ['hands',   'Ajută <b>un om aflat în nevoie</b> să treacă mai ușor peste o perioadă grea.'],
    '500': ['orchid',  'Susține <b>un proiect întreg</b> pentru comunitate.'],
    'custom': ['heart', '<b>Orice sumă contează.</b> Mulțumim din suflet!']
  };
  var AMOUNTS = [['20','lei'],['50','lei'],['100','lei'],['200','lei'],['500','lei'],['custom','sumă']];
  var CIRCLE = '<svg viewBox="0 0 120 60" preserveAspectRatio="none" aria-hidden="true"><path d="M18 44 C 4 28, 22 6, 62 6 C 102 6, 118 22, 108 42 C 98 58, 40 60, 16 48 C 8 42, 12 30, 30 24"/></svg>';
  var amountsEl = document.getElementById('amounts');
  AMOUNTS.forEach(function(a){
    var b = document.createElement('button'); b.className = 'amount-btn'; b.dataset.amount = a[0]; b.type = 'button';
    b.innerHTML = (a[0] === 'custom' ? 'Altă' : a[0]) + '<small>' + a[1] + '</small>' + CIRCLE;
    amountsEl.appendChild(b);
  });
  var selectedAmount = '100';
  var customWrap = document.getElementById('customWrap'), customInput = document.getElementById('customAmount');
  var amountBtns = document.querySelectorAll('.amount-btn');
  function setImpact(key){ var d = IMPACT[key] || IMPACT.custom; document.getElementById('impact').innerHTML = d[1]; }
  function updateAmountUI(){ document.getElementById('donateBtnText').textContent = selectedAmount ? 'Donează ' + selectedAmount + ' lei' : 'Alege o sumă'; }
  function selectAmount(btn, amount){
    amountBtns.forEach(function(b){ b.classList.toggle('selected', b === btn); });
    if(amount === 'custom'){
      customWrap.hidden = false;
      var v = parseInt(customInput.value, 10);
      selectedAmount = v >= 5 && v <= 50000 ? String(v) : '';
      setImpact('custom'); customInput.focus();
    } else { customWrap.hidden = true; selectedAmount = amount; setImpact(amount); }
    updateAmountUI();
  }
  amountBtns.forEach(function(b){ b.addEventListener('click', function(){ selectAmount(b, b.dataset.amount); }); });
  customInput.addEventListener('input', function(){ var v = parseInt(customInput.value, 10); selectedAmount = v >= 5 && v <= 50000 ? String(v) : ''; updateAmountUI(); });
  selectAmount(amountBtns[2], '100');
  document.getElementById('donateBtnMain').addEventListener('click', function(){
    if(!selectedAmount){
      customWrap.hidden = false; customInput.focus();
      customInput.style.borderColor = '#d9534f'; setTimeout(function(){ customInput.style.borderColor = ''; }, 1500);
      document.getElementById('impact').innerHTML = 'Introdu o sumă de <b>între 5 și 50.000 lei</b>.';
      return;
    }
    startCheckout();
  });

  /* ---------- COPIERE ---------- */
  document.querySelectorAll('[data-copy]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var text = document.getElementById(btn.dataset.copy).textContent.trim(), orig = btn.textContent;
      var done = function(){ btn.textContent = 'Copiat!'; btn.classList.add('done'); setTimeout(function(){ btn.textContent = orig; btn.classList.remove('done'); }, 1600); };
      var fallback = function(){ var ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta); done(); };
      if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(done, fallback); else fallback();
    });
  });

  // -------- Stripe Checkout --------
  // Butonul cere serverului o sesiune Stripe Checkout și trimite donatorul pe pagina de plată Stripe.
  async function startCheckout(){
    var btn = document.getElementById('donateBtnMain'), err = document.getElementById('payError');
    err.hidden = true;
    btn.setAttribute('aria-busy', 'true');
    document.getElementById('donateBtnText').textContent = 'Se deschide plata…';
    try {
      var res = await fetch('/create-checkout-session', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(selectedAmount, 10) })
      });
      var data = await res.json();
      if(res.ok && data.url){ window.location.href = data.url; return; }
      console.error('Checkout error:', data);
      err.textContent = data.error || 'Nu am putut porni plata.';
    } catch(e) {
      console.error('Checkout exception:', e);
      err.textContent = 'Nu am putut porni plata. Verifică conexiunea sau folosește transferul bancar.';
    }
    err.hidden = false;
    btn.removeAttribute('aria-busy');
    updateAmountUI();
  }
  // dacă donatorul revine cu „înapoi” din Stripe, butonul trebuie să fie din nou activ
  window.addEventListener('pageshow', function(){ document.getElementById('donateBtnMain').removeAttribute('aria-busy'); updateAmountUI(); });

  function closeThanks(){ document.getElementById('thanksModal').style.display = 'none'; document.body.style.overflow = ''; }
  document.getElementById('thanksClose').addEventListener('click', closeThanks);
  document.getElementById('thanksOk').addEventListener('click', closeThanks);
  document.getElementById('thanksModal').addEventListener('click', function(e){ if(e.target === this) closeThanks(); });
  (function thanksOnReturn(){
    var q = new URLSearchParams(location.search);
    if(q.get('donatie') !== 'multumim') return;
    var suma = parseInt(q.get('suma'), 10);
    document.getElementById('thanksAmount').textContent = suma > 0 ? ' de ' + suma + ' lei' : '';
    document.getElementById('thanksModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
    history.replaceState(null, '', location.pathname + '#donatie');
  })();

  /* COOKIE CONSENT */
  function initCookieConsent(){
    var v = null;
    try { v = localStorage.getItem('cookieConsent'); } catch(e) {}
    if(!v){ document.getElementById('cookieConsent').style.display = 'block'; }
  }
  function saveConsent(v){ try { localStorage.setItem('cookieConsent', v); } catch(e) {} }
  function acceptCookiesNecessary(){ saveConsent('necessary'); document.getElementById('cookieConsent').style.display = 'none'; }
  function acceptAllCookies(){ saveConsent('all'); document.getElementById('cookieConsent').style.display = 'none'; loadAllCookies(); }
  function loadAllCookies(){
    // Analytics: Microsoft Clarity (definit în <head>)
    if(window.loadClarity) window.loadClarity();
  }
  document.getElementById('cookieNecessary').addEventListener('click', acceptCookiesNecessary);
  document.getElementById('cookieAll').addEventListener('click', acceptAllCookies);
  initCookieConsent();

})();
