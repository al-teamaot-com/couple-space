import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { createSession, getSession } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

export function Home() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const [name, setName] = useState('');
  const [sessionCode, setSessionCode] = useState('');
  const [error, setError] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (sessionId) {
      setSessionCode(sessionId);
      setIsJoining(true);
    }
  }, [sessionId]);

  const handleStart = async () => {
    setError('');
    setLoading(true);
    console.log('[Home] Starting session with:', { name, isJoining, sessionId, sessionCode });

    if (!name.trim()) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }

    const userName = name.trim();
    localStorage.setItem('userName', userName);

    try {
      if (isJoining) {
        const code = sessionId || sessionCode;
        console.log('[Home] Joining session:', code);

        if (!code.trim()) {
          setError('Please enter the session code');
          setLoading(false);
          return;
        }

        const session = await getSession(code);
        console.log('[Home] Retrieved session:', session);

        if (!session) {
          setError(`Session ${code} not found. Please check the code and try again.`);
          setLoading(false);
          return;
        }

        if (session.user2Name && session.user2Name !== userName && session.user1Name !== userName) {
          setError(`This session is already full. Current participants: ${session.user1Name} and ${session.user2Name}`);
          setLoading(false);
          return;
        }

        await createSession(code, userName);
        localStorage.setItem('isCreator', 'false');
        navigate(`/quiz/${code}`);
      } else {
        const fullSessionId = uuidv4();
        const displayId = fullSessionId.substring(0, 8);
        console.log('[Home] Creating new session:', { fullSessionId, displayId });
        
        await createSession(fullSessionId, userName);
        console.log('[Home] Session created successfully');
        
        localStorage.setItem('isCreator', 'true');
        localStorage.setItem('displaySessionId', displayId);
        navigate(`/quiz/${fullSessionId}`);
      }
    } catch (err) {
      console.error('[Home] Session error:', err);
      setError('Failed to create or join session. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto text-center">
      <div className="mb-8">
        <Heart className="h-16 w-16 text-rose-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Couple Space</h1>
        <p className="text-gray-600">
          Compare answers with your significant other
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError('');
              }}
              className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
              placeholder="Enter your name"
              disabled={loading}
            />
          </div>

          {!sessionId && (
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsJoining(false)}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  !isJoining
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                disabled={loading}
              >
                Start New
              </button>
              <button
                onClick={() => setIsJoining(true)}
                className={`flex-1 py-2 rounded-lg transition-colors ${
                  isJoining
                    ? 'bg-rose-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                disabled={loading}
              >
                Join Existing
              </button>
            </div>
          )}

          {isJoining && !sessionId && (
            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Session Code
              </label>
              <input
                type="text"
                id="code"
                value={sessionCode}
                onChange={(e) => {
                  setSessionCode(e.target.value);
                  setError('');
                }}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-rose-500 focus:ring-rose-500"
                placeholder="Enter session code"
                disabled={loading}
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={loading}
            className="w-full py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              isJoining ? "Join Quiz" : "Start Quiz"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;