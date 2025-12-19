import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';

const NotFound = () => {
    return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
            <h1 className="text-9xl font-bold text-gray-200">404</h1>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">Page Not Found</h2>
            <p className="text-gray-500 mt-4 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="mt-8">
                <Button size="lg">Go Back Home</Button>
            </Link>
        </div>
    );
};

export default NotFound;
