import React, { useState, useEffect } from 'react';
import { providers } from '../data/providers';
import RequestCard from '../components/provider/RequestCard';
import { formatDate } from '../utils/helpers';

const ProviderDashboard = () => {
    // Simulate logged-in provider (ID 1: Sarah Jenkins)
    const currentProviderId = 1;
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
    }, []);

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

    if (loading) {
        return <div className="text-center py-20">Loading your dashboard...</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 border-b border-gray-200 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Provider Portal</h1>
                    <p className="text-gray-500 mt-2">Welcome back, {providerProfile?.name}</p>
                </div>
                <div className="mt-4 md:mt-0 bg-indigo-50 text-indigo-700 px-6 py-3 rounded-xl font-bold border border-indigo-100 shadow-sm">
                    Earnings: <span className="text-2xl ml-2">$72</span>
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
