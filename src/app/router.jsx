import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Landing from '../pages/Landing';
import CustomerDashboard from '../pages/CustomerDashboard';
import ProviderDashboard from '../pages/ProviderDashboard';
import ProviderProfile from '../pages/ProviderProfile';
import BookingDetails from '../pages/BookingDetails';
import NotFound from '../pages/NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <App><NotFound /></App>,
        children: [
            {
                path: '/',
                element: <Landing />,
            },
            {
                path: '/customer',
                element: <CustomerDashboard />,
            },
            {
                path: '/provider',
                element: <ProviderDashboard />,
            },
            {
                path: '/provider/:id',
                element: <ProviderProfile />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
]);
