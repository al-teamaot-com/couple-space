import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Share, Copy, Check, Link as LinkIcon } from 'lucide-react';
import QRCodeReact from 'qrcode.react';

export function Results() {
  const { sessionId } = useParams();
  const [copied, setCopied] = useState(false);
  const shareCode = sessionId;
  const baseUrl = 'https://couplespace.netlify.app';
  const shareUrl = `${baseUrl}/join/${sessionId}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Share with your partner</h2>
        <p className="text-gray-600 mb-6">
          Share this code or link with your partner to join your quiz.
        </p>
        
        <div className="max-w-sm mx-auto mb-6">
          <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg mb-4">
            <code className="text-lg font-mono font-semibold text-rose-600">
              {shareCode}
            </code>
            <button
              onClick={() => copyToClipboard(shareCode)}
              className="p-2 text-gray-600 hover:text-rose-600 transition-colors"
              title="Copy code"
            >
              {copied ? (
                <Check className="h-5 w-5 text-green-500" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="truncate text-sm text-gray-600">
              {shareUrl}
            </div>
            <button
              onClick={() => copyToClipboard(shareUrl)}
              className="p-2 text-gray-600 hover:text-rose-600 transition-colors flex-shrink-0"
              title="Copy link"
            >
              <LinkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <div className="bg-white p-4 rounded-lg inline-block">
            <QRCodeReact
              value={shareUrl}
              size={160}
              level="H"
              includeMargin
              className="mx-auto"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Scan QR code to open quiz
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg text-left">
          <h3 className="font-semibold text-blue-800 mb-2">Instructions for your partner:</h3>
          <ol className="list-decimal list-inside text-blue-700 space-y-2">
            <li>Click the shared link or scan the QR code</li>
            <li>Enter their name</li>
            <li>Answer the questions</li>
          </ol>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          Your answers have been saved. Once your partner completes the quiz,
          you'll both be able to see how your answers compare.
        </p>
      </div>
    </div>
  );
}

export default Results;