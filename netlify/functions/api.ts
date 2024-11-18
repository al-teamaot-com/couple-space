import { Handler } from '@netlify/functions';

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

        const existingSession = await process.env.COUPLE_QUIZ.get(`session:${sessionId}`);
        let sessionData;

        if (existingSession) {
          sessionData = JSON.parse(existingSession);
          if (!sessionData.user2Name && sessionData.user1Name !== userName) {
            sessionData.user2Name = userName;
          }
        } else {
          sessionData = {
            id: sessionId,
            user1Name: userName,
            createdAt: new Date().toISOString()
          };
        }

        await process.env.COUPLE_QUIZ.put(
          `session:${sessionId}`,
          JSON.stringify(sessionData)
        );

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(sessionData)
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

        const session = await process.env.COUPLE_QUIZ.get(`session:${sessionId}`);
        return {
          statusCode: 200,
          headers,
          body: session || JSON.stringify(null)
        };
      }
    }

    // Response Management
    if (path === '/responses') {
      if (method === 'POST') {
        const { responses, sessionId } = JSON.parse(event.body || '{}');
        
        if (!responses?.length || !sessionId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Valid responses and session ID required' })
          };
        }

        await process.env.COUPLE_QUIZ.put(
          `responses:${sessionId}`,
          JSON.stringify(responses)
        );

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

        const responses = await process.env.COUPLE_QUIZ.get(`responses:${sessionId}`);
        return {
          statusCode: 200,
          headers,
          body: responses || JSON.stringify([])
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