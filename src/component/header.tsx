import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Login from "./Login";
import '../css/registro.css'

interface IHeader {
    inicio?: boolean;
}

const Header: React.FC<IHeader> = ({ inicio }) => {
    const [viewLogin, setViewLogin] = useState(false);

    return (
        <Navbar id='Nav' className="navbar navbar-expand-lg navbar-light fixed-up shadow-sm rounded-lg" collapseOnSelect expand="lg" style={{ height: window.innerHeight * 0.1, backgroundColor: "white", color: "white", opacity: "95%" }}>

            <Navbar.Brand href="" style={{ marginLeft: 25 }}>
                <div></div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">

                </Nav>

                {!localStorage.getItem("acc") && (
                    <Nav>
                        <Link className="btn etiqueta" to="/registrarse">Registrarse</Link>
                        {!viewLogin && (
                            <button className="btn etiqueta" onClick={() => setViewLogin(true)}>Iniciar Sesión</button>
                        )}
                    </Nav>
                )}

                {localStorage.getItem("acc") && (
                    <Nav>
                        <button className="btn etiqueta" onClick={() => {
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