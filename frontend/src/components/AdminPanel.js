import React, { useEffect, useState } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/admin/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                setError('Failed to fetch users');
            }
        } catch (err) {
            console.error(err);
            setError('Error connecting to server');
        }
    };

    const handleDelete = async (userId) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter((user) => user.id !== userId));
            } else {
                setError('Failed to delete user');
            }
        } catch (err) {
            console.error(err);
            setError('Error connecting to server');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ role: newRole }),
            });
            if (response.ok) {
                setUsers(users.map((user) =>
                    user.id === userId ? { ...user, role: newRole } : user
                ));
            } else {
                setError('Failed to update role');
            }
        } catch (err) {
            console.error(err);
            setError('Error connecting to server');
        }
    };

    return (
        <div className="admin-panel">
            <h1>Admin Panel</h1>
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>
                            <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </td>
                        <td>
                            <button onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPanel;
