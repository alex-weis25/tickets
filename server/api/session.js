const router = require('express').Router()
module.exports = router;


// Pulls all orders from session..."fetch" on home page
router.get('/', (req, res, next) => {
  res.status(200).json(req.session.cart)
});

router.post('/', (req, res, next) => {
    req.session.cart.tickets = req.body
    res.status(200).json(req.session.cart)
});

router.put('/', (req, res, next) => {
    let tickets = req.session.cart.tickets
    const addTickets = req.body
    tickets = [...tickets, ...addTickets]
    req.session.cart.tickets = tickets
    res.status(200).json(req.session.cart)
});

router.delete('/', (req, res, next) => {
    let sesstionTix = req.session.cart.tickets
    let tickets = sessionTix.filter(sessionTicket => {
        let removeTix = req.body
        removeTix = removeTix.filter(removeTicket => {
            return removeTicket.id === sessionTicket.id ? true : false;
        })
        return removeTix.length === 0;
    })
    req.sessions.cart.tickets = tickets
    res.status(200).json(req.session.cart)
});