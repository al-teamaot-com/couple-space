import * as React from 'react'
import { useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import { questions } from '../data/questions'

const Quiz: React.FC = () => {
  console.log('Quiz component rendering with questions:', questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  if (!questions || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">Quiz</h1>
        <p>Loading questions...</p>
      </div>
    );
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Handle quiz completion
      console.log('Quiz completed!');
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
          onNext={handleNext}
        />
      </div>
    </div>
  );
};

export default Quiz;