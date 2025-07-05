const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// ✅ Existing
app.use('/api/therapists', require('./routes/therapists'));

// ✅ ADD THIS LINE
app.use('/api/clients', require('./routes/clients'));

app.use('/api/sessions', require('./routes/sessions'));


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
