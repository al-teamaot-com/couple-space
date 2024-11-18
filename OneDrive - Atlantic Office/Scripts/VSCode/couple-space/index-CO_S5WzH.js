import pg from 'pg';

const pool = new pg.Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function getSession(sessionId) {
  try {
    console.log('[DB] Getting session:', { sessionId });
    const result = await pool.query('SELECT * FROM "Session" WHERE id = $1', [sessionId]);
    if (result.rows.length > 0) {
      const session = result.rows[0];
      return {
        id: session.id,
        user1Name: session.user1_name,
        user2Name: session.user2_name,
        createdAt: session.created_at
      };
    }
    return null;
  } catch (error) {
    console.error('[DB] Failed to get session:', error);
    throw error;
  }
}

async function saveResponses(sessionId, responses) {
  try {
    console.log('[DB] Saving responses:', { sessionId, responses });
    await pool.query(
      'INSERT INTO "Response" (session_id, question_id, answer) VALUES ' +
      responses.map((_, index) => `($1, $${index * 2 + 2}, $${index * 2 + 3})`).join(', '),
      [sessionId, ...responses.flatMap(r => [r.questionId, r.answer])]
    );
  } catch (error) {
    console.error('[DB] Failed to save responses:', error);
    throw error;
  }
}

export { getSession, saveResponses }; 