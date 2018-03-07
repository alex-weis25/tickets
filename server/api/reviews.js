const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router;

//User adds new review for an event
router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(submitted => {
    res.status(200).json(submitted)
  })
  .catch(next);
})
