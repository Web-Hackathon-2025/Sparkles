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

    if (loading) return <div className="text-center py-20">Loading profile...</div>;
    if (error || !provider) return <div className="text-center py-20 text-red-500">Error: {error || 'Provider not found'}</div>;

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
                    customerName: user.name, // Use logged-in user name
                    service: provider.category,
                    date: data.date,
                    status: 'requested',
                    address: data.address,
                    notes: data.notes
                }),
            });

            if (response.ok) {
                setShowBookingForm(false);
                setToast({ message: `Booking request sent for ${data.date}!`, type: 'success' });
                // Refresh history to show new booking immediately logic could go here
                setTimeout(() => navigate('/customer'), 2000);
            } else {
                throw new Error('Failed to submit booking');
            }
        } catch (err) {
            console.error('Booking error:', err);
            setToast({ message: 'Failed to submit booking. Please try again.', type: 'error' });
        }
    };

    // Mock projects for gallery
    const projectImages = [
        "https://images.unsplash.com/photo-1584622050111-993a426fbf0a?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1581094794329-cd1361ddee2d?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1505798577917-a651a5d40320?w=300&h=200&fit=crop"
    ];

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

            <button
                onClick={() => navigate(-1)}
                className="group flex items-center text-gray-500 hover:text-indigo-600 font-medium mb-8 transition-colors duration-200"
            >
                <div className="mr-2 p-1 rounded-full group-hover:bg-indigo-50 transition-colors">
                    &larr;
                </div>
                Back to Listings
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Provider Details */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="md:flex">
                            <div className="md:flex-shrink-0">
                                <img
                                    className="h-64 w-full object-cover md:w-64"
                                    src={provider.image}
                                    alt={provider.name}
                                />
                            </div>
                            <div className="p-8">
                                <div className="uppercase tracking-wide text-sm text-indigo-600 font-bold">{provider.category}</div>
                                <h1 className="mt-2 text-3xl font-bold text-gray-900">{provider.name}</h1>

                                <div className="flex items-center mt-4">
                                    <div className="flex items-center text-yellow-400">
                                        <Star className="h-5 w-5 fill-current" />
                                        <span className="ml-2 text-lg font-bold text-gray-900">{provider.rating}</span>
                                    </div>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-gray-500">{provider.reviews} reviews</span>
                                    <span className="mx-2 text-gray-300">•</span>
                                    <span className="text-gray-500">{provider.projects || 0} projects</span>
                                </div>

                                <div className="flex items-center mt-4 text-gray-500">
                                    <MapPin className="h-5 w-5 mr-2" />
                                    {provider.location}
                                </div>

                                <div className="mt-6">
                                    <h3 className="text-lg font-medium text-gray-900">About</h3>
                                    <p className="mt-2 text-gray-600 leading-relaxed">{provider.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Interaction History Section */}
                    {pastBookings.length > 0 && (
                        <div className="mt-8 bg-indigo-50 p-6 rounded-xl border border-indigo-100">
                            <h3 className="text-lg font-bold text-indigo-900 mb-4 flex items-center">
                                <History className="h-5 w-5 mr-2" />
                                Previous Interactions
                            </h3>
                            <div className="space-y-3">
                                {pastBookings.map(booking => (
                                    <div key={booking.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{booking.service}</p>
                                            <p className="text-xs text-gray-500">{formatDate(booking.date)}</p>
                                        </div>
                                        <BookingStatus status={booking.status} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Portfolio / Projects Section */}
                    <div className="mt-8">
                        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                            <Briefcase className="h-5 w-5 mr-2" /> Completed Projects
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {projectImages.map((img, index) => (
                                <div key={index} className="rounded-lg overflow-hidden shadow-sm h-48 group">
                                    <img
                                        src={img}
                                        alt={`Project ${index + 1}`}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Reviews Section */}
                    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Customer Reviews</h3>
                        {/* Mock reviews for visual completeness */}
                        <div className="space-y-6">
                            {[1, 2].map((i) => (
                                <div key={i} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                                    <div className="flex items-center mb-2">
                                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold">
                                            {i === 1 ? 'JD' : 'AS'}
                                        </div>
                                        <div className="ml-3">
                                            <p className="text-sm font-medium text-gray-900">{i === 1 ? 'John Doe' : 'Alice Smith'}</p>
                                            <div className="flex text-yellow-400 h-4 w-4">
                                                <Star className="fill-current" />
                                                <Star className="fill-current" />
                                                <Star className="fill-current" />
                                                <Star className="fill-current" />
                                                <Star className="fill-current" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 text-sm">Great service! Very professional and on time. Highly recommended.</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column: Booking Action */}
                <div className="lg:col-span-1">
                    {showBookingForm ? (
                        <BookingForm
                            provider={provider}
                            onSubmit={handleBookingSubmit}
                            onCancel={() => setShowBookingForm(false)}
                        />
                    ) : (
                        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 sticky top-6">
                            <h3 className="text-xl font-bold text-gray-900">{provider.pricing}</h3>
                            <p className="text-gray-500 text-sm mb-6">Estimated price</p>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    Background checked
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                                    Satisfaction guaranteed
                                </div>
                                <div className="flex items-center text-sm text-gray-600">
                                    <Clock className="h-5 w-5 text-indigo-500 mr-3" />
                                    Available {provider.availability ? 'Now' : 'Next Week'}
                                </div>
                            </div>

                            <button
                                onClick={() => setShowBookingForm(true)}
                                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md hover:shadow-lg transform active:scale-95"
                            >
                                Book Appointment
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProviderProfile;
