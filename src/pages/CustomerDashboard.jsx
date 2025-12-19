import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProviderList from '../components/customer/ProviderList';
import { providers } from '../data/providers';
import { categories } from '../data/categories';

const CustomerDashboard = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProviders = selectedCategory === 'All'
        ? providers
        : providers.filter(p => p.category === selectedCategory);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Find a Professional</h1>

                <div className="mt-4 md:mt-0">
                    <label htmlFor="category" className="mr-3 text-sm font-medium text-gray-700">Filter by Category:</label>
                    <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border"
                    >
                        <option value="All">All Categories</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 min-h-[500px]">
                <ProviderList
                    providers={filteredProviders}
                    onBookProvider={(provider) => navigate(`/provider/${provider.id}`)}
                />
            </div>
        </div>
    );
};

export default CustomerDashboard;
