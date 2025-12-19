import React, { useState, useEffect } from 'react';
import { providers } from '../data/providers';
import RequestCard from '../components/provider/RequestCard';
import { formatDate, formatCurrency } from '../utils/helpers';
import { useUser } from '../context/UserContext';
import { TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';

const ProviderDashboard = () => {
    const { user } = useUser();

    // Fallback if not logged in or in dev mode
    const currentProviderId = user?.id || 1;
    const providerProfile = providers.find(p => p.id === currentProviderId);

    // State for bookings
    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch bookings on mount
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/bookings');
                if (response.ok) {
                    const data = await response.json();
                    // Filter for this provider
                    const providerBookings = data.filter(b => b.providerId === currentProviderId);
                    setMyBookings(providerBookings);
                }
            } catch (error) {
                console.error("Failed to fetch provider bookings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, [currentProviderId]);

    const updateBookingStatus = async (bookingId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Update local state to reflect change
                setMyBookings(prev => prev.map(booking =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                ));
            } else {
                alert("Failed to update booking status");
            }
        } catch (error) {
            console.error("Error updating booking:", error);
            alert("Error connecting to server");
        }
    };

    const handleAccept = (bookingId) => {
        updateBookingStatus(bookingId, 'confirmed');
    };

    const handleReject = (bookingId) => {
        updateBookingStatus(bookingId, 'cancelled');
    };

    const pendingRequests = myBookings.filter(b => b.status === 'requested' || b.status === 'pending');
    const upcomingJobs = myBookings.filter(b => b.status === 'confirmed');
    const pastJobs = myBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
    const completedJobs = myBookings.filter(b => b.status === 'completed');

    // Calculate dynamic earnings
    const totalEarnings = completedJobs.reduce((sum, b) => sum + (b.amount || 0), 0);

    if (loading) {
        return <div className="text-center py-20">Loading your dashboard...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Provider Portal</h1>
                <p className="text-gray-500 mt-2">Welcome back, {providerProfile?.name || user?.name || 'Professional'}</p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium">Earnings</span>
                        <div className="p-2 bg-green-50 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{formatCurrency(totalEarnings)}</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium">Completed</span>
                        <div className="p-2 bg-blue-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{completedJobs.length}</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium">Active Requests</span>
                        <div className="p-2 bg-yellow-50 rounded-lg">
                            <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{pendingRequests.length}</div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-500 text-sm font-medium">Customers</span>
                        <div className="p-2 bg-purple-50 rounded-lg">
                            <Users className="h-5 w-5 text-purple-600" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">
                        {[...new Set(myBookings.map(b => b.customerName))].length}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Incoming Requests */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            Incoming Requests
                            {pendingRequests.length > 0 && (
                                <span className="ml-3 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">{pendingRequests.length} new</span>
                            )}
                        </h2>
                        <div className="space-y-4">
                            {pendingRequests.length > 0 ? (
                                pendingRequests.map(booking => (
                                    <RequestCard
                                        key={booking.id}
                                        booking={booking}
                                        onAccept={handleAccept}
                                        onReject={handleReject}
                                    />
                                ))
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                                    No new requests at the moment.
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Upcoming Jobs */}
                    <section>
                        <h2 className="text-xl font-bold text-gray-900 mb-4">Upcoming Schedule</h2>
                        <div className="space-y-4">
                            {upcomingJobs.length > 0 ? (
                                upcomingJobs.map(booking => (
                                    <RequestCard
                                        key={booking.id}
                                        booking={booking}
                                        onAccept={handleAccept}
                                        onReject={handleReject}
                                    />
                                ))
                            ) : (
                                <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
                                    No upcoming jobs confirmed.
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar / Stats or Past Jobs */}
                <div className="lg:col-span-1">
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-6">
                        <h2 className="text-lg font-bold text-gray-900 mb-4">Past Activity</h2>
                        <div className="space-y-4">
                            {pastJobs.map(booking => (
                                <div key={booking.id} className="text-sm border-b border-gray-100 last:border-0 pb-3 last:pb-0">
                                    <div className="flex justify-between font-medium">
                                        <span className="text-gray-900">{booking.service}</span>
                                        <span className={`capitalize ${booking.status === 'completed' ? 'text-green-600' : 'text-gray-400'}`}>{booking.status}</span>
                                    </div>
                                    <div className="text-gray-500 text-xs mt-1">
                                        {formatDate(booking.date)} • {booking.customerName}
                                    </div>
                                </div>
                            ))}
                            {pastJobs.length === 0 && (
                                <p className="text-gray-400 text-sm">No past history.</p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
