import React, { useState } from 'react';
import { X, Lock, Mail } from 'lucide-react';
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

        // Simulating login - in real app would verify credentials
        // For now, any email works
        onLogin({
            name: email.split('@')[0], // derived name
            email: email,
            role: role
        });
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
                </div>

                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 relative">
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-500">
                            <X className="h-6 w-6" />
                        </button>

                        <div className="text-center mb-8">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 mb-4">
                                <Lock className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h3 className="text-2xl leading-6 font-bold text-gray-900">Sign In</h3>
                            <p className="mt-2 text-sm text-gray-500">Welcome back to Karigar</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                                        placeholder="you@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">I am a</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setRole(ROLES.CUSTOMER)}
                                        className={`flex justify-center py-2 px-4 border rounded-md text-sm font-medium transition-colors ${role === ROLES.CUSTOMER
                                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 z-10 ring-1 ring-indigo-500'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        Seeker
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setRole(ROLES.PROVIDER)}
                                        className={`flex justify-center py-2 px-4 border rounded-md text-sm font-medium transition-colors ${role === ROLES.PROVIDER
                                            ? 'bg-indigo-50 border-indigo-500 text-indigo-700 z-10 ring-1 ring-indigo-500'
                                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        Provider
                                    </button>
                                </div>
                            </div>

                            {error && <p className="text-sm text-red-600">{error}</p>}

                            <Button type="submit" className="w-full justify-center">
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            Don't have an account?{' '}
                            <button className="text-indigo-600 hover:text-indigo-500 font-medium" onClick={onClose}>
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginModal;
