import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import Button from '../components/common/Button';
import ProviderCard from '../components/customer/ProviderCard';
import { categories } from '../data/categories';
import { providers } from '../data/providers';
import { useRole } from '../hooks/useRole';

const Landing = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { currentRole, ROLES } = useRole();

    const featuredProviders = providers.slice(0, 3);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        // In a real app, this would filter or navigate to a search results page
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Visual Role Indicator */}
            <div className={`py-2 text-center text-xs font-bold uppercase tracking-wider ${currentRole === ROLES.PROVIDER ? 'bg-indigo-900 text-indigo-100' : 'bg-blue-900 text-blue-100'
                }`}>
                Current View: Karigar {currentRole}
            </div>

            {/* Hero Section */}
            <section className="bg-indigo-600 text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Home Services, <span className="text-yellow-300">Simplified</span>
                    </h1>
                    <p className="mt-4 text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
                        Find trusted professionals for cleaning, repairs, and more. Book instantly with confidence.
                    </p>

                    <div className="mt-8 max-w-xl mx-auto">
                        <form onSubmit={handleSearch} className="relative flex items-center">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                type="text"
                                className="w-full py-4 pl-12 pr-4 rounded-full shadow-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                placeholder="What do you need help with?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full px-6"
                            >
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Popular Services</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer text-center group"
                            >
                                <div className="bg-indigo-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-indigo-100 transition">
                                    {/* In a real app, render dynamic icon based on category.icon string */}
                                    <Sparkles className="h-8 w-8 text-indigo-600" />
                                </div>
                                <h3 className="font-medium text-gray-900">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Providers Section */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Top Rated Pros</h2>
                        <Button variant="ghost" onClick={() => console.log('View all')}>View all</Button>
                    </div>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {featuredProviders.map((provider) => (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                                onBook={(p) => navigate(`/provider/${p.id}`)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Landing;
