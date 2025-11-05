import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../src/assets/github-mark-white.svg";
import "./Navbar.css";
import { useAuth } from "./authContext";


const Navbar=()=>{
    const navigate = useNavigate();
    const{isLoggedIn,setIsLoggedIn}=useAuth();

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate("/");
    };

    return(
        <nav>
            <Link to={"/"} onClick={handleLogoClick}>
            <div>
                <img src={logo} alt="Github Logo"></img>
                <h3>Github</h3>
            </div>
            </Link>
            <div>
                <Link to={"/repo/create"}>
                <p>Create Repository</p>
                </Link> 

                
                <Link to={"/profile"} >
                <p>Profile</p></Link>
                
      
             
                <Link to={"/login"}>
                <p className="login-btn">Login</p>
                </Link>
                <Link to={"/signup"}>
                <p className="signup-btn">Signup</p>
                </Link>
               
           
     
             </div>
        </nav>
    );

    
};
export default Navbar;