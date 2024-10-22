import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../style/Style.css'; // Импортируем CSS файл

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth(); // Используем login для автоматического входа после регистрации

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(''); // Сбрасываем сообщение об ошибке
        try {
            const response = await fetch('http://localhost:8080/api/register', { // Отправляем запрос на сервер
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }), // Передаем email, имя пользователя и пароль
            });
            if (response.ok) {
                const userData = await response.json();
                console.log("User Data:", userData);
                if(userData.is && userData){
                    login(userData);
                    navigate('/home');
                }else {
                    setError('err data server get')
                }

            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error during registration');
            }
        } catch (err) {
            setError('Error connecting to the server'); // Обработка ошибки соединения
        }
    }

    return (
        <div className="register-page">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit" className="register-button">Register</button>
            </form>
            {error && <p className="error">{error}</p>} {/* Сообщение об ошибке */}
        </div>
    );
};

export default Register;