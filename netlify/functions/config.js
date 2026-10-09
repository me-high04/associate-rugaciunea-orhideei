// Returnează cheia publicabilă Stripe din variabilele de mediu Netlify,
// ca trecerea test -> live să se facă doar din setări, fără modificări de cod.
exports.handler = async () => ({
  statusCode: 200,
  headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  body: JSON.stringify({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || null })
});
