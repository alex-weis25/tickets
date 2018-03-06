const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router;

//User adds new review for an event
router.post('/', (req, res, next) => {
  Review.create(req.body)
  .then(submitted => {
    console.log("submitted review: ", submitted)
    res.status(200).json(submitted)
  })
  .catch(next);
})

// //Gets all reviews for a specific event
// router.get('/:eventId', (req, res, next) => {
//   Review.findAll({ where: {
//     eventId: req.params.eventId
//   }})
//   .then(reviews => {
//     console.log(reviews);
//     res.status(200).json(reviews);
//   })
// })
