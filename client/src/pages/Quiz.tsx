import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import { Question } from '@/types';
import { questions } from '../data/questions';

const Quiz: React.FC = () => {
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
    const [userName, setUserName] = useState('');

    const submitAnswer = async (value: number) => {
        try {
            const response = await fetch('/api/answers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId: currentQuestion?.id,
                    answer: value
                })
            });
            if (!response.ok) {
                throw new Error('Failed to submit answer');
            }
        } catch (error) {
            console.error('Error submitting answer:', error);
            throw error;
        }
    };

    const handleAnswer = async (answer: string) => {
        try {
            await submitAnswer(parseInt(answer, 10));
            // ... rest of your logic
        } catch (error) {
            console.error('Error handling answer:', error);
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