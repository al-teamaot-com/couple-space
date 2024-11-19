import express from 'express';
import prisma from './config/database';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Get all relationship questions
app.get('/', async (req, res) => {
  try {
    const questions = await prisma.$queryRaw`
      SELECT id, content, type, created_at, category_id 
      FROM "RelationshipQuestions"
    `;
    
    res.json({
      message: 'Questions retrieved successfully',
      questionCount: questions.length,
      questions: questions
    });
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ 
      error: 'Failed to fetch questions',
      details: error
    });
  }
});

// Optional: Get questions by category
app.get('/category/:categoryId', async (req, res) => {
  try {
    const questions = await prisma.$queryRaw`
      SELECT id, content, type, created_at, category_id 
      FROM "RelationshipQuestions"
      WHERE category_id = ${req.params.categoryId}
    `;
    
    res.json({
      questions: questions
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions by category' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});