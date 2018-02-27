const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

// router.get('/', (req, res, next) => {
//   User.findAll({
//     include: ['id', 'email'],
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })
