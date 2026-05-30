# Integrare plăți (Stripe) — Asociația Rugăciunea Orhideei

Scop: adăugare frontend pentru donații cu card, plus suport Apple Pay / Google Pay prin Stripe. Aceasta este o configurație minimă pentru dezvoltare locală.

Pași rapizi:

1. Creează un cont Stripe (dacă nu ai) și obține cheile API:
   - `STRIPE_PUBLISHABLE_KEY` (cheia publicabilă, ex. `pk_test_...`)
   - `STRIPE_SECRET_KEY` (cheia secretă, ex. `sk_test_...`)

2. Clonează / folosește fișierele din acest folder. Creează un fișier `.env` în rădăcina proiectului cu:

```
STRIPE_SECRET_KEY=sk_test_...   # înlocuiește cu cheia ta secretă
PORT=3000
```

3. Editează `index.html` și înlocuiește valoarea `REPLACE_WITH_YOUR_PUBLISHABLE_KEY` din variabila `STRIPE_PUBLISHABLE_KEY` cu cheia ta publicabilă.

4. Instalează dependențele și pornește serverul:

```bash
npm install
npm start
```

5. Deschide `http://localhost:3000/index.html` în browser.

Notă despre Apple Pay / Google Pay:
- Pentru a folosi Apple Pay în producție, trebuie verificat domeniul în dashboard-ul Stripe (Domain Verification) și să folosești o adresă HTTPS.
- Google Pay prin Payment Request API este disponibil în browsere care îl suportă.
- În modul test, unele metode pot apărea doar pe anumite browsere sau platforme.

Teste (date card):
- Folosește cardurile de test Stripe (ex. `4242 4242 4242 4242`) în mediul de test.

Securitate și producție:
- Nu păstra cheile secrete în cod; folosește variabile de mediu pe serverul de producție.
- Configurează HTTPS și verificarea domeniului pentru Apple Pay.

Dacă vrei, pot:
- Adapta textul din pagină pentru a include instrucțiuni vizibile pentru plăți.
- Configura un exemplu de webhook pentru a marca donațiile în baza ta de date.
