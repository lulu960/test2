import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', { email, password });
    onSuccess(res.data.token);
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
      <button type="submit">Login</button>
    </form>
  );
}
