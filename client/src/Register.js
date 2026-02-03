import React, { useState } from 'react';
import api from './components/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState(''); // Added name state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. Point to /register, not /login
      // 2. Include the 'name' field
      await api.post('/auth/register', { name, email, password });
      
      alert('Registration successful! Please login.');
      navigate('/login'); // Redirect to login page
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" value={name}
               onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email}
               onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
               onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default Register;