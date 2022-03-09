import React, { useState } from "react";
import Header from "../component/header";
import useFormHelper from "../helpers/useFormHelper";
import adelissa_verde from "../img/adelissa verde.png";
import { postUser } from "../services/user.service";


const Inicio: React.FC = () => {
    return (
        <div>
            <Header />
        </div>
    )
};

export default Inicio;