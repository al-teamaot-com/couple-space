import * as React from 'react'
import { useState } from 'react'
import QuestionCard from '../components/QuestionCard'
import { questions } from '../data/questions'

const Quiz: React.FC = () => {
  console.log('Quiz component rendering...');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleNext = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Quiz</h1>
        
        {currentQuestionIndex < questions.length ? (
          <QuestionCard 
            question={questions[currentQuestionIndex]} 
            onNext={handleNext}
          />
        ) : (
          <div className="text-center">
            <h2 className="text-2xl mb-4">Quiz Complete!</h2>
            {/* Add navigation to results here if needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;