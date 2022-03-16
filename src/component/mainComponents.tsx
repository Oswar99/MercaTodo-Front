import React, { useEffect, useState } from "react";
import { decodeToken } from "../helpers/setup.helper";
import { sendMail } from "../services/user.service";

const VerifyUser: React.FC = () => {
    const [update, setUpdate] = useState(false);
    const [r, setR] = useState(false);
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

    function verifyEmail() {
        sendMail({
            key: localStorage.getItem("acc")
        }).then(v => {
            setR(v.data.successed);
        });
    };

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            const t = localStorage.getItem("us-01");
            setUser(decodeToken(t!));
        };
    }, [update]);

    if (!user.verified) {
        return (
            <div className="alert alert-danger" style={{ marginTop: 20 }}>
                {!r ?
                <div>
                    Su correo no ha sido verificado
                    <button className="btn btn-outline-light" style={{ marginLeft: 20 }} onClick={verifyEmail} >Verificar ahora</button>
                </div>
                    :
                    <div>
                        <h6><b> El correo de verificacion ha sido enviado</b></h6>
                        <p>Revisa tu buzon para verificar tu Email, si no ves el correo revisa tu bandeja de SPAM</p>
                    </div>
                }
            </div>
        )
    };

    return (
        <div></div>
    )
};

export default VerifyUser;