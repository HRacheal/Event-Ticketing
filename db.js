const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('event_ticketing_db', 'postgres', 'Admin', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('✅ Database connected'))
    .catch(err => console.error('❌ Unable to connect to DB:', err));

module.exports = sequelize;
