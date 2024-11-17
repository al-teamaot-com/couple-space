import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'

// Wrap Quiz in error boundary
const QuizWithError = () => {
  try {
    // Dynamically import Quiz
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

const App = () => {
  console.log('App component rendering...');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<QuizWithError />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;