const Sequelize = require('sequelize')
const db = require('../db')

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.STRING,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING
  }
})


module.exports = Event;
