const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Limite donație, în lei
const MIN_LEI = 5;
const MAX_LEI = 50000;

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
    return json(500, { error: 'Plățile nu sunt configurate (lipsește STRIPE_SECRET_KEY).', code: 'missing_secret_key' });
  }

  try {
    const { amount } = JSON.parse(event.body || '{}');
    const lei = Number(amount);
    if (!Number.isInteger(lei) || lei < MIN_LEI || lei > MAX_LEI) {
      return json(400, { error: 'Suma trebuie să fie între 5 și 50.000 lei.' });
    }

    // Pe Netlify, URL = adresa principală a site-ului; local folosim originea cererii.
    const headers = event.headers || {};
    const origin = process.env.URL || headers.origin || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      submit_type: 'donate',
      // cardul cere explicit; Apple Pay / Google Pay apar automat peste card, dacă sunt pornite în Stripe
      payment_method_types: ['card'],
      locale: 'ro',
      line_items: [{
        quantity: 1,
        price_data: {
          currency: 'ron',
          unit_amount: lei * 100,
          product_data: {
            name: 'Donație — Asociația Rugăciunea Orhideei',
            description: 'Mulțumim că ești alături de oamenii care au nevoie.'
          }
        }
      }],
      payment_intent_data: {
        description: 'Donație — Asociația Rugăciunea Orhideei',
        metadata: { source: 'website', type: 'donatie' }
      },
      success_url: `${origin}/?donatie=multumim&suma=${lei}`,
      cancel_url: `${origin}/#donatie`
    });

    return json(200, { url: session.url });
  } catch (error) {
    console.error('create-checkout-session error:', error.type, error.code, error.message);
    // Codul Stripe nu conține date sensibile și ajută la diagnosticare.
    return json(500, {
      error: 'Nu am putut porni plata. Încearcă din nou sau folosește transferul bancar.',
      code: error.code || error.type || 'unknown',
      detail: error.message // nu se afișează pe pagină; util pentru diagnosticare
    });
  }
};
