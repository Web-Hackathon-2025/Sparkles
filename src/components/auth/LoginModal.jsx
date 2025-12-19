import React, { useState } from 'react';
import { X, Lock, Mail, ChevronRight } from 'lucide-react';
import Button from '../common/Button';
import { ROLES } from '../../utils/constants';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
    const [email, setEmail] = useState('');
    const [role, setRole] = useState(ROLES.CUSTOMER);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) {
            setError('Please enter your email');
            return;
        }

        onLogin({
            name: email.split('@')[0],
            email: email,
            role: role,
            id: role === ROLES.PROVIDER ? 1 : 101 // Mock ID
        });
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
                    <div className="absolute inset-0 bg-[#2C475C]/60 backdrop-blur-sm"></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
                    <div className="bg-white px-8 pt-10 pb-8 sm:p-10 relative">
                        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-[#F97B27] transition-colors p-2 rounded-full hover:bg-gray-100">
                            <X className="h-6 w-6" />
                        </button>

                        <div className="text-center mb-10">
                            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-2xl bg-[#F97B27]/10 mb-6">
                                <Lock className="h-8 w-8 text-[#F97B27]" />
                            </div>
                            <h3 className="text-3xl font-bold text-[#2C475C]">Welcome Back</h3>
                            <p className="mt-2 text-gray-500 font-medium">Safe & Secure access to your portal</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#2C475C] mb-2">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="block w-full pl-12 border-2 border-gray-100 bg-gray-50 rounded-xl py-4 px-5 text-[#2C475C] focus:ring-[#F97B27] focus:border-[#F97B27] transition-all"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (error) setError('');
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#2C475C] mb-3">Portal Type</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setRole(ROLES.CUSTOMER)}
                                        className={`flex flex-col items-center justify-center py-4 px-2 border-2 rounded-2xl transition-all ${role === ROLES.CUSTOMER
                                            ? 'bg-orange-50 border-[#F97B27] text-[#F97B27]'
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                            }`}
                                    >
                                        <span className="font-bold">Seeker</span>
                                        <span className="text-[10px] uppercase opacity-60">I want to hire</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole(ROLES.PROVIDER)}
                                        className={`flex flex-col items-center justify-center py-4 px-2 border-2 rounded-2xl transition-all ${role === ROLES.PROVIDER
                                            ? 'bg-orange-50 border-[#F97B27] text-[#F97B27]'
                                            : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                                            }`}
                                    >
                                        <span className="font-bold">Provider</span>
                                        <span className="text-[10px] uppercase opacity-60">I want to work</span>
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <p className="text-sm font-bold text-red-500 flex items-center bg-red-50 p-3 rounded-lg">
                                    <X className="w-4 h-4 mr-2" /> {error}
                                </p>
                            )}

                            <button type="submit" className="btn-primary w-full py-4 text-lg shadow-lg shadow-[#F97B27]/20 flex items-center justify-center group">
                                Sign In Now
                                <ChevronRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm">
                            <span className="text-gray-500">New to Karigar?</span>{' '}
                            <button className="text-[#F97B27] font-bold hover:underline" onClick={onClose}>
                                Create Secure Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
