import React, {useEffect} from "react";
import {useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function ShowApplicationLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { application_id } = useParams();

    let token = getCookie("token")
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        getAllLogs()
    }, [navigate, token])

    const getAllLogs = async () => {
        setLoading(true);
        setError(null);
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/application/getAllLogs?application_id="+application_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setLogs(data)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h1>Все логи:</h1>
                <Link to="/adminPanel" className="text-blue-500 underline">
                    Вернуться в админскую панель
                </Link><br/>

                {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
                {logs.length > 0 && (
                    <table className="mt-4 w-full border">
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Кто сделал</th>
                            <th>Что сделал</th>
                            <th>Дата</th>
                        </tr>
                        </thead>
                        <tbody>
                        {logs.map((log) => (
                            <tr key={log.id}>
                                <td>{log.id}</td>
                                <td>{log.userDTO.id}</td>
                                <td>{log.statusApplicationsDTO.status}</td>
                                <td>{log.creationDate}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            </div>
        </Layout>
    );
}