import React, { useState } from 'react';
import { Question } from '../types';
import QuestionCard from './QuestionCard';

interface QuestionFormProps {
  questions: Question[];
  onComplete: (answers: { [key: number]: string }) => void;
  userName: string;
}

export default function QuestionForm({ questions, onComplete, userName }: QuestionFormProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  
  const handleAnswer = (answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentIndex].id]: answer
    }));
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold">Welcome, {userName}!</h2>
        <p className="text-gray-600">Question {currentIndex + 1} of {questions.length}</p>
      </div>
      
      <QuestionCard
        question={questions[currentIndex]}
        onNext={handleAnswer}
      />
      
      <div className="mt-8">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}