import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import { formatDate, formatCurrency } from '../../utils/helpers';
import BookingStatus from '../customer/BookingStatus';
import { User, MapPin, Calendar, Clock, ChevronRight, MessageSquare } from 'lucide-react';

const RequestCard = ({ booking, onAccept, onReject }) => {
    const isPending = booking.status === 'requested' || booking.status === 'pending';
    const isConfirmed = booking.status === 'confirmed';

    return (
        <div className="bg-white rounded-[2rem] shadow-xl shadow-[#2C475C]/5 border border-gray-50 p-6 md:p-8 hover:border-[#F97B27]/30 transition-all group">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div className="flex gap-4 items-center">
                    <div className="h-16 w-16 bg-[#2C475C]/5 rounded-2xl flex items-center justify-center shrink-0">
                        <User className="h-8 w-8 text-[#2C475C]" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-xl font-bold text-[#2C475C]">{booking.service}</h3>
                            <BookingStatus status={booking.status} />
                        </div>
                        <p className="text-gray-400 text-sm font-bold uppercase tracking-tight">Customer: <span className="text-[#2C475C]">{booking.customerName}</span></p>
                    </div>
                </div>

                <div className="flex flex-wrap md:flex-nowrap gap-4 items-center bg-gray-50 p-2 rounded-2xl border border-gray-100">
                    <div className="flex items-center px-4 py-2 bg-white rounded-xl shadow-sm">
                        <Calendar className="h-4 w-4 text-[#F97B27] mr-2" />
                        <span className="text-sm font-bold text-[#2C475C] whitespace-nowrap">{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center px-4 py-2 bg-white rounded-xl shadow-sm">
                        <Clock className="h-4 w-4 text-[#F97B27] mr-2" />
                        <span className="text-sm font-bold text-[#2C475C] whitespace-nowrap">{formatCurrency(booking.amount || 0)}</span>
                    </div>
                </div>
            </div>

            {isPending && (
                <div className="mt-8 flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-50">
                    <button
                        onClick={() => onAccept(booking.id)}
                        className="btn-primary flex-1 py-4 text-sm font-bold shadow-lg shadow-[#F97B27]/20 flex items-center justify-center group/btn"
                    >
                        Accept and Confirm
                        <ChevronRight className="ml-2 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                    <button
                        onClick={() => onReject(booking.id)}
                        className="btn-secondary flex-1 py-4 text-sm font-bold bg-white text-gray-400 border-gray-100 hover:text-red-500 hover:border-red-100 hover:bg-red-50"
                    >
                        Decline
                    </button>
                </div>
            )}

            {isConfirmed && (
                <div className="mt-8 flex gap-4 pt-6 border-t border-gray-50">
                    <Link
                        to={`/booking/${booking.id}`}
                        className="btn-primary flex-1 py-3 text-sm flex items-center justify-center gap-2"
                    >
                        <MessageSquare className="h-4 w-4" /> Open Terminal
                    </Link>
                    <button className="btn-secondary flex-1 py-3 text-sm">
                        Mark Success
                    </button>
                </div>
            )}
        </div>
    );
};

export default RequestCard;
