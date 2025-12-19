import React from 'react';
import ProviderDashboardComponent from '../components/provider/ProviderDashboard'; // Alias to avoid recursion
import { providers } from '../data/providers';
import { bookings } from '../data/bookings'; // Using bookings as requests for demo

const ProviderDashboardPage = () => {
    // Mock logged in provider
    const currentProvider = providers[0];

    // Mock requests (using existing bookings for demo)
    const myRequests = bookings.slice(0, 2);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <ProviderDashboardComponent
                provider={currentProvider}
                requests={myRequests}
            />
        </div>
    );
};

export default ProviderDashboardPage;
