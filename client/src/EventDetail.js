import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from './components/api';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [ticketType, setTicketType] = useState('regular');
  const [price, setPrice] = useState(50); // example
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/events/${id}`)
      .then(res => setEvent(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleBooking = async () => {
    try {
      const res = await api.post('/tickets/book', {
        eventId: id,
        ticket_type: ticketType,
        price
      });
      setTicket(res.data.ticket);
      alert('Ticket booked successfully!');
    } catch (err) {
      alert(err.response.data.message || 'Booking failed');
    }
  };

  if (!event) return <p>Loading...</p>;

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.date} | {event.location}</p>
      <p>{event.description}</p>
      <p>Tickets Left: {event.total_tickets}</p>

      <h3>Book Ticket</h3>
      <select value={ticketType} onChange={e => setTicketType(e.target.value)}>
        <option value="regular">Regular</option>
        <option value="VIP">VIP</option>
      </select>
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} />

      <button onClick={handleBooking}>Book Ticket</button>

      {ticket && (
        <div>
          <h3>Your Ticket</h3>
          <p>Type: {ticket.ticket_type}</p>
          <p>Price: ${ticket.price}</p>
          <img src={ticket.qr_code} alt="QR Code" />
        </div>
      )}
    </div>
  );
}

export default EventDetail;
