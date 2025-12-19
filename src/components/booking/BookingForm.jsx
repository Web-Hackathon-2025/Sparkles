import React, { useState } from 'react';
import Button from '../common/Button';

const BookingForm = ({ provider, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        date: '',
        time: '',
        description: '',
        address: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ ...formData, providerId: provider.id });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-gray-900">Book {provider.name}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        name="date"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Time</label>
                    <input
                        type="time"
                        name="time"
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Service Address</label>
                    <input
                        type="text"
                        name="address"
                        required
                        placeholder="123 Main St"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        rows={3}
                        placeholder="Describe the job details..."
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="flex justify-end space-x-3 mt-6">
                    <Button variant="secondary" onClick={onCancel}>Cancel</Button>
                    <Button type="submit">Confirm Booking</Button>
                </div>
            </form>
        </div>
    );
};

export default BookingForm;
