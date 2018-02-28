const router = require('express').Router()
const { Event } = require('../db/models')
module.exports = router;


// Pulls all events from DB..."fetch" on home page
router.get('/', (req, res, next) => {
  Event.scope('showTickets').findAll()
  .then(events => {
    res.status(200).json(events);
  })
  .catch(next);
});

//Get single event
router.get('/:eventId', (req, res, next) => {
  Event.scope('showTickets').findById(req.params.eventId)
  .then(found => {
    res.status(200).json(found);
  })
});

//Update event
router.put('/:eventId', (req, res, next) => {
  Event.findById(req.params.eventId)
  .then(found => {
    found.update(req.body);
  })
  .then(updated => {
    res.status(200).json(updated);
  })
  .catch(next);
});

//Delete event
router.delete('/:eventId', (req, res, next) => {
  Event.findById(req.params.eventId)
  .then(found => {
    found.destroy();
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
})

router.post('/', (req, res, next) => {
  Event.create(req.body)
  .then(created => {
    res.status(201).json(created);
  })
  .catch(next);
})
