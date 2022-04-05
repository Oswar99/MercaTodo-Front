import React, { useState, useEffect } from "react";
import { decodeToken } from "../helpers/setup.helper";
import { getAllP } from "../services/shop.service";
import { CardE, CardE3, SelectDepartament } from "./components";
import b1 from "../img/b3.png"
import b2 from "../img/b4.png"
import { SelectCategories } from "./ComponentCategories";

interface IMainPage {
    user?: string
};
export const MainPage: React.FC<IMainPage> = ({ user }) => {
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(user ? 4 : 12);
    const [count, setCount] = useState(0);
    const [lstInv, setLstInv] = useState([]);
    const [update, setUpdate] = useState(false);
    const [view, setView] = useState(false);

    const [cat, setCat] = useState("");
    const [dep, setDep] = useState("");
    const [busq, setBusq] = useState("");

    //const [updating, setUpdating] = useState(false);

    function txtBusq(e: any) {
        const txt: string = e.target.value;
        setBusq(txt);
        setUpdate(false);
    };

    useEffect(() => {
        if (!update) {
            setUpdate(true);
            getAllP({
                filter: {
                    "$and": [
                        busq ? {
                            "$or": [
                                { marca: { "$regex": busq, "$options": "i" } },
                                { name: { "$regex": busq, "$options": "i" } },
                                { description: { "$regex": busq, "$options": "i" } },
                                { tag: { "$regex": busq, "$options": "i" } },
                                { modelo: { "$regex": busq, "$options": "i" } },
                            ]
                        } : {},
                        cat ? { category: cat } : {},
                        dep ? { departament: dep } : {},
                        user ? { user: user } : {}
                    ]
                },
                skip: limit * page,
                limit: limit
            }).then(async v => {
                setLstInv(await decodeToken(v.data.key));
                setCount(v.data.count);
            });
        };
    }, [update, count, busq, dep, cat, limit, page, user]);

    return (
        <div className={user? "row":""}>
            <div className="container-fluid py-4 px-5 bg-white rounded-lg shadow-sm" style={{ minHeight: window.innerHeight * 0.80 }}>

                <div className="row text-center">
                    <div className="col-md-8 py-2">
                        <input
                            className="form-control"
                            placeholder="Busqueda"
                            onChange={txtBusq}
                        />
                    </div>
                    <div className="col-md-2 py-2">
                        <SelectCategories setCat={(e) => {
                            setCat(e);
                            setUpdate(false)
                        }} place={user ? "Categorias" : "Todas las Categorias"} />
                    </div>
                    <div className="col-md-2 py-2">
                        <SelectDepartament setDep={(e) => {
                            setDep(e);
                            setUpdate(false)
                        }} place={user ? "Departamentos" : "Todos los Departamentos"} />
                    </div>
                </div>

                <div className="row">
                    {lstInv.map((val: any, index) =>
                        view ?
                            <CardE3 key={Math.floor(Math.random() * (999999999 - 1)) + 1} val={val} />
                            :
                            <CardE classValue={user? "card py-2 col-md-3":""} key={Math.floor(Math.random() * (999999999 - 1)) + 1} val={val} main />
                    )}
                </div>

            </div>
            <div className="container-fluid" style={{ height: window.innerHeight * 0.07 }}>

                <div className="row">
                    {!user && (
                        <div className="col-md-2 py-2">
                            <input
                                placeholder="Elementos por pagina"
                                className="form-control"
                                type="number"
                                onChange={(e) => { setLimit(parseInt(e.target.value)); setUpdate(false) }}
                            />
                        </div>
                    )}
                    <div className="col-md-10 py-2">

                        {!user && (
                            <button className="btn" onClick={() => setView(true)} style={{ marginRight: 5 }}>
                                <img width={25} src={b1} alt="b1" />
                            </button>
                        )}
                        {!user && (
                            <button className="btn" onClick={() => setView(false)} style={{ marginRight: 35 }}>
                                <img width={25} src={b2} alt="b2" />
                            </button>
                        )}

                        {page > 0 && <button className="btn btn-outline-warning" style={{ marginRight: 5 }} onClick={() => { setPage(page - 1); setUpdate(false) }}>{page}</button>}
                        <button className="btn btn-warning" style={{ marginRight: 5 }} onClick={() => { setPage(page); setUpdate(false) }}>{page + 1}</button>
                        {page < Math.ceil(count / limit) - 1 && <button className="btn btn-outline-warning" style={{ marginRight: 5 }} onClick={() => { setPage(page + 1); setUpdate(false) }}>{page + 2}</button>}
                    
                    </div>
                </div>
            </div>

        </div>
    )
}