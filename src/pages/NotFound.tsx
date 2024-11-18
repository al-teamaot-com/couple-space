import React from 'react';
import { Link } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

export function NotFound() {
  return (
    <div className="max-w-md mx-auto text-center">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-rose-500 hover:text-rose-600"
        >
          <HomeIcon className="h-5 w-5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;