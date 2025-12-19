import React from 'react';


const BookingStatus = ({ status }) => {
    // Normalize status to lowercase for comparison
    const s = status ? status.toLowerCase() : '';

    const getStatusStyles = (s) => {
        switch (s) {
            case 'confirmed':
                return 'bg-green-100 text-green-800 border-green-200';
            case 'requested':
            case 'pending': // Fallback if needed
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'completed':
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'cancelled':
                return 'bg-red-100 text-red-800 border-red-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(s)} uppercase tracking-wide`}>
            {s}
        </span>
    );
};

export default BookingStatus;
