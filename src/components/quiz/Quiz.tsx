import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getQuestions } from '@/services/databaseService';
import { QuestionCard } from './QuestionCard';
import { AnswerOptions } from './AnswerOptions';
import '@/styles/quiz.css';

// ... rest of Quiz component