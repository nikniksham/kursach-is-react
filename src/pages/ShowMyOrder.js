import {useEffect, useState} from "react";
import Layout from "./Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import {getCookie} from "../components/MyCookie";

export default function ShowMyOrder(props) {
    const [pochemy, setPochemy] = useState("");
    const [stauts, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState("");
    const [order, setOrder] = useState("");
    const [targetIsuNum, setTargetIsuNum] = useState("");
    const [targetName, setTargetName] = useState("");
    const [link, setLink] = useState("");


    let token = getCookie("token")

    const navigate = useNavigate();


    const { order_id } = useParams();


    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        getOrderInfo()
        getComment()
    }, [navigate, token])


    if (token != null) {
    } else {
        navigate("/login")
    }

    const getComment = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/orders/get_comment?order_id="+order_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setComment(data.text)
            // console.log(data)
        } catch (error) {
        }
    };

    const getOrderInfo = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/orders/show_my_orders?order_id="+order_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setPochemy(data.description)
            setOrder(data)
            setTargetIsuNum(data.target_isu_num)
            setTargetName(data.target_name)
            setStatus(data.statusOrdersDTO.status)
        } catch (error) {
        }
    };

    const sendNewOrder = async (e) => {
        e.preventDefault();
        setMessage("");

        const ord = {pochemy, order_id, targetIsuNum, targetName};
        try {
            if (targetName.length === 0) {
                throw new Error("Укажите имя цели")
            }
            if (!/^\d{1,10}$/.test(targetIsuNum)) {
                throw new Error("Укажите номер ису цели (число)")
            }
            if (targetIsuNum.length > 10) {
                throw new Error("Максимальная длинна номера ису -> 10 символов")
            }
            if (pochemy.length === 0) {
                throw new Error("Укажите причину заказа")
            }
            const response = await fetch("http://localhost:8080/api/user/orders/update?order_id="+order_id, {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(ord),
            });
            if (!response.ok) {
                throw new Error("Чёто пошло не по плану");
            }

            let res = await response.text()
            if (/^\d+$/.test(res)) {
                setMessage("Заказ на эту цель уже существует")
                setLink("/exploreOrder/"+res)
            } else {
                setMessage(res);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <form action="sendNewApplication">
                    <p>Статус заявки: {stauts}</p>
                    {comment !== "" ? (
                        <p>Причина отказа: {comment}</p>
                    ) : null}
                    <input type="text" placeholder="Имя цели" value={targetName} onChange={(e) => setTargetName(e.target.value)} required/>
                    <input type="text" placeholder="Номер ису цели" value={targetIsuNum} onChange={(e) => setTargetIsuNum(e.target.value)} required/>
                    <textarea placeholder="Почему именно вы?" value={pochemy} onChange={(e) => setPochemy(e.target.value)}
                              required/>
                    <button onClick={sendNewOrder}>Обновить заказ</button>
                    {message && <p className="mt-2 text-red-500">{message}</p>}
                </form>
                {link !== "" ?
                    <Link to={link} className="text-blue-500 underline">
                        Посмотреть заказ на эту цель
                    </Link>
                    : null}
            </div>
        </Layout>
    );
}
