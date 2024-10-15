// src/pages/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const { user } = useAuth();

    const handleLogout = () => {
        console.log("User logged out");
        localStorage.clear();
        logout();
        navigate('/');
    };

    const handleBooking = () => {
        navigate('/booking');  // Перенаправление на страницу бронирования
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Your Dashboard</h1>
            <p>You are now logged in!</p>
            <div style={{ marginTop: '20px' }}>
                <h3>Profile Information:</h3>
                <p>Username: {user?.name}</p>
                <p>Email: {user?.email}</p>
            </div>
            <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Logout
            </button>
            <button onClick={handleBooking} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Go to Booking
            </button>
        </div>
    );
};

export default HomePage;
