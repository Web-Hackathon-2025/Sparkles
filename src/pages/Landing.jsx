import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Tag, Lock, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Button from '../components/common/Button';
import ProviderCard from '../components/customer/ProviderCard';
import { categories } from '../data/categories';
import { providers } from '../data/providers';
import { useUser } from '../context/UserContext';
import LoginModal from '../components/auth/LoginModal';

const Landing = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const { login, role, ROLES } = useUser();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const featuredProviders = providers.slice(0, 3);

    const handleSearch = (e) => {
        e.preventDefault();
        console.log('Searching for:', searchTerm);
        navigate('/customer'); // Redirect to dashboard search
    };

    return (
        <div className="flex flex-col min-h-screen">
            {/* Visual Role Indicator */}
            <div className={`py-2 text-center text-xs font-bold uppercase tracking-wider ${role === ROLES.PROVIDER ? 'bg-indigo-900 text-indigo-100' : 'bg-blue-900 text-blue-100'}`}>
                Current View: Karigar {role}
            </div>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-10">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center bg-indigo-500 bg-opacity-30 rounded-full px-4 py-1 mb-6 border border-indigo-400 backdrop-blur-sm">
                            <span className="flex h-2 w-2 rounded-full bg-green-400 mr-2"></span>
                            <span className="text-sm font-medium text-indigo-100">Now live in your city</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
                            Expert Local Services,<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">Delivered Safely.</span>
                        </h1>
                        <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Connect with verified plumbers, electricians, cleaners, and more.
                            Transparent pricing and secure payments, every time.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Button
                                size="lg"
                                className="bg-white text-indigo-700 hover:bg-gray-50 shadow-xl border-none px-10 py-4 text-xl"
                                onClick={() => setShowOnboarding(true)}
                            >
                                Get Started
                            </Button>
                        </div>
                        <p className="mt-4 text-sm text-indigo-200">
                            Already have an account?{' '}
                            <button onClick={() => setShowLogin(true)} className="underline hover:text-white font-medium">
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="text-gray-50 fill-current">
                        <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    </svg>
                </div>
            </section>

            <OnboardingModal
                isOpen={showOnboarding}
                onClose={() => setShowOnboarding(false)}
                onComplete={(userData) => {
                    login(userData);
                    setShowOnboarding(false);
                    navigate(userData.role === ROLES.PROVIDER ? '/provider' : '/customer');
                }}
            />

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onLogin={(userData) => {
                    login(userData);
                    setShowLogin(false);
                    navigate(userData.role === ROLES.PROVIDER ? '/provider' : '/customer');
                }}
            />

            {/* Why Karigar Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900">Why choose Karigar?</h2>
                        <p className="mt-4 text-lg text-gray-600">We take the stress out of home maintenance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Shield className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Verified Experts</h3>
                            <p className="text-gray-600">Every provider passes a strict background check and skills assessment before joining.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Tag className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Upfront Pricing</h3>
                            <p className="text-gray-600">Know the price before you book. No hidden fees or last-minute surprises.</p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Lock className="h-7 w-7" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Booking</h3>
                            <p className="text-gray-600">Your payment is held securely and only released when the job is done right.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Categories */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <h2 className="text-3xl font-bold text-gray-900">Popular Services</h2>
                        <button onClick={() => navigate('/customer')} className="text-indigo-600 font-medium hover:text-indigo-800 flex items-center">
                            View all <ArrowRight className="ml-1 h-4 w-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                        {categories.map((category) => (
                            <div
                                key={category.id}
                                onClick={() => navigate('/customer')}
                                className="bg-gray-50 p-4 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition cursor-pointer text-center group border border-gray-100"
                            >
                                <span className="font-medium text-gray-700 group-hover:text-indigo-600">{category.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Proof / Testimonials */}
            <section className="py-20 bg-indigo-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-16">Trusted by your neighbors</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Emily R.", role: "Homeowner", text: "Found a plumber in 10 minutes who actually showed up on time. Karigar is a lifesaver!" },
                            { name: "David K.", role: "Business Owner", text: "We use Karigar for all our office cleaning needs. Professional, reliable, and easy billing." },
                            { name: "Sofia L.", role: "Busy Mom", text: "The verified badge gives me peace of mind when booking tutors for my kids. Highly recommend." }
                        ].map((Review, idx) => (
                            <div key={idx} className="bg-indigo-800 bg-opacity-50 p-8 rounded-2xl border border-indigo-700">
                                <div className="flex text-yellow-400 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="h-5 w-5 fill-current" />)}
                                </div>
                                <p className="text-indigo-100 mb-6 italic">"{Review.text}"</p>
                                <div className="flex items-center">
                                    <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white">
                                        {Review.name.charAt(0)}
                                    </div>
                                    <div className="ml-3">
                                        <p className="font-bold">{Review.name}</p>
                                        <p className="text-indigo-300 text-sm">{Review.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <span className="text-2xl font-bold text-white tracking-tighter">
                                Karigar<span className="text-indigo-500">.</span>
                            </span>
                        </div>
                        <div className="flex space-x-8 text-sm">
                            <a href="#" className="hover:text-white transition">About</a>
                            <a href="#" className="hover:text-white transition">Safety</a>
                            <a href="#" className="hover:text-white transition">For Pros</a>
                            <a href="#" className="hover:text-white transition">Contact</a>
                        </div>
                        <div className="mt-4 md:mt-0 text-xs">
                            &copy; 2025 Karigar Inc. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
