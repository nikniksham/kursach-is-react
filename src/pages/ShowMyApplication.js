import {useEffect, useState} from "react";
import Layout from "./Layout";
import {useNavigate, useParams} from "react-router-dom";
import {getCookie} from "../components/MyCookie";

export default function ShowMyApplication(props) {
    const [pochemy, setPochemy] = useState("");
    const [stauts, setStatus] = useState("");
    const [message, setMessage] = useState("");
    const [comment, setComment] = useState("");

    let token = getCookie("token")

    const navigate = useNavigate();


    const { application_id } = useParams();


    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
        getApplicationInfo()
        getComment()
    }, [navigate, token])


    if (token != null) {
    } else {
        navigate("/login")
    }

    const getComment = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/application/get_comment?application_id="+application_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setComment(data.text)
            console.log(data)
        } catch (error) {
        }
    };

    const getApplicationInfo = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/application/show_my_application?application_id="+application_id, {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            setPochemy(data.text)
            setStatus(data.statusApplications.status)
        } catch (error) {
        }
    };

    const sendNewApplication = async (e) => {
        e.preventDefault();
        setMessage("");

        const appl2 = {pochemy, application_id};
        try {
            if (pochemy.length === 0) {
                throw new Error("Укажите причину, почему именно вы должны получить эту роль")
            }
            const response = await fetch("http://localhost:8080/api/user/application/update", {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(appl2),
            });
            if (!response.ok) {
                throw new Error("Чёто пошло не по плану");
            }
            setMessage(await response.text());
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
                    <textarea placeholder="Почему именно вы?" value={pochemy} onChange={(e) => setPochemy(e.target.value)}
                              required/>
                    <button onClick={sendNewApplication}>Обновить заявку</button>
                    {message && <p className="mt-2 text-red-500">{message}</p>}
                </form>
            </div>
        </Layout>
    );
}
