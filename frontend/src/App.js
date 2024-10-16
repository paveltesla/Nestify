import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BookingPage from './components/BookingForm';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                    <Route path="/booking" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
