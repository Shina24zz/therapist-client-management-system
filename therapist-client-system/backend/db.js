// backend/db.js
const mysql = require('mysql2');

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'your-db-host',
  user: 'your-db-user',
  password: 'your-db-password',
  database: 'your-db-name'
});

module.exports = connection;


connection.connect((err) => {
  if (err) {
    console.error('❌ Error connecting to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL database');
});

module.exports = connection;
