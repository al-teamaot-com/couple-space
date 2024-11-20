import express from 'express'
import { Pool } from 'pg'
import path from 'path'

const app = express()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

// API endpoint - must come FIRST, before the static file serving
app.get('/api/relationship-questions', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "RelationshipQuestions"')
    res.json(result.rows)
  } catch (err) {
    console.error('Database error:', err)
    res.status(500).json({ error: 'Failed to fetch questions' })
  }
})

// Static files come AFTER the API routes
app.use(express.static(path.join(__dirname, '../client/dist')))

// This catch-all route must be LAST
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
