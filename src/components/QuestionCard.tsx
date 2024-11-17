import * as React from 'react'
import { Question } from '../types'

interface Props {
  question: Question;
  onNext: () => void;
}

const QuestionCard: React.FC<Props> = ({ question, onNext }) => {
  const options = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">{question.text}</h2>
      <div className="space-y-4">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={onNext}
            className="w-full text-left p-3 rounded border hover:bg-gray-50"
          >
            {option}
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