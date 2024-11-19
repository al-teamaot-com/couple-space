import { useState } from "react"

const questions = [
  { id: 1, text: "How was your day?" },
  { id: 2, text: "How are you feeling?" },
  { id: 3, text: "Rate your stress level:" }
]

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)

  const handleAnswer = (answer: number): void => {
    console.log(`Question ${currentQuestion + 1} answered:`, answer)
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      console.log("Quiz completed!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h2 className="text-xl mb-4">{questions[currentQuestion].text}</h2>
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              onClick={() => handleAnswer(value)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
