import React, { useEffect, useState } from "react";
import Header from "../component/header";
import Model from "../component/model";
import { decodeToken } from "../helpers/setup.helper";

const MyAccount: React.FC = () => {
    const [update, setUpdate] = useState(false);
    const [user, setUser] = useState({
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
    });
    
    return (
        <div>
            {!user.verified && (
                <div className="alert alert-danger" style={{ marginTop: 20 }}>
                    Su correo no ha sido verificado
                    <button className="btn btn-outline-light" style={{ marginLeft: 20 }}>Verificar ahora</button>
                </div>
            )}
            <div className="row">
                <div className="col-md-4">

                </div>
                <div className="col-md-8">
                    <div className="container-fluid rounded shadow-sm py-3 bg-white" style={{ marginTop: 10, marginBottom: 20 }}>
                        <h6 className="py-1"><b>Nombre Completo: </b>{user.user_name}</h6>
                        <h6 className="py-1"><b>Nombre de Usuario: </b>{user.user_nick}</h6>
                        <h6 className="py-1"><b>Email: </b>{user.user_mail}</h6>
                        <h6 className="py-1"><b>Direccion: </b>{user.user_address}</h6>
                    </div>
                </div>
            </div>
        </div>
    )
};

const MAccount: React.FC = () => {
    return (
        <Model value={<MyAccount />} />
    )
}

export default MAccount;