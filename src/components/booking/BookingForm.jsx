import React, { useState } from 'react';
import Button from '../common/Button';

const BookingForm = ({ provider, onSubmit, onCancel }) => {
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!description || !date) {
            setError('Please fill in all fields');
            return;
        }

        onSubmit({
            providerId: provider.id,
            service: description,
            date: date,
            status: 'requested',
            amount: provider.hourlyRate * 2 // Mock estimation
        });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Book {provider.name}</h3>

            {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Service Description
                    </label>
                    <textarea
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        rows="3"
                        placeholder="Describe what you need help with..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Date
                    </label>
                    <input
                        type="date"
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="flex space-x-3">
                    <Button type="submit" className="flex-1 justify-center">
                        Confirm Booking
                    </Button>
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        className="flex-1 justify-center"
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
