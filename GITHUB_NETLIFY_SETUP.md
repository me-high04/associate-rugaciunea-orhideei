# Setup GitHub & Netlify — Instrucțiuni Deployment

## 1️⃣ Creează Repository pe GitHub

1. Mergi la [github.com/new](https://github.com/new)
2. Numește repository-ul: `asociatie-rugaciunea-orhideei` (sau ce dorești)
3. **NU** inițializezi cu README, .gitignore sau licență (avem deja)
4. Clică **Create repository**
5. Copie URL-ul HTTPS (ceva de genul `https://github.com/USERNAME/asociatie-rugaciunea-orhideei.git`)

## 2️⃣ Push Codul la GitHub

Execută în terminal:

```bash
cd "/Users/mihaiduca/Desktop/PAGINA WEB ASOCIATIE"
git branch -M main
git remote add origin https://github.com/USERNAME/asociatie-rugaciunea-orhideei.git
git push -u origin main
```

Înlocuiește `USERNAME` cu username-ul tău GitHub.

## 3️⃣ Configurează Netlify

1. Mergi la [netlify.com](https://netlify.com)
2. Loghează-te sau creează cont
3. Clică **Add new site** → **Import an existing project**
4. Selectează GitHub ca provider (autorizează dacă e necesar)
5. Selectează repository-ul `asociatie-rugaciunea-orhideei`
6. Configurare build:
   - **Build command**: `npm install`
   - **Publish directory**: `.`
7. Clică **Deploy site**

## 4️⃣ Configurează Variabile de Mediu în Netlify

1. Mergi în **Site settings** → **Build & deploy** → **Environment**
2. Clică **Edit variables**
3. Adaugă:
   - **Key**: `STRIPE_SECRET_KEY`
   - **Value**: `sk_test_...` (cheia ta secretă Stripe)
4. Salvează

## 5️⃣ Testează Site-ul Live

După deploy, vei primi URL-ul live. Ex: `https://asociatie-rugaciunea-orhideei.netlify.app`

✅ Acum:
- Donațiile cu card vor funcționa pe Netlify
- Apple Pay / Google Pay vor fi disponibile (dacă browserul suportă)
- Fiecare push pe GitHub va redeploya automat

---

**Troubleshooting:**

- **Eroare la deploy?** Verifică că `.env` e în `.gitignore` (NU e pushat pe GitHub)
- **Plăți nu funcționează?** Verifică că `STRIPE_SECRET_KEY` e corect în Netlify environment
- **Apple Pay nu apare?** Necesită HTTPS (Netlify oferă automat) + verificare domeniu în Stripe dashboard

---

📝 **Comenzi Git Utile:**

```bash
# Verifică status
git status

# Fă commit nou
git add .
git commit -m "Descrierea schimbării"
git push

# Vezi istoricul
git log --oneline
```
