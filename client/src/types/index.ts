export interface Activity {
    id: number;
    title: string;
    description: string;
    category: string;
    duration: string;
}

export interface ComparisonResult {
    id: number;
    match: boolean;
    question: string;
    userAnswer: string;
    partnerAnswer: string;
}

export interface Question {
    id: number;
    text: string;
    category: string;
    intensity: number;
}

export interface QuestionFormProps {
    question: Question;
    onNext: (answer: string) => void;
    userName?: string;
    totalQuestions: number;
}
