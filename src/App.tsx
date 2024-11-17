import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// Import all pages
import Home from './pages/Home'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import NotFound from './pages/NotFound'

const App = () => {
  console.log('App component rendering with all routes...');

  try {
    return (
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('Error in App render:', error);
    return (
      <div className="min-h-screen bg-red-100 p-4">
        <h1 className="text-2xl text-red-600">Error Loading App</h1>
        <pre className="mt-4">{error?.message}</pre>
      </div>
    );
  }
};

export default App;