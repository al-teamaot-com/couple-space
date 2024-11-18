<<<<<<< HEAD
import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';

// Initialize dotenv
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Type definitions
interface CustomError extends Error {
  status?: number;
}

// Middleware setup
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));

// Error handling middleware
app.use((err: CustomError, req: Request, res: Response, next: Function) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received. Closing HTTP server...');
  await prisma.$disconnect();
  process.exit(0);
});

// Health check endpoint
app.get('/api/health', (_req: any, res: any) => {
  res.json({ status: 'ok' });
});

// Create quiz session
app.post('/api/quiz-sessions', async (req: any, res: any) => {
  try {
    const { user1_answers } = req.body;
    if (!user1_answers) {
      return res.status(400).json({ error: 'user1_answers is required' });
    }
    
=======
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
>>>>>>> ef672681f4d84521cb047f6bfc47832cc9da5d67
    const result = await pool.query(
      'INSERT INTO quiz_sessions (user1_answers) VALUES ($1) RETURNING id',
      [JSON.stringify(user1_answers)]
    );
<<<<<<< HEAD
    console.log('Created session:', result.rows[0]);
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error creating quiz session:', error);
=======
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Database error:', error);
>>>>>>> ef672681f4d84521cb047f6bfc47832cc9da5d67
    res.status(500).json({ error: 'Failed to create quiz session' });
  }
});

<<<<<<< HEAD
// Get quiz session
app.get('/api/quiz-sessions/:id', async (req: any, res: any) => {
=======
// Get a quiz session
app.get('/api/quiz-sessions/:id', async (req, res) => {
>>>>>>> ef672681f4d84521cb047f6bfc47832cc9da5d67
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
<<<<<<< HEAD
    console.error('Error fetching quiz session:', error);
=======
    console.error('Database error:', error);
>>>>>>> ef672681f4d84521cb047f6bfc47832cc9da5d67
    res.status(500).json({ error: 'Failed to get quiz session' });
  }
});

<<<<<<< HEAD
// Catch all routes
app.get('*', (_req: any, res: any) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
=======
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
>>>>>>> ef672681f4d84521cb047f6bfc47832cc9da5d67
