const Sequelize = require('sequelize')
const db = require('../db')

const Ticket = db.define('ticket', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  seat: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'GA'
  }
})

module.exports = Ticket;


//ticket belongs to many order through orderLine;
//ticket belongs to order as purchaseOrder
