import React from 'react';
import AvailabilityBadge from './AvailabilityBadge';
import RequestCard from './RequestCard';
import { PieChart, TrendingUp, Users } from 'lucide-react';

const ProviderDashboard = ({ provider, requests }) => {
    if (!provider) return <div>Loading...</div>;

    const stats = [
        { label: 'Total Earnings', value: '$2,450', icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-100' },
        { label: 'Completed Jobs', value: '18', icon: PieChart, color: 'text-indigo-600', bg: 'bg-indigo-100' },
        { label: 'Profile Views', value: '342', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Welcome back, {provider.name.split(' ')[0]}!</h2>
                        <p className="mt-1 text-sm text-gray-500">Here's what's happening with your business today.</p>
                    </div>
                    <AvailabilityBadge isAvailable={provider.availability} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                    <div key={item.label} className="bg-white overflow-hidden shadow rounded-lg">
                        <div className="p-5">
                            <div className="flex items-center">
                                <div className={`flex-shrink-0 rounded-md p-3 ${item.bg}`}>
                                    <item.icon className={`h-6 w-6 ${item.color}`} />
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">{item.label}</dt>
                                        <dd className="text-lg font-medium text-gray-900">{item.value}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Requests</h3>
                </div>
                <div className="p-6">
                    {requests && requests.length > 0 ? (
                        requests.map(req => (
                            <RequestCard
                                key={req.id}
                                request={req}
                                onAccept={(id) => console.log('Accepted', id)}
                                onDecline={(id) => console.log('Declined', id)}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No pending requests.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
