const Sequelize = require('sequelize')
const db = require('../db');

const Venue = db.define('venue', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  streetAddress: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  zip: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  imgUrl: {
    type: Sequelize.STRING //Set default value to venue 'stock'
  },
  address: {
    type: Sequelize.VIRTUAL,
    get() {
      const street = this.getDataValue('streetAddress');
      const city = this.getDataValue('city');
      const state = this.getDataValue('state');
      const zip = this.getDataValue('zip');
      return street + ', ' + city + '\n' + state + ', ' + zip;
    }
  }
}, {
  scopes: {
    showEvents: () => ({
      include: [{
        model: db.model('event'),
        as: 'events'
      }]
    })
  }

})

module.exports = Venue;
