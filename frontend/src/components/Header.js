import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css'; // Здесь будут стили для Header

const Header = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        console.log('User logged out');
        logout();
        navigate('/'); // Перенаправление на страницу авторизации
    };

    return (
        <header className="header">
            <div className="logo">
                <h1>MyApp</h1> {/* Логотип или название приложения */}
            </div>
            <div className="nav-links">
                {user ? (
                    <>
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                        {/* Здесь можно добавить другие кнопки или ссылки */}
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate('/')}>
                            Login
                        </button>
                        <button onClick={() => navigate('/register')} >
                            Register
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default Header;