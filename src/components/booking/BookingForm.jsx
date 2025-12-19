import React, { useState } from 'react';
import Button from '../common/Button';

const BookingForm = ({ provider, onSubmit, onCancel }) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !date || !address) {
            setError('Please fill in all details to proceed');
            return;
        }

        onSubmit({
            providerId: provider.id,
            service: description,
            date: date,
            address: address,
            status: 'requested',
            amount: provider.hourlyRate ? provider.hourlyRate * 2 : 50 // Default mock estimation
        });
    };

    return (
        <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-[#2C475C]/5">
            <h3 className="text-2xl font-bold text-[#2C475C] mb-8">Secure Your Booking</h3>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium border border-red-100 animate-pulse">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-[#2C475C]/60 uppercase tracking-widest mb-2 ml-1">
                        What do you need help with?
                    </label>
                    <textarea
                        className="w-full bg-[#F8F5F0] border-2 border-transparent rounded-[1.5rem] p-4 focus:bg-white focus:border-[#F97B27] focus:ring-0 transition-all duration-300 resize-none"
                        rows="3"
                        placeholder="E.g. Full deep clean of a 3-bedroom apartment..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-[#2C475C]/60 uppercase tracking-widest mb-2 ml-1">
                            Execution Date
                        </label>
                        <input
                            type="date"
                            className="w-full bg-[#F8F5F0] border-2 border-transparent rounded-[1.5rem] p-4 focus:bg-white focus:border-[#F97B27] focus:ring-0 transition-all duration-300"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-[#2C475C]/60 uppercase tracking-widest mb-2 ml-1">
                        Service Location
                    </label>
                    <input
                        type="text"
                        className="w-full bg-[#F8F5F0] border-2 border-transparent rounded-[1.5rem] p-4 focus:bg-white focus:border-[#F97B27] focus:ring-0 transition-all duration-300"
                        placeholder="Apartment, Street, Area..."
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button type="submit" className="flex-1 py-4 text-lg rounded-2xl">
                        Request Availability
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        className="flex-1 py-4 text-lg rounded-2xl"
                    >
                        Back to Profile
                    </Button>
                </div>

                <p className="text-center text-[#2C475C]/40 text-xs font-medium">
                    By clicking "Request Availability", you agree to our terms of service.
                </p>
            </form>
        </div>
    );
};

export default BookingForm;
