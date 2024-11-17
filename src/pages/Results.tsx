import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const completed = location.state?.completed;

  // Redirect if accessed directly without completing quiz
  React.useEffect(() => {
    if (!completed) {
      navigate('/');
    }
  }, [completed, navigate]);

  if (!completed) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Results</h1>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Answers</h2>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-4 p-4 border-b">
              <p className="font-medium">{question.text}</p>
              <p className="text-gray-600">
                Your answer: {answers[index] || 'Not answered'}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;