import { useState } from "react";

export default function Register() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        const user = { login, password };

        try {
            const response = await fetch("http://localhost:8080/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Ошибка при регистрации");
            }
            setMessage("Регистрация прошла успешно!");
            setLogin("");
            setPassword("");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Зарегистрироваться</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} required/>
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Зарегистрироваться</button>
            </form>
            {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
    );
}
