import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Quiz from './pages/Quiz'

const App = () => {
  console.log('App component rendering...');

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={
            <div className="p-4">
              <Quiz />
            </div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;