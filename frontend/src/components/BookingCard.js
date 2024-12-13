import React from 'react';
import styles from '../style/BookingCard.module.css';

const BookingCard = ({ booking, onDelete, isAdmin }) => {
    return (
        <li className={styles.card}>
            <div className={styles.details}>
                <p><strong>Table:</strong> {booking.table.id}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
                <p><strong>Party Size:</strong> {booking.partySize}</p>
            </div>
            {isAdmin && (
                <button
                    onClick={() => onDelete(booking.id)}
                    className={styles.deleteButton}
                >
                    Delete
                </button>
            )}
        </li>
    );
};

export default BookingCard;
