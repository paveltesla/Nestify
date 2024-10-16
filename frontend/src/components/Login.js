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
            const response = await fetch('http://localhost:8080/api/login', {  // Отправляем запрос на сервер
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),  // Передаем email и пароль
            });
            if (response.ok) {
                const userData = await response.json();  // Получаем данные пользователя с сервера
                login(userData);  // Сохраняем данные пользователя в контексте
                navigate('/home');  // Перенаправляем на главную страницу
            } else {
                setError('Invalid email or password');  // В случае неправильных данных
            }
        } catch (err) {
            setError('Error connecting to the server');  // Обработка ошибки соединения
        }
    };

    const handleRegister = () =>{
        navigate('/register')
    }

    return (
        <div className="login-page">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="login-button">Login</button>
                <button onClick={handleRegister} className={"register-button"}>Register</button>
            </form>
            {error && <p className="error">{error}</p>} {/* Сообщение об ошибке */}
        </div>
    );
};

export default Login;
