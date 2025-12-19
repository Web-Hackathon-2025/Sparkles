import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const App = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Navbar />
            <main className="flex-grow">
                {children || <Outlet />}
            </main>
            <Footer />
        </div>
    );
};

export default App;
