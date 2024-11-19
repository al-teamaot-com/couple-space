import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, RadioGroup, FormControlLabel, Radio, Paper } from '@mui/material';

interface Question {
  id: number;
  content: string;
  type: string | null;
  category_id: number | null;
}

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
        setQuestions(data.questions);
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
    return <Typography>Loading questions...</Typography>;
  }

  if (questions.length === 0) {
    return <Typography>No questions available.</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Question {currentQuestion + 1} of {questions.length}
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 3 }}>
          {questions[currentQuestion].content}
        </Typography>

        <RadioGroup
          value={answers[questions[currentQuestion].id] || ''}
          onChange={(e) => handleAnswer(Number(e.target.value))}
        >
          {agreementLevels.map((level) => (
            <FormControlLabel
              key={level.value}
              value={level.value}
              control={<Radio />}
              label={level.label}
            />
          ))}
        </RadioGroup>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          variant="contained"
        >
          Previous
        </Button>
        <Button 
          onClick={handleNext}
          disabled={currentQuestion === questions.length - 1}
          variant="contained"
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default Quiz;