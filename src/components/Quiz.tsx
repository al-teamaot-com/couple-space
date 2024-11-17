const Quiz = () => {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Quiz Page</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-lg font-medium mb-2">
              What's your name?
            </label>
            <input 
              type="text"
              className="w-full p-2 border rounded-md"
              placeholder="Enter your name"
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
            />
          </div>

          <button 
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quiz