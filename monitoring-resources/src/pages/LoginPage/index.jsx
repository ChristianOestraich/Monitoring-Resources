import React, {useState, useContext} from "react";
import "./style.css"

import { AuthContext } from "../../contexts/auth";

const LoginPage = () => {

    const { login } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handlerSubmit = (e) =>{
        e.preventDefault();

        console.log('submit', {email, password} );
        login(email, password);
    }

    return (
        <div id="login">
            <h1 className="title">Login do Sistema</h1>
            <form className="form" onSubmit={handlerSubmit}>
                <div className="field">
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" placeholder="Digite seu E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Digite sua Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage