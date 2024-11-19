import React from 'react';
import { QuestionFormProps } from '@/types';

const QuestionForm: React.FC<QuestionFormProps> = ({ 
    question, 
    onNext,
    userName = "User",
    totalQuestions
}) => {
    const handleAnswer = (value: number) => {
        onNext(value.toString());
    };

    return (
        <div className="max-w-2xl mx-auto px-4">
            <div className="mb-8 text-center">
                <h2 className="text-2xl font-semibold">Welcome, {userName}!</h2>
                <p className="text-gray-600">Question {question.id} of {totalQuestions}</p>
            </div>
            
            <div className="question-card">
                <h3 className="text-xl mb-4">{question.text}</h3>
                <div className="flex gap-4 justify-center">
                    {[1, 2, 3, 4, 5].map((value) => (
                        <button
                            key={value}
                            onClick={() => handleAnswer(value)}
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                        >
                            {value}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;