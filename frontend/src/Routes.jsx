import React,{useEffect} from "react";

import {useNavigate,useRoutes} from 'react-router-dom';

import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup"

import { useAuth } from "./components/authContext";

const projectRoutes=()=>{
    const {currentUser,setCurrentUser}=useAuth();
    const navigate=useNavigate();


    useEffect(()=>{

        const userIdFromStorage=localStorage.getItem("userId");

        if(userIdFromStorage && !currentUser){
            setCurrentUser(userIdFromStorage);
        }

        if(!userIdFromStorage && !["/auth","/signup"].includes(window.location.pathname)){
            navigate("/auth");
        }

        if(userIdFromStorage && window.location.pathname=="/auth"){
            navigate("/");
        }
    },[currentUser,navigate,setCurrentUser]);

    let element=useRoutes([
        {
            path:"/auth",
            element:<Login/>
        },
        {
            path:"/signup",
            element:<Signup/>
        }
       
    ]);
    return element;

    


}

export default projectRoutes;