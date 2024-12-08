import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css'; // Импортируем CSS файл

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Сбрасываем сообщение об ошибке

        try {
            // Отправляем POST-запрос на сервер для авторизации
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Invalid email or password'); // Некорректный логин/пароль
                } else {
                    setError('Error during login'); // Другая ошибка
                }
                return;
            }

            const userData = await response.json(); // Получаем данные пользователя
            if (userData) {
                // Передаём данные пользователя в AuthContext
                login(userData);
                // Если токен используется, сохраняем его
                if (userData.token) {
                    localStorage.setItem('authToken', userData.token);
                }
                // Перенаправляем на домашнюю страницу
                navigate('/home');
            } else {
                setError('Invalid server response'); // Сервер не вернул пользователя
            }
        } catch (err) {
            setError('Error connecting to the server'); // Ошибка соединения
        }
    };

    const handleRegister = () => {
        navigate('/register'); // Переход на страницу регистрации
    };

    return (
        <div className="login-page">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                />
                <button type="submit" className="login-button">
                    Login
                </button>
                <button
                    type="button" // Избегаем сабмита формы
                    onClick={handleRegister}
                    className="register-button"
                >
                    Register
                </button>
            </form>
            {error && <p className="error">{error}</p>} {/* Сообщение об ошибке */}
        </div>
    );
};

export default Login;
