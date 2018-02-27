const Sequelize = require('sequelize')
const db = require('../db');
const Ticket = require('./ticket');


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
    type: Sequelize.STRING
  }
}, {
  scopes: {
    showTickets: () => ({
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

Event.hook('beforeDestroy', function(event) {
  return Ticket.destroy({
    where: {
      eventId: event.id
    }
  });
})


module.exports = Event;
