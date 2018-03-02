'use strict'
const router = require('express').Router();
module.exports = router
router.use('/stripe', require('./stripe'))

