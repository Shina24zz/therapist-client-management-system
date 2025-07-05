import React, { useState, useEffect } from 'react';

const Sessions = () => {
  const [sessions, setSessions] = useState([]);
  const [therapists, setTherapists] = useState([]);
  const [clients, setClients] = useState([]);
  const [newSession, setNewSession] = useState({
    therapist_id: '',
    client_id: '',
    date: '',
    length: '',
    notes: ''
  });

  // Load sessions, therapists, clients
  useEffect(() => {
    fetch('http://localhost:3001/api/sessions')
      .then(res => res.json())
      .then(data => setSessions(data))
      .catch(err => console.error("Error loading sessions:", err));

    fetch('http://localhost:3001/api/therapists')
      .then(res => res.json())
      .then(data => setTherapists(data))
      .catch(err => console.error("Error loading therapists:", err));

    fetch('http://localhost:3001/api/clients')
      .then(res => res.json())
      .then(data => setClients(data))
      .catch(err => console.error("Error loading clients:", err));
  }, []);

  const handleChange = (e) => {
    setNewSession({ ...newSession, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    fetch('http://localhost:3001/api/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSession)
    })
      .then(res => res.json())
      .then(data => {
        setSessions([...sessions, data]);
        setNewSession({ therapist_id: '', client_id: '', date: '', length: '', notes: '' });
      })
      .catch(err => console.error("Error adding session:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/sessions/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setSessions(sessions.filter(s => s.id !== id));
      })
      .catch(err => console.error("Error deleting session:", err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Sessions Dashboard</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>Therapist</th>
            <th>Client</th>
            <th>Date</th>
            <th>Length</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map(s => (
            <tr key={s.id}>
              <td>{s.therapist_id}</td>
              <td>{s.client_id}</td>
              <td>{s.date}</td>
              <td>{s.length} mins</td>
              <td>{s.notes}</td>
              <td><button onClick={() => handleDelete(s.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Session</h3>
      <select name="therapist_id" value={newSession.therapist_id} onChange={handleChange}>
        <option value="">Select Therapist</option>
        {therapists.map(t => (
          <option key={t.id} value={t.id}>{t.name}</option>
        ))}
      </select>

      <select name="client_id" value={newSession.client_id} onChange={handleChange}>
        <option value="">Select Client</option>
        {clients.map(c => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input name="date" type="date" value={newSession.date} onChange={handleChange} />
      <input name="length" type="number" placeholder="Length (min)" value={newSession.length} onChange={handleChange} />
      <input name="notes" placeholder="Notes" value={newSession.notes} onChange={handleChange} />

      <button onClick={handleAdd} style={{ marginLeft: '1rem' }}>Add</button>
    </div>
  );
};

export default Sessions;
