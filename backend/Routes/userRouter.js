import express from "express";
import  { getAllUsers,signup,login,deleteUser,updateUserProfile,getUserProfile } from "../controllers/userController.js";

const userRouter=express.Router();

userRouter.get("/allUsers",getAllUsers);
userRouter.post("/login",login);
userRouter.post("/signup",signup);
userRouter.put("/updateProfile/:id",updateUserProfile);
userRouter.get("/getUserProfile/:id",getUserProfile);
userRouter.delete("/deleteProfile/:id",deleteUser);


export {userRouter};

