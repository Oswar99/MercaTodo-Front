import React from "react";
import Header from "../component/header";
import RegisterForm from "../component/register";

const RegisterView: React.FC = () => {
    return(
        <div>
            <Header />
            <RegisterForm />
        </div>
    )
};

export default RegisterView;