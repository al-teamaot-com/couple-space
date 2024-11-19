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
  category: string;
  intensity: number;
}

export interface ComparisonResult {
  id: number;
  result: string;
}

export interface Activity {
  id: number;
  name: string;
}

export interface Props {
  question: Question;
  onNext: (answer: string) => void;
}

export type QuestionCategory = string;