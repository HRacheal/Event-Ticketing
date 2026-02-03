const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
const Ticket = require('../models/Ticket');
const authMiddleware = require('../middleware/authMiddleware');

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// POST /payments/pay
router.post('/pay', authMiddleware('user'), async (req, res) => {
  try {
    const { ticketId, token } = req.body;

    // Find ticket
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) return res.status(404).json({ message: 'Ticket not found' });

    // Create payment
    const charge = await stripe.paymentIntents.create({
      amount: Math.round(ticket.price * 100), // amount in cents
      currency: 'usd',
      payment_method: token,
      confirm: true
    });

    // Update ticket status
    ticket.status = 'paid';
    await ticket.save();

    res.json({ message: 'Payment successful', charge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
