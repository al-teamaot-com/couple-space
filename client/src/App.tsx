import { useState, useEffect } from "react"

interface Question {
  id: number
  text: string
  category: string
  intensity: number
}

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetch("/api/relationship-questions")
      .then(res => res.json())
      .then(data => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  const categories = Array.from(new Set(questions.map(q => q.category)))
  const filteredQuestions = selectedCategory 
    ? questions.filter(q => q.category === selectedCategory)
    : questions

  if (!selectedCategory) {
    return (
      <div>
        <h2>Choose a Category</h2>
        {categories.map(category => (
          <button key={category} onClick={() => setSelectedCategory(category)}>
            {category}
          </button>
        ))}
      </div>
    )
  }

  const question = filteredQuestions[currentQuestion]

  return (
    <div>
      <h2>{question.text}</h2>
      <p>Category: {question.category}</p>
      <p>Intensity: {question.intensity}</p>
      <button 
        onClick={() => currentQuestion < filteredQuestions.length - 1 && 
          setCurrentQuestion(currentQuestion + 1)}
      >
        Next
      </button>
    </div>
  )
}
