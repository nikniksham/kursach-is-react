import React, {useEffect, useState} from "react";
import Layout from "./Layout";
import {Link, useNavigate} from "react-router-dom";
import {getCookie} from "../components/MyCookie";

export default function Profile() {
    let roles = null
    let username = null

    const [apsDict, setApsDict] = useState([])
    const [specialAp, setSpecialAp] = useState([])
    const [moderAp, setModerAp] = useState([])
    const [adminAp, setAdminAp] = useState([])

    const statusi = {
        1: "🕘",
        2: "✅",
        3: "❌",
        4: "🗑",
    }

    let aps_dict_local = {}
    let token = getCookie("token")
    let decodedPayload = null
    const navigate = useNavigate();

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
                if (!(application["statusApplications"] in [2, 4])) {
                    aps_dict_local[application["roles"]["name"]] = {id: application["id"], appl: application}
                    if (application["roles"]["name"] === "ROLE_SPECIAL") {
                        setSpecialAp(application)
                    } else if (application["roles"]["name"] === "ROLE_MODER") {
                        setModerAp(application)
                    } else if (application["roles"]["name"] === "ROLE_ADMIN") {
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
        if (token == null) {
            navigate("/login")
        }
    }, [getMyApplications, navigate, token])

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
                {Object.keys(apsDict).includes("ROLE_SPECIAL") && [1, 3].includes(apsDict["ROLE_SPECIAL"].appl["statusApplications"]["id"]) ? (
                    <Link to={`/showMyApplication/${specialAp.id}`} className="text-blue-500 underline">
                        Заявка на специалиста: {statusi[apsDict["ROLE_SPECIAL"].appl["statusApplications"]["id"]]}
                    </Link>
                ) : null
                }<br/>
                {!roles.includes("ROLE_MODER") && !Object.keys(apsDict).includes("ROLE_MODER") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать модератором
                    </Link>
                ) : null
                }
                {Object.keys(apsDict).includes("ROLE_MODER") && [1, 3].includes(apsDict["ROLE_MODER"].appl["statusApplications"]["id"]) ? (
                    <Link to={`/showMyApplication/${moderAp.id}`} className="text-blue-500 underline">
                        Заявка на модератора: {statusi[apsDict["ROLE_MODER"].appl["statusApplications"]["id"]]}
                    </Link>
                ) : null
                }<br/>
                {!roles.includes("ROLE_ADMIN") && !Object.keys(apsDict).includes("ROLE_ADMIN") ? (
                    <Link to="/makeApplication" className="text-blue-500 underline">
                        Стать админом
                    </Link>
                ) : null
                }
                {Object.keys(apsDict).includes("ROLE_ADMIN") && [1, 3].includes(apsDict["ROLE_ADMIN"].appl["statusApplications"]["id"]) ? (
                    <Link to={`/showMyApplication/${adminAp.id}`} className="text-blue-500 underline">
                        Заявка на админна: {statusi[apsDict["ROLE_ADMIN"].appl["statusApplications"]["id"]]}
                    </Link>
                ) : null
                }
            </div>
        </Layout>
    );
}
