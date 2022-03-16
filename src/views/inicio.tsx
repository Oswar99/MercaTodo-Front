import React from "react";
import Header from "../component/header";
import { MainPage } from "../component/Inicio";

const Inicio: React.FC = () => {
    return (
        <div>
            <Header />
            <MainPage />
        </div>
    )
};

export default Inicio;