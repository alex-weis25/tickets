const User = require('./user');
const Venue = require('./venue');
const Event = require('./event');
const Review = require('./review');
const Ticket = require('./ticket');
const OrderLine = require('./orderLine');
const Order = require('./order');
const db = require('../db.js');

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

 //Associations
 Venue.hasMany(Event); // Adds venueId to Events
 Event.belongsTo(Venue); // adds implicit
 Event.hasMany(Ticket); // Adds eventId to Ticket
 Ticket.belongsTo(Event); // adds implicit
 User.hasMany(Ticket); // Adds userId to ticket
 Ticket.belongsTo(User, {as: 'seller'}); //Adds
 Order.hasMany(OrderLine); // Adds orderId to OrderLine
 Order.belongsTo(User); // adds implicit
 Order.belongsToMany(Ticket, {through: OrderLine}); // Adds
 Ticket.belongsToMany(Order, {through: OrderLine }); // Adds
 Review.belongsTo(User); // adds implicit
 User.hasMany(Review) // Adds userId to Review


module.exports = {
  db,
  User,
  Venue,
  Event,
  Review,
  Ticket,
  OrderLine,
  Order
}
