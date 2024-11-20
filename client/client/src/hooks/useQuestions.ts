import { useState, useEffect } from 'react'

interface Question {
  id: number
  text: string
  category: string
  intensity: number
}

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/relationship-questions')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch questions')
        return res.json()
      })
      .then(data => {
        setQuestions(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return { questions, loading, error }
}
