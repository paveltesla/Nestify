import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly }) => {
    const { user, isAdmin } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/home" />;
    }

    return children;
};

export default PrivateRoute;