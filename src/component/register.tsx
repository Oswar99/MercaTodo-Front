import React, { useState } from "react";
import useFormHelper from "../helpers/useFormHelper";
import { postUser } from "../services/user.service";
import '../css/registro.css';

const expRegular = /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i

const RegisterForm: React.FC = () => {

    const [m1, setM1] = useState(false);
    const [m2, setM2] = useState(false);
    const [m3, setM3] = useState(false);
    const [m4, setM4] = useState(false);
    const [m5, setm5] = useState(false);
    const [m6, setm6] = useState(true);


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

    //function checkList (e:any){
    //    const data = `${e.target.checked}`  
    //    //console.log(data)
    //    setm5(data)
    //  }

    //async function validaciones() {
    //    if (m5==='') {
    //        setm5('false')
    //    }
    //
    //    /*if(values.phone!== undefined ){
    //        setm6('true')
    //    }*/
    //   if (values.phone!==undefined){
    //        console.log(values.phone.length)
    //        if (values.phone.length===8) {
    //            setm6('true')
    //        }else{
    //            setm6('false')
    //        }
    //    }else{
    //        setm6('true')
    //    }
    //    
    //}  

    async function btnSave(){

        //await validaciones()
                

        console.log(m5)
        console.log(m6)

        if(values.phone && values.phone.length === 8){
            setm6(true);
        }else{
            setm6(false);
        };

        if(values.nombre && values.email && values.pass && !m1 && !m2 && !m3 && m5 && values.phone.length === 8)
        postUser({data: values}).then(v=>{
            if(v.data.successed){
                window.location.reload();
            }else{
                setM4(true);
            };
        });
    };

    return (
        <div id='divPrincipal' className="container rounded py-4 shadow-sm bg-white text-center" style={{marginTop:50, padding:50}}>
            <h3 className="py-2"><b>Formulario de Registro</b></h3>
            <div className="row">
                <div className="col-md-6 py-2">
                    <label>Nombre Completo</label>
                    <input className="form-control" name="nombre" onChange={handleChange} value={values.nombre} />
                </div>
                <div className="col-md-6 py-2">
                    <label>Correo </label><small style={{color:"red"}}>{m1 && " No valido"}</small>
                    <input className="form-control" type="email" name="email" onChange={(e) => txtCorreo(e)} value={values.email} placeholder='ejemplo@unah.hn' />
                </div>
                <div className="col-md-6 py-2">
                    <label>Teléfono</label>
                    <input style={{borderColor: !m6 ? 'red' : '#ced4da'}}  className="form-control" name="phone" onChange={handleChange} value={values.phone} placeholder='32333344' />
                    {!m6 && <label style={{color:"red"}}>numero teléfono no válido</label>}
                </div>


                <div className="col-md-6 py-2">
                    <label>Dirección</label>
                    <textarea className="form-control" name="address" onChange={handleChange} value={values.address} style={{height: 38 }}/>
                </div>

                <div className="col-md-6 py-2">
                    <label >Contraseña</label><small style={{color:"red"}}>{m2 && " No valida"} </small>
                    <input placeholder='Utilizar al menos 8 caracteres' className="form-control" type="password" name="pass" onChange={txtPass} value={values.pass}  />
                </div>
                <div className="col-md-6 py-2">
                    <label>Repetir Contraseña</label><small style={{color:"red"}}>{m3 && " Las contraseñas no coinciden"}</small>
                    <input className="form-control" type="password"  onChange={txtPass2}  />
                </div>
            
                <div id="checklist" className="form-group form-check">
                    <input  type="checkbox" className="form-check-input" id="exampleCheck11"
                           name='check' checked={m5}  onChange={(e) => setm5(e.target.checked)}
                    ></input>
                    <label className="form-check-label" form="exampleCheck1">He leido y acepto los términos y condiciones de la empresa <a href='/#/terminos'>términos y condiciones</a> </label>
                    {!m5 && <p style={{color:"red"}}>Debes aceptar los términos y condiciones</p>}
                </div>
            
            </div>
            <button className="btn btn-primary" style={{marginTop: 25}} onClick={btnSave} ><b>Guardar</b></button>
            <small style={{color:"red"}}>{m4 && "Ha ocurrido un error al guardar"}</small>
        </div>
    )
};

export default RegisterForm;