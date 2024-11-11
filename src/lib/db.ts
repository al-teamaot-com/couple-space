import { createSession as apiCreateSession, getSession as apiGetSession, saveResponses as apiSaveResponses, getResponses as apiGetResponses } from './api';

export async function createSession(sessionId: string, userName: string): Promise<void> {
  try {
    const response = await apiCreateSession(sessionId, userName);
    if (!response.ok) {
      throw new Error('Failed to create session');
    }
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
}

export async function getSession(sessionId: string) {
  try {
    const response = await apiGetSession(sessionId);
    if (!response.ok) {
      throw new Error('Failed to get session');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to get session:', error);
    throw error;
  }
}

export async function saveResponses(responses: any[]): Promise<void> {
  try {
    const response = await apiSaveResponses(responses);
    if (!response.ok) {
      throw new Error('Failed to save responses');
    }
  } catch (error) {
    console.error('Failed to save responses:', error);
    throw error;
  }
}

export async function getResponses(sessionId: string) {
  try {
    const response = await apiGetResponses(sessionId);
    if (!response.ok) {
      throw new Error('Failed to get responses');
    }
    return response.json();
  } catch (error) {
    console.error('Failed to get responses:', error);
    throw error;
  }
}