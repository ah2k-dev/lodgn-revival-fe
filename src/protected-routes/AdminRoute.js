import React from 'react'
import { UseGetRole, useAuth } from '../hooks/auth';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({Component}) => {
    const isAuthenticated = useAuth();
    const role = UseGetRole()
    if (!isAuthenticated) {
        console.log("not authenticated");
        return <Navigate to="/" />;
    } else {
        if (role === "admin" || role === "moderator") {
            return <Component />;
        } else {
            return <Navigate to="/not-found" />;
        }
    }
}

export default AdminRoute