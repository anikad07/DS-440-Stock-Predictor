// backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();  // To load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000; // Default to port 5000

app.use(cors());

// Middleware
app.use(bodyParser.json());


// Endpoint to fetch stock data from Alpha Vantage API
app.get('/api/stock/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;  // Fetch the API key from the environment

  try {
    const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching stock data', error);
    res.status(500).send('Error fetching stock data');
  }
});

// Endpoint to perform sentiment analysis using DeepSeek API (OpenRouter)
app.post('/api/sentiment', async (req, res) => {
  const { text } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;  // Fetch the API key from the environment

  try {
    const response = await axios.post('https://api.openrouter.ai/deepseek/sentiment', {
      text: text
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    res.json(response.data); // Return sentiment analysis data
  } catch (error) {
    console.error('Error analyzing sentiment', error);
    res.status(500).send('Error analyzing sentiment');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
