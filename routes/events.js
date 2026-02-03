const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const authMiddleware = require('../middleware/authMiddleware');

// 1. GET all events
// URL: http://localhost:5000/events
router.get('/', async (req, res) => {
  try {
    const events = await Event.findAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. GET a single event by ID (THIS WAS MISSING)
// URL: http://localhost:5000/events/1
router.get('/:id', async (req, res) => {
  try {
    // Find event by Primary Key (ID)
    const event = await Event.findByPk(req.params.id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found in database' });
    }
    
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST create event (Admin only)
router.post('/', authMiddleware('admin'), async (req, res) => {
  try {
    const { name, date, location, description, total_tickets } = req.body;

    const event = await Event.create({
      name,
      date,
      location,
      description,
      total_tickets
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;