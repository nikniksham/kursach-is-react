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
                <Link to="/createOrder" className="text-blue-500 underline">
                    Создать заказ
                </Link><br/>
                <Link to="/getAllOrders" className="text-blue-500 underline">
                    Посмотреть заказы
                </Link><br/>
                <Link to="/getAllOrdersModer" className="text-blue-500 underline">
                    Посмотреть заказы (moder)
                </Link><br/>
                <Link to="/getAllOrdersSpecial" className="text-blue-500 underline">
                    Посмотреть заказы (special)
                </Link><br/>
                {zn}
            </div>
        </Layout>
    );
}