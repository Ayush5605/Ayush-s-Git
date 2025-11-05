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
        username:"username"
    });


    useEffect(()=>{
        const fetchUserDetails=async()=>{
            const userId=localStorage.getItem("userId");

            if(userId){
                try{
                const response=await axios.get("http://localhost:3000/getUserProfile/:id");
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
		<div
			className="profile-container"
			style={{
				minHeight: "100vh",
				background: "linear-gradient(180deg, #0d1117 0%, #161b22 100%)",
				padding: "24px 16px",
				color: "#c9d1d9"
			}}
		>
			<UnderlineNav aria-label="Repository" sx={{ borderColor: "#30363d", mb: 3 }}>
				<UnderlineNav.Item
					aria-current="page"
					icon={BookIcon}
					sx={{
						backgroundColor: "transparent",
						color: "#c9d1d9",
						"&:hover": { textDecoration: "underline", color: "#fff" }
					}}
				>
					Overview
				</UnderlineNav.Item>
				<UnderlineNav.Item
					onClick={() => navigate("/repo")}
					icon={RepoIcon}
					sx={{
						backgroundColor: "transparent",
						color: "#c9d1d9",
						"&:hover": { textDecoration: "underline", color: "#fff" }
					}}
				>
					Starred Repositories
				</UnderlineNav.Item>
			</UnderlineNav>

			<button
				onClick={() => {
					localStorage.removeItem("token");
					localStorage.removeItem("userId");
					setCurrentUser(null);
					window.location.href = "/auth";
				}}
				style={{
					position: "fixed",
					bottom: "32px",
					right: "32px",
					background: "#238636",
					border: "1px solid #2ea043",
					color: "#fff",
					padding: "10px 16px",
					borderRadius: "6px",
					cursor: "pointer",
					boxShadow: "0 2px 10px rgba(0,0,0,0.3)"
				}}
				id="logout"
			>
				Logout
			</button>

			<div
				className="profile-page-wrapper"
				style={{ display: "flex", justifyContent: "center", marginTop: "32px" }}
			>
				<div
					className="user-profile-section"
					style={{
						width: "100%",
						maxWidth: "720px",
						background: "#0d1117",
						border: "1px solid #30363d",
						borderRadius: "12px",
						padding: "24px",
						boxShadow: "0 4px 24px rgba(0,0,0,0.25)"
					}}
				>
					<div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
						<div
							className="profile-image"
							style={{
								width: "96px",
								height: "96px",
								borderRadius: "50%",
								background: "linear-gradient(135deg, #6e40c9 0%, #b86bff 100%)",
								border: "2px solid #30363d"
							}}
						></div>
						<div className="name" style={{ flex: 1 }}>
							<h3 style={{ margin: 0, color: "#fff", fontSize: "20px" }}>{userDetails.username}</h3>
							<div className="follower" style={{ display: "flex", gap: "12px", marginTop: "6px", color: "#8b949e" }}>
								<p style={{ margin: 0 }}>10 Follower</p>
								<p style={{ margin: 0 }}>3 Following</p>
							</div>
						</div>
						<button
							className="follow-btn"
							style={{
								background: "#1f6feb",
								border: "1px solid #388bfd",
								color: "#fff",
								padding: "8px 14px",
								borderRadius: "6px",
								cursor: "pointer"
							}}
						>
							Follow
						</button>
					</div>
				</div>
			</div>
		</div>
    </>
  );
};


       

export default Profile;