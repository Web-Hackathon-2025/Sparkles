import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Tag, Lock, Star, CheckCircle, ArrowRight, MapPin, Users, Briefcase } from 'lucide-react';
import Button from '../components/common/Button';
import { categories } from '../data/categories';
import { useUser } from '../context/UserContext';
import LoginModal from '../components/auth/LoginModal';
import OnboardingModal from '../components/auth/OnboardingModal';

const Landing = () => {
    const navigate = useNavigate();
    const { login, role, ROLES } = useUser();
    const [showOnboarding, setShowOnboarding] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F5F0] font-inter">
            {/* Header / Nav Placeholder */}
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-[#2C475C] p-2 rounded-lg">
                            <Briefcase className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-[#2C475C] tracking-tighter">Karigar</span>
                    </div>
                    <div className="flex items-center space-x-6">
                        <button onClick={() => setShowLogin(true)} className="text-[#2C475C] font-semibold hover:text-[#F97B27] transition-colors">
                            Sign In
                        </button>
                        <button onClick={() => setShowOnboarding(true)} className="btn-primary py-2 px-6">
                            Join Now
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center bg-[#F97B27]/10 rounded-full px-4 py-1 mb-6 border border-[#F97B27]/20">
                                <span className="text-xs font-bold text-[#F97B27] uppercase tracking-widest">Premium Service Platform</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold text-[#2C475C] leading-[1.1] mb-8">
                                Skill at your <br />
                                <span className="text-[#F97B27]">Fingerprints.</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
                                Connect with the most reliable local professionals. Verified skills,
                                upfront pricing, and a seamless booking experience.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button
                                    onClick={() => setShowOnboarding(true)}
                                    className="btn-primary text-lg px-10 py-4 shadow-lg shadow-[#F97B27]/20"
                                >
                                    Get Started
                                </button>
                                <button
                                    onClick={() => navigate('/customer')}
                                    className="btn-secondary text-lg px-10 py-4"
                                >
                                    Browse Pros
                                </button>
                            </div>

                            <div className="mt-10 flex items-center justify-center lg:justify-start space-x-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} className="w-10 h-10 rounded-full border-2 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" />
                                    ))}
                                </div>
                                <div className="text-sm">
                                    <div className="flex items-center text-yellow-500">
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                        <Star className="w-4 h-4 fill-current" />
                                    </div>
                                    <p className="text-gray-500 font-medium">Trusted by 2,000+ happy customers</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 relative">
                            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1000&auto=format&fit=crop"
                                    alt="Expert Pro"
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#2C475C]/60 to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <p className="text-sm font-medium opacity-80 uppercase tracking-widest mb-1">Featured Pro</p>
                                    <h3 className="text-xl font-bold">Ahmed Khan</h3>
                                    <p className="text-sm font-medium text-[#F97B27]">Master Electrician • 15+ Yrs Exp</p>
                                </div>
                            </div>
                            {/* Decorative blobs */}
                            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F97B27]/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#2C475C]/10 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-20">
                        <h2 className="text-4xl font-bold text-[#2C475C] mb-6">Built on Trust and Quality</h2>
                        <p className="text-lg text-gray-600">We bridged the gap between unreliable services and premium professional help.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Verified Identity", desc: "Every provider on Karigar is manually vetted with background checks.", color: "blue" },
                            { icon: CheckCircle, title: "Quality Guarantee", desc: "If you're not happy with the service, we'll make it right. No questions asked.", color: "green" },
                            { icon: Lock, title: "Secure Escrow", desc: "Payments are held in escrow until you're satisfied with the final result.", color: "orange" }
                        ].map((item, idx) => (
                            <div key={idx} className="card-premium p-8 text-center group">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 ${idx === 0 ? 'bg-blue-50 text-blue-600' : idx === 1 ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-[#F97B27]'}`}>
                                    <item.icon className="w-8 h-8" />
                                </div>
                                <h3 className="text-xl font-bold text-[#2C475C] mb-4">{item.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Popular Services Section */}
            <section className="py-24 bg-[#F8F5F0]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
                        <div>
                            <h2 className="text-4xl font-bold text-[#2C475C]">Popular Services</h2>
                            <p className="text-gray-600 mt-2">The most requested skills this week.</p>
                        </div>
                        <button onClick={() => navigate('/customer')} className="flex items-center text-[#F97B27] font-bold hover:translate-x-2 transition-transform">
                            View all categories <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {categories.slice(0, 8).map((category) => (
                            <div
                                key={category.id}
                                onClick={() => navigate('/customer')}
                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-[#F97B27] hover:-translate-y-1 transition-all cursor-pointer flex flex-col items-center text-center group"
                            >
                                <div className="text-2xl mb-3">{category.icon || '🛠️'}</div>
                                <h3 className="font-bold text-[#2C475C] group-hover:text-[#F97B27]">{category.name}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#2C475C] text-[#F8F5F0] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="col-span-1 md:col-span-2">
                            <div className="flex items-center space-x-2 mb-6">
                                <Briefcase className="h-8 w-8 text-[#F97B27]" />
                                <span className="text-3xl font-bold tracking-tighter">Karigar</span>
                            </div>
                            <p className="text-gray-300 max-w-sm leading-relaxed mb-8">
                                Redefining local service standards with trust, reliability, and expertise. Join the Pakistan's largest professional network.
                            </p>
                            <div className="flex space-x-4">
                                {/* Socials placeholders */}
                                {[1, 2, 3].map(i => <div key={i} className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F97B27] transition-colors cursor-pointer"></div>)}
                            </div>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                            <ul className="space-y-4">
                                {['About Us', 'Find a Pro', 'Join as Pro', 'Help Center'].map(link => (
                                    <li key={link}><a href="#" className="text-gray-400 hover:text-white transition">{link}</a></li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold mb-6">Contact</h4>
                            <ul className="space-y-4 text-gray-400">
                                <li className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> Karachi, Pakistan</li>
                                <li className="flex items-center">support@karigar.com</li>
                                <li className="flex items-center">+92 (300) 1234567</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                        <p>&copy; 2025 Karigar Inc. All rights reserved.</p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <a href="#" className="hover:text-white">Privacy</a>
                            <a href="#" className="hover:text-white">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>

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
        </div>
    );
};

export default Landing;
