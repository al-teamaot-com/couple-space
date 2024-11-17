import { Pool } from 'pg';

// Create the database pool
export const pool = new Pool({
  connectionString: import.meta.env.VITE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

interface Session {
  id: string;
  user1Name: string;
  user2Name?: string;
  createdAt: string;
}

export async function createSession(sessionId: string, userName: string): Promise<void> {
  try {
    console.log('[DB] Creating session:', { sessionId, userName });
    
    // First check if session exists
    const existingSession = await pool.query(
      'SELECT * FROM "Session" WHERE id = $1',
      [sessionId]
    );
    
    if (existingSession.rows.length > 0) {
      // Update existing session with user2
      if (!existingSession.rows[0].user2_name && existingSession.rows[0].user1_name !== userName) {
        await pool.query(
          'UPDATE "Session" SET user2_name = $1 WHERE id = $2',
          [userName, sessionId]
        );
      }
    } else {
      // Create new session
      await pool.query(
        'INSERT INTO "Session" (id, user1_name) VALUES ($1, $2)',
        [sessionId, userName]
      );
    }
  } catch (error) {
    console.error('[DB] Failed to create session:', error);
    throw error;
  }
}

export async function getSession(sessionId: string): Promise<Session | null> {
  try {
    console.log('[DB] Getting session:', { sessionId });
    
    const result = await pool.query(
      'SELECT * FROM "Session" WHERE id = $1',
      [sessionId]
    );
    
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

export async function saveResponses(sessionId: string, responses: UserResponse[]): Promise<void> {
  try {
    console.log('[DB] Saving responses:', { sessionId, responses });
    
    await pool.query(
      'INSERT INTO "Response" (session_id, question_id, answer) ' +
      'VALUES ' + 
      responses.map((_, i) => `($1, $${i*2 + 2}, $${i*2 + 3})`).join(', '),
      [sessionId, ...responses.flatMap(r => [r.questionId, r.answer])]
    );
  } catch (error) {
    console.error('[DB] Failed to save responses:', error);
    throw error;
  }
}