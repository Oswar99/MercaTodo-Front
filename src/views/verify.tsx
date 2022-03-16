import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import error from "../img/error.png";
import { verifyEmail } from "../services/user.service";
const VerifyView: React.FC = () => {

    const [upd, setUpd] = useState(false);
    const [upd2, setUpd2] = useState(true);
    const [v, setV] = useState(false);
    const { id }: any = useParams();

    useEffect(() => {
        if(!upd){
            setUpd(true);
            const data = {
                tk: id
            };
            verifyEmail(data).then(v=>{
                setV(v.data.successed);
                if(v.data.successed){
                    localStorage.removeItem("acc");
                    localStorage.removeItem("us-01")
                };
                setUpd2(false);
            });
        };
    },[upd, id]);

    if(upd2){
        return(
            <div>
                Verificando...
            </div>
        )
    };

    if(v){
        return (
            <div className="container shadow-sm rounded py-3 text-center d-flex justify-content-center" style={{ minHeight: window.innerHeight, alignItems: "center" }}>
                <div>
                    <h4><b>Su Correo ha sido verificado</b></h4>
                    <hr />
                    <p>Felicidades hemos verificado su correo exitosamente, ahora podra gestionar sus productos en la tienda.</p>
                    <p>Inicie sesion nuevamente.</p>
                    <hr />
                    <Link to="/" >Regresar al Inicio</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container shadow-sm rounded py-3 text-center d-flex justify-content-center" style={{ minHeight: window.innerHeight, alignItems: "center" }}>
            <div>
                <img style={{marginBottom: 50}} src={error} alt="ERROR" width={100} />
                <h4><b>Ha ocurrido un error al verificar el correo</b></h4>
                <hr />
                <p>Lamentamos el inconveniente, dirijase al area de usuario para poder reenviar su correo de verificacion nuevamente!</p>
                <hr />
                <h6>Siga las siguientes recomendaciones:</h6>
                <p>1. Tenga su bandeja de correo abierta</p>
                <p>2. El token generado para la verificacion del correo tiene una duracion de 5 minutos, acceda al link antes de ese tiempo</p>
                <Link to="/" >Regresar al Inicio</Link>
            </div>
        </div>
    )
}

export default VerifyView;