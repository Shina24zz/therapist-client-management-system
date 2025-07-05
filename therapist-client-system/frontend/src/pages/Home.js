// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Therapist Client Management System</h1>
      <Link to="/therapists"><button style={{ margin: '10px' }}>Therapists</button></Link>
      <Link to="/clients"><button style={{ margin: '10px' }}>Clients</button></Link>
      <Link to="/sessions"><button style={{ margin: '10px' }}>Sessions</button></Link>
    </div>
  );
};

export default Home;
