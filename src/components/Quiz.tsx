import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface Question {
  id: number;
  content: string;
  type: string;
  category: {
    id: number;
    name: string;
  };
}

const Quiz = () => {
  const navigate = useNavigate()
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const options = [
    'Strongly Disagree',
    'Disagree',
    'Neutral',
    'Agree',
    'Strongly Agree'
  ];

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/quiz-questions');
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!questions.length || Object.keys(answers).length !== questions.length) {
      alert('Please answer all questions')
      return
    }
    
    // Generate a simple quiz ID (you might want to make this more robust)
    const quizId = Date.now().toString()
    navigate(`/quiz/${quizId}`, { state: { questions, answers } })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quiz Page</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          {questions.map(question => (
            <div key={question.id} className="mb-6 p-4 bg-white rounded-lg shadow">
              <p className="mb-2 text-sm text-gray-600">
                {question.category.name.toUpperCase()}
              </p>
              <p className="mb-4">{question.content}</p>
              <div className="flex flex-wrap gap-2">
                {options.map(option => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(question.id, option)}
                    className={`px-4 py-2 rounded-full text-sm ${
                      answers[question.id] === option 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </form>
    </div>
  )
}

export default Quiz