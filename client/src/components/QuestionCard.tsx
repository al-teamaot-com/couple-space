import { Question } from '@/types'

interface QuestionCardProps {
    question: Question;
    onAnswer: (answer: string) => void;
    selectedAnswer?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
    question, 
    onAnswer, 
    selectedAnswer 
}) => {
    return (
        <div>
            <h2>{question.text}</h2>
            {/* Your question card implementation */}
        </div>
    );
};

export default QuestionCard;