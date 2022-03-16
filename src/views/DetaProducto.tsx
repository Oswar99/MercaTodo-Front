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
    const [selected, setSelected] = useState([{ file: "", route:"" }]);
    const [element, setElement] = useState({
        _id: "",
        product_id: "",
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
        <div className="container-fluid rounded-lg d-flex justify-content-center" style={{ minHeight: window.innerHeight * 0.85, alignItems: "center" }}>
            <div className="row">

                <div className="col-md-12 text-left py-2">
                    <div className="container-fluid">
                        <button className="btn btn-light" onClick={() => {
                            window.location.replace(`/#/my`)
                        }}>Volver</button>
                    </div>
                </div>

                <div className={editMode ? "col-md-12 rounded-lg d-flex" : "col-md-6 rounded-lg"} style={{ alignItems: "center" }}>
                    <div className="container">
                        <ComponentVis2 elements={selected} interval={5000} deleteButton />
                    </div>
                </div>

                <div className={editMode ? "col-md-12 rounded-lg d-flex" : "col-md-6 rounded-lg d-flex"} style={{ alignItems: "center" }}>

                    {editMode ?
                        <div className="container" style={{ marginTop: 20 }}>
                            <div className="text-center">
                                <AddElementInv classValue="col-md-6 py-2" dataValue={element} update />
                            </div>
                        </div>
                        :
                        <div className="container-fluid text-left">
                            <h2 style={{ marginTop: 30 }}><b>{element.name}</b></h2>
                            <h6 style={{ color: "gray" }}>Referencia: {element.product_id}</h6>
                            <hr />
                            <h5 style={{ marginBottom: 30 }}>{element.description}</h5>
                            <h5><b>Marca: </b>{element.marca}</h5>
                            <h5 style={{ marginBottom: 30 }}><b>Modelo: </b>{element.modelo}</h5>
                            <h5><b>Valor de Venta: </b>{element.value}</h5>
                            <h5 style={{ marginBottom: 30 }}><b>Valor de Compra: </b>{element.purchase_value}</h5>
                            <h5><b>Existencia: </b>{element.count} Unidades</h5>
                            <hr />
                        </div>
                    }
                </div>

                <div className="col-md-12 text-right" style={{ marginTop: 30, marginBottom: 30 }}>

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
        </div>
    );
};

const MainDetaPRoducto: React.FC = () => {
    return (
        <Main value={<DetaProducto />} />
    );
};

export default MainDetaPRoducto;