import React, {useContext} from "react";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import "../../style/style.css";

import { AuthContext } from "../../contexts/auth";
 
const HomePage = () => {
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
                <h1>Monitoring Resource</h1>
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

            <div className="divGrafana">
                <form action="http://localhost:3000/?orgId=1" target="_blank" >
                    <input className="buttonGranfa" type="submit" value="Go to Grafana"/>
                </form>
            </div>
        </div>
    </> 
    )
}

export default HomePage