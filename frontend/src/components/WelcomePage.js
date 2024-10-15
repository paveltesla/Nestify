import React from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const WelcomePage = () =>{
    const navigate = useNavigate();
    const {logout, user} =useAuth();
    const handleLogout = () => {
        logout(); // Выход из системы
        navigate('/login'); // Перенаправляем на страницу логина
    };
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to Your Dashboard</h1>
            {user ? (
                <div>
                    <h2>Username: {user.name}</h2>
                    <p>Email: {user.email}</p>
                </div>
            ) : (
                <p>Please log in to see your profile information.</p>
            )}
            <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 20px' }}>
                Login
            </button>
        </div>
    );
}

export default WelcomePage;