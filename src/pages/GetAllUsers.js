import React, {useEffect} from "react";
import {useState} from "react"
import {Link, useNavigate} from "react-router-dom";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function GetAllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    let token = getCookie("token")
    const navigate = useNavigate();
    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        fetchUsers()
    }, [navigate, token])

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
            // console.log(data)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteRole = async (user_id, role_id) => {
        // console.log("DELETE")
        setError(null);
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/user/deleteRole?user_id="+user_id+"&role_id="+role_id, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            setError(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const assignRole = async (user_id, role_id) => {
        // console.log("ASSIGN")
        setError(null);
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/user/assignRole?user_id="+user_id+"&role_id="+role_id, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            setError(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h1>Все юзеры:</h1>
                <Link to="/adminPanel" className="text-blue-500 underline">
                    Вернуться в админскую панель
                </Link><br/>
                <button onClick={fetchUsers} className="text-blue-500 underline">
                    Обновить список
                </button><br/>

                {error && <p className="text-red-500 mt-2">Результат: {error}</p>}
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
                                <td>{user["ro"].includes(4) ? (<button onClick={() => deleteRole(user.id, 4)}>✅</button>) : (<button onClick={() => assignRole(user.id, 4)}>❌</button>)}</td>
                                <td>{user["ro"].includes(2) ? (<button onClick={() => deleteRole(user.id, 2)}>✅</button>) : (<button onClick={() => assignRole(user.id, 2)}>❌</button>)}</td>
                                <td>{user["ro"].includes(3) ? (<button onClick={() => deleteRole(user.id, 3)}>✅</button>) : (<button onClick={() => assignRole(user.id, 3)}>❌</button>)}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            </div>
        </Layout>
    );
}