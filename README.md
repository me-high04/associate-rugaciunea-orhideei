# Asociația Rugăciunea Orhideei — site donații

Site static (`index.html`) publicat pe Netlify. Plățile cu cardul / Apple Pay / Google Pay merg prin Stripe,
folosind două funcții Netlify din `netlify/functions/`:

- `create-payment-intent` — creează plata (sume între 5 și 50.000 lei, descriere „Donație”, chitanță pe email opțională)
- `config` — trimite paginii cheia publicabilă Stripe

## Variabile de mediu (Netlify → Site configuration → Environment variables)

| Variabilă | Test | Live |
|---|---|---|
| `STRIPE_SECRET_KEY` | `sk_test_...` | `sk_live_...` |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | `pk_live_...` |

Cele două chei trebuie să fie din același mod (ambele test sau ambele live).
După ce le schimbi: **Deploys → Trigger deploy → Deploy site**. Nu e nevoie de modificări în cod.
Cât timp site-ul folosește chei de test, în fereastra de plată apare eticheta „MOD TEST”.

## Trecerea pe plăți reale

1. În Stripe: activează contul (date asociație, reprezentant, IBAN-ul pentru încasări).
2. Stripe → Developers → API keys (cu „Test mode” oprit): copiază `pk_live_...` și `sk_live_...`.
3. Pune-le în Netlify la variabilele de mai sus și redeploy.
4. Apple Pay: Stripe → Settings → Payment methods → Payment method domains → adaugă domeniul site-ului.
5. Fă o donație reală mică (ex. 5 lei) și verific-o în Stripe → Payments.

## Local

```bash
npm install
npm start          # http://localhost:3000
```

`.env` (nu se urcă pe GitHub):

```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...   # opțional local
```

Card de test: `4242 4242 4242 4242`, orice dată viitoare, orice CVC.
