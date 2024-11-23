// server.js
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

let petData = { name: "Fluffy", hunger: 100, happiness: 100, health: 100 };

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Get pet data
app.get('/pet', (req, res) => {
  res.json(petData);
});

// Save pet data
app.post('/pet', (req, res) => {
  const { hunger, happiness, health } = req.body;
  petData = { ...petData, hunger, happiness, health };
  res.json({ message: "Pet data saved successfully!" });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
