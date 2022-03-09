import React, { useState } from "react";
import useFormHelper from "../helpers/useFormHelper";
import { postUser } from "../services/user.service";

const expRegular = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

const RegisterForm: React.FC = () => {

    const [m1, setM1] = useState(false);
    const [m2, setM2] = useState(false);
    const [m3, setM3] = useState(false);
    const [m4, setM4] = useState(false);

    const states = useState({
        nombre: "",
        email: "",
        pass: "",
        phone: "",
        nick: "",
        address: ""
    });

    const {
        values,
        handleChange,
        updateValues
    } = useFormHelper(states);

    function txtCorreo(e:any){
        const txt:string = e.target.value;
        setM1(!expRegular.test(txt));
        if(txt.length === 0){
            setM1(false)
        }
        handleChange(e);
    };

    function txtPass(e:any){
        const txt:string = e.target.value;
        setM2(!(txt.length >= 8));
        if(txt.length === 0){
            setM2(false);
        };
        handleChange(e);
    };

    function txtPass2(e:any){
        const txt:string = e.target.value;
        console.log(txt, values.pass)
        setM3(!(txt === values.pass));
        if(txt.length === 0){
            setM3(false);
        };
    };

    function btnSave(){
        if(values.nombre && values.email && values.pass && !m1 && !m2 && !m3)
        postUser({data: values}).then(v=>{
            if(v.data.successed){
                window.location.reload();
            }else{
                setM4(true);
            };
        });
    };

    return (
        <div className="container rounded py-4 shadow-sm bg-white text-center" style={{marginTop:50, padding:50}}>
            <h3 className="py-2"><b>Formulario de Registro</b></h3>
            <div className="row">
                <div className="col-md-6 py-2">
                    <label>Nombre Completo</label>
                    <input className="form-control" name="nombre" onChange={handleChange} value={values.nombre} />
                </div>
                <div className="col-md-6 py-2">
                    <label>Correo </label><small style={{color:"red"}}>{m1 && " No valido"}</small>
                    <input className="form-control" type="email" name="email" onChange={(e) => txtCorreo(e)} value={values.email}  />
                </div>
                <div className="col-md-6 py-2">
                    <label>Telefono</label>
                    <input className="form-control" name="phone" onChange={handleChange} value={values.phone}  />
                </div>
                <div className="col-md-6 py-2">
                    <label>Nombre de Usuario</label>
                    <input className="form-control" name="nick" onChange={handleChange} value={values.nick}  />
                </div>
                <div className="col-md-6 py-2">
                    <label>Contraseña</label><small style={{color:"red"}}>{m2 && " No valida"}</small>
                    <input className="form-control" type="password" name="pass" onChange={txtPass} value={values.pass}  />
                </div>
                <div className="col-md-6 py-2">
                    <label>Repetir Contraseña</label><small style={{color:"red"}}>{m3 && " Las contraseñas no coinciden"}</small>
                    <input className="form-control" type="password"  onChange={txtPass2}  />
                </div>
                <div className="col-md-12">
                    <label>Direccion</label>
                    <textarea className="form-control" name="address" onChange={handleChange} value={values.address} />
                </div>
            </div>
            <button className="btn btn-primary" style={{marginTop: 25}} onClick={btnSave} ><b>Guardar</b></button>
            <small style={{color:"red"}}>{m4 && "Ha ocurrido un error al guardar"}</small>
        </div>
    )
};

export default RegisterForm;