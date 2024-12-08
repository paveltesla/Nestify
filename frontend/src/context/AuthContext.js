import React, { createContext, useContext, useState, useEffect } from 'react';

// Определяем контекст
const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: (userData) => {},
    logout: () => {},
    isAdmin: false,
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setIsAuthenticated(true);
            setUser(userData);
            setIsAdmin(userData.roles.includes('ADMIN')); // Проверяем, есть ли роль ADMIN
        }
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        setIsAdmin(userData.roles.includes('ADMIN')); // Проверяем роли пользователя
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setIsAdmin(false);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
