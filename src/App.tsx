import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

const App = () => {
  console.log('App component rendering...');

  try {
    return (
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
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