import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css'; // Импортируем CSS файл

const HomePage = () => {
    const navigate = useNavigate();
    const { logout, user } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // Асинхронная функция для получения данных о бронированиях
        const fetchBookings = async () => {
            try {
                const response = await fetch(`/api/bookings?userId=${user?.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    console.error('Failed to fetch bookings');
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        if (user) {
            // Вызов асинхронной функции и обработка промиса
            fetchBookings().catch((error) => {
                console.error('Error occurred while fetching bookings:', error);
            });
        }
    }, [user]);

    const handleLogout = () => {
        console.log('User logged out');
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

            {/* Секция для отображения забронированных столиков */}
            <div className="bookings-info">
                <h3>Your Bookings:</h3>
                {bookings.length > 0 ? (
                    <ul>
                        {bookings.map((booking) => (
                            <li key={booking.id}>
                                <p>Table: {booking.table.name}</p>
                                <p>Date: {booking.date}</p>
                                <p>Time: {booking.time}</p>
                                <p>Party Size: {booking.partySize}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No bookings found.</p>
                )}
            </div>
        </div>
    );
};

export default HomePage;
