import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <span className="text-xl font-bold text-indigo-600">Sparkles</span>
                        <p className="mt-4 text-gray-500 text-sm">
                            Connecting you with trusted local professionals for all your home service needs.
                            We make home maintenance simple, reliable, and secure.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Company</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">About</Link></li>
                            <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Careers</Link></li>
                            <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Blog</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">Legal</h3>
                        <ul className="mt-4 space-y-4">
                            <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Privacy</Link></li>
                            <li><Link to="#" className="text-base text-gray-500 hover:text-gray-900">Terms</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 text-center">
                        &copy; {new Date().getFullYear()} Sparkles Inc. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
