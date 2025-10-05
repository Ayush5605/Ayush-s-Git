import express from "express";
import  { getAllUsers,signup,login,deleteUser,updateUserProfile,getUserProfile } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.get("/allUsers",getAllUsers);
userRouter.get("/login",login);
userRouter.get("/signup",signup);
userRouter.get("/updateUser",updateUserProfile);
userRouter.get("/showUserProfile",getUserProfile);
userRouter.get("/deleteUserProfile",deleteUser);


export {userRouter};

