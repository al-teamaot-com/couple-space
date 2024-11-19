export interface Question {
    id: number;
    text: string;
    category: string;
    intensity: number;
}

export interface ComparisonResult {
    id: number;
    result: string;
    match: boolean;
    question: string;
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

export interface Props {
    question: Question;
    onNext: (answer: string) => void;
}
