import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to the Quiz</h1>
        <p className="mb-8">Test your knowledge with our interactive quiz!</p>
        <button
          onClick={() => navigate('/quiz')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;