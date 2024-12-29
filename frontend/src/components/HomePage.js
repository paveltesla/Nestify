import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css';

const HomePage = () => {
    const navigate = useNavigate();
    const {user, isAdmin } = useAuth();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const url = isAdmin ? '/api/bookings' : `/api/bookings/user?userId=${user?.id}`;
                const response = await fetch(url);
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
            fetchBookings().catch((error) => {
                console.error('Error occurred while fetching bookings:', error);
            });
        }
    }, [user, isAdmin]);

    const handleBooking = () => {
        navigate('/booking');
    };

    const handleDeleteBooking = async (bookingId) => {
        console.log(`Deleting booking with ID: ${bookingId}`);
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
            if (response.ok) {
                console.log(`Booking with ID ${bookingId} deleted successfully.`);
                setBookings((prevBookings) => prevBookings.filter((b) => b.id !== bookingId));
            } else if (response.status === 404) {
                console.error(`Booking with ID ${bookingId} not found (404).`);
            } else {
                console.error(`Failed to delete booking. Status: ${response.status}`);
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
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
            {isAdmin ? (
                <div className="admin-info">
                    <h3>Admin Dashboard</h3>
                    <p>You have administrative access.</p>
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
                    <p>Standard user access.</p>
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
                                        <button onClick={() => handleDeleteBooking(booking.id)}>Delete</button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No bookings found.</p>
                        )}
                    </div>
                </div>
            )}
            <button onClick={handleBooking} className="booking-button">Go to Booking</button>
        </div>
    );
};

export default HomePage;
