'use strict'
const router = require('express').Router();
var stripe = require('stripe')(process.env.STRIPE_CLIENT_ID);

module.exports = router;

//Process new payment
router.post('/charge', (req, res, next) => {
  let token = req.body.stripeToken;
  let chargeAmount = req.body.chargeAmount;
  const charge = stripe.charges.create({
    amount: chargeAmount,
    currency: 'usd',
    source: token,
    description: 'Charge for user@example.com'
  }, 'insertkey?', (err, charge) => {
    if(err && err.type === 'StripeCardError'){
      console.log('Your card was declined')
    }
  })
})



//Example charge
const charge = {
  amount: 100,
  currency: 'usd',
  source: 'tok_amex', //obtained with Stripe.js
  description: 'Charge for user@example.com'
}

const key = {
  idempotency_key: 'rgw0wVXJcKg6YkhS'
}
