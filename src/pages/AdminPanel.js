import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from "../components/MyCookie";

export default function AdminPanel() {


    let token = getCookie("token")
    let decodedPayload = null
    let roles = []
    const navigate = useNavigate();


    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        decodedPayload = JSON.parse(atob(token.split('.')[1]));
        // eslint-disable-next-line react-hooks/exhaustive-deps
        roles = decodedPayload.roles
        if (!roles.includes("ROLE_ADMIN") && !roles.includes("ROLE_MODER")) {
            navigate("/")
        }
    }, [navigate, token])

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Админская панель</h2>
                <Link to="/getAllUsers" className="text-blue-500 underline">
                    Посмотреть всех пользователей
                </Link><br/>
                <Link to="/getAllApplications" className="text-blue-500 underline">
                    Посмотреть заявки
                </Link><br/>
            </div>
        </Layout>
    );
}
