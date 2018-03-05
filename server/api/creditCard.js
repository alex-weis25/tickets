const router = require('express').Router()
module.exports = router;
var stripe = require('stripe')(process.env.STRIPE_CLIENT_SECRET);


//Credit Card Authorization
router.post('/', (req, res, next) => {
  const token = req.body.id;
  stripe.charges.create({
    amount: 999,
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
