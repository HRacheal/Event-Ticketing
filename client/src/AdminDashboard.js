import React, { useEffect, useState } from 'react';
import api from './components/api';

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    location: '',
    description: '',
    total_tickets: 0
  });

  const fetchEvents = () => {
    api.get('/events')
      .then(res => setEvents(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreate = async () => {
    try {
      await api.post('/events', newEvent);
      alert('Event created!');
      setNewEvent({ name:'', date:'', location:'', description:'', total_tickets:0 });
      fetchEvents();
    } catch (err) {
      alert(err.response.data.message || 'Error creating event');
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      alert('Event deleted!');
      fetchEvents();
    } catch (err) {
      alert(err.response.data.message || 'Error deleting event');
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      
      <h2>Create Event</h2>
      <input placeholder="Name" value={newEvent.name} 
             onChange={e => setNewEvent({...newEvent, name:e.target.value})} />
      <input placeholder="Date" value={newEvent.date} 
             onChange={e => setNewEvent({...newEvent, date:e.target.value})} />
      <input placeholder="Location" value={newEvent.location} 
             onChange={e => setNewEvent({...newEvent, location:e.target.value})} />
      <input placeholder="Description" value={newEvent.description} 
             onChange={e => setNewEvent({...newEvent, description:e.target.value})} />
      <input placeholder="Total Tickets" type="number" value={newEvent.total_tickets} 
             onChange={e => setNewEvent({...newEvent, total_tickets:e.target.value})} />
      <button onClick={handleCreate}>Create Event</button>

      <h2>All Events</h2>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            {event.name} - {event.date} - Tickets Left: {event.total_tickets} 
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
