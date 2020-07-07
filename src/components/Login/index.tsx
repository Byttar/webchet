import React, { useState, FormEvent } from 'react';
import "./style.scss";
import { Redirect } from "react-router-dom"

const Login: React.FC = () => {

    const [user, setUser] = useState<string>();

    const HandleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user =  e.currentTarget.USERNAME.value;
        localStorage.setItem("user", user);
        setUser(user);
    }

    return(
        <div className="login">
            { user && <Redirect to={{pathname: "/chat", state: {user}}}/> }
            <form onSubmit={HandleSubmit}>
            <h1 style={{textAlign: "center"}}>WebChet</h1>
                <label>
                    <i className="fas fa-user"></i>
                    <input required name="USERNAME" placeholder="Digite Seu Nome"/>
                </label>
                <button>Entrar</button>
            </form>
        </div>
    )
}

export default Login;