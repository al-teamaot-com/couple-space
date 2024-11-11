import { Handler } from '@netlify/functions';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.NEON_DATABASE_URL!);

export const handler: Handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const path = event.path.replace('/.netlify/functions/api', '');
    const method = event.httpMethod;

    if (method === 'OPTIONS') {
      return {
        statusCode: 200,
        headers
      };
    }

    // Session Management
    if (path === '/session') {
      if (method === 'POST') {
        const { sessionId, userName } = JSON.parse(event.body || '{}');
        
        if (!sessionId || !userName) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Session ID and user name required' })
          };
        }

        await sql`
          INSERT INTO sessions (id, user1_name)
          VALUES (${sessionId}, ${userName})
          ON CONFLICT (id) DO UPDATE
          SET user2_name = CASE
            WHEN sessions.user2_name IS NULL AND sessions.user1_name != ${userName}
            THEN ${userName}
            ELSE sessions.user2_name
          END
        `;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true })
        };
      }

      if (method === 'GET') {
        const sessionId = event.queryStringParameters?.sessionId;
        if (!sessionId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Session ID required' })
          };
        }

        const session = await sql`
          SELECT * FROM sessions WHERE id = ${sessionId}
        `;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(session[0] || null)
        };
      }
    }

    // Response Management
    if (path === '/responses') {
      if (method === 'POST') {
        const { responses } = JSON.parse(event.body || '{}');
        
        if (!responses?.length) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Valid responses required' })
          };
        }

        for (const response of responses) {
          await sql`
            INSERT INTO responses (session_id, user_name, question_id, answer)
            VALUES (${response.sessionId}, ${response.userName}, ${response.questionId}, ${response.answer})
          `;
        }
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true })
        };
      }

      if (method === 'GET') {
        const sessionId = event.queryStringParameters?.sessionId;
        if (!sessionId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Session ID required' })
          };
        }

        const responses = await sql`
          SELECT * FROM responses WHERE session_id = ${sessionId}
        `;
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(responses)
        };
      }
    }

    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      })
    };
  }
};