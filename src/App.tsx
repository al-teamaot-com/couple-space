import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Quiz } from '@/components/quiz';
import { Home } from '@/pages/Home';
import QuizQuestions from './components/QuizQuestions'
import Results from './components/Results'
import Layout from './components/Layout'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:sessionId" element={<Quiz />} />
        <Route path="/quiz/:id" element={<QuizQuestions />} />
        <Route path="/results/:id" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App