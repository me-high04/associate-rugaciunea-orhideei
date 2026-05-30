require('dotenv').config();
const express = require('express');
const path = require('path');
const Stripe = require('stripe');

if(!process.env.STRIPE_SECRET_KEY){
  console.error('Warning: STRIPE_SECRET_KEY not set in environment. Create a .env file with STRIPE_SECRET_KEY=sk_test_...');
}

const stripe = Stripe(process.env.STRIPE_SECRET_KEY || '');
const app = express();
app.use(express.json());

// Serve static files from this folder
app.use(express.static(path.join(__dirname)));

app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: 'Missing amount (in smallest currency unit)' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'ron',
      automatic_payment_methods: { enabled: true }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
