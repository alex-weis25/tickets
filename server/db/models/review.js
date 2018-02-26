const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      max: 5,
      min: 0
    }
  }
})

module.exports = Review;
