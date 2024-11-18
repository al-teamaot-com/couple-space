import { getQuestions } from './index-CO_S5WzH.js';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Fetch questions when component mounts
    async function fetchQuestions() {
      try {
        const fetchedQuestions = await getQuestions();
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
        setError('Failed to load questions. Please try again.');
      }
    }
    
    fetchQuestions();
  }, []);

  // ... rest of your component code ...
}