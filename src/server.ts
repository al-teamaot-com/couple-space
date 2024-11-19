import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import path from 'path';
import { QUIZ_QUESTIONS, LIKERT_OPTIONS } from './constants';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

// 1. Essential Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://couple-space-app-20ff7d1c0153.herokuapp.com'],
  credentials: true
}));

// 2. API Routes
app.get('/api/quiz-questions', async (_req: Request, res: Response) => {
  console.log('Quiz questions endpoint hit');
  
  try {
    console.log('Attempting to fetch questions...');
    const questions = await prisma.relationshipQuestions.findMany({
      include: {
        category: true
      }
    });
    
    console.log(`Found ${questions.length} questions`);
    
    const response = {
      success: true,
      questions: questions.length ? questions : QUIZ_QUESTIONS,
      options: LIKERT_OPTIONS
    };
    
    return res.status(200).json(response);
    
  } catch (error) {
    console.error('Database error:', error);
    return res.status(200).json({
      success: false,
      questions: QUIZ_QUESTIONS,
      options: LIKERT_OPTIONS,
      error: 'Using fallback questions'
    });
  }
});

// 3. Static file serving
app.use(express.static(path.join(__dirname, '../dist')));

// 4. Catch-all route for SPA
app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
