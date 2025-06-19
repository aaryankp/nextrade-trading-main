import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from "cors";
import { Server } from "socket.io";
import http from "http";
import axios from "axios";

import { HoldingsModel } from './model/HoldingsModel.js';
import { PositionsModel } from './model/PositionsModel.js';
import { OrdersModel } from './model/OrdersModel.js';

import userRouter from './routes/userRoute.js';

const PORT = process.env.PORT || 3002;
const url = process.env.MONGO_URL;
const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY;

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins
  },
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Existing routes
app.use("/api/user", userRouter);

app.get('/allHoldings', async (req, res) => {
  try {
    const allHoldings = await HoldingsModel.find({});
    res.json(allHoldings);
  } catch (error) {
    console.error("Error fetching holdings:", error.message);
    res.status(500).json({ error: "Failed to fetch holdings" });
  }
});

app.get('/allPositions', async (req, res) => {
  try {
    const allPositions = await PositionsModel.find({});
    res.json(allPositions);
  } catch (error) {
    console.error("Error fetching positions:", error.message);
    res.status(500).json({ error: "Failed to fetch positions" });
  }
});

app.post('/newOrder', async (req, res) => {
  try {
    const newOrder = new OrdersModel({
      name: req.body.name,
      qty: req.body.qty,
      price: req.body.price,
      mode: req.body.mode,
    });

    await newOrder.save();
    res.send("Order Saved!");
  } catch (error) {
    console.error("Error saving order:", error.message);
    res.status(500).json({ error: "Failed to save order" });
  }
});

app.get('/allOrders', async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({});
    res.json(allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// New route to fetch historical data for candlestick chart
app.get("/api/stock/:symbol/history", async (req, res) => {
  const { symbol } = req.params;

  if (!FINNHUB_API_KEY) {
    return res.status(500).json({ error: "FINNHUB_API_KEY is not set" });
  }

  try {
    const response = await axios.get(
      `https://finnhub.io/api/v1/stock/candle?symbol=${symbol}&resolution=1&from=${Math.floor(
        Date.now() / 1000 - 3600 * 24
      )}&to=${Math.floor(Date.now() / 1000)}&token=${FINNHUB_API_KEY}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching historical data:", error.message);
    res.status(500).json({ error: "Failed to fetch historical data" });
  }
});

// WebSocket for real-time updates
let connectedClients = 0; // Track the number of connected clients

io.on("connection", (socket) => {
  connectedClients++;
  console.log(`Client connected: ${socket.id}, Total clients: ${connectedClients}`);

  socket.on("disconnect", () => {
    connectedClients--;
    console.log(`Client disconnected: ${socket.id}, Total clients: ${connectedClients}`);
  });
});

// Fetch real-time data once and broadcast to all clients
const fetchRealTimeData = async () => {
  if (!FINNHUB_API_KEY) {
    console.error("FINNHUB_API_KEY is not set. Skipping real-time data fetch.");
    return;
  }

  try {
    const symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "AMZN"]; // Example symbols
    const responses = await Promise.all(
      symbols.map((symbol) =>
        axios.get(
          `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${FINNHUB_API_KEY}`
        )
      )
    );

    const stocks = responses.map((response, index) => ({
      name: symbols[index],
      price: response.data.c, // Current price
      change: response.data.d, // Change in price
      percentChange: `${response.data.dp.toFixed(2)}%`, // Percentage change
      high: response.data.h, // High price of the day
      low: response.data.l, // Low price of the day
      open: response.data.o, // Open price of the day
      previousClose: response.data.pc, // Previous close price
      isDown: response.data.d < 0, // Determine if the price is down
    }));

    // Broadcast data to all connected clients
    io.emit("realTimeUpdates", { watchlist: stocks });
    console.log("Real-time data broadcasted:", stocks);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Rate limit exceeded. Skipping this fetch cycle.");
    } else {
      console.error("Error fetching real-time data:", error.message);
    }
  }
};

// Fetch data every 10 seconds (to stay within rate limits)
setInterval(fetchRealTimeData, 10000);

// Start the server
server.listen(PORT, async () => {
  console.log(`App Started on port ${PORT}`);
  try {
    await mongoose.connect(url);
    console.log("DB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
});
