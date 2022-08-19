import React, { useContext } from "react";

import {
    BrowserRouter as Router,
    Route,
    Routes,
    Navigate
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Debug from "./pages/Debug";
import UserRegistration from "./pages/UserRegistration";

import { AuthProvicer, AuthContext } from "./contexts/auth";

const ApptRoutes = () => {

    const Private = ({chindren}) =>{

        const { authenticated } = useContext(AuthContext);

        if ( ! authenticated )
        {
            return <Navigate to="/" />
        }

        return chindren;
    }
        
    return(
        <Router>
            <AuthProvicer>          
            <Routes>
                    <Route exact path="/" element={<LoginPage/>}/>
                    <Route exact path="/home" element={<HomePage />}/>
                    <Route exact path="/debug" element={<Debug />}/>
                    <Route exact path="/userRegistration" element={<UserRegistration />}/>
                </Routes>
            </AuthProvicer>
        </Router>
    )
}

export default ApptRoutes;