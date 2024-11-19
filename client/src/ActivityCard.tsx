import React from 'react';
import { Activity } from '@/types';

interface ActivityCardProps {
    activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{activity.title}</h3>
            <p className="text-gray-600 mb-4">{activity.description}</p>
            
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {activity.category}
                </span>
                <span>{activity.duration}</span>
            </div>
        </div>
    );
};

export default ActivityCard;