import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from "../components/MyCookie";

export default function Profile() {
    let roles = null
    let username = null

    const [message, setMessage] = useState("");

    let token = getCookie("token")
    let decodedPayload = null
    const navigate = useNavigate();

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
    }, [navigate, token])

    if (token != null) {
        decodedPayload = JSON.parse(atob(token.split('.')[1]));
        console.log(decodedPayload)
        username = decodedPayload.sub
        roles = decodedPayload.roles
    } else {
        navigate("/login")
    }

    const handleSubmit = async (e) => {
        try {
            const response = await fetch("http://localhost:8080/api/user/hello", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            setMessage("Регистрация прошла успешно!");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Профиль пользователя: {username}</h2>
                <h3>Роли:</h3>
                <ul>
                    {roles.map((role, index) => (
                        <li key={index}>{role}</li>
                    ))}
                </ul>
                {!roles.includes("ROLE_SPECIAL") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать специалистом
                    </Link>
                ) : null
                }<br/>
                {!roles.includes("ROLE_MODER") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать модератором
                    </Link>
                ) : null
                }<br/>
                {!roles.includes("ROLE_ADMIN") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать админом
                    </Link>
                ) : null
                }<br/>
            </div>
        </Layout>
    );
}
