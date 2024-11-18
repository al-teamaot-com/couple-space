import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function createSession() {
  try {
    const result = await pool.query(
      'INSERT INTO sessions (created_at) VALUES (NOW()) RETURNING id'
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function saveAnswers(sessionId: string, answers: any[]) {
  try {
    const result = await pool.query(
      'UPDATE sessions SET answers = $1 WHERE id = $2 RETURNING *',
      [JSON.stringify(answers), sessionId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}

export async function getSession(id: string) {
  try {
    const result = await pool.query(
      'SELECT * FROM sessions WHERE id = $1',
      [id]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database error:', error);
    throw error;
  }
}