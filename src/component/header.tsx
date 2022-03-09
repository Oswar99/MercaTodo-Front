import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Login from "./Login";

interface IHeader {
    inicio?: boolean;
}

const Header: React.FC<IHeader> = ({ inicio }) => {
    const [viewLogin, setViewLogin] = useState(false);

    return (
        <Navbar className="navbar navbar-expand-lg navbar-light fixed-up shadow-sm rounded-lg" collapseOnSelect expand="lg" style={{ height: window.innerHeight * 0.1, backgroundColor: "white", color: "white", opacity: "95%" }}>

            <Navbar.Brand href="" style={{ marginLeft: 25 }}>
                <div></div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">

                <Nav className="mr-auto">

                </Nav>

                {!localStorage.getItem("acc") && (
                    <Nav>
                        <Link className="btn" to="/registrarse">Registrarse</Link>
                        {!viewLogin && (
                            <button className="btn" onClick={() => setViewLogin(true)}>Iniciar Sesion</button>
                        )}
                    </Nav>
                )}

                {localStorage.getItem("acc") && (
                    <Nav>
                        <button className="btn" onClick={() => {
                            localStorage.removeItem("acc");
                            localStorage.removeItem("us-01");
                            window.location.href = "/#/";
                        }}>Cerrar Sesion</button>
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