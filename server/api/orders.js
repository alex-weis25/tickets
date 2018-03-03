const router = require('express').Router()
const { Order, OrderLine, Ticket } = require('../db/models');
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
  const newTickets = req.body; //Assume obj w/ order id & arr of tickets
  const updatedId = req.params.orderId
  const newOrders = newTickets.map(ticket => {
    return OrderLine.build({
      orderId: updatedId,
      ticketId: ticket.id
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

//remove tix from the orderline
router.delete('/:orderId', (req, res, next) => {
  const removeTickets = req.body; //Assume obj w/ order id & arr of tickets
  const orderId = req.params.orderId
  return Promise.all(removeTickets.map(ticket => {
    return OrderLine.destroy({
      Where:{
        orderId: updatedId,
        ticketId: ticket.id
      }
    })
  }))
  .then(_ => {
    Order.scope('showTickets').findById(orderId)
    .then(found => {
      res.status(200).json(found);
    })
  })
  .catch(next);
})

//Creating a new cart for a user
router.post('/users/:userId', (req, res, next) => {
  const newTickets = req.body; //Assume obj w/ order id & arr of tickets
  const newId = req.params.userId;
  Order.create({userId: newId})
  .then(created => {
    const orderId = created.id;
    const newOrders = newTickets.map(ticket => {
      return OrderLine.build({
        orderId: orderId,
        ticketId: ticket.id
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

//User purchases tickets, changes order status and adds order Id to tickets. Need to remove other orderLines with same ticketIds and different orderIds
router.put('/purchase/:orderId', (req, res, next) => {
  Order.scope('showTickets').findById(req.params.orderId)
  .then(found => {
    return found.update({
      status: 'purchased'
    })
  })
  .then(purchased => {
    const tickets = purchased.tickets;
    tickets.map(ticket => {
      ticket.update({
        orderId: req.params.orderId
      })
    });
    return tickets
  })
  // .then(removeTix => {
  //   console.log(removeTix[0].id);
  //   removeTix.map(ticket => {
  //     OrderLine.destroy({ where: {
  //       ticketId: ticket.id,
  //       orderId: {
  //         $ne: req.params.orderId
  //       }
  //     }})
  //   })
  // })
  .then(sendIt => {
    res.status(201).json(sendIt);
  })
  .catch(next);
})
