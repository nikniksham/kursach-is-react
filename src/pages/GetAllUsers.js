import React from "react";
import { useState } from "react"
import { Link } from "react-router-dom";

export default function GetAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch("http://localhost:8080/api/users");
            if (!response.ok) {
                throw new Error("Ошибка при загрузке пользователей");
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4">
            <h1>Все юзеры:</h1>
            <Link to="/" className="text-blue-500 underline">
                Вернуться на главную
            </Link><br/>
            <button onClick={fetchUsers} disabled={loading}>
                {loading ? "Загрузка..." : "Загрузить пользователей"}
            </button>

            {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
            {users.length > 0 && (
                <table className="mt-4 w-full border">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Логин</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.login}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

        </div>
    );
}