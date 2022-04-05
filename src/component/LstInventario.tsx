import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { decodeToken, encodeToken } from "../helpers/setup.helper";
import useFormHelper from "../helpers/useFormHelper";
import FileUp2 from "./ComponentFileUpload2";
import { Loading, UpdatingView2 } from "./ComponentUpdatingView";
import { postProducto, getAllProductos, updateProducto } from "../services/shop.service"
import { Link } from "react-router-dom";
import { ComponentVis2 } from "./ComponentVis";
import { getFile, getFiles } from "../services/file.service";
import { SelectCategories } from "./ComponentCategories";

import iconSearch from "../img/g-icons/baseline_search_white_24dp.png";
import { CardE } from "./components";

interface IAddElementInv {
    classValue?: string,
    update?: boolean,
    dataValue?: any,
}

export const AddElementInv: React.FC<IAddElementInv> = ({ classValue, update, dataValue }) => {
    const [posting, setPosting] = useState(false);
    const [upd, setUpd] = useState(false);
    const [father, setFather] = useState("");
    const [selectCat, setCat] = useState("");

    const states = useState({
        nombre: "",
        id: "",
        marca: "",
        modelo: "",
        descripcion: "",
        etiquetas: "",
        valor_de_venta: 0,
        cantidad: 0,
    });

    const {
        values,
        handleChange,
        updateValues,
    } = useFormHelper(states);

    const { id }: any = useParams();

    async function btnTerminar() {
        if (!update) {

            const key = encodeToken({
                key: localStorage.getItem("acc"),
                data: values,
                category: selectCat,
                tienda: id
            });

            setPosting(true);
            postProducto(key).then(v => {
                if (v.data.successed) {
                    setFather(v.data.father);
                };
                setPosting(false);
            });

        } else {
            const key = encodeToken({
                key: localStorage.getItem("acc"),
                data: values,
                product: id
            });

            setPosting(true);
            updateProducto(key).then(v => {
                if (v.data.successed) {
                    setFather(v.data.father);
                };
                setPosting(false);
            });
        };
    };

    useEffect(() => {
        if (!upd && dataValue) {
            setUpd(true);
            updateValues({
                nombre: dataValue.name,
                id: dataValue.product_id,
                marca: dataValue.marca,
                modelo: dataValue.modelo,
                descripcion: dataValue.description,
                etiquetas: dataValue.tag,
                valor_de_venta: dataValue.value,
                valor_de_compra: dataValue.purchase_value,
                cantidad: dataValue.count,
            });
        };
        if (father && update) {
            window.location.reload();
        }
    }, [upd, father, update, dataValue, updateValues]);

    const mclass6: string = classValue ? classValue : "col-md-6 py-2"

    return (
        <div className={!update ? "container text-center bg-white shadow-sm px-5 py-2" : "container-fluid rounded-lg bg-white shadow-sm px-5 py-2"}>
            {!update && (
                <h3>Ingreso de Productos</h3>
            )}
            <div className="row" style={!update ? { marginTop: 30 } : {}}>

                <div className={mclass6}>
                    {update && (
                        <label className="text-left">
                            Nombre
                        </label>
                    )}
                    <input
                        placeholder="Nombre"
                        className="form-control"
                        name="nombre"
                        onChange={handleChange}
                        defaultValue={values.nombre}
                    />
                </div>
                <div className={mclass6}>
                    {update && (
                        <label className="text-left">
                            Marca
                        </label>
                    )}
                    <input
                        placeholder="Marca"
                        className="form-control"
                        name="marca"
                        onChange={handleChange}
                        defaultValue={values.marca}
                    />
                </div>
                <div className={mclass6}>
                    {update && (
                        <label className="text-left">
                            Modelo
                        </label>
                    )}
                    <input
                        placeholder="Modelo"
                        className="form-control"
                        name="modelo"
                        onChange={handleChange}
                        defaultValue={values.modelo}
                    />
                </div>

                <div className={mclass6}>
                    {update && (
                        <label className="text-left">
                            Etiquetas
                        </label>
                    )}
                    <input
                        placeholder="Etiquetas"
                        className="form-control"
                        name="etiquetas"
                        onChange={handleChange}
                        defaultValue={values.etiquetas}
                    />
                </div>
                <div className={mclass6}>
                    {update && (
                        <label className="text-left">
                            Precio de Venta
                        </label>
                    )}
                    <input
                        placeholder="Precio de Venta"
                        className="form-control"
                        type="number"
                        name="valor_de_venta"
                        onChange={handleChange}
                        defaultValue={values.valor_de_venta}
                    />
                </div>

                {(!update) && (
                    <div className="col-md-6 py-2">
                        <SelectCategories setCat={setCat} />
                    </div>
                )}

                <div className="col-md-12 py-2">
                    {update && (
                        <label className="text-left">
                            Descripcion
                        </label>
                    )}
                    <textarea
                        placeholder="Escribe una Descripcion del Producto..."
                        className="form-control"
                        name="descripcion"
                        onChange={handleChange}
                        defaultValue={values.descripcion}
                    />
                </div>

                <div className={update ? "col-md-12 py-2" : "col-md-12 py-2"}>
                    <label className="text-left">Imagenes</label>
                    <FileUp2 father={father} />
                </div>
            </div>
            <div className="" style={{ marginTop: 30, marginBottom: 30 }}>
                <button className="btn btn-success" onClick={btnTerminar}>
                    {(!posting) ?
                        "Guardar"
                        :
                        <Loading />
                    }
                </button>
            </div>
        </div>
    )
};

interface IElementInventario {
    element: any;
    setElementSelected?: (data: any) => void;
};

export const ElementInventario: React.FC<IElementInventario> = ({ element, setElementSelected }) => {

    const [update, setUpdate] = useState(false);
    const [selected, setSelected] = useState([{ file: "" }]);

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            const kfiles = {
                filter: { father: element._id }
            }
            getFiles(kfiles).then(async m => {
                if (m.data.successed) {

                    const data: any[] = await decodeToken(m.data.key);
                    const lst: { file: string }[] = [];

                    await getFile({ type: data[0]!.type, route: data[0]!.route }).then(v => {
                        if (v.status === 200) {
                            lst.push({
                                file: URL.createObjectURL(v.data)
                            });
                        };
                    });

                    setSelected(lst);
                };
            });
        };
    }, [update, element]);

    return (
        <div className="rounded-lg shadow-sm d-flex justify-content-center" style={{ height: "100%", alignItems: "center" }}>

            <div>
                <ComponentVis2 elements={selected} interval={5000} />
                <div className="rounded-lg container-fluid" style={{ backgroundColor: "#FFFFFF", color: "#0B6138", marginTop: 10, marginBottom: 5 }}>
                    <h6 className="">{element.name}</h6>
                    <h6 className="">Cantidad: {element.count}</h6>
                    <h6 className="">L. {element.value}</h6>
                    <Link className="stretched-link" to={`/productos/${element._id}`} />
                </div>
            </div>

        </div>
    )
};

interface ILstInventario {
    limit?: number,
}

export const LstInventario: React.FC<ILstInventario> = ({ limit }) => {
    const [lstInv, setLstInv] = useState([]);
    const [update, setUpdate] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [txtBusq, setTxtBusq] = useState("");
    //const [elementSelected, setElementSelected] = useState({
    //    _id: "",
    //    name: "",
    //    value: "",
    //    count: 0,
    //});


    const [filter, setFilter] = useState({
        key: localStorage.getItem("acc"),
        filter: {},
        limit: limit ? limit : 500,
    });

    //function fnElementSelected(data: any) {
    //    if (elementSelected._id !== data._id) {
    //        setElementSelected(data);
    //        localStorage.setItem("p-01", encodeToken(data))
    //    } else {
    //        setElementSelected({
    //            _id: "",
    //            name: "",
    //            value: "",
    //            count: 0,
    //        });
    //        localStorage.removeItem("p-01");
    //    };
    //};

    function txtBusqueda(e: any) {
        setTxtBusq(e.target.value);
        if (e.target.value.length > 2 || e.target.value.length === 0) {
            setBusqueda(e.target.value)
        };
    };

    function setBusqueda(txt: string) {
        const filt: any = {
            "$or": [
                { marca: { "$regex": txt, "$options": "i" } },
                { name: { "$regex": txt, "$options": "i" } },
                { description: { "$regex": txt, "$options": "i" } },
                { tag: { "$regex": txt, "$options": "i" } },
                { modelo: { "$regex": txt, "$options": "i" } },
                { category: { "$regex": txt, "$options": "i" } },
                { product_id: { "$regex": txt, "$options": "i" } },
            ]
        };
        setFilter({
            key: filter.key,
            filter: filt,
            limit: filter.limit,
        });
        setUpdate(false);
    };

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            setUpdating(true);
            localStorage.removeItem("p-01");
            getAllProductos(filter).then(async v => {
                if (v.data.successed) {
                    const data = await decodeToken(v.data.key);
                    setLstInv(data);
                };
                setUpdating(false);
            });
        };
    }, [update, filter]);
    //backgroundColor:"#E0F8E0"

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="container-fluid col-md-7 text-left" style={{ marginTop: 10, marginBottom: 15 }}>
                    <h4><b>Inventario</b></h4>
                </div>
                <div className="container-fluid col-md-5" style={{ marginTop: 10, marginBottom: 15 }}>
                    <div className="container-fluid">

                        <div className="row">
                            <input
                                placeholder="Busqueda"
                                className="form-control col-md-9"
                                onChange={txtBusqueda}
                            />
                            <button className="btn btn-success col-md-2"
                                onClick={() => setBusqueda(txtBusq)}
                            >
                                <img src={iconSearch} width="22px" alt="search" />
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            {updating ?
                <UpdatingView2 />
                :
                <div className="row rounded-lg" style={{}}>
                    {lstInv.map((val: any, index) =>
                        <CardE key={Math.floor(Math.random() * (999999999 - 1)) + 1} val={val} />
                    )}
                    <div className="container-fluid col-md-12">
                        {(lstInv.length === 0) && (
                            <h5>No hay elementos para mostrar!</h5>
                        )}
                    </div>
                </div>
            }

        </div>
    );
};

export const ElementDetaTienda: React.FC = () => {
    return (
        <div>

        </div>
    )
}