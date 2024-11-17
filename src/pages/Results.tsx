import * as React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { questions } from '../data/questions'
import { useState, useEffect } from 'react'

const Results: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = location.state?.answers || [];
  const completed = location.state?.completed;
  const [shareUrl, setShareUrl] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Create session and get share URL when component mounts
  useEffect(() => {
    const createSession = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/quiz-sessions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
            user1_answers: answers 
          })
        });
        
        if (!response.ok) throw new Error('Failed to create session');
        
        const { id } = await response.json();
        const shareUrl = `${window.location.origin}/quiz/partner/${id}`;
        setShareUrl(shareUrl);
      } catch (error) {
        console.error('Failed to create share link:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (completed && answers.length > 0) {
      createSession();
    }
  }, [completed, answers]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Results</h1>
        
        {/* Share section */}
        <div className="mb-8 bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Share with Your Partner</h2>
          {isLoading ? (
            <div className="text-center py-4">
              <p>Generating share link...</p>
            </div>
          ) : shareUrl ? (
            <>
              <p className="mb-4 text-gray-600">
                Share this unique link with your partner to compare answers:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 p-2 border rounded bg-white"
                />
                <button
                  onClick={handleCopyLink}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  {isCopied ? 'Copied!' : 'Copy Link'}
                </button>
              </div>
            </>
          ) : (
            <p className="text-red-600">Failed to generate share link. Please try again.</p>
          )}
        </div>

        {/* Rest of your results display */}
      </div>
    </div>
  );
};

export default Results;