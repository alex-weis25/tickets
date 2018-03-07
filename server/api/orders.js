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
router.put('/remove/:orderId', (req, res, next) => {
  const removeTickets = req.body; 
  console.log(req.body,"..removeTickets")
  const orderId = req.params.orderId
  return Promise.all(removeTickets.map(ticket => {
    return OrderLine.destroy({
      where:{
        orderId: orderId,
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
router.post('/create', (req, res, next) => {
  const newTickets = req.body.tickets || req.session.cart.tickets;
  const orderUser = req.body.user;
  Order.create({
    userId: orderUser.id || null,
    orderEmail: orderUser.email
  })
  .then(created => {
    const orderId = created.id;
    const newOrders = newTickets.map(ticket => {
      return OrderLine.build({
        orderId,
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

//Populate users cart
router.get('/cart/:userId', (req, res, next) => {
  let orderId;
  console.log("hey I made it here!!!!")
  Order.scope('showTickets').findOne({ where: {
    userId: req.params.userId,
    status: 'in-cart'
  }})
  .then(order => {
    if(req.session.cart.tickets.length && order.tickets.length){
      const sessionTickets = req.session.cart.tickets;
      const orderTickets = order.tickets
      orderId = order.id
      const tickets = filterTickets(sessionTickets, orderTickets)
      if(tickets.length>0){
        const newOrders = tickets.map(ticket => {
          return OrderLine.build({
            orderId,
            ticketId: ticket.id
          })
        })
        return Promise.all(newOrders.map(order => order.save()))
        .then(_ => {
          Order.scope('showTickets').findById(orderId)
          .then(found => {
             return res.status(200).json(found);
          })
        })
      }
      else{
      return res.status(200).json(order)
      }
    }
    else if(req.session.cart.tickets.length){
      const sessionTickets = req.session.cart.tickets;
      const newOrders = sessionTickets.map(ticket => {
        return OrderLine.build({
          orderId,
          ticketId: ticket.id
        })
      })
      return Promise.all(newOrders.map(order => order.save()))
      .then(_ => {
        Order.scope('showTickets').findById(orderId)
        .then(found => {
           return res.status(200).json(found);
        })
      })
    }
    else{ 
      return res.status(200).json(order)
    }
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
    req.session.destroy();
    res.status(201).json(sendIt);
  })
  .catch(next);
})


function filterTickets(sessionTix, orderTix){
  let tickets = sessionTix.filter(orderTicket => {
    let sessionTickets = orderTix
    sessionTickets = sessionTickets.filter(sessionTicket => {
      return orderTicket.id === sessionTicket.id
    })
    return sessionTickets.length === 0;
  })
  return tickets
}