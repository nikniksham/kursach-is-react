import React from "react";
import {Link} from "react-router-dom";
import {getCookie} from "../components/MyCookie";
import Layout from './Layout';

export default function Home() {
    let zn = getCookie("token");
    return (
        <Layout>
            <div>
                <h1>Домашняя страница</h1>
                <Link to="/GetAllUsers" className="text-blue-500 underline">
                    Посмотреть пользователей
                </Link><br/>
                <Link to="/Register" className="text-blue-500 underline">
                    Зарегистрироваться
                </Link><br/>
                <Link to="/Authenticate" className="text-blue-500 underline">
                    Войти
                </Link><br/>
                <Link to="/TestGetFromAdminAndUser" className="text-blue-500 underline">
                    Тесты
                </Link><br/>
                {zn}
            </div>
        </Layout>
    );
}