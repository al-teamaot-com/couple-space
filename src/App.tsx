import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Quiz from './components/Quiz.tsx'
import QuizQuestions from './components/QuizQuestions'
import Results from './components/Results'
import Layout from './components/Layout'

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
      // Remove unsupported future flags
    }
  }
)

const App = () => {
  return <RouterProvider router={router} />
}

export default App