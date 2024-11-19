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
