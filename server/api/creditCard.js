const router = require('express').Router()
module.exports = router;
var stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);


//Credit Card Authorization
router.post('/', (req, res, next) => {
  const token = req.body.response.id;
  console.log('cartTotal: ', req.body.cartTotal);
  console.log('typeof cartTotal: ', typeof req.body.cartTotal);
  console.log('orderId: ', req.body.orderId);
  console.log('user: ', req.body.user);
  stripe.charges.create({
    amount: req.body.cartTotal * 100,
    currency: "usd",
    description: "Example charge",
    source: token,
  }, function(err, charge) {
    // asynchronously called
    if(err){
      res.status(400).json(err);
    } else {
      res.status(200).json(charge);
    }
  });
})
