// const router = require('express').Router()
// const { Orderline } = require('../db/models')
// module.exports = router;


// // Pulls all orderlines from DB..
// router.get('/', (req, res, next) => {
//   Orderline.findAll()
//   .then(orderlines => {
//     res.status(200).json(orderlines);
//   })
//   .catch(next);
// });

// //Get single orderline
// router.get('/:orderlineId', (req, res, next) => {
//   Orderline.findById(req.params.orderlineId)
//   .then(found => {
//     res.status(200).json(found);
//   })
//   .catch(next);
// });

// //Update orderline
// router.put('/:orderlineId', (req, res, next) => {
//   Orderline.findById(req.params.orderlineId)
//   .then(found => {
//     found.update(req.body);
//   })
//   .then(updated => {
//     res.status(200).json(updated);
//   })
//   .catch(next);
// });

// //Delete orderline
// router.delete('/:orderlineId', (req, res, next) => {
//   Orderline.findById(req.params.orderlineId)
//   .then(found => {
//     found.destroy();
//   })
//   .then(() => {
//     res.sendStatus(204);
//   })
//   .catch(next);
// })

// router.post('/', (req, res, next) => {
//   Orderline.create(req.body)
//   .then(created => {
//     res.status(201).json(created);
//   })
//   .catch(next);
// })
