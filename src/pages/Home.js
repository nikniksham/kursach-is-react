import React from "react";
import {Link} from "react-router-dom";

export default function Home() {
    return (
        <div>
            <h1>Домашняя страница</h1>
            <Link to="/GetAllUsers" className="text-blue-500 underline">
                Посмотреть пользователей
            </Link><br/>
            <Link to="/CreateUser" className="text-blue-500 underline">
                Создать юзера
            </Link>
        </div>
    );
}