import express from "express";
import  { getAllUsers,signup,login,deleteUser,updateUserProfile,getUserProfile } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.get("/allUsers",getAllUsers);
userRouter.post("/login",login);
userRouter.post("/signup",signup);
userRouter.get("/updateUser",updateUserProfile);
userRouter.get("/showUserProfile",getUserProfile);
userRouter.get("/deleteUserProfile",deleteUser);


export {userRouter};

