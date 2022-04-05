import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../component/header";
import { MainPage } from "../component/Inicio";
import Modal from "../component/modal";
import { decodeToken } from "../helpers/setup.helper";
import { getUser } from "../services/services.service";
import { newReport, updateUser } from "../services/user.service";

const ViewUsers: React.FC = () => {

    const [upd, setUpd] = useState(false);
    const [seller, setSeller] = useState({ id: "", name: "", dep: "", mail: "", score: 0, phone: "", enabled: true });
    const [submitting, setsubmitting] = useState(false);
    const [showM, setShowM] = useState(false);
    const { id }: any = useParams();
    const [user, setUser] = useState({
        _id: "",
        enabled: false,
        verified: false,
        user_type: ""
    });

    function report(e:string){
        setsubmitting(true);
        const data = {
            key: localStorage.getItem("acc"),
            title:`Reporte para ${seller.name}`,
            description: e,
            user: id
        };
        newReport(data).then(v=>{
            if(v.data.successed){
                setShowM(false);
            };
            setsubmitting(false);
        });
    };

    function btnInh(){
        const data = {
            key: localStorage.getItem("acc"),
            filter: {_id: seller.id},
            update: { enabled: !seller.enabled }
        };
        updateUser(data).then(v=>{
            if(v.data.successed){
                setUpd(false);
            };
        });
    }

    useEffect(() => {
        if (!upd) {
            setUpd(true);
            const t = localStorage.getItem("us-01");
            if(t)
            setUser(decodeToken(t!));
            const dataus = {
                key: localStorage.getItem("acc"),
                filter: {
                    _id: id
                }
            };
            getUser(dataus).then(c => {
                if (c.data.successed) {
                    setSeller(decodeToken(c.data.key));
                };
            });
        };
    }, [upd, id]);

    return (
        <div className="thinBar">
            <Header />
            <Modal 
                title={`Reportar a ${seller.name}`}
                description=""
                lbl_main_btn="Reportar"
                show={showM}
                closeModal={()=>{setShowM(false)}}
                submitting={submitting}
                accept={report}
            />
            <div className="container-fluid text-center rounded-lg">
                <div className="row">
                    <div className="col-md-3 rounded-lg shadow bg-white d-flex"  style={{ minHeight: window.innerHeight * 0.87, alignItems:"center" }}>
                        <div className="container-fluid text-center py-4">
                            <hr />
                            <h4 className="py-2"><b>{seller.name}</b></h4>
                            <h5><b>{seller.score}</b> Estrellas</h5>
                            <h6><b>Email: </b>{seller.mail}</h6>
                            <h6><b>Telefono: </b>{seller.phone}</h6>
                            <h6>Usuario registrado en <b>{seller.dep}</b></h6>
                            <hr />
                            <hr />
                            {(id !== user._id && user._id) && (
                                (user.user_type !== "ADMIN") ?
                                <button className="btn btn-danger" onClick={()=> {setShowM(true)}}>Reportar Usuario</button>
                                :
                                <button className={seller.enabled? "btn btn-danger":"btn btn-primary"} onClick={btnInh}>{seller.enabled? "Inhabilitar":"Habilitar"}</button>
                            )}
                        </div>
                    </div>

                    <div className="col-md-9">
                        <MainPage user={id} />
                    </div>
                </div>
            </div>
        </div>

    )
};

export default ViewUsers;