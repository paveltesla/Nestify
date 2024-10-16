import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css'; // Импортируем CSS файл

const HomePage = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();

    const handleLogout = () => {
        console.log("User logged out");
        localStorage.clear();
        logout();
        navigate('/');
    };

    const handleBooking = () => {
        navigate('/booking');
    };

    return (
        <div className="home-page">
            <h1>Welcome {user?.username}</h1>
            <p>You are now logged in!</p>
            <div className="profile-info">
                <h3>Profile Information:</h3>
                <p>Email: {user?.email}</p>
            </div>
            <button onClick={handleLogout} className="logout-button">
                Logout
            </button>
            <button onClick={handleBooking} className="booking-button">
                Go to Booking
            </button>
        </div>
    );
};

export default HomePage;
