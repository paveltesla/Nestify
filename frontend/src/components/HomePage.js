import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css';

const HomePage = () => {
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBookings = async () => {
            setLoading(true);
            try {
                const url = isAdmin
                    ? '/api/bookings' // Админ видит все брони
                    : `/api/bookings/user?userId=${user?.id}`; // Пользователь видит только свои брони

                const response = await fetch(url);
                if (response.ok) {
                    const data = await response.json();
                    setBookings(data);
                } else {
                    setError('Failed to fetch bookings');
                }
            } catch (error) {
                setError('Error fetching bookings');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchBookings();
        }
    }, [user, isAdmin]);

    const handleBooking = () => {
        navigate('/booking');
    };

    const handleDeleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
            if (response.ok) {
                setBookings((prevBookings) => prevBookings.filter((b) => b.id !== bookingId));
                alert('Booking deleted successfully!');
            } else {
                setError('Failed to delete booking');
            }
        } catch (error) {
            setError('Error deleting booking');
        }
    };

    return (
        <div className="home-page">
            <h1>Welcome {user?.username}</h1>
            <p>You are now logged in!</p>
            <div className="profile-info">
                <h3>Profile Information:</h3>
                <p>Email: {user?.email}</p>
            </div>

            {loading ? (
                <p>Loading bookings...</p>
            ) : error ? (
                <p className="error">{error}</p>
            ) : isAdmin ? (
                <div className="admin-info">
                    <h3>Admin Dashboard</h3>
                    <div className="bookings-info">
                        <h3>All Bookings:</h3>
                        {bookings.length > 0 ? (
                            <ul>
                                {bookings.map((booking) => (
                                    <li key={booking.id}>
                                        <p>Table: {booking.table.id}</p>
                                        <p>Date: {booking.date}</p>
                                        <p>Time: {booking.time}</p>
                                        <p>Party Size: {booking.partySize}</p>
                                        <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No bookings found.</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="user-info">
                    <h3>User Dashboard</h3>
                    <div className="bookings-info">
                        <h3>Your Bookings:</h3>
                        {bookings.length > 0 ? (
                            <ul>
                                {bookings.map((booking) => (
                                    <li key={booking.id}>
                                        <p>Table: {booking.table.id}</p>
                                        <p>Date: {booking.date}</p>
                                        <p>Time: {booking.time}</p>
                                        <p>Party Size: {booking.partySize}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>You have no bookings yet.</p>
                        )}
                    </div>
                </div>
            )}
            <button onClick={handleBooking} className="booking-button">Go to Booking</button>
        </div>
    );
};

export default HomePage;
