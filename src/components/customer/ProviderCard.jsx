import React from 'react';
import { Star, MapPin, Briefcase, CheckCircle, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { formatCurrency } from '../../utils/helpers';

const ProviderCard = ({ provider, onBook }) => {
    return (
        <div className="card-premium overflow-hidden group">
            <div className="md:flex h-full">
                <div className="md:w-56 h-56 md:h-auto relative overflow-hidden shrink-0">
                    <img
                        className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        src={provider.image || 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=500&auto=format&fit=crop'}
                        alt={provider.name}
                    />
                    <div className="absolute top-4 left-4">
                        <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-current" />
                            <span className="text-xs font-bold text-[#2C475C]">{provider.rating}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-[#F97B27] mb-1">{provider.category}</div>
                                <h3 className="text-2xl font-bold text-[#2C475C] group-hover:text-[#F97B27] transition-colors">{provider.name}</h3>
                            </div>
                            <div className="flex items-center text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                <span className="text-[10px] font-bold uppercase">Verified</span>
                            </div>
                        </div>

                        <div className="flex items-center text-gray-500 text-sm mb-4 space-x-4">
                            <div className="flex items-center">
                                <MapPin className="h-3.5 w-3.5 mr-1 text-[#F97B27]" />
                                {provider.location}
                            </div>
                            <div className="flex items-center">
                                <Briefcase className="h-3.5 w-3.5 mr-1 text-[#2C475C]" />
                                {provider.projects || 0} Projects
                            </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-6">
                            {provider.about || 'Top-rated professional for your home and business needs. Guaranteed quality and punctual service.'}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-gray-400">Starting at</span>
                            <span className="text-xl font-bold text-[#2C475C]">
                                {provider.pricing || 'Pkr 500/hr'}
                            </span>
                        </div>
                        <button
                            onClick={() => onBook(provider)}
                            className="bg-[#2C475C] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#F97B27] transition-all flex items-center group/btn"
                        >
                            View Profile
                            <ChevronRight className="ml-1 h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProviderCard;
