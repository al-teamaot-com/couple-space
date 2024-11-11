export interface Session {
  id: string;
  createdAt: Date;
  user1Name: string;
  user2Name?: string;
}

export interface UserResponse {
  id?: number;
  sessionId: string;
  userName: string;
  questionId: number;
  answer: string;
}

export interface Question {
  id: number;
  text: string;
  options: string[];
}