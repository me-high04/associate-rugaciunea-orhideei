const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Limite donație, în bani (1 leu = 100 bani)
const MIN_AMOUNT = 500;       // 5 lei
const MAX_AMOUNT = 5000000;   // 50.000 lei

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body)
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method Not Allowed' });
  }
  if (!process.env.STRIPE_SECRET_KEY) {
    return json(500, { error: 'Plățile nu sunt configurate (lipsește STRIPE_SECRET_KEY).' });
  }

  try {
    const { amount, email } = JSON.parse(event.body || '{}');
    const value = Number(amount);
    if (!Number.isInteger(value) || value < MIN_AMOUNT || value > MAX_AMOUNT) {
      return json(400, { error: 'Suma trebuie să fie între 5 și 50.000 lei.' });
    }

    const params = {
      amount: value,
      currency: 'ron',
      automatic_payment_methods: { enabled: true },
      description: 'Donație — Asociația Rugăciunea Orhideei',
      metadata: { source: 'website', type: 'donatie' }
    };
    if (typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      params.receipt_email = email;
    }

    const paymentIntent = await stripe.paymentIntents.create(params);
    return json(200, { clientSecret: paymentIntent.client_secret, paymentIntentId: paymentIntent.id });
  } catch (error) {
    console.error('create-payment-intent error:', error.message);
    return json(500, { error: 'Nu am putut inițializa plata. Încearcă din nou.' });
  }
};
