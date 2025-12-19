import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { providers } from '../data/providers';
import { Star, MapPin, CheckCircle, Clock } from 'lucide-react';
import BookingForm from '../components/booking/BookingForm';
import Toast from '../components/common/Toast';

const ProviderProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showBookingForm, setShowBookingForm] = useState(false);
    const [toast, setToast] = useState(null);

    const provider = providers.find(p => p.id === parseInt(id));

    if (!provider) {
        return <div className="text-center py-20 text-gray-500">Provider not found</div>;
    }

    const handleBookingSubmit = (data) => {
        console.log('Booking submitted:', data);
        setShowBookingForm(false);
        setToast({ message: `Booking request sent for ${data.date}!`, type: 'success' });

        // Delay redirect to let user see the toast
        setTimeout(() => {
            navigate('/customer');
        }, 2000);
    };

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
