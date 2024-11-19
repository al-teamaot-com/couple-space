import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all relationship questions
app.get('/', async (req, res) => {
  try {
    const questions = await prisma.relationshipQuestions.findMany({
      select: {
        id: true,
        content: true,
        type: true,
        created_at: true,
        category_id: true
      }
    });
    
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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});