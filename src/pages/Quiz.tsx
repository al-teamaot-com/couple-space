import * as React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import { questions } from '../data/questions'

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  // Create session when component mounts
  useEffect(() => {
    const createNewSession = async () => {
      try {
        const response = await fetch('/api/sessions', {
          method: 'POST'
        });
        const data = await response.json();
        setSessionId(data.id);
      } catch (error) {
        console.error('Failed to create session:', error);
      }
    };
    createNewSession();
  }, []);

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz</h1>
        <p>Loading questions...</p>
      </div>
    );
  }

  const handleAnswer = async (answerValue: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerValue;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Save answers before navigating
      try {
        await fetch(`/api/sessions/${sessionId}/answers`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ answers: newAnswers })
        });
        navigate(`/results/${sessionId}`);
      } catch (error) {
        console.error('Failed to save answers:', error);
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
        
        <QuestionCard 
          question={questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          selectedAnswer={answers[currentQuestionIndex]}
        />
      </div>
    </div>
  );
};

export default Quiz;