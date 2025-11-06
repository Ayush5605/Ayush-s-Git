import React, { useEffect, useState } from "react";
import Navbar from "../Navbar.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./profile.css";
import { UnderlineNav } from "@primer/react";
import {BookIcon,RepoIcon} from "@primer/octicons-react";
import { Navigate } from "react-router-dom";
import HeatMap from "@uiw/react-heat-map";
import ProfileHeatMap from "./HeatMap.jsx";
import { useAuth } from "../authContext.jsx";


const Profile=()=>{
    const naviget=useNavigate();
    const[userDetails,setUserDetails]=useState({
        name:"username"
    });
    const{setCurrentUser}=useAuth();


    useEffect(()=>{
        const fetchUserDetails=async()=>{
            const userId=localStorage.getItem("userId");

            if(userId){
                try{
                const response=await axios.get(`http://localhost:3000/getUserProfile/${userId}`);
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
          onClick={() => naviget("/repo")}
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

        <button className="logout"
        onClick={()=>{
          localStorage.removeItem("token");
        localStorage.removeItem("userId");
        setCurrentUser(null);

        naviget('/login');

        }}>Logout</button>

         <div className="profile-page-wrapper">
        <div className="user-profile-section">
          <div className="profile-image"></div>

          <div className="name">
            <h3>{userDetails.username}</h3>
          </div>

          <button className="follow-btn">Follow</button>

          <div className="follower">
            <p>{userDetails.followedUsers?.length || 0} followers</p>
            <p>3 Following</p>
          </div>
        </div>
        <div className="heat-map-section">
          <ProfileHeatMap/>
          

          


        </div>

        
        </div>
        </>
        
    )

}

export default Profile;