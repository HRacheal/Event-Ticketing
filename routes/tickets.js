const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');
const QRCode = require('qrcode');
const sendEmail = require('../utils/mailer'); // Fixed: Points to mailer.js

// POST: Book a ticket for an event
router.post('/book', authMiddleware('user'), async (req, res) => {
  try {
    const { eventId, ticket_type = 'regular', price = 0 } = req.body;

    // 1. Find event FIRST
    const event = await Event.findByPk(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // 2. Check ticket availability
    if (event.total_tickets <= 0) {
      return res.status(400).json({ message: 'No tickets available' });
    }

    // 3. Generate QR code text
    const qrData = `Event:${event.name} | User:${req.user.id} | Type:${ticket_type}`;
    const qr_code = await QRCode.toDataURL(qrData);

    // 4. Create ticket in database
    const ticket = await Ticket.create({
      eventId,
      userId: req.user.id,
      ticket_type,
      price,
      qr_code
    });

    // 5. Send email with QR code (Now that event and ticket are defined)
    const html = `
      <h2>Ticket Confirmation</h2>
      <p><strong>Event:</strong> ${event.name}</p>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Location:</strong> ${event.location}</p>
      <p><strong>Ticket Type:</strong> ${ticket.ticket_type}</p>
      <p><strong>Price:</strong> $${ticket.price}</p>
      <p>Show the QR code below at the entrance:</p>
      <img src="${ticket.qr_code}" alt="QR Code" />
    `;

    // Note: This assumes req.user.email is populated by your authMiddleware
    await sendEmail(req.user.email, 'Your Event Ticket Confirmation', html);

    // 6. Reduce event tickets count
    event.total_tickets -= 1;
    await event.save();

    res.status(201).json({
      message: 'Ticket booked successfully',
      ticket
    });

  } catch (err) {
    console.error('Booking Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// GET: View user's tickets
router.get('/my-tickets', authMiddleware('user'), async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      where: { userId: req.user.id },
      include: Event
    });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;