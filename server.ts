import express from 'express';
import { Pool } from 'pg';
import path from 'path';

const app = express();
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Create a new quiz session
app.post('/api/quiz-sessions', async (req, res) => {
  try {
    const { user1_answers } = req.body;
    const result = await pool.query(
      'INSERT INTO quiz_sessions (user1_answers) VALUES ($1) RETURNING id',
      [JSON.stringify(user1_answers)]
    );
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to create quiz session' });
  }
});

// Get a quiz session
app.get('/api/quiz-sessions/:id', async (req, res) => {
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
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to get quiz session' });
  }
});

// Save partner's answers
app.post('/api/quiz-sessions/:id/partner', async (req, res) => {
  try {
    const { id } = req.params;
    const { user2_answers } = req.body;
    const result = await pool.query(
      'UPDATE quiz_sessions SET user2_answers = $1, completed_at = NOW() WHERE id = $2 RETURNING *',
      [JSON.stringify(user2_answers), id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Session not found' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Failed to save partner answers' });
  }
});

// Catch all other routes and return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
