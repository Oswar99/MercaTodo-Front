import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { decodeToken, encodeToken } from "../helpers/setup.helper";
import useFormHelper from "../helpers/useFormHelper";
import { getAllCategoryByFilter, postCategory, deleteCategories } from "../services/category.service";
import { UpdatingView2 } from "./ComponentUpdatingView";

import iconDelete from "../img/g-icons/baseline_delete_white_24dp.png";
import { bg_head } from "../css/colors";

interface IBodyDrop {
    fnSelect: (data: string) => void;
    fnUpd: (data: boolean) => void;
    bgColor?: string,
    father?: string,
    mode?: boolean,
    upd: boolean,
};

interface ISelCat{
    setCat: (e:string) => void;
    place?: string,
}
export const SelectCategories: React.FC<ISelCat> = ({setCat, place}) => {

    const [update, setUpdate] = useState(false);
    const [listCat, setListCat] = useState([]);

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            const data: string = encodeToken({
                filter: { father: "main" }
            });
            getAllCategoryByFilter(data).then(v => {
                if (v.data.successed) {
                    const resp = decodeToken(v.data.key)
                    setListCat(resp);
                };
            });
        };
        
    }, [update]);

    return(
        <select className="form-control" onChange={(e)=> setCat(e.target.value)} >
            <option key={0} value="" >{place? place:"Seleccionar Categoria"}</option>
            {listCat.map((val:any, index) => 
                <option key={index + 1} value={val._id}>{val.name}</option>
            )}
        </select>
    )
}

export const BodyDrop: React.FC<IBodyDrop> = ({ fnSelect, fnUpd, father, bgColor, mode, upd }) => {
    const [update, setUpdate] = useState(false);
    const [listCat, setListCat] = useState([]);
    const [updating, setUpdating] = useState(false);
    const [selected, setSelected] = useState("");

    const { id }: any = useParams();

    function setSelect(e: string) {
        // father modificado
        if (mode) {
            if (!father) {
                if (e === selected) {
                    setSelected("");
                    fnSelect("");
                } else {
                    setSelected(e);
                    fnSelect(e);
                };
            };
        } else {
            if (father) {
                if (e === selected) {
                    setSelected("");
                    fnSelect("");
                } else {
                    setSelected(e);
                    fnSelect(e);
                };
            };
        };

    };

    async function deleteCategory(id: string){
        const data: string = encodeToken({
            key: localStorage.getItem("acc"),
            filter: { _id: id }
        });

        await deleteCategories(data).then(v=> {
            if(v.data.successed){
                setUpdate(false);
            };
        });
    };

    //function setSelect2(e: string) {
    //    if (e === selected) {
    //        setSelected("");
    //        fnSelect("");
    //    } else {
    //        setSelected(e);
    //        fnSelect(e);
    //    };
    //}

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            setUpdating(true);
            const data: string = encodeToken({
                shop: id,
                filter: { father: father ? father : "main" }
            });
            getAllCategoryByFilter(data).then(v => {
                if (v.data.successed) {
                    const resp = decodeToken(v.data.key)
                    setListCat(resp);
                };
                setUpdating(false);
            });
        };
        if (upd) {
            setUpdate(false);
            fnUpd(upd);
        };
    }, [update, upd, father, id, fnUpd]);

    if (updating) {
        return (
            <UpdatingView2 />
        )
    }


    return (
        <div className="row">
            {listCat.length === 0 && (
                <h6 className="col-md-12">No hay Categorias para mostrar!</h6>
            )}
            {listCat.map((val: any, index) =>
                <div className="col-md-12"  style={{marginBottom:5}}>
                    <div className="rounded-lg text-center py-1"
                        key={index}
                        style={(selected === val._id) ? { backgroundColor: bg_head } : { backgroundColor: bgColor ? bgColor : "white", borderStyle: bgColor ? "none" : "solid", borderWidth: 1, borderColor: bg_head }}
                    >
                        {(!mode) ?
                            <div className="row">
                                <div className="col-md-10 d-flex justify-content-center" onClick={() => setSelect(val.name)}  style={{ alignItems: "center" }}>
                                    {val.name}
                                </div>
                                <div className="col-md-2">
                                    <button className="btn btn-danger" onClick={() => deleteCategory(val._id)} >
                                        <img src={iconDelete} width="22px" alt="delete" />
                                    </button>
                                </div>
                            </div>
                            :
                            <div onClick={() => setSelect(val._id)} >
                                {val.name}
                            </div>
                        }

                    </div>
                    {
                        //<BodyDrop fnSelect={mode ? setSelect2 : () => { }} fnUpd={fnUpd} upd={upd} father={val.name} bgColor="#EFFBF5" mode={mode} />
                    }
                </div>
            )}
        </div>
    )
};

const Categories: React.FC = () => {
    const [catSelect, setCatSelect] = useState("");
    const [upd, setUpd] = useState(false);

    const states = useState({
        name: "",
    });

    const {
        values,
        handleChange,
        updateValues,
    } = useFormHelper(states);

    function setSelect(e: string) {
        setCatSelect(e);
    };

    function fnIngresar() {
        const data: string = encodeToken({
            key: localStorage.getItem("acc"),
            father: catSelect,
            name: values.name
        })
        postCategory(data).then(v => {
            if (v.data.successed) {
                setUpd(true);
                updateValues({
                    name: ""
                });
            };
        });
    };

    return (
        <div className="row text-left">

            <div className="col-md-12" style={{ marginBottom: 20 }}><h5>
                <b>Categorias del Producto</b>
            </h5></div>

            <div className="col-md-12 rounded-lg" style={{ marginBottom: 30 }}>
                <div className="row">
                    <div className="col-md-6" style={{ marginBottom: 20 }}>
                        <BodyDrop fnSelect={setSelect} fnUpd={(d: boolean) => setUpd(!d)} upd={upd} />
                    </div>

                    <div className="col-md-4" style={{ marginBottom: 10 }}>
                        <input
                            placeholder="Nombre de la Categoria"
                            className="form-control"
                            name="name"
                            onChange={handleChange}
                            value={values.name}
                        />
                    </div>

                    <div className="col-md-2">
                        <button className="btn btn-success" onClick={fnIngresar}>Ingresar</button>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default Categories;