const User = require('./user');
const Venue = require('./venue');
const Event = require('./event');
const Review = require('./review');
const Ticket = require('./ticket');
const OrderLine = require('./orderLine');
const Order = require('./order');
const Permission = require('./permission');
const PermissionRel = require('./PermissionRel');
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
 Venue.hasMany(Event, {onDelete: 'cascade'}); // Adds venueId to Events
 Event.belongsTo(Venue); // adds implicit
 Event.hasMany(Ticket, {onDelete: 'cascade'}); // Adds eventId to Ticket
 Ticket.belongsTo(Event); // adds implicit
 Order.hasMany(Ticket); // Adds userId to ticket
 Ticket.belongsTo(Order) //adds implicit
//  Ticket.belongsTo(User, {as: 'seller'}); //Adds
 Order.hasMany(OrderLine); // Adds orderId to OrderLine
 Order.belongsTo(User); // adds implicit
 Order.belongsToMany(Ticket, {through: OrderLine}); // Adds
 Ticket.belongsToMany(Order, {through: OrderLine }); // Adds
 Review.belongsTo(Event); // adds implicit
 Event.hasMany(Review); // Adds userId to Review
 User.hasMany(Review);
 Review.belongsTo(User);
 User.belongsToMany(Permission, {through: PermissionRel }); // Adds
 Permission.belongsToMany(User, {as: 'permission', through: PermissionRel }); // Adds



module.exports = {
  db,
  User,
  Venue,
  Event,
  Review,
  Ticket,
  OrderLine,
  Order,
  Permission,
  PermissionRel
}
