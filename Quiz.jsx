import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestions } from '@/services/databaseService';
import { QuestionCard } from './QuestionCard';
import { AnswerOptions } from './AnswerOptions';
import '@/styles/quiz.css';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        setLoading(true);
        console.log('Fetching questions...');
        const fetchedQuestions = await getQuestions();
        console.log('Fetched questions:', fetchedQuestions);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError('Failed to load questions. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    
    fetchQuestions();
  }, []);

  if (loading) return <div>Loading questions...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!questions.length) return <div>No questions available.</div>;

  const currentQuestion = questions[currentIndex];
  
  return (
    // ... rest of your component
  );
}