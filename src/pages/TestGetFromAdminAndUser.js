import {useState} from "react";
import {getCookie} from "../components/MyCookie";
import Layout from "./Layout";

export default function TestGetFromAdminAndUser() {
    const [fromAdmin, setFromAdmin] = useState("Не спрашивал");
    const [fromUser, setFromUser] = useState("Не спрашивал");

    const subminAdmin = async (e) => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/admin/hello", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });

            if (!response.ok) {
                throw new Error("Неверный пароль или логин");
            }
            console.log(response)
            setFromAdmin("ok")
        } catch (error) {
            setFromAdmin("Ne ok")
        }
    };

    const submitUser = async (e) => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/hello", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });

            if (!response.ok) {
                throw new Error("Неверный пароль или логин");
            }
            console.log(response)
            setFromUser("ok")
        } catch (error) {
            setFromUser("Ne ok")
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <p>Ответ от админа: {fromAdmin}</p><br/>
                <button onClick={subminAdmin}>Запрос админу</button>
                <br/>
                <p>Ответ от юзера: {fromUser}</p><br/>
                <button onClick={submitUser}>Запрос юзеру</button>
                <br/>
            </div>
        </Layout>
    );
}
