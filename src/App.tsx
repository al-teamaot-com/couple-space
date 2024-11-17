import * as React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'

// Import pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'

// Lazy load other pages with error boundaries
const Quiz = React.lazy(() => import('./pages/Quiz'))
const Results = React.lazy(() => import('./pages/Results'))

const App = () => {
  console.log('App component rendering...');

  try {
    return (
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <React.Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={
                <ErrorPage>
                  <Quiz />
                </ErrorPage>
              } />
              <Route path="/results" element={
                <ErrorPage>
                  <Results />
                </ErrorPage>
              } />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </React.Suspense>
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

// Simple error boundary component
const ErrorPage = ({ children }: { children: React.ReactNode }) => {
  try {
    return <>{children}</>;
  } catch (error) {
    console.error('Page error:', error);
    return (
      <div className="p-4">
        <h1 className="text-red-600">Error Loading Page</h1>
        <pre>{error?.message}</pre>
      </div>
    );
  }
};

export default App;