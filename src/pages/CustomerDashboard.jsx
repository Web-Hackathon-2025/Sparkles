import React from 'react';
import BookingStatus from '../components/customer/BookingStatus';
import { bookings } from '../data/bookings';
import { providers } from '../data/providers';
import { formatDate, formatCurrency } from '../utils/helpers';

const CustomerDashboard = () => {
    // Enrich bookings with provider data for display
    const myBookings = bookings.map(booking => {
        const provider = providers.find(p => p.id === booking.providerId);
        return { ...booking, providerName: provider ? provider.name : 'Unknown Provider' };
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Dashboard</h1>

            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Bookings</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Track the status of your service requests.</p>
                </div>
                <ul className="divide-y divide-gray-200">
                    {myBookings.map((booking) => (
                        <li key={booking.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50 transition">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium text-indigo-600 truncate">{booking.service}</p>
                                    <p className="text-sm text-gray-500">{booking.providerName}</p>
                                </div>
                                <div className="ml-2 flex-shrink-0 flex">
                                    <BookingStatus status={booking.status} />
                                </div>
                            </div>
                            <div className="mt-2 sm:flex sm:justify-between">
                                <div className="sm:flex">
                                    <p className="flex items-center text-sm text-gray-500">
                                        {formatDate(booking.date)}
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                        {formatCurrency(booking.amount)}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CustomerDashboard;
