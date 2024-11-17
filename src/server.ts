import express, { Request, Response, NextFunction } from 'express';
import { Pool, QueryResult } from 'pg';
import path from 'path';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

const app = express();

// Types
interface QuizSession {
  id: string;
  user1_answers: string;
  user2_answers?: string;
  created_at: Date;
}

interface QuizRequest extends Request {
  body: {
    user1_answers?: string[];
  }
}

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// Enable CORS for development
app.use((req: Request, res: Response, next: NextFunction) => {
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

// Test database connection
pool.query('SELECT NOW()', (err: Error | null, res: QueryResult<any>) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Database connected:', res.rows[0]);
  }
});

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Create quiz session
app.post('/api/quiz-sessions', async (req: QuizRequest, res: Response) => {
  try {
    const { user1_answers } = req.body;
    if (!user1_answers) {
      return res.status(400).json({ error: 'user1_answers is required' });
    }
    
    const result = await pool.query<QuizSession>(
      'INSERT INTO quiz_sessions (user1_answers) VALUES ($1) RETURNING id',
      [JSON.stringify(user1_answers)]
    );
    console.log('Created session:', result.rows[0]);
    res.json({ id: result.rows[0].id });
  } catch (error) {
    console.error('Error creating quiz session:', error);
    res.status(500).json({ error: 'Failed to create quiz session' });
  }
});

// Get quiz session
app.get('/api/quiz-sessions/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query<QuizSession>(
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
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Static files served from:', path.join(__dirname, '../dist'));
  console.log('Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');
});

export default app;
