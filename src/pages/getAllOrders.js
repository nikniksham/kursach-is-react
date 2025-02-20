import React, {useEffect} from "react";
import {useState} from "react"
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";
import {Link, useNavigate} from "react-router-dom";

export default function GetAllOrders() {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    const statusi = {
        1: "🕘",
        2: "❌",
        3: "👷‍",
        4: "✅",
        5: "🗑",
    }

    const navigate = useNavigate();
    useEffect(() => {
        getAllOrders()
    }, [navigate])

    const getAllOrders = async () => {
        setError(null);
        try {
            const response = await fetch("http://localhost:8080/api/guest/orders/all", {
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Нет прав на это");
            }
            const data = await response.json();
            // console.log(data)
            setOrders(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h1>Все заказы:</h1>
                <Link to="/" className="text-blue-500 underline">
                    Вернуться на главную
                </Link><br/>
                {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
                {orders.length > 0 && (
                    <table className="mt-4 w-full border">
                        <thead>
                        <tr>
                            <th>ID заказа</th>
                            <th>Ису цели</th>
                            <th>Имя цели</th>
                            <th>Статус заказа</th>
                            <th>Посмотреть подробнее</th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.target_isu_num}</td>
                                <td>{order.target_name}</td>
                                <td>{order.statusOrders.status + " >>> " + statusi[order.statusOrders.id]}</td>
                                <td>
                                    <Link to={`/exploreOrder/${order.id}`} className="text-blue-500 underline">
                                        Подробнее
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