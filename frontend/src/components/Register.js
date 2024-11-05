import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Style.css';
import {useAuth} from "../context/AuthContext"; // Импортируем CSS файл

const Register = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const {login} = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:8080/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, username, password }),
            });

            console.log(response);

            if (response.ok) {
                const responseData = await response.json(); // Обработка как JSON
                console.log("Response Data:", responseData);
                login(responseData);
                navigate('/home');
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Error during registration');
            }
        } catch (err) {
            console.error(err);
            setError('Error connecting to the server');
        }
    }

    return (
        <div className="register-page">
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
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
                {error && <p className="error">{error}</p>} {/* Сообщение об ошибке */}
            </form>
        </div>
    );
};

export default Register;
