import React, { createContext, useContext, useState, useEffect } from 'react';

// Определяем структуру данных для контекста
const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    login: (userData) => {}, // Принимает данные пользователя
    logout: () => {},  // Логика выхода из системы
});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    // При монтировании проверяем localStorage на наличие сохраненных данных
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = (userData) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));  // Сохраняем данные пользователя в localStorage
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');  // Очищаем localStorage при выходе
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Хук для использования контекста аутентификации
export const useAuth = () => {
    return useContext(AuthContext);
};
