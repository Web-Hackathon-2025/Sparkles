import React from 'react';


const BookingStatus = ({ status }) => {
    // Normalize status to lowercase for comparison
    const s = status ? status.toLowerCase() : '';

    const getStatusStyles = (s) => {
        switch (s) {
            case 'confirmed':
                return 'bg-[#2C475C]/10 text-[#2C475C] border-[#2C475C]/20';
            case 'requested':
            case 'pending':
                return 'bg-[#F97B27]/10 text-[#F97B27] border-[#F97B27]/20';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-200';
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
