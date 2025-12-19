import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { UserProvider } from '../context/UserContext';

const App = ({ children }) => {
    return (
        <UserProvider>
            <div className="flex flex-col min-h-screen bg-white">
                <Navbar />
                <main className="flex-grow">
                    {children || <Outlet />}
                </main>
                <Footer />
            </div>
        </UserProvider>
    );
};

export default App;
