const Sequelize = require('sequelize')
const db = require('../db');

const Event = db.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
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
    type: Sequelize.STRING,
    defaultValue: 'https://picsum.photos/600/400/?image=315'
  }
}, {
  scopes: {
    showDetails: () => ({
      include: [{
        model: db.model('ticket'),
        as: 'tickets',
        where: {
          orderId: null
        }
      },
      {
        model: db.model('venue'),
        as: 'venue'
      }]
    })
  }
})

module.exports = Event;
