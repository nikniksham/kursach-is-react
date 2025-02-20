import React, {useEffect} from "react";
import {useState} from "react"
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";
import {Link, useNavigate} from "react-router-dom";

export default function GetAllApplications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const statusi = {
        1: "🕘",
        2: "✅",
        3: "❌",
        4: "🗑",
    }

    let token = getCookie("token")
    const navigate = useNavigate();
    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        getAllApplications()
    }, [navigate, token])

    const getAllApplications = async () => {
        setLoading(true);
        setError(null);
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/application/all", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            if (!response.ok) {
                throw new Error("Нет прав на это");
            }
            const data = await response.json();
            setApplications(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h1>Все заявки:</h1>
                <Link to="/adminPanel" className="text-blue-500 underline">
                    Вернуться в админскую панель
                </Link><br/>
                {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
                {applications.length > 0 && (
                    <table className="mt-4 w-full border">
                        <thead>
                        <tr>
                            <th>ID заявки</th>
                            <th>Проситель</th>
                            <th>Желаемая роль</th>
                            <th>Статус заявки</th>
                            <th>Взаимодействие</th>
                            <th>Посмотреть логи заявки</th>
                        </tr>
                        </thead>
                        <tbody>
                        {applications.map((appl) => (
                            <tr key={appl.id}>
                                <td>{appl.id}</td>
                                <td>{appl.user.login}</td>
                                <td>{appl.roles.name}</td>
                                <td>{appl.statusApplications.status + " >>> " + statusi[appl.statusApplications.id]}</td>
                                <td>
                                    { [1, 3].includes(appl.statusApplications.id) ? (
                                        <Link to={`/manageApplication/${appl.id}`} className="text-blue-500 underline">
                                            Отреагировать
                                        </Link>
                                    ) : null}
                                </td>
                                <td>
                                    <Link to={`/showApplicationLogs/${appl.id}`} className="text-blue-500 underline">
                                        Посмотреть логи
                                    </Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

            </div>
        </Layout>
    );
}