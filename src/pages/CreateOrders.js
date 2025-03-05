import {useEffect, useState} from "react";
import Layout from "./Layout";
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from "../components/MyCookie";

export default function CreateOrders() {
    const [targetIsuNum, setTargetIsuNum] = useState("");
    const [targetName, setTargetName] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const [link, setLink] = useState("");

    let token = getCookie("token")

    const navigate = useNavigate();

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
    }, [navigate, token])

    const createOrder = async (e) => {
        e.preventDefault();
        setMessage("");
        setLink("")
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
            if (description.length === 0) {
                throw new Error("Укажите причину заказа")
            }

            let order = {targetName, targetIsuNum, description}
            const response = await fetch("http://localhost:8080/api/user/orders/create", {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(order),
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
                <form>
                    <input type="text" placeholder="Имя цели" value={targetName} onChange={(e) => setTargetName(e.target.value)} required/>
                    <input type="text" placeholder="Номер ису цели" value={targetIsuNum} onChange={(e) => setTargetIsuNum(e.target.value)} required/>
                    <textarea placeholder="Описание заказа" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                    <button onClick={createOrder}>Сделать заказ</button>
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
