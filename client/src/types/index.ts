export interface Question {
    id: number;
    text: string;
    category: string;
    intensity: number;
}

export interface ComparisonResult {
    id: number;
    match: boolean;
    question: {
        text: string;
        category: string;
    };
    userAnswer: string;
    partnerAnswer: string;
}

export interface Activity {
    id: number;
    name: string;
    title: string;
    description: string;
    category: string;
    duration: string;
}

export interface QuestionCardProps {
    question: Question;
    onAnswer: (value: number) => void;
    selectedAnswer?: number;
}
