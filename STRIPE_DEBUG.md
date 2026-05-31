# 🔍 Stripe Integration Debugging Guide

This guide helps you diagnose and fix Stripe payment integration issues.

## ✅ Quick Checklist

- [ ] `.env` file exists with `STRIPE_SECRET_KEY=sk_test_...`
- [ ] Server is running: `npm install && node server.js`
- [ ] Server shows: ✅ STRIPE_SECRET_KEY loaded from .env
- [ ] Backend health check works: `curl http://localhost:3000/health`
- [ ] Stripe.js loads in browser console (type `Stripe`)
- [ ] Publishable key is set in HTML (line ~549)

## 🚀 Step-by-Step Testing

### 1. Start the Server

```bash
npm install
node server.js
```

Expected output:
```
✅ STRIPE_SECRET_KEY loaded from .env
🚀 Server listening on http://localhost:3000
📊 API endpoint: POST http://localhost:3000/create-payment-intent
💚 Health check: GET http://localhost:3000/health
```

### 2. Test Backend Health

**Terminal:**
```bash
curl http://localhost:3000/health
```

Should return:
```json
{
  "status": "ok",
  "hasStripeKey": true
}
```

### 3. Test Payment Intent Creation

**Terminal:**
```bash
curl -X POST http://localhost:3000/create-payment-intent \
  -H "Content-Type: application/json" \
  -d '{"amount": 5000}'
```

Should return:
```json
{
  "clientSecret": "pi_1234..._secret_...",
  "paymentIntentId": "pi_1234..."
}
```

**What can go wrong:**
- ❌ `"Server error: Stripe key not configured"` → STRIPE_SECRET_KEY missing in .env
- ❌ `"Stripe authentication failed"` → Invalid secret key in .env
- ❌ Connection refused → Server not running

### 4. Debug in Browser

Open the website and add `?debug=1` to URL:
```
http://localhost:3000/?debug=1
```

Then open **Developer Console** (F12 or Cmd+Shift+I) and you'll see:

```
=== Stripe Integration Debug ===
✅ Stripe.js loaded: true
✅ Publishable key configured: YES
📋 Publishable key (first 20 chars): pk_test_51Tcqe...

🧪 Testing backend connection...
✅ Backend is running: { status: 'ok', hasStripeKey: true }

🔗 Quick commands:
testStripe(100)  // Test backend
selectAmount(document.querySelector(".amount-btn"), "50")  // Select 50 RON
openCardPay()  // Open payment modal
```

### 5. Test Payment Intent from Browser Console

In browser console (F12), run:
```javascript
testStripe(100)
```

Expected console output:
```
🧪 Testing payment intent creation with 100 smallest units...
✅ Success! Client Secret: pi_...
📊 Full response: { clientSecret: '...', paymentIntentId: '...' }
```

## 🐛 Common Issues & Solutions

### Issue 1: "Eroare conexiune. Asigură-te că serverul rulează"

**Cause:** Server not running or backend URL wrong

**Fix:**
```bash
# Terminal 1: Start server
node server.js

# Terminal 2: Test it works
curl http://localhost:3000/health
```

### Issue 2: "Server error: Stripe key not configured"

**Cause:** STRIPE_SECRET_KEY not in .env

**Fix:**
1. Open `.env` file in project root
2. Add: `STRIPE_SECRET_KEY=sk_test_51Tcqe...`
3. Get your key from: https://dashboard.stripe.com/apikeys
4. Restart server: `node server.js`

### Issue 3: "Stripe authentication failed"

**Cause:** Invalid secret key (wrong or corrupted)

**Fix:**
1. Go to https://dashboard.stripe.com/apikeys
2. Copy exact secret key
3. Update `.env` file
4. Restart server

### Issue 4: Payment modal opens but no card field appears

**Cause:** Stripe.js failed to load or elements not created

**Fix:**
- Check browser console (F12) for errors
- Verify internet connection (CDN needs to load Stripe.js)
- Check that card-element div exists in HTML

### Issue 5: "Cannot read property 'amount' of undefined"

**Cause:** Missing amount in request

**Fix:** Always include amount > 0 when calling createPaymentIntent

## 🧪 Testing with Stripe Test Cards

Use these **test card numbers** in the payment form:

| Card | Number | Use For |
|------|--------|---------|
| **Visa (Success)** | `4242 4242 4242 4242` | Successful payments |
| **Visa (Decline)** | `4000 0000 0000 0002` | Declined payments |
| **3D Secure** | `4000 0025 0000 3155` | Authentication tests |

**Other fields (any values work):**
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits (e.g., `123`)
- Name: Any text

## 📊 Monitoring Payments

After successful test payments, view them:

1. Go to https://dashboard.stripe.com/
2. Navigate to **Payments** section
3. You should see:
   - Amount (RON)
   - Status: `Succeeded` / `Processing` / `Failed`
   - Timestamp

## 🔒 Production Checklist

Before going live, verify:

- [ ] Using **LIVE** keys (start with `sk_live_` and `pk_live_`)
- [ ] `.env` has live secret key
- [ ] HTTPS enabled on website
- [ ] Removed `?debug=1` from public links
- [ ] Tested with real cards (small amounts)
- [ ] Email notifications configured in Stripe dashboard
- [ ] Webhooks configured for payment confirmations

## 📞 Support Resources

- **Stripe Docs:** https://stripe.com/docs
- **Stripe Test Mode:** https://dashboard.stripe.com/?test=true
- **API Keys:** https://dashboard.stripe.com/apikeys
- **Payment Intents:** https://stripe.com/docs/payments/payment-intents

## 💡 Advanced Debugging

### Enable Full Logging

In `server.js`, add this before creating payment intent:
```javascript
console.log('Request body:', req.body);
console.log('Stripe version:', stripe._version);
```

### Check Network Tab

In browser (F12 → Network tab):
1. Click "Donează cu cardul" button
2. Look for POST request to `/create-payment-intent`
3. Click it and check:
   - **Status:** Should be `200`
   - **Response:** Should have `clientSecret`
   - **Response time:** Usually < 500ms

### Monitor Server Logs

Server terminal will show:
```
📍 Creating payment intent for amount: 5000
🔄 Calling Stripe API to create PaymentIntent...
✅ PaymentIntent created: pi_1234567890
```

---

**Last updated:** 2026-01-09
**Test Mode:** Only using Stripe test keys (pk_test_, sk_test_)
