import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { questions } from '../data/questions';
import { UserResponse } from '../types';
import { createSession, getSession, saveResponses } from '../lib/db';
import QuestionCard from '../components/QuestionCard';

export function Quiz() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<UserResponse[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initSession = async () => {
      if (!sessionId) {
        navigate('/');
        return;
      }

      try {
        const userName = localStorage.getItem('userName');
        if (!userName) {
          navigate('/');
          return;
        }

        const session = await getSession(sessionId);
        if (!session) {
          setError('Invalid session code. Please check and try again.');
          setLoading(false);
          return;
        }

        if (session.user2Name && session.user2Name !== userName && session.user1Name !== userName) {
          setError('This session is already full');
          setLoading(false);
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error('Session initialization error:', err);
        setError('Failed to initialize session. Please try again.');
        setLoading(false);
      }
    };

    initSession();
  }, [sessionId, navigate]);

  const handleAnswer = async (answer: string) => {
    if (!sessionId) return;

    const userName = localStorage.getItem('userName');
    if (!userName) {
      navigate('/');
      return;
    }

    try {
      const newAnswer: UserResponse = {
        sessionId,
        userName,
        questionId: questions[currentQuestion].id,
        answer
      };

      const newAnswers = [...answers, newAnswer];
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        await saveResponses(newAnswers);
        navigate(`/results/${sessionId}`);
      }
    } catch (err) {
      console.error('Failed to save answer:', err);
      setError('Failed to save answer. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-rose-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto text-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <QuestionCard
        question={questions[currentQuestion]}
        onNext={handleAnswer}
        progress={{
          current: currentQuestion + 1,
          total: questions.length
        }}
      />
    </div>
  );
}

export default Quiz;