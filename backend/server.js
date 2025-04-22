const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3005;

app.use(cors());
app.use(bodyParser.json());

// ✅ Test route
app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});

// ✅ Main API route
app.get('/api/stock-sentiment/:symbol', async (req, res) => {
  const { symbol } = req.params;
  const alphaKey = 'W5WL0FILYWC0BL4P';
  const openRouterKey = process.env.OPENROUTER_API_KEY;

  try {
    // 🟡 1. Fetch stock data
    const stockResponse = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${alphaKey}`
    );

    const stockData = stockResponse.data["Time Series (Daily)"];
    if (!stockData) {
      return res.status(400).json({ error: "Invalid symbol or API limit reached." });
    }

    const dates = Object.keys(stockData).slice(0, 60).reverse(); // last 60 days
    const prices = dates.map(date => parseFloat(stockData[date]["4. close"]));
    const latestDate = dates[dates.length - 1];
    const latestClose = prices[prices.length - 1];

    // 🟡 2. Get sentiment via OpenRouter
    const sentimentPrompt = `The latest closing price of ${symbol} is ${latestClose}. Analyze the sentiment (Positive, Neutral, or Negative). Respond only with one word.`;

    const sentimentResponse = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openai/gpt-4o',
        max_tokens: 500,
        messages: [
          {
            role: 'system',
            content: 'You are a sentiment analysis assistant. Respond with Positive, Neutral, or Negative only.'
          },
          { role: 'user', content: sentimentPrompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${openRouterKey}`,
          'HTTP-Referer': 'http://localhost:3005',
          'X-Title': 'Stock Market Forecasting App',
          'Content-Type': 'application/json'
        }
      }
    );

    const sentiment = sentimentResponse.data.choices[0].message.content.trim();

    // 🟡 3. Get forecast from local LSTM model
    const predictionResponse = await axios.post('http://localhost:8000/predict', {
      symbol,
      closing_prices: prices
    });

    let forecast = predictionResponse.data;

    // 🟡 4. Adjust forecast based on sentiment
    let adjustment = 1.0;
    if (sentiment.toLowerCase() === "positive") adjustment = 1.01;
    else if (sentiment.toLowerCase() === "negative") adjustment = 0.99;

    Object.keys(forecast).forEach(key => {
      forecast[key] = parseFloat((forecast[key] * adjustment).toFixed(2));
    });

    // 🟡 5. Generate recommendation
    const futurePrice = forecast["1_month"];
    const diff = ((futurePrice - latestClose) / latestClose) * 100;
    let recommendation = "Hold";
    if (diff > 3) recommendation = "Buy";
    else if (diff < -3) recommendation = "Sell";

    // ✅ Final response
    res.json({
      symbol,
      latestDate,
      latestClose,
      sentiment,
      forecast,
      recommendation
    });

  } catch (error) {
    console.error("❌ Error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Internal Server Error",
      details: error.message || "Unknown error"
    });
  }
});

// 🚀 Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});