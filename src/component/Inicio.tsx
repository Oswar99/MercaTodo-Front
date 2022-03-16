import React, {useState, useEffect} from "react";
import { decodeToken } from "../helpers/setup.helper";
import { getAllP } from "../services/shop.service";
import { CardE } from "./components";

export const MainPage: React.FC = () => {
    const [lstInv, setLstInv] = useState([]);
    const [update, setUpdate] = useState(false);
    const [updating, setUpdating] = useState(false);

    useEffect(()=>{
        if(!update){
            setUpdate(true);
            getAllP({
                filter:{}
            }).then(async v=>{
                setLstInv(await decodeToken(v.data.key));
            });
        };
    });

    return(
        <div className="container-fluid py-4 px-5">
            <div className="row">
                {lstInv.map((val:any, index)=>
                    <CardE key={index} val={val} />
                )}
            </div>
        </div>
    )
}