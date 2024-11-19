import React from 'react';
import { ComparisonResult } from '@/types';
import { Check, X } from 'lucide-react';

interface ComparisonViewProps {
  results: ComparisonResult[];
  userName: string;
  partnerName: string;
}

export default function ComparisonView({ results, userName, partnerName }: ComparisonViewProps) {
  const matchCount = results.filter(r => r.match).length;
  const percentage = Math.round((matchCount / results.length) * 100);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">Results</h2>
        <p className="text-xl text-gray-600">
          You matched on {matchCount} out of {results.length} questions ({percentage}%)
        </p>
      </div>

      <div className="space-y-6">
        {results.map((result, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              {result.match ? (
                <Check className="h-6 w-6 text-green-500" />
              ) : (
                <X className="h-6 w-6 text-rose-500" />
              )}
              <span className="text-sm font-medium capitalize text-gray-500">
                {result.question.category}
              </span>
            </div>

            <p className="text-lg font-medium mb-4">{result.question.text}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">{userName}</p>
                <p className="bg-gray-50 p-3 rounded-lg">{result.userAnswer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">{partnerName}</p>
                <p className="bg-gray-50 p-3 rounded-lg">{result.partnerAnswer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}