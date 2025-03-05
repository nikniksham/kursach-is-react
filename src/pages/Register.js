import {useState} from "react";
import Layout from "./Layout";
import {useNavigate} from "react-router-dom";

export default function Register() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const goToLogin = async (e) => {
        navigate('/login');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const user = {login, password};

        try {
            if (password !== password2) {
                throw new Error("Пароли не совпадают")
            }
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error(JSON.parse(await response.text())["message"]);
            }
            setMessage("Регистрация прошла успешно!");
            setLogin("");
            setPassword("");
            navigate("/login")
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Зарегистрироваться</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)}
                           required/>
                    <input type="password" placeholder="Пароль" value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <input type="password" placeholder="Пароль повторно" value={password2}
                           onChange={(e) => setPassword2(e.target.value)} required/>
                    <button type="submit">Зарегистрироваться</button>
                </form>
                <button onClick={goToLogin}>Войти</button>
                {message && <p className="mt-2 text-red-500">{message}</p>}
            </div>
        </Layout>
    );
}
