import { Context } from '@netlify/edge-functions';

export default async function handler(req: Request, context: Context) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const url = new URL(req.url);
    const path = url.pathname.replace('/api', '');

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Session endpoints
    if (path === '/session') {
      if (req.method === 'GET') {
        const sessionId = url.searchParams.get('sessionId');
        if (!sessionId) {
          return new Response(
            JSON.stringify({ error: 'Session ID required' }),
            { status: 400, headers: corsHeaders }
          );
        }

        const session = await context.env.COUPLE_QUIZ.get(`session:${sessionId}`);
        return new Response(
          JSON.stringify(session ? JSON.parse(session) : null),
          { headers: corsHeaders }
        );
      }

      if (req.method === 'POST') {
        const { sessionId, userName } = await req.json();
        
        if (!sessionId || !userName) {
          return new Response(
            JSON.stringify({ error: 'Session ID and user name required' }),
            { status: 400, headers: corsHeaders }
          );
        }

        const existingSession = await context.env.COUPLE_QUIZ.get(`session:${sessionId}`);
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

        await context.env.COUPLE_QUIZ.put(
          `session:${sessionId}`,
          JSON.stringify(sessionData)
        );

        return new Response(
          JSON.stringify(sessionData),
          { headers: corsHeaders }
        );
      }
    }

    // Responses endpoints
    if (path === '/responses') {
      if (req.method === 'GET') {
        const sessionId = url.searchParams.get('sessionId');
        if (!sessionId) {
          return new Response(
            JSON.stringify({ error: 'Session ID required' }),
            { status: 400, headers: corsHeaders }
          );
        }

        const responses = await context.env.COUPLE_QUIZ.get(`responses:${sessionId}`);
        return new Response(
          JSON.stringify(responses ? JSON.parse(responses) : []),
          { headers: corsHeaders }
        );
      }

      if (req.method === 'POST') {
        const { responses, sessionId } = await req.json();
        
        if (!responses?.length || !sessionId) {
          return new Response(
            JSON.stringify({ error: 'Valid responses and session ID required' }),
            { status: 400, headers: corsHeaders }
          );
        }

        await context.env.COUPLE_QUIZ.put(
          `responses:${sessionId}`,
          JSON.stringify(responses)
        );

        return new Response(
          JSON.stringify({ success: true }),
          { headers: corsHeaders }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: 'Not found' }),
      { status: 404, headers: corsHeaders }
    );

  } catch (error) {
    console.error('Edge function error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    );
  }
}