import { useState, useEffect } from 'react';
import { ROLES } from '../utils/constants';

// A simple hook to mock user role management
export function useRole() {
    const [role, setRole] = useState(() => {
        return localStorage.getItem('sparkles_role') || ROLES.CUSTOMER;
    });

    const switchRole = (newRole) => {
        setRole(newRole);
        localStorage.setItem('sparkles_role', newRole);
    };

    return { role, switchRole, ROLES };
}
