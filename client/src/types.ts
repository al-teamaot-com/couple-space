export interface Question {
    id: number;
    text: string;
    category: string;
    intensity: number;
}

export interface QuestionFormProps {
    question: Question;
    onNext: (answer: string) => void;
    totalQuestions: number;
}
