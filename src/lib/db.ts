import { Pool } from 'pg';

let pool: Pool;

try {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
} catch (error) {
  console.error('Failed to create database pool:', error);
  pool = new Pool(); // Fallback empty pool
}

export async function query(text: string, params?: any[]) {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function createSpace() {
  try {
    const result = await query(
      'INSERT INTO spaces (created_at) VALUES (NOW()) RETURNING id'
    );
    return result.rows[0];
  } catch (error) {
    console.error('Failed to create space:', error);
    throw error;
  }
}

export async function createSession(): Promise<string> {
  const result = await query(
    'INSERT INTO sessions DEFAULT VALUES RETURNING id'
  );
  return result.rows[0].id;
}

export async function getSession(id: string) {
  const result = await query(
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