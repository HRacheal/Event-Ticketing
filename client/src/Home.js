import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from './components/api';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get('/events');
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Helper to format the long date string into something readable
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) return <div style={styles.loader}> Loading amazing experiences...</div>;

  return (
    <div style={styles.pageBackground}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <h1 style={styles.heroTitle}>Discover Your Next Adventure</h1>
        <p style={styles.heroSubtitle}>Book tickets for the most exclusive events in town.</p>
      </section>

      <div style={styles.container}>
        <div style={styles.grid}>
          {events.length === 0 ? (
            <div style={styles.noEvents}>No events available right now. Check back soon!</div>
          ) : (
            events.map(event => (
              <div key={event.id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <span style={styles.categoryBadge}>Live Event</span>
                </div>
                
                <div style={styles.cardBody}>
                  <h3 style={styles.eventTitle}>{event.name}</h3>
                  
                  <div style={styles.detailRow}>
                    <span style={styles.icon}></span>
                    <span style={styles.detailText}>{formatDate(event.date)}</span>
                  </div>
                  
                  <div style={styles.detailRow}>
                    <span style={styles.icon}></span>
                    <span style={styles.detailText}>{event.location}</span>
                  </div>

                  <div style={styles.ticketSection}>
                    <div style={styles.ticketCount}>
                      <strong>{event.total_tickets}</strong> tickets left
                    </div>
                    {/* Progress Bar for visual urgency */}
                    <div style={styles.progressBar}>
                      <div style={{...styles.progressFill, width: `${(event.total_tickets / 500) * 100}%`}}></div>
                    </div>
                  </div>
                  
                  <Link to={`/event/${event.id}`} style={styles.button}>
                    View Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    backgroundColor: '#f4f7f6',
    minHeight: '100vh',
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
  },
  hero: {
    background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
    color: '#fff',
    padding: '80px 20px',
    textAlign: 'center',
    marginBottom: '40px',
  },
  heroTitle: {
    fontSize: '2.8rem',
    fontWeight: '800',
    margin: '0 0 15px 0',
    letterSpacing: '-1px',
  },
  heroSubtitle: {
    fontSize: '1.2rem',
    opacity: '0.9',
    fontWeight: '300',
  },
  container: {
    padding: '0 20px 60px 20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '20px',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s ease',
    border: '1px solid #edf2f7',
  },
  cardHeader: {
    height: '10px',
    background: '#3b82f6',
  },
  categoryBadge: {
    position: 'relative',
    top: '20px',
    left: '20px',
    backgroundColor: '#eff6ff',
    color: '#1d4ed8',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  cardBody: {
    padding: '30px 25px 25px 25px',
  },
  eventTitle: {
    fontSize: '1.5rem',
    color: '#1a202c',
    margin: '10px 0 20px 0',
    fontWeight: '700',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '12px',
  },
  icon: {
    marginRight: '12px',
    fontSize: '1.1rem',
  },
  detailText: {
    color: '#4a5568',
    fontSize: '0.95rem',
  },
  ticketSection: {
    marginTop: '25px',
    marginBottom: '25px',
  },
  ticketCount: {
    fontSize: '0.9rem',
    color: '#718096',
    marginBottom: '8px',
  },
  progressBar: {
    height: '6px',
    backgroundColor: '#edf2f7',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10b981',
    borderRadius: '3px',
  },
  button: {
    display: 'block',
    textAlign: 'center',
    padding: '14px',
    backgroundColor: '#1e293b',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '12px',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'all 0.2s ease',
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
    color: '#64748b',
  },
  noEvents: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    color: '#718096',
    fontSize: '1.1rem',
  }
};

export default Home;