import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { providers } from '../data/providers';
import ProviderCard from '../components/customer/ProviderCard';
import BookingForm from '../components/booking/BookingForm';

const ProviderProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showBookingForm, setShowBookingForm] = useState(false);

    const provider = providers.find(p => p.id === parseInt(id));

    if (!provider) {
        return <div className="text-center py-20">Provider not found</div>;
    }

    const handleBookingSubmit = (data) => {
        console.log('Booking submitted:', data);
        alert('Booking request sent successfully!');
        setShowBookingForm(false);
        navigate('/dashboard');
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="text-indigo-600 hover:text-indigo-800 font-medium mb-4 inline-block"
                >
                    &larr; Back to Listings
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Provider Profile</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {/* Reusing ProviderCard but maybe we'd want a more detailed view here */}
                    <ProviderCard
                        provider={provider}
                        onBook={() => setShowBookingForm(true)}
                    />

                    <div className="mt-8 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Reviews</h3>
                        <p className="text-gray-500 italic">No reviews yet.</p>
                    </div>
                </div>

                <div>
                    {showBookingForm ? (
                        <BookingForm
                            provider={provider}
                            onSubmit={handleBookingSubmit}
                            onCancel={() => setShowBookingForm(false)}
                        />
                    ) : (
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to hire?</h3>
                            <p className="text-gray-500 mb-6">Check availability and book {provider.name.split(' ')[0]} now.</p>
                            <button
                                onClick={() => setShowBookingForm(true)}
                                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
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
