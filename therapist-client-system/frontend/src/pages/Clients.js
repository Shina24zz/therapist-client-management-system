import React, { useState, useEffect } from 'react';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newClient, setNewClient] = useState({
    name: '',
    email: '',
    phone: '',
    regularity: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/clients')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched clients from DB:', data);
        if (Array.isArray(data)) {
          setClients(data);
        } else {
          console.error('Client data is not an array');
        }
      })
      .catch(err => console.error('Error fetching clients:', err));
  }, []);

  const handleChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    fetch('http://localhost:3001/api/clients', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newClient)
    })
      .then(res => res.json())
      .then(data => {
        setClients([...clients, data]);
        setNewClient({ name: '', email: '', phone: '', regularity: '' });
      })
      .catch(err => console.error('Error adding client:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/clients/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setClients(clients.filter(c => c.id !== id));
      })
      .catch(err => console.error('Error deleting client:', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Client Dashboard</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Regularity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(c => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.regularity}</td>
              <td>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Client</h3>
      <input name="name" placeholder="Name" value={newClient.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={newClient.email} onChange={handleChange} />
      <input name="phone" placeholder="Phone" value={newClient.phone} onChange={handleChange} />
      <select name="regularity" value={newClient.regularity} onChange={handleChange}>
        <option value="">Select Regularity</option>
        <option value="WEEKLY">WEEKLY</option>
        <option value="BI-WEEKLY">BI-WEEKLY</option>
        <option value="MONTHLY">MONTHLY</option>
      </select>
      <button onClick={handleAdd} style={{ marginLeft: '1rem' }}>Add</button>
    </div>
  );
};

export default Clients;
