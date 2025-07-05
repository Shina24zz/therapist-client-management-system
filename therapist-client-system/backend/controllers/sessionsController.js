const db = require('../db');

// GET all sessions
const getAllSessions = (req, res) => {
  const query = `
    SELECT sessions.id, therapists.name AS therapist_name, clients.name AS client_name, 
           sessions.date, sessions.length, sessions.notes
    FROM sessions
    JOIN therapists ON sessions.therapist_id = therapists.id
    JOIN clients ON sessions.client_id = clients.id
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).send('Error fetching sessions');
    res.json(results);
  });
};

// POST new session
const createSession = (req, res) => {
  const { therapist_id, client_id, date, length, notes } = req.body;
  const query = `
    INSERT INTO sessions (therapist_id, client_id, date, length, notes)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(query, [therapist_id, client_id, date, length, notes], (err, result) => {
    if (err) return res.status(500).send('Error creating session');
    res.json({ id: result.insertId, therapist_id, client_id, date, length, notes });
  });
};

// DELETE session
const deleteSession = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM sessions WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).send('Error deleting session');
    res.sendStatus(204);
  });
};

module.exports = { getAllSessions, createSession, deleteSession };
