import React,{useState,useEffect} from "react";

import axios from "axios";

import {PageHeader} from "@primer/react";
import {Button} from "@primer/react";

import logo from "../../assets/github-mark-white.svg";

import { useAuth } from "../authContext";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
const API_URL=import.meta.env.VITE_API_URL;



const CreateRepo=()=>{

    

    const navigate=useNavigate();

    const{currentUser,setCurrentUser}=useAuth();

    const handleLogoClick = (e) => {
        e.preventDefault();
        navigate("/");
    };





    const [owner,setOwner]=useState('');
    const[userDetails,setUserDetails]=useState({
        name:"username"
    });
    const [repoName,setRepoName]=useState('');
    const [issue,setIssue]=useState([]);
    const [content,setContent]=useState([]);
    const [description,setDescription]=useState('');
    const [visibility,setVisibility]=useState(false);


    useEffect(()=>{
        const fetchUserDetails=async()=>{
            const userId=localStorage.getItem("userId");

            if(userId){
                try{
                const response=await axios.get(`${API_URL}/getUserProfile/${userId}`);
                console.log(response.data);
                setUserDetails(response.data.user);
                }catch(err){
                    console.error("Cannot fetch user details");
                }
            }


        }
        fetchUserDetails();
    },[]);


    return(

        <>
        <Navbar/>


        <div className="login-wrapper">
                    <div className="auth-content">
                            <div className="login-logo-conatiner">
                                <Link to={"/"} onClick={handleLogoClick}>
                                <img className="logo-login" src={logo} alt="Logo"/>
                                </Link>
                            </div>
                
                            <div className="login-box-wrapper">
                                <div className="login-heading">
                                    <div style={{ padding: "8px" }}>
                  <PageHeader>
                    <PageHeader.TitleArea variant="large">
                      <PageHeader.Title>Create Repo</PageHeader.Title>
                    </PageHeader.TitleArea>
                  </PageHeader>
                </div>
                                </div>
                
                                <div className="login-box">
                                    
                
                                        <div>
                                            <label className="label">name</label>
                                            <input
                                            autoComplete="off"
                                            name="Email"
                                            id="Email"
                                            className="input"
                                            type="email"
                                            value={email}
                                            required
                                            onChange={(e)=>setName(e.target.value)}
                                            />
                                        </div>
                
                                        <div className="div">
                                            <label className="label">visibility</label>
                                            <input
                                            autoComplete="off"
                                            name="Password"
                                            id="Password"
                                            className="input"
                                            type="password"
                                            value={password}
                                            required
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
                
                                       
                                       
                                          </div> 
                                          </div>
                                          </div>
                                          </div>

                                          </>
        
    )
    




};

export default CreateRepo;