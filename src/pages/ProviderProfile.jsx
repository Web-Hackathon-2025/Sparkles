import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, CheckCircle, Clock, Briefcase, History } from 'lucide-react';
import BookingForm from '../components/booking/BookingForm';
import Toast from '../components/common/Toast';
import { useUser } from '../context/UserContext';
import { formatDate } from '../utils/helpers';
import BookingStatus from '../components/customer/BookingStatus';

const ProviderProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useUser();

    // UI State
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [toast, setToast] = useState(null);

    // Data State
    const [provider, setProvider] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pastBookings, setPastBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Provider Details
                const providerRes = await fetch(`http://localhost:5000/providers/${id}`);
                if (!providerRes.ok) throw new Error('Provider not found');
                const providerData = await providerRes.json();
                setProvider(providerData);

                // Fetch Interaction History if user is logged in
                if (user) {
                    const bookingsRes = await fetch('http://localhost:5000/bookings');
                    if (bookingsRes.ok) {
                        const bookingsData = await bookingsRes.json();
                        // Filter for bookings between this user and this provider
                        const history = bookingsData.filter(b =>
                            b.providerId === parseInt(id) &&
                            b.customerName === user.name
                        );
                        setPastBookings(history);
                    }
                }
            } catch (err) {
                console.error("Error loading profile:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id, user]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F5F0]">
            <div className="w-16 h-16 border-4 border-[#F97B27] border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-[#2C475C] font-medium text-lg">Loading master profile...</p>
        </div>
    );

    if (error || !provider) return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F5F0] px-4">
            <div className="text-red-500 mb-4 bg-red-50 p-6 rounded-3xl border border-red-100 max-w-md text-center">
                <p className="font-bold text-xl mb-2">Oops!</p>
                <p>{error || 'Provider not found'}</p>
            </div>
            <button onClick={() => navigate(-1)} className="btn-secondary">Go Back</button>
        </div>
    );

    const handleBookingSubmit = async (data) => {
        if (!user) {
            setToast({ type: 'error', message: 'You must be signed in to book.' });
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    providerId: provider.id,
                    customerName: user.name,
                    service: provider.category,
                    date: data.date,
                    status: 'requested',
                    address: data.address,
                    notes: data.notes
                }),
            });

            if (response.ok) {
                setShowBookingForm(false);
                setToast({ message: `Success! Booking request sent for ${data.date}`, type: 'success' });
                setTimeout(() => navigate('/customer'), 2000);
            } else {
                throw new Error('Failed to submit booking');
            }
        } catch (err) {
            console.error('Booking error:', err);
            setToast({ message: 'Failed to submit booking. Please try again.', type: 'error' });
        }
    };

    const projectImages = [
        "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1581094794329-cd1361ddee2d?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1505798577917-a651a5d40320?w=400&h=300&fit=crop"
    ];

    return (
        <div className="min-h-screen bg-[#F8F5F0] pb-24">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            {/* Premium Header/Banner area */}
            <div className="bg-[#2C475C] h-64 md:h-80 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end">
                    <div className="pb-16 pt-32">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center text-white/70 hover:text-white font-medium mb-6 transition-colors duration-200"
                        >
                            <span className="mr-2">←</span> Back to Experts
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Provider Details */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 overflow-hidden relative">
                            {/* Accent blur */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F97B27]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>

                            <div className="md:flex gap-10 items-start">
                                <div className="md:flex-shrink-0 relative group">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#2C475C]/20 to-transparent rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <img
                                        className="h-64 w-64 object-cover rounded-[2.5rem] shadow-xl border-4 border-white mx-auto md:mx-0"
                                        src={provider.image}
                                        alt={provider.name}
                                    />
                                    {provider.availability && (
                                        <div className="absolute -bottom-2 -right-2 bg-green-500 border-4 border-white text-white p-2 rounded-full shadow-lg">
                                            <CheckCircle className="h-5 w-5" />
                                        </div>
                                    )}
                                </div>
                                <div className="mt-8 md:mt-2 text-center md:text-left flex-1">
                                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#F97B27]/10 text-[#F97B27] text-sm font-bold tracking-wider uppercase mb-4">
                                        {provider.category}
                                    </div>
                                    <h1 className="text-4xl md:text-5xl font-bold text-[#2C475C] leading-tight">{provider.name}</h1>

                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                                        <div className="flex items-center px-4 py-2 bg-[#F8F5F0] rounded-2xl">
                                            <Star className="h-5 w-5 text-[#F97B27] fill-[#F97B27]" />
                                            <span className="ml-2 text-xl font-bold text-[#2C475C]">{provider.rating}</span>
                                            <span className="ml-2 text-gray-400 text-sm">({provider.reviews} reviews)</span>
                                        </div>
                                        <div className="flex items-center text-[#2C475C]/60 font-medium">
                                            <Briefcase className="h-5 w-5 mr-2 text-[#F97B27]" />
                                            {provider.projects || 0} Projects Completed
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center md:justify-start mt-6 text-[#2C475C]/70 font-medium italic">
                                        <MapPin className="h-5 w-5 mr-2 text-[#F97B27]" />
                                        {provider.location}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-12 pt-12 border-t border-gray-100">
                                <h3 className="text-2xl font-bold text-[#2C475C] mb-6">Expert Background</h3>
                                <p className="text-[#2C475C]/80 text-lg leading-relaxed antialiased">
                                    {provider.description}
                                </p>
                            </div>
                        </div>

                        {/* Interaction History Section */}
                        {pastBookings.length > 0 && (
                            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-[#2C475C]/5">
                                <h3 className="text-2xl font-bold text-[#2C475C] mb-8 flex items-center">
                                    <div className="w-10 h-10 bg-[#2C475C]/5 rounded-xl flex items-center justify-center mr-4">
                                        <History className="h-6 w-6 text-[#F97B27]" />
                                    </div>
                                    Your History with {provider.name.split(' ')[0]}
                                </h3>
                                <div className="space-y-4">
                                    {pastBookings.map(booking => (
                                        <div key={booking.id} className="group bg-[#F8F5F0]/50 hover:bg-white p-6 rounded-2xl transition-all duration-300 border border-transparent hover:border-[#2C475C]/10 flex justify-between items-center">
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                    <Briefcase className="h-6 w-6 text-[#2C475C]/40" />
                                                </div>
                                                <div>
                                                    <p className="text-lg font-bold text-[#2C475C]">{booking.service}</p>
                                                    <p className="text-sm text-[#2C475C]/60">{formatDate(booking.date)}</p>
                                                </div>
                                            </div>
                                            <BookingStatus status={booking.status} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Portfolio Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-[#2C475C] flex items-center ml-4">
                                <Briefcase className="h-6 w-6 mr-3 text-[#F97B27]" />
                                Portfolio Showcase
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                {projectImages.map((img, index) => (
                                    <div key={index} className="rounded-[2rem] overflow-hidden shadow-lg h-56 group relative cursor-pointer">
                                        <div className="absolute inset-0 bg-[#2C475C]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                                            <span className="text-white font-bold tracking-widest text-sm">VIEW PROJECT</span>
                                        </div>
                                        <img
                                            src={img}
                                            alt={`Project ${index + 1}`}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Review Showcase */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl">
                            <h3 className="text-2xl font-bold text-[#2C475C] mb-10">Voices from the Community</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                {[1, 2].map((i) => (
                                    <div key={i} className="relative">
                                        <div className="flex items-center mb-6">
                                            <div className="h-14 w-14 rounded-2xl bg-[#F8F5F0] flex items-center justify-center text-[#2C475C] font-bold text-xl shadow-inner">
                                                {i === 1 ? 'JD' : 'AS'}
                                            </div>
                                            <div className="ml-4">
                                                <p className="text-lg font-bold text-[#2C475C]">{i === 1 ? 'John Doe' : 'Alice Smith'}</p>
                                                <div className="flex text-[#F97B27] gap-0.5 mt-1">
                                                    {[...Array(5)].map((_, idx) => (
                                                        <Star key={idx} className="h-4 w-4 fill-current" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[#2C475C]/70 text-lg leading-relaxed italic relative">
                                            <span className="text-4xl text-[#F97B27]/20 absolute -top-4 -left-4 font-serif">"</span>
                                            {i === 1 ? "Exceptional attention to detail. Every square inch was perfect. Professional, courteous, and highly efficient." : "Came highly recommended and did not disappoint. Transformed the space beyond my expectations."}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Booking Action */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-28 space-y-6">
                            {showBookingForm ? (
                                <BookingForm
                                    provider={provider}
                                    onSubmit={handleBookingSubmit}
                                    onCancel={() => setShowBookingForm(false)}
                                />
                            ) : (
                                <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-[#2C475C]/5 text-center">
                                    <div className="mb-8">
                                        <div className="text-[#2C475C]/60 text-sm font-bold tracking-widest uppercase mb-1">Starting from</div>
                                        <div className="text-5xl font-black text-[#2C475C] tracking-tight">{provider.pricing}</div>
                                        <div className="text-[#F97B27] font-bold mt-1">Upfront Pricing</div>
                                    </div>

                                    <div className="space-y-5 mb-10 text-left bg-[#F8F5F0] p-6 rounded-3xl border border-[#2C475C]/5">
                                        <div className="flex items-center text-[#2C475C] font-medium">
                                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 shrink-0">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            </div>
                                            Safety Checked & Verified
                                        </div>
                                        <div className="flex items-center text-[#2C475C] font-medium">
                                            <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center mr-4 shrink-0">
                                                <CheckCircle className="h-5 w-5 text-green-600" />
                                            </div>
                                            Sparkles Guarantee®
                                        </div>
                                        <div className="flex items-center text-[#2C475C] font-medium">
                                            <div className="w-8 h-8 rounded-full bg-[#F97B27]/10 flex items-center justify-center mr-4 shrink-0">
                                                <Clock className="h-5 w-5 text-[#F97B27]" />
                                            </div>
                                            Ready {provider.availability ? 'Within 24 Hours' : 'Next Week'}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setShowBookingForm(true)}
                                        className="btn-primary w-full py-5 text-xl rounded-2xl"
                                    >
                                        Initiate Booking
                                    </button>

                                    <p className="mt-6 text-[#2C475C]/50 text-sm font-medium">
                                        No payment required until job is done
                                    </p>
                                </div>
                            )}

                            {/* Trust signals card */}
                            <div className="bg-[#2C475C] text-white p-8 rounded-[2.5rem] shadow-xl overflow-hidden relative">
                                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                                <h4 className="text-xl font-bold mb-4 flex items-center">
                                    <CheckCircle className="h-6 w-6 mr-3 text-[#F97B27]" />
                                    Why Sparkles?
                                </h4>
                                <ul className="space-y-3 text-white/80 text-sm font-medium">
                                    <li className="flex items-start gap-2">• Verified Skillsets & Portfolios</li>
                                    <li className="flex items-start gap-2">• Secure In-Platform Messaging</li>
                                    <li className="flex items-start gap-2">• Disputes Resolution Team</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
