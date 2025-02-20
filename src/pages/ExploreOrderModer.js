import React, {useEffect} from "react";
import {useState} from "react"
import {Link, useNavigate, useParams} from "react-router-dom";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function ExploreOrderModer() {
    const [order, setOrder] = useState(null);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState(null);
    const [whyNot, setWhyNot] = useState("");

    const {order_id} = useParams();

    let token = getCookie("token")
    const navigate = useNavigate();

    const statusi = {
        1: "🕘",
        2: "❌",
        3: "👷‍",
        4: "🛠",
        5: "❓",
        6: "✅",
        7: "🗑",
    }

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        fetchOrder()
        getComment()
    }, [navigate, token])

    const fetchOrder = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/moder/orders/getById?order_id=" + order_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            // console.log(data)
            setOrder(data)
        } catch (error) {
            setError(error.message);
        }
    };

    const getComment = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/moder/comment/getById?order_id=" + order_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setWhyNot(data.text)
            // setApplication(data)
        } catch (error) {
            // setError(error.message);
        }
    };

    const rejectOrder = async () => {
        try {
            if (whyNot.length > 4096) {
                throw new Error("Длина причины отказа не должна превышать 4096 символа")
            }
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/moder/orders/reject?order_id=" + order_id + "&why_not=" + whyNot, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            setMessage(data)
        } catch (error) {
            setError(error.message);
        }
    };

    const approveOrder = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/moder/orders/approve?order_id=" + order_id, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            setMessage(data)
        } catch (error) {
            setError(error.message);
        }
    };

    const makeOrderOk = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/moder/orders/makeOk?order_id=" + order_id + "&why_not=" + whyNot, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            setMessage(data)
        } catch (error) {
            setError(error.message);
        }
    };

    const makeOrderBad = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/moder/orders/makeBad?order_id=" + order_id, {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.text();
            setMessage(data)
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
                <Link to="/getAllOrdersModer" className="text-blue-500 underline">
                    Вернуться к списку Заказов
                </Link><br/>

                {order != null ? (
                    <div>
                        <p>Просящий: {order.user.login}</p>
                        <p>Статус заказа: {order.statusOrders.status + " " + statusi[order.statusOrders.id]}</p>
                        <p>Номер ису цели: {order.target_isu_num}</p>
                        <p>Имя цели: {order.target_name}</p>
                        <p>Текст заказа: {order.description}</p>
                        {[1, 2].includes(order.statusOrders.id) ? (
                            <div>
                                <textarea placeholder="Причина отказа:" value={whyNot}
                                          onChange={(e) => setWhyNot(e.target.value)}/>
                                <button onClick={rejectOrder}>Отклонить</button>
                                <button onClick={approveOrder}>Принять</button>
                            </div>
                        ) : null}
                        {[5].includes(order.statusOrders.id) ? (
                            <div>
                                <button onClick={makeOrderOk}>Подтвердить выполнение ✅</button>
                                <button onClick={makeOrderBad}>Отказать ❌</button>
                            </div>
                        ) : null}
                    </div>
                ) : null
                }
                {error && <p className="text-red-500 mt-2">Ошибка: {error}</p>}
                {message && <p className="mt-2 text-red-500">{message}</p>}


            </div>
        </Layout>
    );
}