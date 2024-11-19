import express from 'express';
import prisma from './config/database';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Get all relationship questions
app.get('/', async (req, res) => {
  try {
    const questions = await prisma.relationshipQuestions.findMany();
    console.log('Questions retrieved:', questions.length); // Debug log
    
    res.json({
      message: 'Questions retrieved successfully',
      questionCount: questions.length,
      questions: questions
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch questions',
      details: error instanceof Error ? error.message : String(error)
    });
  }
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server with error handling
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1);
});