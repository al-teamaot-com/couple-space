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
    console.log('[DB] Creating session:', { sessionId, userName });
    const storageKey = `${STORAGE_PREFIX}session:${sessionId}`;
    console.log('[DB] Storage key:', storageKey);
    
    const existingSession = localStorage.getItem(storageKey);
    console.log('[DB] Existing session:', existingSession);
    
    let sessionData: Session;
    if (existingSession) {
      sessionData = JSON.parse(existingSession);
      console.log('[DB] Found existing session:', sessionData);
      if (!sessionData.user2Name && sessionData.user1Name !== userName) {
        sessionData.user2Name = userName;
        console.log('[DB] Updated session with user2:', sessionData);
      }
    } else {
      sessionData = {
        id: sessionId,
        user1Name: userName,
        createdAt: new Date().toISOString()
      };
      console.log('[DB] Created new session data:', sessionData);
    }

    localStorage.setItem(storageKey, JSON.stringify(sessionData));
    console.log('[DB] Session saved successfully');
  } catch (error) {
    console.error('[DB] Failed to create session:', error);
    throw error;
  }
}

export async function getSession(sessionId: string): Promise<Session | null> {
  try {
    console.log('[DB] Getting session:', { sessionId });
    const storageKey = `${STORAGE_PREFIX}session:${sessionId}`;
    console.log('[DB] Storage key:', storageKey);
    
    const session = localStorage.getItem(storageKey);
    console.log('[DB] Raw session from storage:', session);
    
    if (session) {
      const parsedSession = JSON.parse(session);
      console.log('[DB] Parsed session:', parsedSession);
      return parsedSession;
    }
    
    console.log('[DB] No session found');
    return null;
  } catch (error) {
    console.error('[DB] Failed to get session:', error);
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