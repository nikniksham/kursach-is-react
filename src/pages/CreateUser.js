import { useState } from "react";

export default function CreateUserForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");

        // Кодирование пароля в base64 (имитация bytea[] для отправки)
        const encodedPassword = btoa(password);

        const user = { login, password: encodedPassword };

        try {
            const response = await fetch("http://localhost:8080/api/users/createUser", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Ошибка при создании пользователя");
            }
            setMessage("Пользователь успешно создан!");
            setLogin("");
            setPassword("");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-2">Создать пользователя</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" placeholder="Логин" value={login} onChange={(e) => setLogin(e.target.value)} required/>
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button type="submit">Создать</button>
            </form>
            {message && <p className="mt-2 text-red-500">{message}</p>}
        </div>
    );
}
