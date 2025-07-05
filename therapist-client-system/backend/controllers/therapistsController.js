const db = require('../db');

// GET all therapists
const getAllTherapists = (req, res) => {
  db.query('SELECT * FROM therapists', (err, results) => {
    if (err) {
      console.error('Error fetching therapists:', err);
      return res.status(500).send('Error fetching therapists');
    }
    res.json(results);
  });
};

// POST new therapist
const createTherapist = (req, res) => {
  const { title, name, email, location, years_of_practice, availability } = req.body;
  db.query(
    'INSERT INTO therapists (title, name, email, location, years_of_practice, availability) VALUES (?, ?, ?, ?, ?, ?)',
    [title, name, email, location, years_of_practice, availability],
    (err, result) => {
      if (err) {
        console.error('Error adding therapist:', err);
        return res.status(500).send('Error adding therapist');
      }
      res.json({ id: result.insertId, title, name, email, location, years_of_practice, availability });
    }
  );
};

// DELETE therapist
const deleteTherapist = (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM therapists WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error deleting therapist:', err);
      return res.status(500).send('Error deleting therapist');
    }
    res.sendStatus(204);
  });
};

module.exports = { getAllTherapists, createTherapist, deleteTherapist };
