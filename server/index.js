const express = require('express');
const path = require('path');
const app = express();

// ... your existing API routes ...

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});