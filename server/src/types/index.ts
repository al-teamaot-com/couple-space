import express from 'express';
import cors from './middleware/cors';
import prisma from './config/database';
import { CreateQuestionRequest, ErrorResponse, SuccessResponse } from './types';

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors);

// Basic health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Sessions routes
app.post('/api/sessions', async (req, res) => {
  try {
    const session = await prisma.session.create({
      data: {}
    });
    const response: SuccessResponse<typeof session> = { data: session };
    res.json(response);
  } catch (error) {
    const response: ErrorResponse = { error: 'Failed to create session' };
    res.status(500).json(response);
  }
});

app.get('/api/sessions/:id', async (req, res) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: { questions: true }
    });
    if (!session) {
      const response: ErrorResponse = { error: 'Session not found' };
      return res.status(404).json(response);
    }
    const response: SuccessResponse<typeof session> = { data: session };
    res.json(response);
  } catch (error) {
    const response: ErrorResponse = { error: 'Failed to fetch session' };
    res.status(500).json(response);
  }
});

// Questions routes
app.post('/api/sessions/:sessionId/questions', async (req, res) => {
  try {
    const { content } = req.body as CreateQuestionRequest;
    const question = await prisma.question.create({
      data: {
        content,
        sessionId: req.params.sessionId
      }
    });
    const response: SuccessResponse<typeof question> = { data: question };
    res.json(response);
  } catch (error) {
    const response: ErrorResponse = { error: 'Failed to create question' };
    res.status(500).json(response);
  }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  const response: ErrorResponse = { error: 'Something broke!' };
  res.status(500).json(response);
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  prisma.$disconnect();
  process.exit(0);
});