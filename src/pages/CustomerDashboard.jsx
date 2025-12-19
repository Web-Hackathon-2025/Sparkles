import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderList from '../components/customer/ProviderList';
import { categories } from '../data/categories';
import { bookings } from '../data/bookings';
import BookingStatus from '../components/customer/BookingStatus';
import BookingTimeline from '../components/customer/BookingTimeline';
import { formatDate, formatCurrency } from '../utils/helpers';
import { Search } from 'lucide-react';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('browse');

    // Dynamic Data State
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch providers from backend on mount
        const fetchProviders = async () => {
            try {
                const response = await fetch('http://localhost:5000/providers');
                if (!response.ok) {
                    throw new Error('Failed to fetch providers');
                }
                const data = await response.json();
                setProviders(data);
                setLoading(false);
            } catch (err) {
                console.error('Error loading providers:', err);
                setError('Failed to load providers. Please ensure the backend is running.');
                setLoading(false);
            }
        };

        fetchProviders();
    }, []);

    const filteredProviders = providers.filter(p => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* Tabs */}
            <div className="flex space-x-1 border-b border-gray-200 mb-8">
                <button
                    className={`pb-4 px-6 text-lg font-medium transition-all duration-200 border-b-2 ${activeTab === 'browse'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setActiveTab('browse')}
                >
                    Find a Professional
                </button>
                <button
                    className={`pb-4 px-6 text-lg font-medium transition-all duration-200 border-b-2 ${activeTab === 'bookings'
                            ? 'border-indigo-600 text-indigo-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                    onClick={() => setActiveTab('bookings')}
                >
                    My Bookings
                </button>
            </div>

            {activeTab === 'browse' ? (
                <>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                            <div className="flex-1">
                                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search Keywords</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                                    <input
                                        type="text"
                                        id="search"
                                        placeholder="Search by name, location (e.g. Downtown), or service..."
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-64">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                                >
                                    <option value="All">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-50 rounded-xl p-6 min-h-[500px]">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center h-full py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                                <p className="text-gray-500">Finding best professionals...</p>
                            </div>
                        ) : error ? (
                            <div className="text-center py-20">
                                <div className="text-red-500 text-lg font-medium mb-2">{error}</div>
                                <button className="text-indigo-600 hover:text-indigo-800 underline" onClick={() => window.location.reload()}>Retry</button>
                            </div>
                        ) : filteredProviders.length > 0 ? (
                            <ProviderList
                                providers={filteredProviders}
                                onBookProvider={(provider) => navigate(`/provider/${provider.id}`)}
                            />
                        ) : (
                            <div className="text-center py-20">
                                <p className="text-gray-500 text-lg">No professionals found matching your search.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                    className="mt-4 text-indigo-600 font-medium hover:text-indigo-800 underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        )}
                    </div>
                </>
            ) : (
                // My Bookings Tab Content
                <div className="space-y-6">
                    {bookings.map(booking => (
                        <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex flex-col md:flex-row justify-between mb-6">
                                <div>
                                    <div className="flex items-center mb-2">
                                        <h3 className="text-lg font-bold text-gray-900 mr-3">{booking.service}</h3>
                                        <BookingStatus status={booking.status} />
                                    </div>
                                    <p className="text-gray-500 text-sm">Booking ID: #{booking.id}</p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-2xl font-bold text-indigo-600">{formatCurrency(booking.amount || 0)}</p>
                                    <p className="text-gray-500 text-sm">{formatDate(booking.date)}</p>
                                </div>
                            </div>
                            <BookingTimeline status={booking.status} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomerDashboard;
