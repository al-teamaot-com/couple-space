import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Settings } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="font-semibold text-xl">Couple Space</span>
          </Link>
          <Link
            to="/admin"
            className="p-2 text-gray-500 hover:text-gray-700"
            title="Question Management"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
}