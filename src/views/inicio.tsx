import React from "react";
//import ChatComponent from "../component/chat";
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