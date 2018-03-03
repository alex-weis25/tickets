const router = require('express').Router()
const { Event } = require('../db/models')
const permChecker = require('./permChecker');
module.exports = router;


// Pulls all events from DB..."fetch" on home page
router.get('/', (req, res, next) => {
  Event.scope('showDetails').findAll()
  .then(events => {
    res.status(200).json(events);
  })
  .catch(next);
});

//Get single event
router.get('/:eventId', (req, res, next) => {
  Event.scope('showDetails').findById(req.params.eventId)
  .then(found => {
    res.status(200).json(found);
  })
  .catch(next);
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

//Create event
router.post('/', (req, res, next) => permChecker(req, res, next, 'addEvent'), (req, res, next) => {
  Event.create(req.body)
  .then(created => {
    return Event.scope('showDetails').findById(created.id)
  })
  .then(found => res.status(201).json(found))
  .catch(error => {
    console.error(error);
    res.json(error);
  });
})
