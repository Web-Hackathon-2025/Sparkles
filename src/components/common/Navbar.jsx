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
            <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <Link to="/" className="flex flex-shrink-0 items-center space-x-2 group">
                                <div className="bg-[#2C475C] p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
                                    <Sparkles className="h-6 w-6 text-white" />
                                </div>
                                <span className="text-2xl font-black text-[#2C475C] tracking-tighter">Karigar</span>
                            </Link>
                            <div className="hidden sm:ml-10 sm:flex sm:space-x-8">
                                <Link
                                    to="/"
                                    className={`${isActive('/') ? 'text-[#F97B27]' : 'text-[#2C475C] hover:text-[#F97B27]'} inline-flex items-center px-1 pt-1 text-sm font-bold transition-colors`}
                                >
                                    Universe
                                </Link>
                                {user && role === ROLES.CUSTOMER && (
                                    <Link
                                        to="/customer"
                                        className={`${isActive('/customer') ? 'text-[#F97B27]' : 'text-[#2C475C] hover:text-[#F97B27]'} inline-flex items-center px-1 pt-1 text-sm font-bold transition-colors`}
                                    >
                                        My Dashboard
                                    </Link>
                                )}
                                {user && role === ROLES.PROVIDER && (
                                    <Link
                                        to="/provider"
                                        className={`${isActive('/provider') ? 'text-[#F97B27]' : 'text-[#2C475C] hover:text-[#F97B27]'} inline-flex items-center px-1 pt-1 text-sm font-bold transition-colors`}
                                    >
                                        Control Center
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center space-x-6">
                            {user ? (
                                <>
                                    <div className="hidden md:flex flex-col items-end mr-2">
                                        <span className="text-[10px] font-black uppercase text-[#2C475C]/40 tracking-widest">Active Operator</span>
                                        <span className="text-[#2C475C] font-bold text-sm">{user.name}</span>
                                    </div>
                                    <Button variant="ghost" size="sm" className="relative group">
                                        <Bell className="h-5 w-5 text-[#2C1C1C]" />
                                        <span className="absolute top-1 right-1 h-2 w-2 bg-[#F97B27] rounded-full border-2 border-white"></span>
                                    </Button>
                                    <button
                                        onClick={handleLogout}
                                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#2C475C]/5 text-[#2C475C] hover:bg-red-50 hover:text-red-500 transition-all duration-300"
                                        title="Terminate Session"
                                    >
                                        <LogOut className="h-5 w-5" />
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center space-x-6">
                                    <button
                                        onClick={() => setShowLogin(true)}
                                        className="text-[#2C475C] font-bold text-sm hover:text-[#F97B27] transition-colors"
                                    >
                                        Sign In
                                    </button>
                                    <Button
                                        size="sm"
                                        className="bg-[#2C475C] text-white hover:bg-[#F97B27] px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-[#2C475C]/10"
                                        onClick={() => {
                                            if (location.pathname !== '/') {
                                                navigate('/');
                                            } else {
                                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                            }
                                        }}
                                    >
                                        Join Karigar
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
