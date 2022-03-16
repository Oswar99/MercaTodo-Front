import React from "react";
import adelissa2 from "../img/adelissa verde2.png";

interface IUpdating {
    message?: string,
}

export const Loading: React.FC = () => {
    return (
        <div className="spinner-border spinner-border-sm text-light" role="status" style={{ width: 22, height: 22, marginTop: 0 }}>
            <span className="sr-only">Verificando...</span>
        </div>
    )
};

const UpdatingView: React.FC<IUpdating> = ({ message }) => {
    return (
        <div className="container-fluid justify-content-center d-flex" style={{ minHeight: window.innerHeight * 0.85, marginTop: 80, alignItems: "center" }}>
            <img src={adelissa2} width={window.innerWidth * 0.2} alt="img1" />
            <span className="spinner-grow spinner-grow-lg text-success" role="status" aria-hidden="true" style={{ width: window.innerWidth * 0.04, height: window.innerWidth * 0.04 }}>
                <span className="spinner-border spinner-border-lg text-light" role="status" aria-hidden="true" style={{ width: window.innerWidth * 0.04, height: window.innerWidth * 0.04 }}>
                    <span className="spinner-border spinner-border-lg text-light" role="status" aria-hidden="true" style={{ width: window.innerWidth * 0.04, height: window.innerWidth * 0.04 }}></span>
                </span>
            </span>
        </div>
    )
};

export const UpdatingView2: React.FC<IUpdating> = ({ message }) => {
    return (
        <div className="container-fluid justify-content-center d-flex" style={{ minHeight: "100%", marginTop: 0, alignItems: "center" }}>
            <span className="spinner-grow spinner-grow-lg text-success" role="status" aria-hidden="true" style={{ width: window.innerWidth * 0.04, height: window.innerWidth * 0.04 }}>
                <span className="spinner-border spinner-border-lg text-light" role="status" aria-hidden="true" style={{ width: window.innerWidth * 0.04, height: window.innerWidth * 0.04 }}>
                    <span className="spinner-border spinner-border-lg text-light" role="status" aria-hidden="true" style={{ width: window.innerWidth * 0.04, height: window.innerWidth * 0.04 }}></span>
                </span>
            </span>
        </div>
    );
};

export default UpdatingView;