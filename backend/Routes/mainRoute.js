import express from "express";
import {userRouter} from "./userRouter.js";
import { repoRouter } from "./repoRoute.js";
import { issueRouter } from "./issueRoute.js";


const mainRouter=express.Router();

mainRouter.use(userRouter);
mainRouter.use(repoRouter);
mainRouter.use(issueRouter);

 mainRouter.get("/",(req,res)=>{
            res.send("welcome");
        });

export default mainRouter;