import React from 'react';
import { BOOKING_STATUS } from '../../utils/constants';

const BookingStatus = ({ status }) => {
    const getStatusStyles = (status) => {
        switch (status) {
            case BOOKING_STATUS.CONFIRMED:
                return 'bg-green-100 text-green-800 border-green-200';
            case BOOKING_STATUS.PENDING:
                return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case BOOKING_STATUS.COMPLETED:
                return 'bg-blue-100 text-blue-800 border-blue-200';
            case BOOKING_STATUS.CANCELLED:
                return 'bg-gray-100 text-gray-800 border-gray-200';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyles(status)} uppercase tracking-wide`}>
            {status}
        </span>
    );
};

export default BookingStatus;
