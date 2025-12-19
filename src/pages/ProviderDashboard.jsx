import React, { useState, useEffect } from 'react';
import { providers } from '../data/providers';
import RequestCard from '../components/provider/RequestCard';
import { formatDate, formatCurrency } from '../utils/helpers';
import { useUser } from '../context/UserContext';
import { TrendingUp, Users, CheckCircle, Clock, Wallet, Calendar, Bell, Star, ChevronRight } from 'lucide-react';

const ProviderDashboard = () => {
    const { user } = useUser();

    const currentProviderId = user?.id || 1;
    const providerProfile = providers.find(p => p.id === currentProviderId);

    const [myBookings, setMyBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:5000/bookings');
                if (response.ok) {
                    const data = await response.json();
                    const providerBookings = data.filter(b => b.providerId === currentProviderId);
                    setMyBookings(providerBookings);
                }
            } catch (error) {
                console.error("Error:", error);
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
                setMyBookings(prev => prev.map(booking =>
                    booking.id === bookingId ? { ...booking, status: newStatus } : booking
                ));
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleAccept = (bookingId) => updateBookingStatus(bookingId, 'confirmed');
    const handleReject = (bookingId) => updateBookingStatus(bookingId, 'cancelled');

    const pendingRequests = myBookings.filter(b => b.status === 'requested' || b.status === 'pending');
    const upcomingJobs = myBookings.filter(b => b.status === 'confirmed');
    const pastJobs = myBookings.filter(b => b.status === 'completed' || b.status === 'cancelled');
    const completedJobs = myBookings.filter(b => b.status === 'completed');

    const totalEarnings = completedJobs.reduce((sum, b) => sum + (b.amount || 0), 0);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F8F5F0]">
                <div className="animate-spin h-10 w-10 border-4 border-[#F97B27] border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8F5F0] pt-32 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Dashboard Banner */}
                <div className="bg-[#2C475C] rounded-[2rem] p-8 md:p-12 text-white mb-10 relative overflow-hidden shadow-2xl shadow-[#2C475C]/20">
                    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div>
                            <div className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-1 mb-4 border border-white/10">
                                <span className="h-2 w-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                                <span className="text-xs font-bold uppercase tracking-wider">Online & Available</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                                Hello, <span className="text-[#F97B27]">{providerProfile?.name || 'Professional'}</span>
                            </h1>
                            <p className="text-gray-300 mt-2 text-lg font-medium italic">"Quality is the best business plan."</p>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-3xl text-center">
                                <span className="text-[10px] uppercase font-bold text-gray-400 block mb-1 tracking-widest">Total Earnings</span>
                                <div className="text-3xl font-bold flex items-center justify-center">
                                    <span className="text-sm mr-1 opacity-60">Pkr</span>
                                    {totalEarnings}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Blobs */}
                    <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#F97B27]/10 rounded-full blur-3xl"></div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    {[
                        { label: 'Completed Jobs', val: completedJobs.length, icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' },
                        { label: 'Active Requests', val: pendingRequests.length, icon: Clock, color: 'text-[#F97B27]', bg: 'bg-orange-50' },
                        { label: 'Avg Rating', val: providerProfile?.rating || '5.0', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50' },
                        { label: 'Total Clients', val: [...new Set(myBookings.map(b => b.customerName))].length, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' }
                    ].map((stat, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl shadow-xl shadow-[#2C475C]/5 border border-gray-100 group hover:border-[#F97B27] transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
                                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color} transition-transform group-hover:scale-110`}>
                                    <stat.icon className="h-5 w-5" />
                                </div>
                            </div>
                            <div className="text-3xl font-bold text-[#2C475C]">{stat.val}</div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Primary Feed */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* New Requests Section */}
                        <section>
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-[#2C475C] flex items-center">
                                    New Inbound Requests
                                    {pendingRequests.length > 0 && (
                                        <span className="ml-3 bg-[#F97B27] text-white text-[10px] px-2 py-1 rounded-full animate-bounce">
                                            {pendingRequests.length} Action Required
                                        </span>
                                    )}
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 gap-6">
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
                                    <div className="bg-white rounded-[2rem] p-12 text-center border-2 border-dashed border-gray-200">
                                        <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Bell className="h-10 w-10 text-gray-300" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-400">All caught up! No new requests.</h3>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Confirmed Schedule section */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#2C475C] mb-6">Confirmed Schedule</h2>
                            <div className="grid grid-cols-1 gap-6">
                                {upcomingJobs.map(booking => (
                                    <RequestCard
                                        key={booking.id}
                                        booking={booking}
                                        onAccept={handleAccept}
                                        onReject={handleReject}
                                    />
                                ))}
                                {upcomingJobs.length === 0 && (
                                    <div className="bg-white rounded-[2rem] p-8 text-center border border-gray-100 shadow-sm text-gray-400 font-medium">
                                        Your calendar is empty for now.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    {/* Side Sidebar - Activity & History */}
                    <aside className="space-y-10">
                        <section className="bg-white rounded-[2rem] p-8 shadow-xl shadow-[#2C475C]/5 border border-gray-100">
                            <h3 className="text-xl font-bold text-[#2C475C] mb-6 flex items-center">
                                <TrendingUp className="h-5 w-5 mr-3 text-[#F97B27]" /> Performance
                            </h3>
                            <div className="space-y-6">
                                {pastJobs.slice(0, 5).map(job => (
                                    <div key={job.id} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0 group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-2 h-2 rounded-full ${job.status === 'completed' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <div>
                                                <p className="text-sm font-bold text-[#2C475C] group-hover:text-[#F97B27] transition-colors">{job.customerName}</p>
                                                <p className="text-[10px] text-gray-400 font-medium">{formatDate(job.date)}</p>
                                            </div>
                                        </div>
                                        <div className="text-sm font-bold text-[#2C475C]">
                                            {formatCurrency(job.amount || 0)}
                                        </div>
                                    </div>
                                ))}
                                {pastJobs.length === 0 && <p className="text-gray-400 text-sm text-center">No history yet.</p>}
                            </div>
                            <button className="w-full mt-8 py-3 text-[#2C475C] font-bold text-sm bg-gray-50 hover:bg-[#2C475C] hover:text-white rounded-2xl transition-all">
                                View Full History
                            </button>
                        </section>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ProviderDashboard;
