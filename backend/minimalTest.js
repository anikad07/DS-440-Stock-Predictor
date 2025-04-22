const express = require('express');
const app = express();
const port = 5000;

app.get('/api/test', (req, res) => {
  res.json({ message: 'Minimal test working!' });
});

app.listen(port, () => {
  console.log(`Minimal server running at http://localhost:${port}`);
});
