require('dotenv').config();
const express = require('express');
const path = require('path');
const Stripe = require('stripe');

if(!process.env.STRIPE_SECRET_KEY){
  console.error('⚠️  Warning: STRIPE_SECRET_KEY not set in environment. Create a .env file with STRIPE_SECRET_KEY=sk_test_...');
} else {
  console.log('✅ STRIPE_SECRET_KEY loaded from .env');
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});
const app = express();
app.use(express.json());

// Serve static files from this folder
app.use(express.static(path.join(__dirname)));

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    console.log('📍 Creating payment intent for amount:', amount);
    
    if (!amount || amount < 1) {
      console.error('❌ Invalid amount:', amount);
      return res.status(400).json({ error: 'Amount must be at least 1' });
    }
    
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('❌ STRIPE_SECRET_KEY not configured');
      return res.status(500).json({ error: 'Server error: Stripe key not configured' });
    }

    console.log('🔄 Calling Stripe API to create PaymentIntent...');
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'ron',
      automatic_payment_methods: { enabled: true }
    });

    console.log('✅ PaymentIntent created:', paymentIntent.id);
    res.json({ clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (err) {
    console.error('❌ Error creating PaymentIntent:', err.message);
    if(err.code === 'authentication_error') {
      console.error('⚠️  Check your STRIPE_SECRET_KEY - it may be invalid');
      res.status(500).json({ error: 'Stripe authentication failed. Check server logs.' });
    } else {
      res.status(500).json({ error: err.message });
    }
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📊 API endpoint: POST http://localhost:${PORT}/create-payment-intent`);
  console.log(`💚 Health check: GET http://localhost:${PORT}/health\n`);
});
