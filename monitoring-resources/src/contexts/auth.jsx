import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvicer = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, seLoading] = useState(true);

    useEffect( () => {  
        const recoveredUser = localStorage.getItem('user');

        if ( recoveredUser )
        {
            setUser(JSON.parse(recoveredUser));

            seLoading(true);
        }
    },[]);

    const login = (email, password) => {

        console.log("login auth", {login, password} );

        const loggedUser = {
            id: '123',
            email
        }

        localStorage.setItem( "user", JSON.stringify( loggedUser ) );
        
        if ( password === "123" )
        {
            setUser(localStorage);
            navigate("/debug");
        }
    }

    const logout = () => {
        console.log("logout");
        localStorage.removeItem("user");
        setUser(null);
        navigate("/");
    }

    const redirectDebug = () =>{
        navigate("/debug");
    }

    const redirectHome = () =>{
        navigate("/home");
    }
    const redirectUserRegistration = () =>{
        navigate("/userRegistration");
    }

    return (
        <AuthContext.Provider value={{authenticated: !!user, user, loading, login, logout, redirectDebug, redirectHome, redirectUserRegistration}} >
            {children}
        </AuthContext.Provider>
    );
}