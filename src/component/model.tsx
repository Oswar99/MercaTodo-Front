import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Header from "./header";

interface IModel{
    value:any
};

const Model: React.FC<IModel> = ({value}) => {
    const [redirect, setRedirect] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        if(!update){
            setUpdate(true);
            const us = localStorage.getItem("us-01");
            const ac = localStorage.getItem("acc");
            
            if(!(ac && us)){
                setRedirect(true);
            };
        };
    });

    if(redirect){
        return(
            <Redirect to="/" />
        )
    };

    return(
        <div>
            <Header />
            <div className="container-fluid">{value}</div>
        </div>
    )
};

export default Model;