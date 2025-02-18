import Layout from "./Layout";
import {deleteCookie} from "../components/MyCookie";
import {useNavigate} from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const logout = async (e) => {
        deleteCookie("token")
        navigate('/login');
    };

    return (
        <Layout>
            <button onClick={logout}>Выйти</button>
        </Layout>
    );
}
