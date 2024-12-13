import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BookingCard from '../components/BookingCard';
import styles from '../style/HomePage.module.css';

const HomePage = () => {
    const navigate = useNavigate();
    const { user, isAdmin } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Меморизируем fetchBookings
    const fetchBookings = useCallback(async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(
                isAdmin
                    ? '/api/bookings'
                    : `/api/bookings/user?userId=${user?.id}`
            );

            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                setError('Failed to fetch bookings');
            }
        } catch {
            setError('Error connecting to the server');
        } finally {
            setLoading(false);
        }
    }, [user, isAdmin]); // Зависимости

    useEffect(() => {
        if (user) fetchBookings();
    }, [user, fetchBookings]);

    const handleDeleteBooking = async (bookingId) => {
        try {
            const response = await fetch(`/api/bookings/${bookingId}`, { method: 'DELETE' });
            if (response.ok) {
                setBookings((prev) => prev.filter((b) => b.id !== bookingId));
                alert('Booking deleted successfully');
            } else {
                alert('Failed to delete booking');
            }
        } catch {
            alert('Error deleting booking');
        }
    };

    const handleBooking = () => {
        navigate('/booking');
    };

    return (
        <div className={styles.homePage}>
            <h1>Welcome, {user?.username}</h1>
            <div className={styles.profileInfo}>
                <h3>Your Profile</h3>
                <p><strong>Email:</strong> {user?.email}</p>
            </div>

            {loading && <p>Loading bookings...</p>}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {!loading && !error && (
                <div>
                    <h3>{isAdmin ? 'All Bookings' : 'Your Bookings'}</h3>
                    {bookings.length > 0 ? (
                        <ul className={styles.bookingList}>
                            {bookings.map((booking) => (
                                <BookingCard
                                    key={booking.id}
                                    booking={booking}
                                    onDelete={handleDeleteBooking}
                                    isAdmin={isAdmin}
                                />
                            ))}
                        </ul>
                    ) : (
                        <p>No bookings found</p>
                    )}
                </div>
            )}

            <button onClick={handleBooking} className={styles.bookingButton}>
                Make a Booking
            </button>
        </div>
    );
};

export default HomePage;
