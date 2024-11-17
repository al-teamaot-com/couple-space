import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function App() {
  useEffect(() => {
    // Handle runtime errors
    window.onerror = (message, source, lineno, colno, error) => {
      console.error('Global error:', { message, source, lineno, colno, error });
      // You could also show a toast notification here
    };

    // Handle unhandled promise rejections
    window.onunhandledrejection = (event) => {
      console.error('Unhandled promise rejection:', event.reason);
      // You could also show a toast notification here
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;