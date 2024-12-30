import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Если используете AuthContext

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth(); // Используем состояние авторизации

    // Функции для навигации
    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleBooking = () => {
        navigate('/booking');
    };

    // Логика отображения кнопок
    const renderButtons = () => {
        if (location.pathname === '/') {
            return null; // На странице логина кнопок нет
        }

        if (location.pathname === '/home') {
            return (
                <>
                    <button onClick={handleBooking}>Book a Table</button>
                    <button onClick={handleLogout}>Log out</button>
                </>
            );
        }

        if (location.pathname === '/booking') {
            return (
                <>
                    <button onClick={() => navigate('/home')}>Back to Home</button>
                    <button onClick={handleLogout}>Log out</button>
                </>
            );
        }
        if (location.pathname === '/register') {
            return (
                <>
                    <button onClick={() => navigate('/')}>Log in</button> {/* Кнопка для перехода на страницу логина */}
                </>
            );
        }
        return null; // Для других маршрутов
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>Nestyfy</h1>
            </div>
            <nav className="nav-links">
                {renderButtons()}
            </nav>
        </header>
    );
};

export default Header;
