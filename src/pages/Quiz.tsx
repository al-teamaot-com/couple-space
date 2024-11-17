import * as React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import QuestionCard from '../components/QuestionCard'
import { questions } from '../data/questions'

const Quiz: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz</h1>
        <p>Loading questions...</p>
      </div>
    );
  }

  const handleAnswer = (answerValue: number) => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerValue;
    setAnswers(newAnswers);

    // Move to next question or finish
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Navigate to results with answers
      navigate('/results', { 
        state: { 
          answers: newAnswers,
          completed: true
        }
      });
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