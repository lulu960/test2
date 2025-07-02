import React, { useState } from 'react';
import Register from './Register.js';
import Login from './Login.js';
import Dashboard from './Dashboard.js';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [page, setPage] = useState(token ? 'dashboard' : 'login');

  const handleLogin = (tok) => {
    localStorage.setItem('token', tok);
    setToken(tok);
    setPage('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setPage('login');
  };

  return (
    <div>
      {page === 'register' && <Register onSuccess={() => setPage('login')} />}
      {page === 'login' && <Login onSuccess={handleLogin} />}
      {page === 'dashboard' && <Dashboard token={token} onLogout={handleLogout} />}
      {page !== 'dashboard' && (
        <button onClick={() => setPage(page === 'login' ? 'register' : 'login')}>
          {page === 'login' ? 'Go to Register' : 'Go to Login'}
        </button>
      )}
    </div>
  );
}
