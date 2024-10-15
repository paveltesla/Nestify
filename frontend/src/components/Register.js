import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
    // Локальные состояния для полей регистрации
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    // Функция, которая обрабатывает отправку формы
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Отправка POST-запроса для регистрации пользователя
            const response = await axios.post('http://localhost:8080/api/register', {
                username,
                password,
                email
            });

            if (response.status === 200) {  // Успешная регистрация
                setSuccessMessage('User is registered successfully!');
                setUsername('');   // Очистка полей после регистрации
                setPassword('');
                setEmail('');
                setErrorMessage('');
                navigate('/login');  // Перенаправляем на страницу логина после успешной регистрации
            } else {  // В случае ошибки от сервера
                setErrorMessage('Registration failed. Please try again.');
            }
        } catch (error) {  // Обработка исключений (например, нет соединения с сервером)
            console.error('Error during registration:', error);
            setErrorMessage('Error during registration. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <div className="register-container" style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ display: 'block', width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>
                {/* Вывод сообщений об ошибке или успехе */}
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>Sign Up</button>
            </form>
        </div>
    );
}

export default Register;
