import React from 'react';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  onNext: (answer: string) => void;
  progress: {
    current: number;
    total: number;
  };
}

const answerOptions = [
  { value: 'strongly-agree', label: 'Strongly Agree' },
  { value: 'somewhat-agree', label: 'Somewhat Agree' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'somewhat-disagree', label: 'Somewhat Disagree' },
  { value: 'strongly-disagree', label: 'Strongly Disagree' }
];

export default function QuestionCard({ question, onNext, progress }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm text-gray-500">
            Question {progress.current} of {progress.total}
          </span>
          <span className="text-sm font-medium text-rose-500 capitalize">
            {question.category}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all"
            style={{ width: `${(progress.current / progress.total) * 100}%` }}
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-900">{question.text}</h2>
      </div>

      <div className="space-y-3">
        {answerOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onNext(option.value)}
            className="w-full p-4 text-left rounded-lg border border-gray-200 hover:border-rose-500 hover:bg-rose-50 transition-colors"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}