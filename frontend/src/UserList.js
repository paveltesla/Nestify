import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Запрос на бэкенд Spring Boot
        axios.get('/users')  // Путь соответствует API на Spring Boot
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении пользователей:', error);
            });
    }, []);

    return (
        <div>
            <h1>Список пользователей</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username} - {user.email}</li>
                ))}
            </ul>
        </div>
    );
}

export default UserList;
