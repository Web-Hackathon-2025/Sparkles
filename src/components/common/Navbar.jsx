import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, message-square, Bell, User } from 'lucide-react'; // Example icons
import { useRole } from '../../hooks/useRole';
import Button from './Button';

const Navbar = () => {
    const { currentRole, switchRole, ROLES } = useRole();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <Sparkles className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">Karigar</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`${isActive('/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Home
                            </Link>
                            {currentRole === ROLES.CUSTOMER && (
                                <Link
                                    to="/customer"
                                    className={`${isActive('/customer') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    My Dashboard
                                </Link>
                            )}
                            {currentRole === ROLES.PROVIDER && (
                                <Link
                                    to="/provider"
                                    className={`${isActive('/provider') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Provider Portal
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 p-1 rounded-lg">
                            <button
                                onClick={() => switchRole(ROLES.CUSTOMER)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentRole === ROLES.CUSTOMER
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => switchRole(ROLES.PROVIDER)}
                                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${currentRole === ROLES.PROVIDER
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Provider
                            </button>
                        </div>

                        <Button variant="ghost" size="sm">
                            <Bell className="h-5 w-5" />
                        </Button>
                        <Button variant="ghost" size="sm">
                            <User className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
