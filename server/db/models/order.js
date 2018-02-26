const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.ENUM,
    values: ['in-cart', 'purchased'],
    defaultValue: 'in-cart'
  }
})

module.exports = Order;

