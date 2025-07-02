import React, { useState } from 'react';
import axios from 'axios';

export default function Register({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    await axios.post('/api/auth/register', { email, password });
    onSuccess();
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
