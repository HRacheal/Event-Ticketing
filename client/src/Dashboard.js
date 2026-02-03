import React, { useEffect, useState } from 'react';
import api from './components/api';

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's tickets when component mounts
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        // 1. Get the token saved during login
        const token = localStorage.getItem('token');

        // 2. Pass the token in the headers so the backend can identify the user
        const response = await api.get('/tickets', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setTickets(response.data);
      } catch (error) {
        console.error('Error fetching tickets:', error);
        // If unauthorized (token expired), you might want to redirect to login
        if (error.response && error.response.status === 401) {
          alert("Session expired. Please login again.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) return <p style={styles.container}>Loading your tickets...</p>;

  return (
    <div style={styles.container}>
      <h1>My Dashboard</h1>
      {tickets.length === 0 ? (
        <div style={styles.emptyState}>
          <p>You have no tickets yet.</p>
          <button onClick={() => window.location.href = '/'} style={styles.button}>
            Browse Events
          </button>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr style={styles.thRow}>
              <th style={styles.th}>Event Name</th>
              <th style={styles.th}>Ticket Type</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} style={styles.tr}>
                {/* Note: Sequelize usually returns the Event as a nested object */}
                <td style={styles.td}>
                  {ticket.Event ? ticket.Event.name : 'Unknown Event'}
                </td>
                <td style={styles.td}>{ticket.ticket_type}</td>
                <td style={styles.td}>Ksh {ticket.price}</td>
                <td style={styles.td}>
                   <span style={ticket.status === 'confirmed' ? styles.statusActive : styles.statusPending}>
                    {ticket.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// Improved styles
const styles = {
  container: {
    padding: '2rem',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '1rem',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  thRow: {
    backgroundColor: '#f4f4f4',
  },
  th: {
    borderBottom: '2px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  td: {
    padding: '12px',
    borderBottom: '1px solid #ddd',
  },
  tr: {
    backgroundColor: '#fff',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '3rem',
    padding: '2rem',
    background: '#f9f9f9',
    borderRadius: '8px'
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  statusActive: {
    color: 'green',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },
  statusPending: {
    color: 'orange',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
};

export default Dashboard;