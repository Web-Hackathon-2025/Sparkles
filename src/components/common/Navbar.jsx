import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, MessageSquare, Bell, User, LogOut } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import Button from './Button';
import LoginModal from '../auth/LoginModal';

const Navbar = () => {
    const { role, user, logout, login, ROLES } = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(false);

    const isActive = (path) => location.pathname === path;

    const handleLogin = (userData) => {
        login(userData);
        setShowLogin(false);
        navigate(userData.role === ROLES.PROVIDER ? '/provider' : '/customer');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <>
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
                                {user && role === ROLES.CUSTOMER && (
                                    <Link
                                        to="/customer"
                                        className={`${isActive('/customer') ? 'border-indigo-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'} inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                                    >
                                        My Dashboard
                                    </Link>
                                )}
                                {user && role === ROLES.PROVIDER && (
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
                            {user ? (
                                <>
                                    <div className="hidden md:flex items-center text-sm font-medium text-gray-700 mr-2">
                                        Hello, {user.name} ({role})
                                    </div>
                                    <Button variant="ghost" size="sm">
                                        <Bell className="h-5 w-5" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={handleLogout} title="Logout">
                                        <LogOut className="h-5 w-5" />
                                    </Button>
                                </>
                            ) : (
                                <div className="flex space-x-4">
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="text-gray-500 hover:text-gray-900 font-medium text-sm transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <Button
                                        size="sm"
                                        onClick={() => {
                                            // Ideally scroll to Get Started or trigger onboarding from here if on landing
                                            // For now, simpler to just let them click Get Started on hero
                                            window.location.href = "/";
                                        }}
                                    >
                                        Get Started
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <LoginModal
                isOpen={showLogin}
                onClose={() => setShowLogin(false)}
                onLogin={handleLogin}
            />
        </>
    );
};

export default Navbar;
