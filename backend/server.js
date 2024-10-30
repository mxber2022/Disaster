// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// In-memory array to store user wallet addresses and locations
let locations = [];

// API Endpoints
app.get("/api/locations", (req, res) => {
  // Return all stored locations and wallet addresses
  res.json(locations);
});

app.post("/api/locations", (req, res) => {
  // Add new wallet address and location to the array
  const { walletAddress, lat, lng } = req.body;

  // Validate the input
  if (!walletAddress || !lat || !lng) {
    return res
      .status(400)
      .json({ error: "Wallet address, latitude, and longitude are required" });
  }

  const newLocation = { walletAddress, lat, lng };
  locations.push(newLocation);
  res.status(201).json(newLocation);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
