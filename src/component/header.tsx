import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Login from "./Login";
import '../css/registro.css'
import mt from "../img/mercatodo1.png"

interface IHeader {
    inicio?: boolean;
}

const Header: React.FC<IHeader> = ({ inicio }) => {
    const [viewLogin, setViewLogin] = useState(false);

    return (
        <Navbar className="navbar navbar-expand-lg navbar-light fixed-up shadow-sm rounded-lg" collapseOnSelect expand="lg" style={{ minHeight: window.innerHeight * 0.13, backgroundColor: "white", color: "black", opacity: "95%" }}>

            <Navbar.Brand href="" style={{ marginLeft: 25 }}>
                <Link to="/">
                    <img src={mt} alt="mt-brand" width={window.innerWidth * 0.13} />
                </Link>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">

                </Nav>

                {!localStorage.getItem("acc") && (
                    <Nav>
                        <Link className="btn" style={{ fontStyle: "normal" }} to="/registrarse">Registrarse</Link>
                        {!viewLogin && (
                            <button className="btn" style={{ fontStyle: "normal" }} onClick={() => setViewLogin(true)}>Iniciar Sesión</button>
                        )}
                    </Nav>
                )}

                {localStorage.getItem("acc") && (
                        
                        <Nav>
                            <Link className="btn" style={{ fontStyle: "normal" }} to="/my">Mi Panel</Link>

                            <button className="btn" onClick={() => {
                                localStorage.removeItem("acc");
                                localStorage.removeItem("us-01");
                                window.location.href = "/#/";
                            }}>Cerrar Sesión</button>
                        </Nav>
                )}

                {viewLogin && (
                    <Login setViewLogin={setViewLogin} />
                )}

            </Navbar.Collapse>
        </Navbar>
    )
};

export default Header;