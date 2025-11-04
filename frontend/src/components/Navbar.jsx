import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/assets/github-mark-white.svg";
import "./Navbar.css";


const Navbar=()=>{
    return(
        <nav>
            <Link to={"/"}>
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
             </div>
        </nav>
    );

    
};
export default Navbar;