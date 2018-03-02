const router = require('express').Router()
const {User} = require('../db/models')
const {Ticket} = require('../db/models');
const {Order} = require('../db/models');

module.exports = router


//Use case: find all users...?
router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

//Populate users => this should be moved to orders or create cart api routes file
router.get('/cart/:userId', (req, res, next) => {
  Order.scope('showTickets').findOne({ where: {
    userId: req.params.userId,
    status: 'in-cart'
  }})
  .then(orderList => {
    res.json(orderList)
  })
  .catch(next);
})
