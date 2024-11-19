import React, { useState } from 'react'
import QuestionForm from './components/QuestionForm'
import { Question } from './types'

const sampleQuestions: Question[] = [
  {
    id: 1,
    text: "How was your day?",
    category: "daily",
    intensity: 1
  }
];

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleAnswer = (answer: string) => {
    console.log(`Answer: ${answer}`);
    // Add your answer handling logic here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <QuestionForm
        question={sampleQuestions[currentQuestionIndex]}
        onNext={handleAnswer}
        totalQuestions={sampleQuestions.length}
      />
    </div>
  )
}

export default App