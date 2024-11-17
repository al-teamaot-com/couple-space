import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Quiz = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    partnerName: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.partnerName) {
      alert('Please fill in both names')
      return
    }
    
    // Generate a simple quiz ID (you might want to make this more robust)
    const quizId = Date.now().toString()
    navigate(`/quiz/${quizId}`, { state: formData })
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quiz Page</h1>
      
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">
              What's your name?
            </label>
            <input 
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div>
            <label className="block text-lg font-medium mb-2">
              Partner's name?
            </label>
            <input 
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your partner's name"
              value={formData.partnerName}
              onChange={(e) => setFormData(prev => ({ ...prev, partnerName: e.target.value }))}
            />
          </div>

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