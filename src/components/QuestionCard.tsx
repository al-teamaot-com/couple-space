import * as React from 'react'
import { Question } from '../types'

interface Props {
  question: Question;
  onAnswer: (value: number) => void;
  selectedAnswer?: number;
}

const QuestionCard: React.FC<Props> = ({ question, onAnswer, selectedAnswer }) => {
  const options = [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Neutral" },
    { value: 4, label: "Agree" },
    { value: 5, label: "Strongly Agree" }
  ];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-4">
        {options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className={`w-full text-left p-3 rounded border transition-colors
              ${selectedAnswer === option.value 
                ? 'bg-blue-50 border-blue-500' 
                : 'hover:bg-gray-50'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-500">
        Category: {question.category} • Intensity: {question.intensity}
      </div>
    </div>
  );
};

export default QuestionCard;