const router = require('express').Router()
const { Order } = require('../db/models');
const { OrderLine } = require('../db/models');
module.exports = router;


// Pulls all orders from DB..."fetch" on home page
router.get('/', (req, res, next) => {
  Order.findAll()
  .then(orders => {
    res.status(200).json(orders);
  })
  .catch(next);
});

//Get single order
router.get('/:orderId', (req, res, next) => {
  Order.findById(req.params.orderId)
  .then(found => {
    res.status(200).json(found);
  })
  .catch(next);
});

// Add tix to order in customer cart...need orderId and ticketId
router.put('/:orderId', (req, res, next) => {
  const newTickets = req.body.tickets; //Assume obj w/ order id & arr of tickets
  const updatedId = req.body.orderId
  const newOrders = newTickets.map(ticket => {
    return OrderLine.build({
      orderId: updatedId,
      ticketId: ticket
    })
  })
  return Promise.all(newOrders.map(order => order.save()))
  .then(_ => {
    Order.scope('showTickets').findById(updatedId)
    .then(found => {
      res.status(200).json(found);
    })
  })
  .catch(next);
})

//Creating a new cart for a user
router.post('/users/:userId', (req, res, next) => {
  const newTickets = req.body.tickets; //Assume obj w/ order id & arr of tickets
  const newId = req.params.userId;
  Order.create({userId: newId})
  .then(created => {
    const orderId = created.id;
    const newOrders = newTickets.map(ticket => {
      return OrderLine.build({
        orderId: orderId,
        ticketId: ticket
      })
    })
    return Promise.all(newOrders.map(order => order.save()))
    .then(_ => {
      Order.scope('showTickets').findById(orderId)
      .then(found => {
        res.status(200).json(found);
      })
    })
  })
  .catch(next);
})

  // OrderLines.create(req.params.orderId)
  // .then(found => {
  //   console.log(found);
  //   found.update(req.body);
  // })
  // .then(updated => {
  //   res.status(200).json(updated);
  // })
  // .catch(next);

// //Delete order
// router.delete('/:orderId', (req, res, next) => {
//   Order.findById(req.params.orderId)
//   .then(found => {
//     found.destroy();
//   })
//   .then(() => {
//     res.sendStatus(204);
//   })
//   .catch(next);
// })

// router.post('/', (req, res, next) => {
//   Order.create(req.body)
//   .then(created => {
//     res.status(201).json(created);
//   })
//   .catch(next);
// })
