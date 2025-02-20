import React, {useEffect} from "react";
import {useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function ExploreOrder() {
    const [order, setOrder] = useState(null);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(null);

    const { order_id } = useParams();

    const statusi = {
        1: "🕘",
        2: "❌",
        3: "👷‍",
        4: "✅",
        5: "🗑",
    }

    useEffect(() => {
        getOrder()
    }, [order_id])

    const getOrder = async () => {
        setError(null)
        setMessage(null)
        try {
            const response = await fetch("http://localhost:8080/api/guest/orders/getById?order_id=" + order_id, {
                method: "GET",
            });
            const data = await response.json();
            setOrder(data)
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                {order != null ? (
                    <h1>Заказ # {order.id}</h1>
                ) : null}
                <Link to="/getAllOrders" className="text-blue-500 underline">
                    Вернуться к списку Заказов
                </Link><br/>

                {order != null ? (
                    <div>
                        <p>Просящий: {order.user.login}</p>
                        <p>Статус заказа: {order.statusOrders.status + " " + statusi[order.statusOrders.id]}</p>
                        <p>Номер ису цели: {order.target_isu_num}</p>
                        <p>Имя цели: {order.target_name}</p>
                        <p>Текст заказа: {order.description}</p>
                    </div>
                ) : null
                }
                {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
                {message && <p className="mt-2 text-red-500">{message}</p>}



            </div>
        </Layout>
    );
}