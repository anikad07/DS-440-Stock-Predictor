from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    prices = data.get("closing_prices")

    if not prices or len(prices) < 60:
        return jsonify({"error": "Need at least 60 days of prices."}), 400

    # Normalize
    scaler = MinMaxScaler()
    scaled_prices = scaler.fit_transform(np.array(prices).reshape(-1, 1))

    # Prepare input for LSTM
    X = []
    for i in range(60 - 50):  # sequence length = 50
        X.append(scaled_prices[i:i+50])
    X = np.array(X)

    # LSTM model
    model = Sequential()
    model.add(LSTM(50, return_sequences=True, input_shape=(X.shape[1], 1)))
    model.add(LSTM(50))
    model.add(Dense(1))
    model.compile(optimizer='adam', loss='mean_squared_error')

    # Train (very quickly for test purposes)
    y = scaled_prices[50:]
    model.fit(X, y, epochs=10, batch_size=1, verbose=0)

    # Predict next 5, 10, 20 steps
    def forecast_next(n):
        seq = scaled_prices[-50:].reshape(1, 50, 1)
        preds = []
        for _ in range(n):
            next_price = model.predict(seq, verbose=0)[0][0]
            preds.append(next_price)
            seq = np.append(seq[:, 1:, :], [[[next_price]]], axis=1)
        return scaler.inverse_transform(np.array(preds).reshape(-1, 1)).flatten()[-1]

    return jsonify({
        "1_week": round(float(forecast_next(5)), 2),
        "2_weeks": round(float(forecast_next(10)), 2),
        "1_month": round(float(forecast_next(20)), 2)
    })

if __name__ == '__main__':
    app.run(port=8000)
