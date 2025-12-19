import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../utils/constants';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initialize user from local storage if available
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('sparkles_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [role, setRole] = useState(() => {
        const savedUser = localStorage.getItem('sparkles_user');
        return savedUser ? JSON.parse(savedUser).role : ROLES.CUSTOMER;
    });

    // Login / Register action
    const login = (userData) => {
        setUser(userData);
        setRole(userData.role);
        localStorage.setItem('sparkles_user', JSON.stringify(userData));
    };

    // Logout action
    const logout = () => {
        setUser(null);
        setRole(ROLES.CUSTOMER); // Default back to guest/customer view
        localStorage.removeItem('sparkles_user');
    };

    // Helper to switch role view (for testing or explicit switching)
    const switchRole = (newRole) => {
        setRole(newRole);
        if (user) {
            const updatedUser = { ...user, role: newRole };
            setUser(updatedUser);
            localStorage.setItem('sparkles_user', JSON.stringify(updatedUser));
        }
    };

    return (
        <UserContext.Provider value={{ user, role, login, logout, switchRole, ROLES }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
