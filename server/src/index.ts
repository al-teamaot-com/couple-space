import express from 'express';
import path from 'path';

const app = express();

// Enable JSON parsing
app.use(express.json());

// Debug logging
console.log('Static path:', path.join(__dirname, '../../client/build'));

// API routes first
app.get('/api/questions', (req, res) => {
  // ... your questions API logic ...
});

// Serve static files from React app
app.use(express.static(path.join(__dirname, '../../client/build')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  console.log('Serving index.html from:', path.join(__dirname, '../../client/build/index.html'));
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});