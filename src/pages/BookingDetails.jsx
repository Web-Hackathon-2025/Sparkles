import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Calendar,
    MapPin,
    MessageSquare,
    Clock,
    ShieldCheck,
    ChevronLeft,
    User,
    DollarSign,
    CheckCircle,
    AlertCircle
} from 'lucide-react';
import Button from '../components/common/Button';
import BookingStatus from '../components/customer/BookingStatus';
import ChatBox from '../components/chat/ChatBox';
import Toast from '../components/common/Toast';
import { formatDate } from '../utils/helpers';
import { useUser } from '../context/UserContext';

const BookingDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    const [booking, setBooking] = useState(null);
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showChat, setShowChat] = useState(false);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        const fetchBookingData = async () => {
            setLoading(true);
            try {
                // In a real app, this would be a single join query or two parallel fetches
                const bookingRes = await fetch(`http://localhost:5000/bookings/${id}`);
                if (!bookingRes.ok) throw new Error('Booking not found');
                const bookingData = await bookingRes.json();
                setBooking(bookingData);

                const providerRes = await fetch(`http://localhost:5000/providers/${bookingData.providerId}`);
                if (providerRes.ok) {
                    const providerData = await providerRes.json();
                    setProvider(providerData);
                }
            } catch (err) {
                console.error("Error loading booking details:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingData();
    }, [id]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F5F0]">
            <div className="w-16 h-16 border-4 border-[#F97B27] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[#2C475C] font-medium text-lg">Retrieving booking intelligence...</p>
        </div>
    );

    if (error || !booking) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F5F0] px-4">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl text-center max-w-md">
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-[#2C475C] mb-4">Transfer Error</h1>
                <p className="text-[#2C475C]/60 mb-8">{error || "We couldn't locate this booking record across our nodes."}</p>
                <button onClick={() => navigate(-1)} className="btn-primary w-full py-4 rounded-2xl">Return to Dashboard</button>
            </div>
        </div>
    );

    const isProvider = user?.role === 'provider';

    return (
        <div className="min-h-screen bg-[#F8F5F0] pb-24 pt-32">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Actions */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-[#2C475C]/60 hover:text-[#2C475C] font-bold tracking-widest text-xs uppercase mb-4 transition-all"
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" /> Back to List
                        </button>
                        <h1 className="text-4xl md:text-5xl font-black text-[#2C475C] tracking-tight">
                            Job #{booking.id.toString().padStart(5, '0')}
                        </h1>
                        <p className="text-[#2C475C]/50 font-medium mt-2">
                            Initialized on {formatDate(new Date().toISOString())}
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <BookingStatus status={booking.status} />
                        <div className="h-10 w-px bg-[#2C475C]/10 hidden md:block mx-2"></div>
                        <button
                            onClick={() => setShowChat(true)}
                            className="bg-white text-[#2C475C] px-6 py-3 rounded-2xl shadow-lg border border-[#2C475C]/5 hover:border-[#F97B27]/30 transition-all flex items-center gap-2 group"
                        >
                            <MessageSquare className="h-5 w-5 text-[#F97B27] group-hover:scale-110 transition-transform" />
                            <span className="font-bold">Message {isProvider ? 'Customer' : 'Provider'}</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-10">
                        {/* Service Summary Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97B27]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <h3 className="text-2xl font-black text-[#2C475C] mb-8">Service Intelligence</h3>

                            <div className="space-y-8">
                                <div className="flex gap-6">
                                    <div className="h-14 w-14 bg-[#F8F5F0] rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                                        <ShieldCheck className="h-8 w-8 text-[#F97B27]" />
                                    </div>
                                    <div>
                                        <p className="text-[#2C475C]/40 text-xs font-bold uppercase tracking-widest mb-1">Declared Scope</p>
                                        <p className="text-xl md:text-2xl font-bold text-[#2C475C] leading-snug">
                                            {booking.service}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-[#2C475C]/5 rounded-xl flex items-center justify-center shrink-0">
                                            <Calendar className="h-6 w-6 text-[#2C475C]" />
                                        </div>
                                        <div>
                                            <p className="text-[#2C475C]/40 text-[10px] font-bold uppercase tracking-widest mb-0.5">Execution Date</p>
                                            <p className="font-bold text-[#2C475C]">{formatDate(booking.date)}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 bg-[#2C475C]/5 rounded-xl flex items-center justify-center shrink-0">
                                            <Clock className="h-6 w-6 text-[#2C475C]" />
                                        </div>
                                        <div>
                                            <p className="text-[#2C475C]/40 text-[10px] font-bold uppercase tracking-widest mb-0.5">Estimated Duration</p>
                                            <p className="font-bold text-[#2C475C]">2-4 Hours</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-[#2C475C]/5">
                                    <div className="flex gap-4">
                                        <div className="h-12 w-12 bg-[#2C475C]/5 rounded-xl flex items-center justify-center shrink-0">
                                            <MapPin className="h-6 w-6 text-[#F97B27]" />
                                        </div>
                                        <div>
                                            <p className="text-[#2C475C]/40 text-xs font-bold uppercase tracking-widest mb-1">Target Coordinates</p>
                                            <p className="font-bold text-[#2C475C] text-lg">{booking.address || "Location verification pending"}</p>
                                        </div>
                                    </div>
                                </div>

                                {booking.notes && (
                                    <div className="bg-[#F8F5F0] p-6 rounded-3xl border border-[#2C475C]/5">
                                        <p className="text-[#2C475C]/40 text-[10px] font-bold uppercase tracking-widest mb-2 flex items-center">
                                            <MessageSquare className="h-3 w-3 mr-1" /> Customer Addendum
                                        </p>
                                        <p className="text-[#2C475C] font-medium leading-relaxed italic">
                                            "{booking.notes}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Timeline / Progress Section */}
                        <div className="bg-[#2C475C] rounded-[2.5rem] p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
                            <h3 className="text-2xl font-black mb-10 flex items-center">
                                <ShieldCheck className="h-7 w-7 mr-3 text-[#F97B27]" />
                                Operational Timeline
                            </h3>

                            <div className="space-y-8 relative">
                                {/* Vertical line */}
                                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-white/10 hidden md:block"></div>

                                <div className="flex gap-8 relative z-10">
                                    <div className="h-8 w-8 rounded-full bg-green-500 border-4 border-[#2C475C] flex items-center justify-center shrink-0">
                                        <CheckCircle className="h-4 w-4 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-lg leading-none mb-1">Request Dispatched</p>
                                        <p className="text-white/50 text-sm">Synchronizing with provider's availability matrix...</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 relative z-10">
                                    <div className={`h-8 w-8 rounded-full ${booking.status !== 'requested' ? 'bg-green-500' : 'bg-white/10'} border-4 border-[#2C475C] flex items-center justify-center shrink-0`}>
                                        <CheckCircle className={`h-4 w-4 ${booking.status !== 'requested' ? 'text-white' : 'text-white/10'}`} />
                                    </div>
                                    <div className={booking.status === 'requested' ? 'opacity-50' : ''}>
                                        <p className="font-bold text-lg leading-none mb-1">Logistics Confirmed</p>
                                        <p className="text-white/50 text-sm">Provider has validated scope and timeline.</p>
                                    </div>
                                </div>

                                <div className="flex gap-8 relative z-10 opacity-30">
                                    <div className="h-8 w-8 rounded-full bg-white/10 border-4 border-[#2C475C] flex items-center justify-center shrink-0"></div>
                                    <div>
                                        <p className="font-bold text-lg leading-none mb-1">Execution & Delivery</p>
                                        <p className="text-white/50 text-sm">Real-time tracking available upon arrival.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Area */}
                    <div className="space-y-10">
                        {/* Stakeholder Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-[#2C475C]/5 text-center group">
                            <p className="text-[#2C475C]/40 text-[10px] font-bold uppercase tracking-widest mb-6">Primary Operational Contact</p>

                            <div className="relative mx-auto w-32 h-32 mb-6">
                                <div className="absolute inset-0 bg-[#F97B27] rounded-[2rem] rotate-12 group-hover:rotate-6 transition-transform"></div>
                                <div className="absolute inset-0 bg-white rounded-[2rem] flex items-center justify-center border-4 border-[#F8F5F0] overflow-hidden">
                                    {provider ? (
                                        <img src={provider.image} className="w-full h-full object-cover" alt={provider.name} />
                                    ) : (
                                        <User className="h-16 w-16 text-[#2C475C]/20" />
                                    )}
                                </div>
                            </div>

                            <h4 className="text-2xl font-black text-[#2C475C] mb-1">
                                {isProvider ? booking.customerName : (provider ? provider.name : "Loading Core...")}
                            </h4>
                            <p className="text-[#F97B27] font-bold text-sm mb-4">
                                {isProvider ? "Verified Customer" : (provider ? provider.category : "Top Tier Expert")}
                            </p>

                            <div className="flex items-center justify-center gap-2 mb-8 bg-[#F8F5F0] py-2 px-4 rounded-xl">
                                <ShieldCheck className="h-4 w-4 text-green-500" />
                                <span className="text-[10px] font-black uppercase text-[#2C475C]/60">Identity Verified</span>
                            </div>

                            <button
                                onClick={() => setShowChat(true)}
                                className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-2"
                            >
                                <MessageSquare className="h-5 w-5" /> Open Secure Comms
                            </button>
                        </div>

                        {/* Financial Intelligence Card */}
                        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 border border-[#2C475C]/5">
                            <h3 className="text-xl font-black text-[#2C475C] mb-6 flex items-center">
                                <DollarSign className="h-5 w-5 mr-2 text-[#F97B27]" />
                                Ledger Summary
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#2C475C]/60 font-medium">Core Service Fee</span>
                                    <span className="text-[#2C475C] font-black">Rs. {booking.amount}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-[#2C475C]/60 font-medium">Platform Logistics</span>
                                    <span className="text-[#2C475C] font-black">Rs. 0 (Promo)</span>
                                </div>
                                <div className="h-px bg-[#2C475C]/5 my-2"></div>
                                <div className="flex justify-between items-center pt-2">
                                    <span className="text-[#2C475C] font-black text-lg">Total Valuation</span>
                                    <span className="text-[#F97B27] font-black text-3xl tracking-tight">Rs. {booking.amount}</span>
                                </div>
                            </div>

                            <div className="bg-[#F8F5F0] p-4 rounded-2xl flex items-start gap-3">
                                <AlertCircle className="h-5 w-5 text-[#2C475C]/40 shrink-0 mt-0.5" />
                                <p className="text-[10px] font-medium text-[#2C475C]/60 leading-relaxed italic">
                                    Funds are held in escrow. Release occurs only upon your digital signature of satisfaction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Modal Interface */}
            {showChat && (
                <div className="fixed inset-0 z-[100] bg-[#2C475C]/40 backdrop-blur-md flex items-end sm:items-center justify-center p-0 sm:p-4">
                    <div className="bg-white w-full max-w-4xl h-[90vh] sm:h-[80vh] rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-3xl overflow-hidden flex flex-col border border-white/20">
                        <div className="p-6 bg-[#2C475C] text-white flex justify-between items-center shrink-0">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shrink-0 overflow-hidden">
                                    {provider && !isProvider ? (
                                        <img src={provider.image} className="w-full h-full object-cover" alt="" />
                                    ) : (
                                        <User className="h-6 w-6 text-[#2C475C]" />
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-black text-xl leading-none">
                                        {isProvider ? booking.customerName : (provider ? provider.name : "Secure Terminal")}
                                    </h4>
                                    <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest mt-1">Private E2E Encrypted</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowChat(false)}
                                className="bg-white/10 hover:bg-white/20 h-10 w-10 rounded-full flex items-center justify-center transition-all"
                            >
                                <ChevronLeft className="h-6 w-6 rotate-90" />
                            </button>
                        </div>
                        <div className="flex-1 overflow-hidden relative">
                            <ChatBox booking={booking} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingDetails;
