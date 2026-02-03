const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Event = require('./Event');
const User = require('./User');

const Ticket = sequelize.define('Ticket', {
  ticket_type: {
    type: DataTypes.STRING,
    defaultValue: 'regular' // optional: can be VIP, etc.
  },
  price: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: 'booked' // booked, paid, cancelled
  },
  qr_code: {
    type: DataTypes.STRING
  }
});

// Associations
Ticket.belongsTo(User, { foreignKey: 'userId' });
Ticket.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = Ticket;
