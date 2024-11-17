import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

// Wrap components in error boundaries
const QuizWithError = () => {
  try {
    const Quiz = React.lazy(() => import('./pages/Quiz'));
    return (
      <React.Suspense fallback={<div className="p-4">Loading quiz...</div>}>
        <Quiz />
      </React.Suspense>
    );
  } catch (error) {
    console.error('Quiz error:', error);
    return (
      <div className="p-4 bg-red-100">
        <h1>Error loading quiz</h1>
        <pre>{error?.message}</pre>
      </div>
    );
  }
};

const ResultsWithError = () => {
  try {
    const Results = React.lazy(() => import('./pages/Results'));
    return (
      <React.Suspense fallback={<div className="p-4">Loading results...</div>}>
        <Results />
      </React.Suspense>
    );
  } catch (error) {
    console.error('Results error:', error);
    return (
      <div className="p-4 bg-red-100">
        <h1>Error loading results</h1>
        <pre>{error?.message}</pre>
      </div>
    );
  }
};

const App = () => {
  console.log('App component rendering...');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizWithError />} />
          <Route path="/results" element={<ResultsWithError />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;