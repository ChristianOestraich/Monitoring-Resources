import React, {useContext} from "react";
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/core.css';
import "../../style/style.css";

import { AuthContext } from "../../contexts/auth";

const Debug = () => {
    
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
                    <h1>Debug</h1>
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
                    <p>
                        <label for="nome_cad">Class Path .Java</label>
                        <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="class path .java" />
                    </p>
                        <label for="nome_cad">Start Line and End Line</label>
                        <div>
                            <input className="" required="required" type="text" placeholder="Start Line" />
                        </div>
                        <div>
                            <input className="" required="required" type="text" placeholder="End Line" />
                        </div>
                        <div className="tableDebug">
                            <table>
                                <tr>
                                    <th>Debug Data</th>
                                </tr>
                            </table>
                        </div>
                        <p>
                            <input type="submit" value="Debug"/>
                            <input type="submit" value="Advanced"/>
                            <input type="submit" value="Stop"/>
                        </p>
                    <p>

                    </p>
                </div>
            </div>
        </>
    )
}

export default Debug