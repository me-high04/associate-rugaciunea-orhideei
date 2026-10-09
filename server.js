require('dotenv').config();
const express = require('express');
const path = require('path');

// Folosim exact aceleași funcții ca pe Netlify, ca testul local să fie identic cu producția.
const createPaymentIntent = require('./netlify/functions/create-payment-intent');
const config = require('./netlify/functions/config');

if(!process.env.STRIPE_SECRET_KEY){
  console.error('⚠️  Warning: STRIPE_SECRET_KEY not set in environment. Create a .env file with STRIPE_SECRET_KEY=sk_test_...');
} else {
  console.log('✅ STRIPE_SECRET_KEY loaded from .env (' + (process.env.STRIPE_SECRET_KEY.startsWith('sk_live') ? 'LIVE' : 'TEST') + ')');
}

const app = express();
app.use(express.json());

// Serve static files from this folder
app.use(express.static(path.join(__dirname)));

const run = (handler) => async (req, res) => {
  const result = await handler({ httpMethod: req.method, body: JSON.stringify(req.body || {}) });
  res.status(result.statusCode).set(result.headers || {}).send(result.body);
};

app.post('/create-payment-intent', run(createPaymentIntent.handler));
app.get('/config', run(config.handler));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    hasPublishableKey: !!process.env.STRIPE_PUBLISHABLE_KEY
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📊 API endpoint: POST http://localhost:${PORT}/create-payment-intent`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health\n`);
});
