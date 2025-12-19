import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[#2C475C] text-[#F8F5F0] py-20 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-2 mb-6">
                            <div className="bg-[#F97B27] p-2 rounded-lg">
                                <Briefcase className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-3xl font-bold tracking-tighter">Karigar</span>
                        </div>
                        <p className="text-gray-300 max-w-sm leading-relaxed mb-8">
                            Redefining local service standards with trust, reliability, and expertise. Join the Pakistan's largest professional network.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F97B27] flex items-center justify-center transition-colors">
                                <Instagram className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F97B27] flex items-center justify-center transition-colors">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-[#F97B27] flex items-center justify-center transition-colors">
                                <Facebook className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['About Us', 'Find a Pro', 'Join as Pro', 'Help Center'].map(link => (
                                <li key={link}>
                                    <Link to="#" className="text-gray-400 hover:text-white transition-colors">{link}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold mb-6">Contact</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" /> Karachi, Pakistan
                            </li>
                            <li className="flex items-center">support@karigar.com</li>
                            <li className="flex items-center">+92 (300) 1234567</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Karigar Inc. All rights reserved.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link to="#" className="hover:text-white">Privacy</Link>
                        <Link to="#" className="hover:text-white">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
