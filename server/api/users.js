const router = require('express').Router()
const {User} = require('../db/models')


module.exports = router


//Use case: find all users...?
router.get('/', (req, res, next) => {
  return User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email', 'firstName', 'lastName']
  })
    .then(users => {
      res.json(users)
    })
    .catch(next)
})
