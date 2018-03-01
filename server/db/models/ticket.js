const Sequelize = require('sequelize')
const db = require('../db')

const Ticket = db.define('ticket', {
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  seat: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'GA'
  }
})

module.exports = Ticket;

