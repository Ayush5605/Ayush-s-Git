import React, { useState,useEffect} from "react";
import axios from "axios";

import {PageHeader} from "@primer/react";
import {Button} from "@primer/react";

import logo from "../../assets/github-mark-white.svg";

import { useAuth } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";


const Login=()=>{

    const navigate=useNavigate();
    const{currentUser,setCurrentUser}=useAuth();

    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[loading,setLoading]=useState(false);

    useEffect(()=>{

        localStorage.removeItem("token");
        localStorage.removeItem("userId");

    },[]);

    const handleLogin=async(e)=>{
        e.preventDefault();

        try{
            setLoading(true);
            const res=await axios.post("http://localhost:3000/login",{
                email:email,
                password:password
            })
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("userId", res.data.userId);

            setCurrentUser( res.data.userId);
            setLoading(false);

            window.location.href="/";
        }catch(err){
            console.error(err);
            alert("signup failed");
            setLoading(false);

        
        }


    }


    return(

         <div className="login-wrapper">
            <div className="auth-content">
                    <div className="login-logo-conatiner">
                        <img className="logo-login" src={logo} alt="Logo"/>
                    </div>
        
                    <div className="login-box-wrapper">
                        <div className="login-heading">
                            <div style={{ padding: "8px" }}>
          <PageHeader>
            <PageHeader.TitleArea variant="large">
              <PageHeader.Title>Login</PageHeader.Title>
            </PageHeader.TitleArea>
          </PageHeader>
        </div>
                        </div>
        
                        <div className="login-box">
                            
        
                                <div>
                                    <label className="label">Email</label>
                                    <input
                                    autoComplete="off"
                                    name="Email"
                                    id="Email"
                                    className="input"
                                    type="email"
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </div>
        
                                <div className="div">
                                    <label className="label">Password</label>
                                    <input
                                    autoComplete="off"
                                    name="Password"
                                    id="Password"
                                    className="input"
                                    type="password"
                                    value={password}
                                    onChange={(e)=>setPassword(e.target.value)}
                                    />
                                </div>
        
                                <Button
        
                                variant="primary"
                                className="login-btn"
                                disabled={loading}
                                onClick={handleLogin}
                                >
                                    {loading ? "Loading..." :"Login"}
                                </Button>
        
                                 {/* <div className="pass-box">
                               
                                  </div> */}

                                   <p>
                                                            New to Ayush's Git? <Link to="/signup">Signup</Link>
                                                          </p>
        
        
                        </div>
        
        
                    </div>
                    </div>
                </div>
        

    )

}

export default Login;