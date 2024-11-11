import { createSession as apiCreateSession, getSession as apiGetSession, saveResponses as apiSaveResponses, getResponses as apiGetResponses } from './api';

export async function createSession(sessionId: string, userName: string): Promise<void> {
  try {
    await apiCreateSession(sessionId, userName);
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
}

export async function getSession(sessionId: string) {
  try {
    return await apiGetSession(sessionId);
  } catch (error) {
    console.error('Failed to get session:', error);
    throw error;
  }
}

export async function saveResponses(responses: any[]): Promise<void> {
  try {
    await apiSaveResponses(responses);
  } catch (error) {
    console.error('Failed to save responses:', error);
    throw error;
  }
}

export async function getResponses(sessionId: string) {
  try {
    return await apiGetResponses(sessionId);
  } catch (error) {
    console.error('Failed to get responses:', error);
    throw error;
  }
}