import React, {useEffect} from "react";
import {useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function ManageApplication() {
    const [application, setApplication] = useState(null);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(null);
    const [whyNot, setWhyNot] = useState("");

    const {application_id} = useParams();

    let token = getCookie("token")
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        getApplication()
        getComment()
    }, [navigate, token])

    const getApplication = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/application/getById?application_id=" + application_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            // console.log(data)
            setApplication(data)
        } catch (error) {
            setError(error.message);
        }
    };

    const getComment = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/comment/getById?application_id=" + application_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setWhyNot(data.text)
            // setApplication(data)
        } catch (error) {
            setError(error.message);
        }
    };

    const rejectApplication = async () => {
        try {
            if (whyNot.length > 1024) {
                throw new Error("Длина причины отказа не должна превышать 1024 символа")
            }
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/application/reject?application_id=" + application_id+"&why_not="+whyNot, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            // console.log(data)
            // setApplication(data)
            setMessage(data)
        } catch (error) {
            setError(error.message);
        }
    };

    const approveApplication = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/application/approve?application_id=" + application_id, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            // console.log(data)
            // setApplication(data)
            setMessage(data)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h1>Все логи:</h1>
                <Link to="/adminPanel" className="text-blue-500 underline">
                    Вернуться в админскую панель
                </Link><br/>

                {application != null ? (
                        <div>
                            <p>Просящий: {application.user.login}</p>
                            <p>Статус заявки: {application.statusApplications.status}</p>
                            <p>Текст заявки: {application.text}</p>
                            <textarea placeholder="Причина отказа:" value={whyNot} onChange={(e) => setWhyNot(e.target.value)}/>
                            <button onClick={rejectApplication}>Отклонить</button>
                            <button onClick={approveApplication}>Принять</button>
                        </div>
                    ) : null
                }
                {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
                {message && <p className="mt-2 text-red-500">{message}</p>}



            </div>
        </Layout>
    );
}