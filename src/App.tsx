import { BrowserRouter, Routes, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Quiz from './components/Quiz'
import Results from './components/Results'
import Navbar from './components/Navbar'
import QuizQuestions from './components/QuizQuestions'

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Quiz />} />
        <Route path="/quiz/:id" element={<QuizQuestions />} />
        <Route path="/results/:id" element={<Results />} />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  )

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            {router}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App