const { Sequelize } = require('sequelize');

// Use the environment variable from Render/Neon, or fallback to local for development
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // Required for connecting to Neon from Render
        }
    }
});

sequelize.authenticate()
    .then(() => console.log('✅ Database connected to Neon'))
    .catch(err => console.error('❌ Unable to connect to DB:', err));

module.exports = sequelize;