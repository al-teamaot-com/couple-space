import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Paper,
  LinearProgress,
  Divider
} from '@mui/material';

interface Question {
  id: number;
  content: string;
  type: string | null;
  category_id: number | null;
}

const categoryNames = {
  1: "Communication",
  2: "Trust & Security",
  3: "Emotional Connection",
  4: "Future Goals",
  5: "Quality Time"
};

const agreementLevels = [
  { value: 1, label: 'Strongly Disagree' },
  { value: 2, label: 'Disagree' },
  { value: 3, label: 'Neutral' },
  { value: 4, label: 'Agree' },
  { value: 5, label: 'Strongly Agree' }
];

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://couple-space-app-20ff7d1c0153.herokuapp.com/')
      .then(response => response.json())
      .then(data => {
        // Sort questions by category_id
        const sortedQuestions = data.questions.sort((a: Question, b: Question) => 
          (a.category_id || 0) - (b.category_id || 0)
        );
        setQuestions(sortedQuestions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  }, []);

  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>Loading questions...</Typography>
        <LinearProgress sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (questions.length === 0) {
    return <Typography>No questions available.</Typography>;
  }

  const currentCategoryId = questions[currentQuestion].category_id;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 3 }}>
        {/* Category Header */}
        <Typography variant="h5" color="primary" gutterBottom>
          {currentCategoryId ? categoryNames[currentCategoryId as keyof typeof categoryNames] : 'Uncategorized'}
        </Typography>
        
        <Divider sx={{ mb: 3 }} />

        {/* Progress */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="body2" color="textSecondary">
            Question {currentQuestion + 1} of {questions.length}
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={progress} 
            sx={{ mt: 1 }}
          />
        </Box>

        {/* Question */}
        <Typography variant="h6" sx={{ mb: 4 }}>
          {questions[currentQuestion].content}
        </Typography>

        {/* Answer Options */}
        <RadioGroup
          value={answers[questions[currentQuestion].id] || ''}
          onChange={(e) => handleAnswer(Number(e.target.value))}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {agreementLevels.map((level) => (
              <Paper 
                key={level.value}
                variant="outlined"
                sx={{ 
                  p: 1,
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                <FormControlLabel
                  value={level.value}
                  control={<Radio />}
                  label={level.label}
                  sx={{ width: '100%', m: 0 }}
                />
              </Paper>
            ))}
          </Box>
        </RadioGroup>
      </Paper>

      {/* Navigation Buttons */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="contained"
          sx={{ minWidth: 100 }}
        >
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
          variant="contained"
          color="primary"
          sx={{ minWidth: 100 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Quiz;