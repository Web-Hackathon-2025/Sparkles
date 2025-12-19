import React from 'react';
import { Star, MapPin } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/helpers';

const ProviderCard = ({ provider, onBook }) => {
    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
            <div className="md:flex">
                <div className="md:flex-shrink-0">
                    <img
                        className="h-48 w-full object-cover md:w-48"
                        src={provider.image}
                        alt={provider.name}
                    />
                </div>
                <div className="p-8 w-full">
                    <div className="flex justify-between items-start">
                        <div>
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{provider.category}</div>
                            <h3 className="mt-1 text-xl font-bold text-gray-900">{provider.name}</h3>
                            <div className="flex items-center mt-2 text-gray-500">
                                <MapPin className="h-4 w-4 mr-1" />
                                <span className="text-sm">{provider.location}</span>
                            </div>
                        </div>
                        <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="ml-1 text-sm font-bold text-gray-700">{provider.rating}</span>
                            <span className="ml-1 text-xs text-gray-500">({provider.reviews})</span>
                        </div>
                    </div>

                    <p className="mt-4 text-gray-500 text-sm line-clamp-2">{provider.about}</p>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="text-lg font-bold text-gray-900">
                            {formatCurrency(provider.hourlyRate)}
                            <span className="text-sm text-gray-500 font-normal">/hr</span>
                        </div>
                        <Button onClick={() => onBook(provider)} size="sm">
                            Book Now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderCard;
