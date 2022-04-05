import React, { useEffect, useState } from "react";
import { ViewChats } from "../component/chat";
import Categories from "../component/ComponentCategories";
import { LstReports } from "../component/components";
import { AddElementInv, LstInventario } from "../component/LstInventario";
import VerifyUser from "../component/mainComponents";
import Model from "../component/model";
import ViewDash from "../component/ViewDash";
import { decodeToken } from "../helpers/setup.helper";

const MyAccount: React.FC = () => {
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState({
        _id:"",
        enabled: false,
        verified: false,
        join_time: "",
        last_session: "",
        user_address: "",
        user_mail: "",
        user_name: "",
        user_nick: "",
        user_pass: "",
        user_phone: "",
        user_type: ""
    });

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            const t = localStorage.getItem("us-01");
            setUser(decodeToken(t!));
        };
    }, [update, user]);

    return (
        <div>
            <VerifyUser />
            {(user.user_type === "ADMIN") ?
                <ViewDash elements={[
                    { title: "MI INFO", icon: "", view: <MyInfo /> },
                    { title: "MIS CHATS", icon: "", view: <ViewChats /> },
                    { title: "AGREGAR PRODUCTO", icon: "", view: <AddElementInv /> },
                    { title: "MIS PRODUCTOS", icon: "", view: <LstInventario /> },
                    { title: "CATEGORIAS", icon: "", view: <Categories /> },
                    { title: "DENUNCIAS", icon: "", view: <LstReports /> },
                    { title: "DENUNCIAS", icon: "", view: <LstReports /> },
                    
                ]}
                />
                :
                <ViewDash elements={[
                    { title: "MI INFO", icon: "", view: <MyInfo /> },
                    { title: "MIS CHATS", icon: "", view: <ViewChats /> },
                    { title: "AGREGAR PRODUCTO", icon: "", view: <AddElementInv /> },
                    { title: "MIS PRODUCTOS", icon: "", view: <LstInventario /> },
                ]}
                />
            }
        </div>
    )
};

const MyInfo: React.FC = () => {
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState({
        _id:"",
        enabled: false,
        verified: false,
        join_time: "",
        last_session: "",
        user_address: "",
        user_mail: "",
        user_name: "",
        user_nick: "",
        user_pass: "",
        user_phone: "",
        user_type: ""
    });

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            const t = localStorage.getItem("us-01");
            setUser(decodeToken(t!));
        };
    }, [update, user]);

    return (
        <div className="container-fluid rounded shadow-sm py-3 bg-white" style={{ marginTop: 10, marginBottom: 20 }}>
            <h6 className="py-1"><b>Nombre Completo: </b>{user.user_name}</h6>
            <h6 className="py-1"><b>Email: </b>{user.user_mail}</h6>
            <h6 className="py-1"><b>Direccion: </b>{user.user_address}</h6>
        </div>
    )
}

const MAccount: React.FC = () => {
    return (
        <Model value={<MyAccount />} />
    )
}

export default MAccount;