import React from 'react';
import { Activity } from '@/types';
import { Clock } from 'lucide-react';

interface ActivityCardProps {
  activity: Activity;
}

export default function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all">
      <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{activity.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium capitalize px-3 py-1 bg-rose-100 text-rose-600 rounded-full">
          {activity.category}
        </span>
        
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="h-4 w-4" />
          <span className="text-sm">{activity.duration}</span>
        </div>
      </div>
    </div>
  );
}