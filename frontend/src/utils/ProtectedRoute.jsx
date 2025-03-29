import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
    const { user, token } = useSelector((state) => state.auth);

    return user && token ? <Outlet /> : <Navigate to="/login" />
}
