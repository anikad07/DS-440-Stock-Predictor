const express = require('express');
const app = express();
const port = 3005;

app.get('/api/test', (req, res) => {
  console.log("Endpoint hit!");
  res.json({ message: 'Hello world!' });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
