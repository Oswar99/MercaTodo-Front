import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UpdatingView from "../component/ComponentUpdatingView";
import Header from "../component/header";
import { getAccess } from "../services/session.service";

interface IMain {
    value: any,
};

const Main: React.FC<IMain> = ({ value }) => {
    const [update, setUpdate] = useState(false);
    const [updating, setUpdating] = useState(true);
    const [red, setRed] = useState(false);

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            const acc: any = localStorage.getItem("acc") ? localStorage.getItem("acc") : undefined;
            if (acc) {
                getAccess({ key: acc }).then(v => {
                    if (!v.data.successed) {
                        localStorage.removeItem("acc");
                        localStorage.removeItem("us-01");
                        setRed(true);
                    };
                    setUpdating(false);
                });
            } else {
                setRed(true);
            }
        };
    }, [update, updating, red]);

    if (red) {
        return (
            <Redirect to="/" />
        )
    };

    return (
        <div className="thinBar">
            <Header />
            <div className="container-fluid text-center thinBar" style={{ minHeight : window.innerHeight * 0.88, marginTop: 100, marginBottom:10 }}>
                {updating ?
                    <UpdatingView message="Verificando clave..." />
                    :
                    value
                }
            </div>
        </div>
    )
};

export default Main;