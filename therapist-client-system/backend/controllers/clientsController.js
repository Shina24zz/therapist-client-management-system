const db = require('../db');

const getAllClients = (req, res) => {
  db.query('SELECT * FROM clients', (err, results) => {
    if (err) {
      console.error('Error fetching clients:', err);
      return res.status(500).send('Error fetching clients');
    }
    console.log('Fetched clients from DB:', results);
    res.json(results); // ✅ Already an array
  });
};

const createClient = (req, res) => {
  const { name, email, phone, regularity } = req.body;
  db.query(
    'INSERT INTO clients (name, email, phone, regularity) VALUES (?, ?, ?, ?)',
    [name, email, phone, regularity],
    (err, result) => {
      if (err) {
        console.error('Error adding client:', err);
        return res.status(500).send('Error adding client');
      }
      res.json({ id: result.insertId, name, email, phone, regularity });
    }
  );
};

const deleteClient = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM clients WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting client:', err);
      return res.status(500).send('Error deleting client');
    }
    res.sendStatus(204);
  });
};

module.exports = { getAllClients, createClient, deleteClient };
