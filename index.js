const express = require('express');
const app = express();

app.get('/weather/:location', (req, res) => {
  res.status(500).send('Not implemented');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});