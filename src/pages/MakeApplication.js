import {useEffect, useState} from "react";
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "../components/Dropdown";
import {getCookie} from "../components/MyCookie";

export default function MakeApplication() {
    const [pochemy, setPochemy] = useState("");
    const [message, setMessage] = useState("");
    const [vibor, setVibor] = useState(null);

    let token = getCookie("token")
    let decodedPayload = null
    let options = [
        {value: 4, label: "Специалистом"},
        {value: 2, label: "Модератором"},
        {value: 3, label: "Админом"}
    ]

    let roles_id = {
        "ROLE_ADMIN": 3,
        "ROLE_MODER": 2,
        "ROLE_SPECIAL": 4,
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (token == null) {
            navigate("/login")
        }
    }, [navigate, token])

    if (token != null) {
        decodedPayload = JSON.parse(atob(token.split('.')[1]));
        // console.log(decodedPayload)
        decodedPayload.roles.forEach((role) => {
            let del_el = null
            options.forEach((opt) => {
                if (opt.value === roles_id[role]) {
                    del_el = opt
                }
            })
            if (del_el !== null) {
                options = options.filter((item) => item !== del_el)
            }
        })
    } else {
        navigate("/login")
    }

    const sendApplication = async (e) => {
        e.preventDefault();
        setMessage("");

        const appl = {pochemy, vibor};
        try {
            if (vibor === null) {
                throw new Error("Выберите роль")
            }
            if (pochemy.length === 0) {
                throw new Error("Укажите причину, почему именно вы должны получить эту роль")
            }
            const response = await fetch("http://localhost:8080/api/user/application/send", {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(appl),
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
                <form action="sendApplication">
                    <textarea placeholder="Почему именно вы?" value={pochemy} onChange={(e) => setPochemy(e.target.value)}
                           required/>
                    <Dropdown options={options} title={"Вы хотите стать: "} func={setVibor}/>
                    <button onClick={sendApplication}>Подать заявку</button>
                    {message && <p className="mt-2 text-red-500">{message}</p>}
                </form>
            </div>
        </Layout>
    );
}
