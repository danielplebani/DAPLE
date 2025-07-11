import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // per reindirizzare

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Invio login con:', email, password); // 👈 debug

    try {
      const res = await api.post('/auth/login', { email, password });
      console.log('Risposta login:', res.data); // 👈 debug

      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Errore login:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Errore login');
    }
  };


  return (
    <div className="login-form m-5">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className='p-2'>Password:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
