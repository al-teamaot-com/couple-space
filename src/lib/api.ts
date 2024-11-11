const API_BASE = '/.netlify/functions/api';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }
  return response.json();
}

export async function createSession(sessionId: string, userName: string) {
  const response = await fetch(`${API_BASE}/session`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, userName })
  });
  return handleResponse(response);
}

export async function getSession(sessionId: string) {
  const response = await fetch(`${API_BASE}/session?sessionId=${sessionId}`);
  return handleResponse(response);
}

export async function saveResponses(responses: any[]) {
  const response = await fetch(`${API_BASE}/responses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ responses })
  });
  return handleResponse(response);
}

export async function getResponses(sessionId: string) {
  const response = await fetch(`${API_BASE}/responses?sessionId=${sessionId}`);
  return handleResponse(response);
}