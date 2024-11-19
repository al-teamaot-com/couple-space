import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Question } from '@/types'

const QuizQuestions = () => {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [questions, setQuestions] = useState<Question[]>([])

  useEffect(() => {
    fetch('http://localhost:3001/api/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data)
      })
      .catch(error => console.error('Error:', error))
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1)
    } else {
      navigate(`/results/${id}`, { state: { answers } })
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Question {currentQuestion + 1}</h2>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          <p className="text-lg mb-4">{questions[currentQuestion]?.text}</p>
          
          <input 
            type="text"
            className="w-full p-2 border rounded-md"
            placeholder="Your answer"
            value={answers[currentQuestion] || ''}
            onChange={(e) => {
              const newAnswers = [...answers]
              newAnswers[currentQuestion] = e.target.value
              setAnswers(newAnswers)
            }}
            required
          />

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuizQuestions