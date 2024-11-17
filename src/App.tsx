import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Quiz />} />
            <Route path="/results/:id" element={<Results />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App