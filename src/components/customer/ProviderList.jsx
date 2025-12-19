import React from 'react';
import ProviderCard from './ProviderCard';

const ProviderList = ({ providers, onBookProvider }) => {
    if (!providers || providers.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No providers found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {providers.map((provider) => (
                <ProviderCard
                    key={provider.id}
                    provider={provider}
                    onBook={onBookProvider}
                />
            ))}
        </div>
    );
};

export default ProviderList;
