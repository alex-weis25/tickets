const router = require('express').Router()
const { Venue } = require('../db/models')
module.exports = router;


// Pulls all venues from DB..."fetch" on home page
router.get('/', (req, res, next) => {
  Venue.scope('showEvents').findAll()
  .then(venues => {
    res.status(200).json(venues);
  })
  .catch(next);
});

//Get single venue
router.get('/:venueId', (req, res, next) => {
  Venue.findById(req.params.venueId)
  .then(found => {
    res.status(200).json(found);
  })
});

//Update venue
router.put('/:venueId', (req, res, next) => {
  Venue.findById(req.params.venueId)
  .then(found => {
    found.update(req.body);
  })
  .then(updated => {
    res.status(200).json(updated);
  })
  .catch(next);
});

//Delete venue
router.delete('/:venueId', (req, res, next) => {
  Venue.findById(req.params.venueId)
  .then(found => {
    found.destroy();
  })
  .then(() => {
    res.sendStatus(204);
  })
  .catch(next);
})

router.post('/', (req, res, next) => {
  Venue.create(req.body)
  .then(created => {
    res.status(201).json(created);
  })
  .catch(next);
})
