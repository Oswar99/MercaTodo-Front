import React, { useState } from "react";
import { encodeToken } from "../helpers/setup.helper";
import { userLogIn } from "../services/session.service";
import useFormHelper from "../helpers/useFormHelper";

interface ILogin {
    setViewLogin: (data:boolean) => void;
};

const Login: React.FC<ILogin> = ({setViewLogin}) => {

    const [posting, setPosting] = useState(false);
    const [message, setMessage] = useState("");
    const states = useState({
        userLogin: "",
        passLogin: "",
        internal: "",
    });

    const {
        values,
        handleChange,
    } = useFormHelper(states);

    async function btnEntrar() {
        setPosting(true);
        setMessage("");
        const key: string = encodeToken(values);
        await userLogIn(key).then(v=>{
            if(v.data.successed){
                localStorage.setItem("acc", v.data.key);
                localStorage.setItem("us-01", v.data.user);
                window.location.href = "/#/my";
            };
            setMessage(v.data.message);
            setPosting(false);
        });
    };

    return (
        <div className="nav nav-link">
            <div className="container">
                <div className="row">
                    <input
                        className="form-control col-md-4"
                        id="CorreoLogin1"
                        placeholder="Usuario/Correo"
                        type="mail"
                        autoComplete="off"
                        name="userLogin"
                        onChange={handleChange}
                    />
                    &nbsp;
                    <input
                        className="form-control col-md-4"
                        id="PassLogin1"
                        placeholder="Contraseña"
                        type="password"
                        autoComplete="new-password"
                        name="passLogin"
                        onChange={handleChange}
                    />
                    &nbsp;
                    <button className="btn btn-primary text-center" onClick={btnEntrar}>
                        <b>
                        {posting ? <div className="spinner-border spinner-border-sm text-primary" role="status"><span className="sr-only">Verificando...</span></div> : "Entrar"}
                        </b>
                    </button>
                    &nbsp;
                    <button className="btn btn-danger text-center" onClick={()=>setViewLogin(false)}><b>Cancelar</b></button>
                </div>
                <div className="row">
                    <small className="col-md-12 text-center">{message}</small>
                </div>
            </div>
        </div>
    );
};

export default Login;