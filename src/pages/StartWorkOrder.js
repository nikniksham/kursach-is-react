import React, {useEffect} from "react";
import {useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function StartWorkOrder() {
    const [order, setOrder] = useState(null);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(null);

    const { order_id } = useParams();

    const statusi = {
        1: "🕘",
        2: "❌",
        3: "👷‍",
        4: "🛠",
        5: "❓",
        6: "✅",
        7: "🗑",
    }

    let token = getCookie("token")
    const navigate = useNavigate();
    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        getOrder()
    }, [navigate, token])

    const getOrder = async () => {
        setError(null)
        setMessage(null)
        try {
            const response = await fetch("http://localhost:8080/api/special/orders/getById?order_id=" + order_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setOrder(data)
        } catch (error) {
            setError("Тише, ковбой, задача взята в работу");
        }
    };

    const startWorkOrder = async () => {
        setError(null)
        setMessage(null)
        try {
            const response = await fetch("http://localhost:8080/api/special/orders/startWork?order_id=" + order_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            setMessage(data)
        } catch (error) {
            setError(error.message)
            // setError(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h1>Все логи:</h1>
                {order != null ? (
                    <h1>Заказ # {order.id}</h1>
                ) : null}
                <Link to="/getAllOrders" className="text-blue-500 underline">
                    Вернуться к списку Заказов
                </Link><br/>

                {order != null ? (
                    <div>
                        <p>Просящий: {order.userDTO.login}</p>
                        <p>Статус заказа: {order.statusOrdersDTO.status + " " + statusi[order.statusOrdersDTO.id]}</p>
                        <p>Номер ису цели: {order.target_isu_num}</p>
                        <p>Имя цели: {order.target_name}</p>
                        <p>Текст заказа: {order.description}</p>
                        <button onClick={startWorkOrder}>Начинаю работу 🛠</button>
                    </div>
                ) : null
                }
                {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
                {message && <p className="mt-2 text-red-500">{message}</p>}



            </div>
        </Layout>
    );
}