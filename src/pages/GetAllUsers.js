import React from "react";
import {useState} from "react"
import {Link} from "react-router-dom";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function GetAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/user/all", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });

            if (!response.ok) {
                throw new Error("Нет прав на это");
            }
            const data = await response.json();
            data.forEach((elem) => {
                let roles = []
                elem["roles"].forEach((role) => {
                    roles.push(role.id)
                })
                elem["ro"] = roles
            })
            setUsers(data);
            console.log(data)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
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
                            <th>Права специалиста</th>
                            <th>Права модератора</th>
                            <th>Права админа</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.login}</td>
                                <td>{user["ro"].includes(4) ? (<p>✅</p>) : (<p>❌</p>)}</td>
                                <td>{user["ro"].includes(2) ? (<p>✅</p>) : (<p>❌</p>)}</td>
                                <td>{user["ro"].includes(3) ? (<p>✅</p>) : (<p>❌</p>)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            </div>
        </Layout>
    );
}