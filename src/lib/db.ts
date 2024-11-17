import { supabase } from './db-client';

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
    
    // First check if session exists
    const { data: existingSession } = await supabase
      .from('Session')
      .select('*')
      .eq('id', sessionId)
      .single();
    
    console.log('[DB] Existing session:', existingSession);

    if (existingSession) {
      // Update existing session with user2
      if (!existingSession.user2_name && existingSession.user1_name !== userName) {
        const { error } = await supabase
          .from('Session')
          .update({ user2_name: userName })
          .eq('id', sessionId);
          
        if (error) throw error;
      }
    } else {
      // Create new session
      const { error } = await supabase
        .from('Session')
        .insert([{
          id: sessionId,
          user1_name: userName
        }]);
        
      if (error) throw error;
    }
  } catch (error) {
    console.error('[DB] Failed to create session:', error);
    throw error;
  }
}

export async function getSession(sessionId: string): Promise<Session | null> {
  try {
    console.log('[DB] Getting session:', { sessionId });
    
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .eq('id', sessionId)
      .single();
      
    if (error) throw error;
    
    if (data) {
      // Convert from database format to Session type
      return {
        id: data.id,
        user1Name: data.user1_name,
        user2Name: data.user2_name,
        createdAt: data.created_at
      };
    }
    
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