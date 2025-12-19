import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sparkles, message-square, Bell, User } from 'lucide-react'; // Example icons
import { useRole } from '../../hooks/useRole';
import Button from './Button';

const Navbar = () => {
    const { role, switchRole, ROLES } = useRole();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <Sparkles className="h-8 w-8 text-indigo-600" />
                            <span className="ml-2 text-xl font-bold text-gray-900">Sparkles</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className={`${isActive('/') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                            >
                                Home
                            </Link>
                            {role === ROLES.CUSTOMER && (
                                <Link
                                    to="/dashboard"
                                    className={`${isActive('/dashboard') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    My Dashboard
                                </Link>
                            )}
                            {role === ROLES.PROVIDER && (
                                <Link
                                    to="/provider/dashboard"
                                    className={`${isActive('/provider/dashboard') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                >
                                    Provider Portal
                                </Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        {/* Role Switcher for Demo Purposes */}
                        <select
                            value={role}
                            onChange={(e) => switchRole(e.target.value)}
                            className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                            <option value={ROLES.CUSTOMER}>Customer View</option>
                            <option value={ROLES.PROVIDER}>Provider View</option>
                        </select>

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
