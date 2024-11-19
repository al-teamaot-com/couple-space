const express = require('express');
const path = require('path');
const app = express();

// Enable JSON parsing
app.use(express.json());

// Add debug logging
console.log('Static path:', path.join(__dirname, '..', 'client', 'build'));
console.log('Current directory:', __dirname);

// Define your API routes
app.get('/api/questions', (req, res) => {
  // ... your questions API logic ...
});

// Serve static files
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Debug route to check if catch-all is reached
app.get('*', (req, res) => {
  console.log('Catch-all route hit, attempting to serve:', path.join(__dirname, '..', 'client', 'build', 'index.html'));
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});