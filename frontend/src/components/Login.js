import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../style/Login.module.css'; // Используем CSS Modules

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    setError('Invalid email or password');
                } else {
                    setError('Error during login');
                }
                return;
            }

            const userData = await response.json();
            if (userData?.token) {
                login(userData);
                localStorage.setItem('authToken', userData.token);
                navigate('/home');
            } else {
                setError('Unexpected server response');
            }
        } catch (err) {
            setError('Failed to connect to the server');
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        navigate('/register');
    };

    return (
        <div className={styles.loginPage}>
            <form onSubmit={handleLogin} className={styles.loginForm}>
                <h1>Login</h1>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputField}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.inputField}
                    required
                />
                <button type="submit" className={styles.loginButton} disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                <button type="button" onClick={handleRegister} className={styles.registerButton}>
                    Register
                </button>
                {error && <p className={styles.errorMessage}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;
