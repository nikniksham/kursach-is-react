import React from 'react';
import {getCookie} from "../components/MyCookie";
import {Link} from "react-router-dom";

const Header = () => {
    let token = getCookie("token")
    return (
        <header>
            {token != null ? (
                <Link to="/logout" className="text-blue-500 underline">
                    Выйти
                </Link>
            ) : (
                <Link to="/login" className="text-blue-500 underline">
                    Войти
                </Link>
            )}<br/>
            {token != null ? (
                <Link to="/profile" className="text-blue-500 underline">
                    Перейти в профиль
                </Link>
            ) : null
            }<br/>
            <Link to="/" className="text-blue-500 underline">
                На главную
            </Link>
        </header>
    );
};

export default Header;