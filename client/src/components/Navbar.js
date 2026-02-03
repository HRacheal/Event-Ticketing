import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <Link to="/" style={styles.logoLink}>🎟️ EventTicketing</Link>
      </div>
      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/dashboard" style={styles.link}>Dashboard</Link></li>
        <li><Link to="/admin" style={styles.link}>Admin</Link></li>
        <li><Link to="/login" style={styles.link}>Login</Link></li>
        <li><Link to="/register" style={styles.link}>Register</Link></li>
      </ul>
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#282c34',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold'
  },
  logoLink: {
    color: '#61dafb',
    textDecoration: 'none'
  },
  navLinks: {
    listStyle: 'none',
    display: 'flex',
    gap: '20px',
    margin: 0,
    padding: 0
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '1rem',
    transition: 'color 0.3s'
  }
};

export default Navbar;