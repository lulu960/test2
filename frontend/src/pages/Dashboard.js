import React, { useState } from 'react';
import axios from 'axios';

export default function Dashboard({ token, onLogout }) {
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState('');

  const upload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const res = await axios.post('/api/upload', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    setSummary(res.data.summary);
  };

  return (
    <div className="container">
      <button onClick={onLogout}>Logout</button>
      <form onSubmit={upload}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button type="submit">Upload</button>
      </form>
      {summary && <pre>{summary}</pre>}
    </div>
  );
}
