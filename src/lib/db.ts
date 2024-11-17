import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export async function createSession(): Promise<string> {
  const result = await pool.query(
    'INSERT INTO sessions DEFAULT VALUES RETURNING id'
  );
  return result.rows[0].id;
}

export async function getSession(id: string) {
  const result = await pool.query(
    'SELECT * FROM sessions WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

export async function saveResponses(sessionId: string, responses: any[]) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    for (const response of responses) {
      await client.query(
        'INSERT INTO responses (session_id, question_id, answer) VALUES ($1, $2, $3)',
        [sessionId, response.questionId, response.answer]
      );
    }
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
}