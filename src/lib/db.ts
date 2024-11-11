import { v4 as uuidv4 } from 'uuid';

interface Session {
  id: string;
  user1Name: string;
  user2Name?: string;
  createdAt: string;
}

interface Response {
  sessionId: string;
  userName: string;
  questionId: number;
  answer: string;
}

const STORAGE_PREFIX = 'couple_space_';

export async function createSession(sessionId: string, userName: string): Promise<void> {
  try {
    const existingSession = localStorage.getItem(`${STORAGE_PREFIX}session:${sessionId}`);
    let sessionData: Session;

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

    localStorage.setItem(`${STORAGE_PREFIX}session:${sessionId}`, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
}

export async function getSession(sessionId: string): Promise<Session | null> {
  try {
    const session = localStorage.getItem(`${STORAGE_PREFIX}session:${sessionId}`);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error('Failed to get session:', error);
    throw error;
  }
}

export async function saveResponses(responses: Response[]): Promise<void> {
  try {
    if (!responses?.length) return;
    const sessionId = responses[0].sessionId;
    localStorage.setItem(`${STORAGE_PREFIX}responses:${sessionId}`, JSON.stringify(responses));
  } catch (error) {
    console.error('Failed to save responses:', error);
    throw error;
  }
}

export async function getResponses(sessionId: string): Promise<Response[]> {
  try {
    const responses = localStorage.getItem(`${STORAGE_PREFIX}responses:${sessionId}`);
    return responses ? JSON.parse(responses) : [];
  } catch (error) {
    console.error('Failed to get responses:', error);
    throw error;
  }
}