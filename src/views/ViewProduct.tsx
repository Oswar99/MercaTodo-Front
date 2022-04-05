import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ChatComponent from "../component/chat";
import { ComponentVis2 } from "../component/ComponentVis";
import Header from "../component/header";
import { decodeToken } from "../helpers/setup.helper";
import { getFile, getFiles } from "../services/file.service";
import { getUser } from "../services/services.service";
import { getAllP } from "../services/shop.service";

const ViewProduct: React.FC = () => {
    const [update, setUpdate] = useState(false);
    const [seller, setSeller] = useState({ id: "", name: "", dep: "", mail: "", score: "" });
    //const [viewChat, setViewChat] = useState(false);
    const [selected, setSelected] = useState([{ file: "", route: "" }]);
    const [user, setUser] = useState({
        _id: "",
        enabled: false,
        verified: false,
        user_type: ""
    });
    const [element, setElement] = useState({
        _id: "",
        product_id: "",
        user: "",
        marca: "",
        modelo: "",
        name: "",
        description: "",
        tag: "",
        value: "",
        purchase_value: "",
        date: new Date(),
        count: "",
        shop: "",
    });
    const { id }: any = useParams();

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            const t = localStorage.getItem("us-01");
            if (t) {
                setUser(decodeToken(t!));
            }
            getAllP({
                filter: { _id: id },
                limit: 1
            }).then(async v => {
                const ele = await decodeToken(v.data.key)[0]
                setElement(ele);
                const dataus = {
                    filter: {
                        _id: ele.user
                    }
                };
                getUser(dataus).then(c => {
                    if (c.data.successed) {
                        setSeller(decodeToken(c.data.key));
                    };
                });
                const kfiles = {
                    filter: { father: id }
                };
                getFiles(kfiles).then(async m => {
                    if (m.data.successed) {
                        const data: any[] = await decodeToken(m.data.key);
                        const lst: { file: string, route: string }[] = [];
                        for (let element of data) {
                            await getFile({ type: element.type, route: element.route }).then(v => {
                                if (v.status === 200) {
                                    lst.push({
                                        file: URL.createObjectURL(v.data),
                                        route: element.route
                                    });
                                };
                            });
                        };
                        setSelected(lst);
                    }
                });
            });
        };
    }, [update, id]);

    if (!element._id) {
        return (
            <div className="container-fluid text-center">
                <h5>
                    <b>
                        Producto no disponible!
                    </b>
                </h5>
            </div>
        )
    };

    return (
        <div className="thinBar">
            <Header />
            <div className="container-fluid text-center thinBar" style={{ minHeight: window.innerHeight * 0.87 }}>
                <div className="container-fluid rounded" style={{}}>
                    <div className="row bg-white py-5 shadow-sm px-5" style={{ marginTop: 10, marginBottom: 10, minHeight: window.innerHeight * 0.85 }}>

                        <div className="col-md-6 text-left">
                            <div className="card px-4">
                                <h2 style={{ marginBottom: 30 }}><b>{element.name}</b></h2>
                                <h5 style={{ marginBottom: 30 }}>{element.description}</h5>
                                <h5><b>Marca: </b>{element.marca}</h5>
                                <h5 style={{ marginBottom: 30 }}><b>Modelo: </b>{element.modelo}</h5>
                                <h5 style={{ marginBottom: 30 }}><b>Etiquetas: </b>{element.tag}</h5>
                                <h5>{new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'HNL',
                                }).format(parseInt(element.value))}</h5>
                            </div>

                            <hr />

                            <div className="card shadow-sm rounded-lg  px-4 py-2">
                                <h4><b>Detalles del vendedor</b></h4>
                                <h6 style={{ marginTop: 10 }}><b>Nombre: </b>{seller.name}</h6>
                                <h6><b>Puntuacion: </b>{seller.score}</h6>
                                <h6><b>Correo: </b>{seller.mail}</h6>
                                <h6><b>Departamento: </b>{seller.dep}</h6>
                                <Link to={`/usuarios/${seller.id}`} className="stretched-link" />
                            </div>

                            {(user._id && user._id !== element.user) && (
                                <ChatComponent
                                    producto={element._id}
                                    cliente={user._id}
                                    vendedor={element.user}
                                    off={user._id}
                                    from={element.user}
                                    setUpdd={() => { }}
                                />
                            )}
                        </div>


                        <div className={"col-md-6 rounded-lg"} style={{ alignItems: "center" }}>
                            <div className="container">
                                <ComponentVis2 width={window.innerWidth * 0.4} height={window.innerWidth * 0.3} elements={selected} interval={5000} />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

const MViewPro: React.FC = () => {
    return (
        <ViewProduct />
    )
};

export default MViewPro; 