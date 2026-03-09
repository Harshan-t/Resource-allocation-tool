import { useNavigate, Navigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../UserContext.jsx';

const ProtectedRoute = ({ children, user }) => {
    const { userData } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);

    const normalizeRole = (role) => {
        return String(role || '').toLowerCase() === 'admin' ? 'Admin' : 'user';
    };

    useEffect(() => {
        // Give a small delay to ensure userData is populated from localStorage
        const timer = setTimeout(() => setIsLoading(false), 100);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Check if user is authenticated and has the required role
    if (!userData.role) {
        return <Navigate to="/login" />;
    }

    const currentRole = normalizeRole(userData.role);
    const requiredRole = normalizeRole(user.role);

    return currentRole === requiredRole ? children : currentRole === "Admin" ? <Navigate to="/dashboardhome" /> : <Navigate to="/home" />;
};

export default ProtectedRoute;