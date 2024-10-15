import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const BookingForm = () => {
    const { user } = useAuth();
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
        // Получаем список зон при загрузке компонента
        fetch('http://localhost:8080/api/zones')
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched zones:", data); // Проверка данных
                setZones(data);
            })
            .catch((error) => console.error('Error fetching zones:', error));
    }, []);

    const handleZoneChange = (e) => {
        setSelectedZone(e.target.value);
        // Получаем список столов для выбранной зоны
        fetch(`http://localhost:8080/api/tables?zoneId=${e.target.value}`)
            .then((response) => response.json())
            .then((data) => {
                console.log("Fetched tables:", data); // Проверка данных
                setTables(data);
            })
            .catch((error) => console.error('Error fetching tables:', error));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Создаем объект бронирования
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

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Book a Table</h1>
            <form onSubmit={handleSubmit}>
                {/* Выбор зоны */}
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

                {/* Выбор стола */}
                <select value={selectedTable} onChange={(e) => setSelectedTable(e.target.value)} required>
                    <option value="">Select Table</option>
                    {tables.length > 0 ? (
                        tables.map((table) => (
                            <option key={table.id} value={table.id}>
                                {table.name} - Capacity: {table.capacity} people
                            </option>
                        ))
                    ) : (
                        <option disabled>No tables available</option>
                    )}
                </select>

                {/* Количество людей */}
                <input
                    type="number"
                    placeholder="Number of people"
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(e.target.value)}
                    required
                />

                {/* Дата */}
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />

                {/* Время */}
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />

                {/* Кнопка отправки */}
                <button type="submit">Book Table</button>
            </form>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default BookingForm;
