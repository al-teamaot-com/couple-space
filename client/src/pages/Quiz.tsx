import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import { Question } from '@/types';
import { questions } from '../data/questions';

const Quiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [userName, setUserName] = useState('');

    const handleAnswer = async (answer: string) => {
        try {
            await submitAnswer(parseInt(answer, 10));  // Convert string to number here
            // ... rest of your logic
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    return (
        <div>
            {currentQuestion && (
                <QuestionForm
                    question={currentQuestion}
                    onNext={handleAnswer}
                    totalQuestions={questions.length}
                    userName={userName}
                />
            )}
        </div>
    );
};

export default Quiz;