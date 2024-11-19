import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import { questions } from '../data/questions'
import QuestionForm from '../components/QuestionForm'

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [userName, setUserName] = useState('');

  const handleAnswer = async (value: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = value;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      try {
        // Save answers to database
        const response = await fetch('/api/sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers: newAnswers }),
        });

        if (!response.ok) {
          throw new Error('Failed to save answers');
        }

        const data = await response.json();
        
        // Navigate to results with both answers and session ID
        navigate('/results', { 
          state: { 
            answers: newAnswers,
            completed: true,
            sessionId: data.id
          }
        });
      } catch (error) {
        console.error('Failed to save quiz results:', error);
        // Still navigate to results even if save fails
        navigate('/results', { 
          state: { 
            answers: newAnswers,
            completed: true
          }
        });
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Quiz</h1>
        <div className="mb-4 text-center text-gray-600">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        
        <QuestionForm
          question={questions[currentQuestionIndex]}
          onNext={handleAnswer}
          totalQuestions={questions.length}
          userName={userName}
        />
      </div>
    </div>
  );
};

export default Quiz;