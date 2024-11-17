import express from 'express';
import { Pool } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('dist'));

// Enable CORS for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Create quiz session
app.post('/api/quiz-sessions', async (req, res) => {
  console.log('Received request to create quiz session:', req.body);
  try {
    const { user1_answers } = req.body;
    const result = await pool.query(
      'INSERT INTO quiz_sessions (user1_answers) VALUES ($1) RETURNING id',
      [JSON.stringify(user1_answers)]
    );
    console.log('Created quiz session:', result.rows[0]);
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error creating quiz session:', error);
    res.status(500).json({ error: 'Failed to create quiz session' });
  }
});

// Get quiz session
app.get('/api/quiz-sessions/:id', async (req, res) => {
  console.log('Fetching quiz session:', req.params.id);
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM quiz_sessions WHERE id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching quiz session:', error);
    res.status(500).json({ error: 'Failed to get quiz session' });
  }
});

// Catch all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
});

export default app;
