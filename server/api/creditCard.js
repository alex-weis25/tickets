const router = require('express').Router()
module.exports = router;
var stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);


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
      res.status(400).json(err);
    } else {
      res.status(200).json(charge);
    }
  });
})
