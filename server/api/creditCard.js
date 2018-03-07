const router = require('express').Router()
module.exports = router;
var stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);
console.log('PROCESS VARIABLES BE', process.env)


//Credit Card Authorization
router.post('/', (req, res, next) => {
  const token = req.body.response.id;
  stripe.charges.create({
    amount: req.body.cartTotal * 100,
    currency: "usd",
    description: "Tickets",
    metadata: {order_id: req.body.orderId,
      customer_name: req.body.user.firstName + ' ' + req.body.user.lastName,
      customer_email: req.body.user.email
    },
    source: token,
  }, function(err, charge) {
    // asynchronously called
    if(err){
      console.log('error:', err);
      console.log('stripe charges: ', stripe.charges);
      res.status(400).send(err, stripe.charges);
    } else {
      res.status(200).json(charge);
    }
  });
})
