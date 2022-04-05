import React, { useEffect, useState } from "react";
import Main from "./model";

import { useParams } from "react-router";
import { delProducto, getAllProductos } from "../services/shop.service";
import { decodeToken, encodeToken } from "../helpers/setup.helper";
import { ComponentVis2 } from "../component/ComponentVis";
import { getFile, getFiles } from "../services/file.service";
import UpdatingView from "../component/ComponentUpdatingView";
import { AddElementInv } from "../component/LstInventario";

import iconDelete from "../img/g-icons/baseline_delete_white_24dp.png";
import iconEdit from "../img/g-icons/baseline_mode_edit_white_24dp.png";

const DetaProducto: React.FC = () => {
    const [update, setUpdate] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [updating, setUpdating] = useState(false);
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


    function btnDel() {
        const data = encodeToken({
            key: localStorage.getItem("acc"),
            filter: { _id: id },
            id: id
        });
        delProducto(data).then(v => {
            if (v.data.successed) {
                window.location.reload();
            };
        });
    };

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            setUpdating(true);
            const acc = localStorage.getItem("acc")
            const key = {
                key: acc,
                filter: { _id: id },
                limit: 1
            };
            const t = localStorage.getItem("us-01");
            setUser(decodeToken(t!));
            getAllProductos(key).then(async v => {
                if (v.data.successed) {
                    const data = await decodeToken(v.data.key);
                    if (data[0]) {
                        setElement(data[0]);
                    };
                };
                setUpdating(false);
            });
            const kfiles = {
                key: acc,
                filter: { father: id }
            }
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
            })
        };
    }, [update, id]);

    if (updating) {
        return (
            <UpdatingView />
        )
    }

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
    }

    return (
        <div className="container-fluid rounded-lg">

            <div className="row bg-white py-5 shadow-sm px-5" style={{ marginTop: 10, marginBottom: 10 }}>

                {editMode ?
                    <div className="container-fluid col-md-6 text-left">
                        <AddElementInv classValue="col-md-6 py-2" dataValue={element} update />
                    </div>
                    :
                    <div className="col-md-6 text-left">
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
                }

                <div className={editMode ? "col-md-6 rounded-lg d-flex" : "col-md-6 rounded-lg"} style={{ alignItems: "center" }}>
                    <div className="container">
                        <ComponentVis2 width={window.innerWidth * 0.4} height={window.innerWidth * 0.3} elements={selected} interval={5000} deleteButton />
                    </div>
                </div>

            </div>

            {(user._id === element.user) && (
                <div className="row">
                    <div className="col-md-12 text-right" style={{ marginTop: 15, marginBottom: 15 }}>
                        <button className="btn btn-dark" onClick={() => setEditMode(!editMode)} style={{ marginRight: 5 }}>
                            <img src={iconEdit} width="22px" alt="delete" style={{ marginRight: 5 }} />
                            {editMode ? "Cancelar" : "Editar"}
                        </button>

                        <button className="btn btn-danger" onClick={btnDel}>
                            <img src={iconDelete} width="22px" alt="delete" style={{ marginRight: 5 }} />
                            Eliminar
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

const MainDetaPRoducto: React.FC = () => {
    return (
        <Main value={<DetaProducto />} />
    );
};

export default MainDetaPRoducto;