import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderList from '../components/customer/ProviderList';
import { categories } from '../data/categories';
import BookingStatus from '../components/customer/BookingStatus';
import BookingTimeline from '../components/customer/BookingTimeline';
import { formatDate, formatCurrency } from '../utils/helpers';
import { Search, Filter, Star, MapPin, Calendar, Clock, ChevronRight, Briefcase } from 'lucide-react';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('browse');

    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [filters, setFilters] = useState({
        rating: null,
        price: 'all'
    });

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await fetch('http://localhost:5000/providers');
                if (!response.ok) throw new Error('Failed to fetch providers');
                const data = await response.json();
                setProviders(data);
                setLoading(false);
            } catch (err) {
                console.error('Error:', err);
                setError('Unable to load experts at the moment.');
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
        if (filters.rating) matchesRating = p.rating >= filters.rating;

        let matchesPrice = true;
        if (filters.price !== 'all') {
            const priceStr = p.pricing || '';
            const price = parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
            if (filters.price === 'low') matchesPrice = price < 500;
            if (filters.price === 'mid') matchesPrice = price >= 500 && price <= 1000;
            if (filters.price === 'high') matchesPrice = price > 1000;
        }

        return matchesCategory && matchesSearch && matchesRating && matchesPrice;
    });

    const [bookings, setBookings] = useState([]);
    const [bookingsLoading, setBookingsLoading] = useState(false);

    useEffect(() => {
        if (activeTab === 'bookings') {
            const fetchBookings = async () => {
                setBookingsLoading(true);
                try {
                    const response = await fetch('http://localhost:5000/bookings');
                    if (!response.ok) throw new Error('Failed to fetch bookings');
                    const data = await response.json();
                    setBookings(data);
                } catch (err) {
                    console.error("Error:", err);
                } finally {
                    setBookingsLoading(false);
                }
            };
            fetchBookings();
        }
    }, [activeTab]);

    return (
        <div className="min-h-screen bg-[#F8F5F0]">
            {/* Dashboard Header */}
            <div className="bg-[#2C475C] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                        <div>
                            <h1 className="text-4xl font-bold tracking-tight">Expert Marketplace</h1>
                            <p className="text-gray-300 mt-2 text-lg">Find and hire the best local talent in seconds.</p>
                        </div>
                        <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-2xl border border-white/20">
                            <button
                                onClick={() => setActiveTab('browse')}
                                className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'browse' ? 'bg-[#F97B27] text-white shadow-lg' : 'text-white/80 hover:text-white'}`}
                            >
                                Browse Pros
                            </button>
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`px-6 py-2.5 rounded-xl font-bold transition-all ${activeTab === 'bookings' ? 'bg-[#F97B27] text-white shadow-lg' : 'text-white/80 hover:text-white'}`}
                            >
                                My Requests
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 pb-20">
                {activeTab === 'browse' ? (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Sidebar Filters */}
                        <aside className="w-full lg:w-72 flex-shrink-0">
                            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-[#2C475C]/5 border border-gray-100 sticky top-24">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-bold text-[#2C475C]">Filters</h3>
                                    <Filter className="h-5 w-5 text-[#F97B27]" />
                                </div>

                                <div className="space-y-8">
                                    {/* Category */}
                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-3">Service Type</label>
                                        <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                            {['All', ...categories.map(c => c.name)].map(cat => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setSelectedCategory(cat)}
                                                    className={`w-full text-left px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCategory === cat ? 'bg-orange-50 text-[#F97B27] border border-[#F97B27]/20' : 'text-gray-500 hover:bg-gray-50'}`}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-3">Min Rating</label>
                                        <div className="flex justify-between gap-2">
                                            {[3, 4, 4.5].map(r => (
                                                <button
                                                    key={r}
                                                    onClick={() => setFilters({ ...filters, rating: filters.rating === r ? null : r })}
                                                    className={`flex-1 py-2 rounded-xl text-xs font-bold border-2 transition-all ${filters.rating === r ? 'border-[#F97B27] bg-orange-50 text-[#F97B27]' : 'border-gray-100 text-gray-400'}`}
                                                >
                                                    {r}+ ⭐
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-bold text-[#2C475C] mb-3">Budget (Pkr)</label>
                                        <div className="space-y-3">
                                            {[
                                                { id: 'all', label: 'Any Price' },
                                                { id: 'low', label: 'Under 500' },
                                                { id: 'mid', label: '500 - 1000' },
                                                { id: 'high', label: 'Above 1000' }
                                            ].map(opt => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setFilters({ ...filters, price: opt.id })}
                                                    className={`w-full flex items-center gap-3 group`}
                                                >
                                                    <div className={`w-5 h-5 rounded-md border-2 transition-all flex items-center justify-center ${filters.price === opt.id ? 'border-[#F97B27] bg-[#F97B27]' : 'border-gray-200 group-hover:border-[#F97B27]'}`}>
                                                        {filters.price === opt.id && <div className="w-2 h-2 bg-white rounded-full"></div>}
                                                    </div>
                                                    <span className={`text-sm font-bold ${filters.price === opt.id ? 'text-[#2C475C]' : 'text-gray-400'}`}>{opt.label}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedCategory('All');
                                        setFilters({ rating: null, price: 'all' });
                                    }}
                                    className="w-full mt-10 py-3 text-sm font-bold text-[#F97B27] border-2 border-[#F97B27] rounded-2xl hover:bg-[#F97B27] hover:text-white transition-all"
                                >
                                    Reset All
                                </button>
                            </div>
                        </aside>

                        {/* Main Stream */}
                        <main className="flex-1">
                            {/* Top Bar with Search */}
                            <div className="bg-white rounded-3xl p-4 shadow-xl shadow-[#2C475C]/5 border border-gray-100 flex items-center gap-4 mb-8">
                                <div className="flex-1 relative">
                                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search by name, profession, or city..."
                                        className="w-full pl-14 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#F97B27] transition-all font-medium text-[#2C475C]"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Providers Grid */}
                            <div className="space-y-8">
                                {loading ? (
                                    <div className="py-20 text-center">
                                        <div className="animate-spin h-12 w-12 border-4 border-[#F97B27] border-t-transparent rounded-full mx-auto mb-4"></div>
                                        <p className="text-gray-500 font-bold">Curating top experts...</p>
                                    </div>
                                ) : filteredProviders.length > 0 ? (
                                    <ProviderList
                                        providers={filteredProviders}
                                        onBookProvider={(provider) => navigate(`/provider/${provider.id}`)}
                                    />
                                ) : (
                                    <div className="py-24 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Search className="h-10 w-10 text-gray-300" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-[#2C475C]">No results found</h3>
                                        <p className="text-gray-500 mt-2">Adjust your filters to see more professionals.</p>
                                    </div>
                                )}
                            </div>
                        </main>
                    </div>
                ) : (
                    /* My Bookings List */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                        {bookingsLoading ? (
                            <div className="col-span-full py-20 text-center">Loading your history...</div>
                        ) : bookings.length === 0 ? (
                            <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                                <Calendar className="h-16 w-16 text-gray-200 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-400">No active bookings yet</h3>
                                <button onClick={() => setActiveTab('browse')} className="mt-4 text-[#F97B27] font-bold underline">Start Browsing</button>
                            </div>
                        ) : (
                            bookings.map(booking => (
                                <Link
                                    to={`/booking/${booking.id}`}
                                    key={booking.id}
                                    className="group bg-white p-8 rounded-[2.5rem] shadow-xl border border-transparent hover:border-[#F97B27]/30 transition-all duration-500 overflow-hidden relative"
                                >
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97B27]/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-[#F97B27]/10 transition-colors"></div>

                                    <div className="flex justify-between items-start mb-8 relative z-10">
                                        <div className="flex gap-5">
                                            <div className="h-16 w-16 bg-[#F8F5F0] rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                <Briefcase className="h-8 w-8 text-[#2C475C]/40 group-hover:text-[#F97B27] transition-colors" />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black uppercase text-[#2C475C]/30 tracking-widest mb-1">Assigned Service</p>
                                                <h4 className="text-xl font-bold text-[#2C475C] group-hover:text-[#F97B27] transition-colors">{booking.service}</h4>
                                                <p className="text-sm font-medium text-[#2C475C]/60 flex items-center gap-1 mt-1">
                                                    with {booking.providerName || "Assigned Expert"}
                                                    <CheckCircle className="h-3 w-3 text-green-500" />
                                                </p>
                                            </div>
                                        </div>
                                        <BookingStatus status={booking.status} />
                                    </div>

                                    <div className="flex items-center justify-between pt-6 border-t border-[#2C475C]/5 relative z-10">
                                        <div className="flex items-center gap-6">
                                            <div className="flex items-center text-[#2C475C]/60 text-sm font-medium">
                                                <Calendar className="h-4 w-4 mr-2 text-[#F97B27]" />
                                                {formatDate(booking.date)}
                                            </div>
                                        </div>
                                        <div className="text-[#F97B27] opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-500 font-black text-xs tracking-widest uppercase flex items-center gap-2">
                                            Manage Intel <ArrowRight className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerDashboard;
