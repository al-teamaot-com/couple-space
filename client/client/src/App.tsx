import { useState } from "react"
import { useQuestions } from "./hooks/useQuestions"

export default function App() {
  const { questions, loading, error } = useQuestions()
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [isComplete, setIsComplete] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [maxIntensity, setMaxIntensity] = useState<number>(4)

  const filteredQuestions = questions.filter(q => 
    (!selectedCategory || q.category === selectedCategory) && 
    q.intensity <= maxIntensity
  )

  const handleAnswer = (answer: number): void => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setIsComplete(true)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading questions...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    )
  }

  if (!selectedCategory) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl mb-6 text-center">Choose a Category</h2>
          <div className="flex flex-col gap-3">
            {Array.from(new Set(questions.map(q => q.category))).map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition"
              >
                {category}
              </button>
            ))}
          </div>
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Intensity Level: {maxIntensity}
            </label>
            <input
              type="range"
              min="1"
              max="4"
              value={maxIntensity}
              onChange={(e) => setMaxIntensity(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 text-center">
          <h2 className="text-2xl mb-4">Session Complete!</h2>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => {
                setCurrentQuestion(0)
                setIsComplete(false)
              }}
              className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
            >
              Play Again
            </button>
            <button 
              onClick={() => {
                setSelectedCategory(null)
                setCurrentQuestion(0)
                setIsComplete(false)
              }}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Change Category
            </button>
          </div>
        </div>
      </div>
    )
  }

  const question = filteredQuestions[currentQuestion]

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <div className="mb-4 flex justify-between items-center">
          <span className="text-sm text-gray-500">{question.category}</span>
          <span className="text-sm text-gray-500">
             Level {question.intensity}
          </span>
        </div>
        <h2 className="text-xl mb-6">{question.text}</h2>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
            >
              {value}
            </button>
          ))}
        </div>
        <div className="mt-6 bg-gray-200 rounded-full h-2">
          <div 
            className="bg-rose-500 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestion + 1) / filteredQuestions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
