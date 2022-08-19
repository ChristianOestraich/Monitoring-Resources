import React, {useContext} from "react";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import "../../style/style.css"

import { AuthContext } from "../../contexts/auth";

const UserRegistration = () => {
    
    const {logout, redirectDebug, redirectHome, redirectUserRegistration} = useContext(AuthContext);

    const handleLogout = () =>{
        logout();
    }
    const handleHome = () => {
        redirectHome();
    }
    const handleDebug = () => {
        redirectDebug();
    }
    const handleUserRegistration = () => {
        redirectUserRegistration();
    }
    return (
        <>
            <div id="home" >
                <div className="homePageTitle" >
                    <h1>User Registration</h1>
                </div>
                <div className="homeMenu" >
                    <Menu menuButton={<MenuButton className={"menu"} >Main Menu</MenuButton>}>
                        <div className={"option"}>
                            <MenuItem onClick={handleHome}>Monitoring Resource</MenuItem>
                            <MenuItem onClick={handleDebug}>Debug</MenuItem>
                            <MenuItem onClick={handleUserRegistration}>User Registration</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </div>
                    </Menu>
                </div>
                <div id="cadastro">
                    <form method="post" action=""> 
                        <h1>Registration User</h1> 

                        <p> 
                            <label for="nome_cad">Your Name</label>
                            <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="name" />
                        </p>
                        
                        <p> 
                            <label for="email_cad">Your E-mail</label>
                            <input id="email_cad" name="email_cad" required="required" type="email" placeholder="contato@htmlecsspro.com"/> 
                        </p>
                        
                        <p> 
                            <label for="senha_cad">Your Password</label>
                            <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="ex. 1234"/>
                        </p>
                        
                        <p> 
                            <input type="submit" value="Registration"/> 
                        </p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UserRegistration