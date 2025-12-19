import React from 'react';

const AvailabilityBadge = ({ isAvailable }) => {
    return (
        <div className="flex items-center">
            <span className={`relative flex h-3 w-3 mr-2`}>
                {isAvailable && (
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                )}
                <span className={`relative inline-flex rounded-full h-3 w-3 ${isAvailable ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            </span>
            <span className={`text-sm font-medium ${isAvailable ? 'text-green-700' : 'text-gray-500'}`}>
                {isAvailable ? 'Available for Jobs' : 'Unavailable'}
            </span>
        </div>
    );
};

export default AvailabilityBadge;
