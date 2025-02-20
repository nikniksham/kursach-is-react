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
                <Link to="/adminPanel" className="text-blue-500 underline">
                    Админская панель
                </Link><br/>
                <Link to="/test" className="text-blue-500 underline">
                    Тесты
                </Link><br/>
                {zn}
            </div>
        </Layout>
    );
}