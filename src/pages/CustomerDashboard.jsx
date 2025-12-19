import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderList from '../components/customer/ProviderList';
import { categories } from '../data/categories';
import BookingStatus from '../components/customer/BookingStatus';
import BookingTimeline from '../components/customer/BookingTimeline';
import { formatDate, formatCurrency } from '../utils/helpers';
import { Search, Filter, Star } from 'lucide-react';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('browse');

    // Dynamic Data State
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        rating: null,
        price: 'all'
    });

    useEffect(() => {
        // Fetch providers from backend on mount
        const fetchProviders = async () => {
            // ... existing fetch logic
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

        let matchesRating = true;
        if (filters.rating) {
            matchesRating = p.rating >= filters.rating;
        }

        let matchesPrice = true;
        if (filters.price !== 'all') {
            const price = p.hourlyRate || 0;
            if (filters.price === 'low') matchesPrice = price < 50;
            if (filters.price === 'mid') matchesPrice = price >= 50 && price <= 100;
            if (filters.price === 'high') matchesPrice = price > 100;
        }

        return matchesCategory && matchesSearch && matchesRating && matchesPrice;
    });

    // Bookings State
    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);

    // Fetch bookings when tab changes to 'bookings'
    useEffect(() => {
        if (activeTab === 'bookings') {
            const fetchBookings = async () => {
                setBookingsLoading(true);
                try {
                    const response = await fetch('http://localhost:5000/bookings');
                    if (!response.ok) throw new Error('Failed to fetch bookings');
                    const data = await response.json();
                    // In a real app, filter by customerId. For now showing all.
                    setBookings(data);
                } catch (err) {
                    console.error("Error fetching bookings:", err);
                } finally {
                    setBookingsLoading(false);
                }
            };
            fetchBookings();
        }
    }, [activeTab]);

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
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                                <Filter className="h-4 w-4 mr-2" /> Filters
                            </h3>

                            {/* Category Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                                >
                                    <option value="All">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Rating Filter */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                <div className="space-y-2">
                                    {[4, 3].map((star) => (
                                        <label key={star} className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                                checked={filters.rating === star}
                                                onChange={() => setFilters({ ...filters, rating: filters.rating === star ? null : star })}
                                            />
                                            <span className="ml-2 text-sm text-gray-600 flex items-center">
                                                {star}+ Stars <Star className="h-3 w-3 text-yellow-400 fill-current ml-1" />
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Price Filter */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Hourly Rate</label>
                                <div className="space-y-2">
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            className="border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                            checked={filters.price === 'all'}
                                            onChange={() => setFilters({ ...filters, price: 'all' })}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Any Price</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            className="border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                            checked={filters.price === 'low'}
                                            onChange={() => setFilters({ ...filters, price: 'low' })}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Under $50</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            className="border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                            checked={filters.price === 'mid'}
                                            onChange={() => setFilters({ ...filters, price: 'mid' })}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">$50 - $100</span>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="price"
                                            className="border-gray-300 text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                            checked={filters.price === 'high'}
                                            onChange={() => setFilters({ ...filters, price: 'high' })}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">$100+</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1">
                        {/* Search Bar */}
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    type="text"
                                    placeholder="Search professionals by name, location, or service..."
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Results Grid */}
                        <div className="min-h-[500px]">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
                                    <p className="text-gray-500">Finding best professionals...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-20 bg-white rounded-xl">
                                    <div className="text-red-500 text-lg font-medium mb-2">{error}</div>
                                    <button className="text-indigo-600 hover:text-indigo-800 underline" onClick={() => window.location.reload()}>Retry</button>
                                </div>
                            ) : filteredProviders.length > 0 ? (
                                <ProviderList
                                    providers={filteredProviders}
                                    onBookProvider={(provider) => navigate(`/provider/${provider.id}`)}
                                />
                            ) : (
                                <div className="text-center py-20 bg-white rounded-xl">
                                    <div className="mx-auto h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                        <Search className="h-10 w-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">No professionals found</h3>
                                    <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery('');
                                            setSelectedCategory('All');
                                            setFilters({ rating: null, price: 'all' });
                                        }}
                                        className="mt-4 text-indigo-600 font-medium hover:text-indigo-800 underline"
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                // My Bookings Tab Content
                <div className="space-y-6">
                    {bookingsLoading ? (
                        <div className="text-center py-10">Loading bookings...</div>
                    ) : bookings.length === 0 ? (
                        <div className="text-center py-10 text-gray-500">No bookings found.</div>
                    ) : (
                        bookings.map(booking => (
                            <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                                <div className="flex flex-col md:flex-row justify-between mb-6">
                                    <div>
                                        <div className="flex items-center mb-2">
                                            <button
                                                onClick={() => navigate(`/provider/${booking.providerId}`)}
                                                className="text-lg font-bold text-gray-900 mr-3 hover:text-indigo-600 transition-colors"
                                            >
                                                {booking.service}
                                            </button>
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
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomerDashboard;
