const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import Database and Routes
const sequelize = require('./db'); 
const eventRoutes = require('./routes/events');
const ticketRoutes = require('./routes/tickets');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const sendEmail = require('./utils/mailer'); // Utility import

const app = express(); // <--- INITIALIZED FIRST

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Hello, Event Management Website!');
});

app.use('/events', eventRoutes);
app.use('/tickets', ticketRoutes);
app.use('/auth', authRoutes);
app.use('/payments', paymentRoutes);

// Sync database
sequelize.sync({ alter: true })
  .then(() => {
    console.log('📦 Database synced');
  })
  .catch(err => {
    console.error('❌ Database sync error:', err);
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});