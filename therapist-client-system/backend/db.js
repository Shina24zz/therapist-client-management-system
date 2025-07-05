// backend/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'webcourse.cs.nuim.ie',
  user: 'u240306',
  password: 'aGhu4mae7HeiYap2',
  database: 'cs230_u240306'
});

connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = connection;
