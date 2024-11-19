const express = require('express');
const path = require('path');
const app = express();

// Enable JSON parsing
app.use(express.json());

// Define your API routes FIRST
app.get('/api/questions', (req, res) => {
  // ... your questions API logic ...
});

// AFTER all API routes, serve static files
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// This should be the LAST route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});