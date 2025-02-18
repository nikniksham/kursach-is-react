import {useState} from "react";
import {setCookie} from "../components/MyCookie";
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const goToReg = async (e) => {
        navigate('/register');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const user = {login, password};

        try {
            const response = await fetch("http://localhost:8080/api/auth/authenticate", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Неверный пароль или логин");
            }
            let token = await response.text();
            setCookie("token", token, 1);
            setMessage("Успешная аунтефикация!");
            setLogin("");
            setPassword("");
            navigate("/")
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Войти</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)}
                           required/>
                    <input type="password" placeholder="Пароль" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <button type="submit">Войти</button>
                </form>
                <button onClick={goToReg}>Зарегистрироваться</button>
                {message && <p className="mt-2 text-red-500">{message}</p>}
            </div>
        </Layout>
    );
}
