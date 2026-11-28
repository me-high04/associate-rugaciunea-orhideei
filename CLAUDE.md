# Site Asociația Rugăciunea Orhideei

Site static (`index.html` + pagini legale) publicat pe Netlify din rădăcina repo-ului; plăți prin Stripe Checkout (`netlify/functions/create-checkout-session.js`). Scripturile sunt în `js/` (fără scripturi inline, din cauza CSP-ului din `netlify.toml`).

## Lecții învățate
- Arată local (`node server.js`, http://localhost:3000) și dă push doar după ce Mihai scrie „da push”.
- Când Mihai alege o variantă de design dintre mai multe (ex. „A+”, „C+”, „A+C”), confirmă într-o frază exact varianta pe care o implementezi înainte să o construiești.
- Păstrează textele de pe site-ul live; schimbă doar designul, cu excepția cazului în care Mihai cere explicit texte noi. Orice text nou se semnalează.
- Fără referințe religioase în textele site-ului și fără focus pe „ghiozdane”; tonul e general: copii, familii, oameni în nevoie.
- Când adaugi un serviciu extern (script, font, iframe), adaugă domeniul în CSP-ul din `netlify.toml` și rulează testul CSP local (0 încălcări) înainte de push.
- Postările noi de pe Instagram se adaugă primele în `STORIES` din `js/site.js`; pozele merg în `images/instagram/`.
