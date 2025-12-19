import React from 'react';
import Button from '../common/Button';
import { formatDate, formatCurrency } from '../../utils/helpers';
import BookingStatus from '../customer/BookingStatus';

const RequestCard = ({ booking, onAccept, onReject }) => {
    const isPending = booking.status === 'requested' || booking.status === 'pending';

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold text-gray-900">{booking.service}</h3>
                    <p className="text-gray-500 text-sm mt-1">Customer: <span className="font-medium text-gray-900">{booking.customerName}</span></p>
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span className="mr-4">📅 {formatDate(booking.date)}</span>
                        <span>💰 {formatCurrency(booking.amount)}</span>
                    </div>
                </div>
                <BookingStatus status={booking.status} />
            </div>

            {isPending && (
                <div className="mt-6 flex space-x-3 border-t border-gray-100 pt-4">
                    <Button
                        size="sm"
                        onClick={() => onAccept(booking.id)}
                        className="bg-green-600 hover:bg-green-700 text-white flex-1 justify-center"
                    >
                        Accept Request
                    </Button>
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onReject(booking.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 flex-1 justify-center"
                    >
                        Reject
                    </Button>
                </div>
            )}

            {!isPending && booking.status === 'confirmed' && (
                <div className="mt-6 border-t border-gray-100 pt-4 text-center text-sm text-green-600 font-medium">
                    Running schedule
                </div>
            )}
        </div>
    );
};

export default RequestCard;
