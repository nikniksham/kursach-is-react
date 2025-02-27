import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from "../components/MyCookie";

export default function Profile() {
    let roles = null
    let username = null

    const [apsDict, setApsDict] = useState([])
    const [ordDict, setOrdDict] = useState([])
    const [specialAp, setSpecialAp] = useState([])
    const [moderAp, setModerAp] = useState([])
    const [adminAp, setAdminAp] = useState([])

    const statusi_appl = {
        1: "🕘",
        2: "✅",
        3: "❌",
        4: "🗑",
    }

    const statusi_ord = {
        1: "🕘",
        2: "❌",
        3: "👷‍",
        4: "🛠",
        5: "❓",
        6: "✅",
        7: "🗑",
    }

    let aps_dict_local = {}
    let token = getCookie("token")
    let decodedPayload = null
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMyOrders = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/orders/get_all_my_orders", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            // console.log(data)
            setOrdDict(data)
        } catch (error) {
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMyApplications = async () => {
        try {
            let token = getCookie("token");
            const response = await fetch("http://localhost:8080/api/user/application/get_all_my_applications", {
                method: "GET",
                headers: {Authorization: `Bearer ${token}`}
            });
            const data = await response.json();
            data.forEach((application) => {
                if (!(application["statusApplicationsDTO"] in [2, 4])) {
                    aps_dict_local[application["roleDTO"]["name"]] = {id: application["id"], appl: application}
                    if (application["roleDTO"]["name"] === "ROLE_SPECIAL") {
                        setSpecialAp(application)
                    } else if (application["roleDTO"]["name"] === "ROLE_MODER") {
                        setModerAp(application)
                    } else if (application["roleDTO"]["name"] === "ROLE_ADMIN") {
                        setAdminAp(application)
                    }
                    // console.log("asfafsafsasf")
                }
            })

            setApsDict(aps_dict_local)
            // console.log(apsDict)
            // console.log(aps_dict_local)
            // console.log(Object.keys(apsDict).includes("ROLE_SPECIAL")) 
        } catch (error) {
        }
    };

    useEffect(() => {
        getMyApplications()
        getMyOrders()
        if (token == null) {
            navigate("/login")
        }
    }, [navigate, token])

    if (token != null) {
        decodedPayload = JSON.parse(atob(token.split('.')[1]));
        // console.log(decodedPayload)
        username = decodedPayload.sub
        roles = decodedPayload.roles
    } else {
        navigate("/login")
    }

    return (
        <Layout>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2">Профиль пользователя: {username}</h2>
                <h3>Роли:</h3>
                <ul>
                    {roles.map((role, index) => (
                        <li key={index}>{role}</li>
                    ))}
                </ul>
                {!roles.includes("ROLE_SPECIAL") && !Object.keys(apsDict).includes("ROLE_SPECIAL") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать специалистом
                    </Link>
                ) : null
                }
                {Object.keys(apsDict).includes("ROLE_SPECIAL") && [1, 3].includes(apsDict["ROLE_SPECIAL"].appl["statusApplicationsDTO"]["id"]) ? (
                    <Link to={`/showMyApplication/${specialAp.id}`} className="text-blue-500 underline">
                        Заявка на специалиста: {statusi_appl[apsDict["ROLE_SPECIAL"].appl["statusApplicationsDTO"]["id"]]}
                    </Link>
                ) : null
                }<br/>
                {!roles.includes("ROLE_MODER") && !Object.keys(apsDict).includes("ROLE_MODER") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать модератором
                    </Link>
                ) : null
                }
                {Object.keys(apsDict).includes("ROLE_MODER") && [1, 3].includes(apsDict["ROLE_MODER"].appl["statusApplicationsDTO"]["id"]) ? (
                    <Link to={`/showMyApplication/${moderAp.id}`} className="text-blue-500 underline">
                        Заявка на модератора: {statusi_appl[apsDict["ROLE_MODER"].appl["statusApplicationsDTO"]["id"]]}
                    </Link>
                ) : null
                }<br/>
                {!roles.includes("ROLE_ADMIN") && !Object.keys(apsDict).includes("ROLE_ADMIN") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать админом
                    </Link>
                ) : null
                }
                {Object.keys(apsDict).includes("ROLE_ADMIN") && [1, 3].includes(apsDict["ROLE_ADMIN"].appl["statusApplicationsDTO"]["id"]) ? (
                    <Link to={`/showMyApplication/${adminAp.id}`} className="text-blue-500 underline">
                        Заявка на админна: {statusi_appl[apsDict["ROLE_ADMIN"].appl["statusApplicationsDTO"]["id"]]}
                    </Link>
                ) : null
                }

                {ordDict.length > 0 && (
                <table className="mt-4 w-full border">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Дата опубликования</th>
                        <th>Ису цели</th>
                        <th>Имя цели</th>
                        <th>Статус</th>
                        <th>Взаимодействие</th>
                    </tr>
                    </thead>
                    <tbody>
                    {ordDict.map((ord) => (
                        <tr key={ord.id}>
                            <td>{ord.id}</td>
                            <td>{ord.publication_date}</td>
                            <td>{ord.target_isu_num}</td>
                            <td>{ord.target_name}</td>
                            <td>{ord.statusOrdersDTO.status + ": " + statusi_ord[ord.statusOrdersDTO.id]}</td>
                            {ord.statusOrdersDTO.id === 1 || ord.statusOrdersDTO.id === 2 ? (
                                <td>
                                    <Link to={`/showMyOrder/${ord.id}`} className="text-blue-500 underline">
                                        Изменить заказ
                                    </Link>
                                </td>
                            ) : null}
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
            </div>

        </Layout>
    );
}
