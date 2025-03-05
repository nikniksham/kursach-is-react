import {useState} from "react";
import Layout from "./Layout";
import {getCookie} from "../components/MyCookie";

export default function SetNewPassword() {
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        let login = "asasasas"
        const user = {login, password};

        try {
            if (password !== password2) {
                throw new Error("Пароли не совпадают")
            }
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/set_new_password", {
                method: "POST",
                headers: {"Content-Type": "application/json", Authorization: `Bearer ${token}`},
                body: JSON.stringify(user),
            });
            console.log(response)
            let res = await response.text()
            console.log(res)
            if (!response.ok) {
                throw new Error(res);
            }
            setMessage(res);
            setPassword("");
            setPassword2("");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Смена пароля</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="password" placeholder="Новый пароль" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <input type="password" placeholder="Новый пароль повторно" value={password2}
                           onChange={(e) => setPassword2(e.target.value)} required/>
                    <button type="submit">Изменить пароль</button>
                </form>
                {message && <p className="mt-2 text-red-500">{message}</p>}
            </div>
        </Layout>
    );
}
