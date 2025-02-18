import {useEffect, useState} from "react";
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";
import {Dropdown} from "../components/Dropdown";
import {getCookie} from "../components/MyCookie";

export default function MakeApplication() {
    const [pochemy, setPochemy] = useState("");
    const [message, setMessage] = useState("");

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
        console.log(decodedPayload)
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
        // e.preventDefault();
        // setMessage("");
        //
        // const user = {login, password};
        //
        // try {
        //     if (password !== password2) {
        //         throw new Error("Пароли не совпадают")
        //     }
        //     const response = await fetch("http://localhost:8080/api/auth/register", {
        //         method: "POST",
        //         headers: {"Content-Type": "application/json"},
        //         body: JSON.stringify(user),
        //     });
        //
        //     if (!response.ok) {
        //         throw new Error("Ошибка при регистрации");
        //     }
        //     setMessage("Регистрация прошла успешно!");
        //     setLogin("");
        //     setPassword("");
        //     navigate("/login")
        // } catch (error) {
        //     setMessage(error.message);
        // }
    };

    return (
        <Layout>
            <div className="p-4">
                <form action="sendApplication">
                    <textarea placeholder="Почему именно вы?" value={pochemy} onChange={(e) => setPochemy(e.target.value)}
                           required/>
                    <Dropdown options={options} title={"Вы хотите стать: "}/>
                    <button onClick={sendApplication}>Подать заявку</button>
                    {message && <p className="mt-2 text-red-500">{message}</p>}
                </form>
            </div>
        </Layout>
    );
}
