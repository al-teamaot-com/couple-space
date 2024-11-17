import * as React from 'react'
import { BrowserRouter } from 'react-router-dom'

const App = () => {
  console.log('App component rendering...');

  try {
    return (
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-2xl p-4">Couple Space</h1>
      </div>
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