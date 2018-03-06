const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define(
  "order",
  {
    status: {
      type: Sequelize.ENUM,
      values: ["in-cart", "purchased"],
      defaultValue: "in-cart"
    },
    orderEmail: {
      type: Sequelize.STRING,
    }
  },
  {
    scopes: {
      showTickets: () => ({
        include: [
          {
            model: db.model("ticket"),
            as: "tickets"
          }
        ]
      })
    }
  }
);

module.exports = Order;
