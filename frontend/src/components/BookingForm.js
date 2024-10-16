import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css';

const BookingForm = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [zones, setZones] = useState([]);
    const [tables, setTables] = useState([]);
    const [selectedZone, setSelectedZone] = useState('');
    const [selectedTable, setSelectedTable] = useState('');
    const [peopleCount, setPeopleCount] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/zones')
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched zones:", data);
                setZones(data);
            })
            .catch((error) => console.error('Error fetching zones:', error));
    }, []);

    const handleZoneChange = (e) => {
        setSelectedZone(e.target.value);
        fetch(`http://localhost:8080/api/tables?zoneId=${e.target.value}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched tables:", data);
                setTables(data);
            })
            .catch((error) => console.error('Error fetching tables:', error));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const bookingData = {
            userId: user.id,
            tableId: selectedTable,
            peopleCount,
            date,
            time,
        };

        try {
            const response = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (response.ok) {
                setSuccess('Booking successfully completed!');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error while booking the table');
            }
        } catch (err) {
            setError('Error connecting to the server');
        }
    };

    const handleBack = () => {
        navigate('/home'); // Перенаправление на домашнюю страницу
    };

    return (
        <div className="booking-form">
            <h1>Book a Table</h1>
            <form onSubmit={handleSubmit}>
                <select value={selectedZone} onChange={handleZoneChange} required>
                    <option value="">Select Zone</option>
                    {zones.length > 0 ? (
                        zones.map((zone) => (
                            <option key={zone.id} value={zone.id}>
                                {zone.name}
                            </option>
                        ))
                    ) : (
                        <option disabled>No zones available</option>
                    )}
                </select>
                <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
                    <option value="">Select Table</option>
                    {tables.length > 0 ? (
                        tables.map((table) => (
                            <option key={table.id} value={table.id}>
                                Table {table.tableNumber} - Capacity: {table.capacity} people
                            </option>
                        ))
                    ) : (
                        <option disabled>No tables available</option>
                    )}
                </select>
                <input
                    type="number"
                    placeholder="Number of people"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    required
                />
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
                <button type="submit">Book Table</button>
                <button onClick={handleBack} className="back-button">Back to Home</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default BookingForm;
