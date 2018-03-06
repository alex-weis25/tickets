const router = require('express').Router()
const { Ticket, Order, OrderLine, Event } = require('../db/models')
module.exports = router;

//Pull all orderIds for a given user
router.put('/', (req, res, next) => {
  return Order.findAll({ where: {
    userId: req.body.userId
  }})
  .then(orders => {
    const ids = orders.map(order => {
      return order.id
    })
    return ids
  })
  .then(orderIds => {
    return OrderLine.findAll({ where: {
      orderId: orderIds
    }})
  })
  .then(ols => {
    console.log("olderlines: ", ols)
    res.json(ols);
  })
  .catch(next);
})
