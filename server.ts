import express from 'express';
import { createSession, saveAnswers, getSession } from './src/lib/db';

const app = express();
app.use(express.json());

// Create new session
app.post('/api/sessions', async (req, res) => {
  try {
    const session = await createSession();
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create session' });
  }
});

// Save answers
app.post('/api/sessions/:id/answers', async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;
    const session = await saveAnswers(id, answers);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save answers' });
  }
});

// Get session
app.get('/api/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const session = await getSession(id);
    res.json(session);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get session' });
  }
});
