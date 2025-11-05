import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { UnderlineNav } from "@primer/react";
import {BookIcon,RepoIcon} from "@primer/octicons-react";


const Profile=()=>{
    const naviget=useNavigate();
    const[userDetails,setUserDetails]=useState({
        name:"username"
    });


    useEffect(()=>{
        const fetchUserDetails=async()=>{
            const userId=localStorage.getItem("userId");

            if(userId){
                try{
                const response=await axios.get(`http://localhost:3000/getUserProfile/${userId}`);
                console.log(response.data);
                setUserDetails(response.data);
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
        <UnderlineNav aria-label="Repository">
            <UnderlineNav.Item
            aria-current="page"
            icon={BookIcon}
            sx={{
                backgroundColor:"transparent",
                color:"white",
                "&:hover":{
                    textDecoration:"underline",
                    color:"white",

                },
            }}
            >
                Overview
            </UnderlineNav.Item>
             <UnderlineNav.Item
          onClick={() => navigate("/repo")}
          icon={RepoIcon}
          sx={{
            backgroundColor: "transparent",
            color: "whitesmoke",
            "&:hover": {
              textDecoration: "underline",
              color: "white",
            },
          }}
        >
          Starred Repositories
        </UnderlineNav.Item>
        </UnderlineNav>

         <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>10 Follower</p>
            <p>3 Following</p>
          </div>
        </div>
        
        </div>
        </>
        
    )

}

export default Profile;