// src/pages/Therapists.js
import React, { useState, useEffect } from 'react';

const Therapists = () => {
  const [therapists, setTherapists] = useState([]);
  const [newTherapist, setNewTherapist] = useState({
    title: '',
    name: '',
    email: '',
    location: '',
    yearsOfPractice: '',
    availability: ''
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/therapists')
      .then(res => res.json())
      .then(data => {
        console.log('Fetched from DB:', data);
        if (Array.isArray(data)) {
          setTherapists(data);
        } else {
          console.error('Data is not an array:', data);
          setTherapists([]);
        }
      })
      .catch(err => console.error('Error loading therapists:', err));
  }, []);

  const handleChange = (e) => {
    setNewTherapist({ ...newTherapist, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    fetch('http://localhost:3001/api/therapists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newTherapist,
        years_of_practice: parseInt(newTherapist.yearsOfPractice)
      })
    })
      .then(res => res.json())
      .then(data => {
        setTherapists([...therapists, data]);
        setNewTherapist({
          title: '',
          name: '',
          email: '',
          location: '',
          yearsOfPractice: '',
          availability: ''
        });
      })
      .catch(err => console.error('Error adding therapist:', err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/api/therapists/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setTherapists(therapists.filter(t => t.id !== id));
      })
      .catch(err => console.error('Error deleting therapist:', err));
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Therapist Dashboard (Connected to DB)</h2>
      <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: '2rem' }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Name</th>
            <th>Email</th>
            <th>Location</th>
            <th>Years of Practice</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(therapists) && therapists.map(t => (
            <tr key={t.id}>
              <td>{t.title}</td>
              <td>{t.name}</td>
              <td>{t.email}</td>
              <td>{t.location}</td>
              <td>{t.years_of_practice}</td>
              <td>{t.availability}</td>
              <td>
                <button onClick={() => handleDelete(t.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Therapist</h3>
      <input name="title" placeholder="Title" value={newTherapist.title} onChange={handleChange} />
      <input name="name" placeholder="Name" value={newTherapist.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={newTherapist.email} onChange={handleChange} />
      <input name="location" placeholder="Location" value={newTherapist.location} onChange={handleChange} />
      <input name="yearsOfPractice" placeholder="Years of Practice" value={newTherapist.yearsOfPractice} onChange={handleChange} />
      <select name="availability" value={newTherapist.availability} onChange={handleChange}>
        <option value="">Select Availability</option>
        <option value="TAKING CLIENTS">TAKING CLIENTS</option>
        <option value="NOT TAKING CLIENTS">NOT TAKING CLIENTS</option>
      </select>
      <button onClick={handleAdd} style={{ marginLeft: '1rem' }}>Add</button>
    </div>
  );
};

export default Therapists;