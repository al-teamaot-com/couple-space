import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// Import pages one by one
import Home from './pages/Home'

const App = () => {
  console.log('App component rendering with router...');

  try {
    return (
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
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