import React from 'react';
import Button from '../common/Button';
import { formatDate, formatCurrency } from '../../utils/helpers';
import { Clock, DollarSign } from 'lucide-react';

const RequestCard = ({ request, onAccept, onDecline }) => {
    return (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-4">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-lg font-medium text-gray-900">{request.service}</h4>
                    <p className="text-sm text-gray-500 mt-1">Request from Customer #{request.customerId}</p>
                </div>
                <div className="text-right">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {request.status}
                    </span>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm text-gray-600">
                    <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {formatDate(request.date)}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                    {formatCurrency(request.amount)}
                </div>
            </div>

            <div className="mt-6 flex space-x-3">
                <Button onClick={() => onAccept(request.id)} size="sm" className="flex-1">
                    Accept
                </Button>
                <Button onClick={() => onDecline(request.id)} variant="secondary" size="sm" className="flex-1">
                    Decline
                </Button>
            </div>
        </div>
    );
};

export default RequestCard;
