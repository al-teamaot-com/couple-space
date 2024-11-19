export interface Question {
    id: number;
    text: string;
}

export interface QuestionFormProps {
    question: Question;
    onNext: (answer: string) => void;
    totalQuestions: number;
}
